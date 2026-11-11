
import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blackListToken.js";

const authmiddleware = async (req, res, next) => {
    try {
        const authorization = req.get("authorization");
        const bearerToken = authorization?.startsWith("Bearer ")
            ? authorization.slice(7).trim()
            : null;
        // Prefer the current browser session token when both are present.
        const token = bearerToken || req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not provided"
            });
        }

        const isBlacklistToken = await tokenBlacklistModel.findOne({
            token
        });

        if (isBlacklistToken) {
            return res.status(401).json({
                message: "Token is blacklisted"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.jwt_secret
        );

        console.log("Decoded token:", decoded);

        req.user = decoded;
        req.authToken = token;

        next();

    } catch (error) {
        console.error("Auth middleware error:", error);

        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};

export default authmiddleware;
