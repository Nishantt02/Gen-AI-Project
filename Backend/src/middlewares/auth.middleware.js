
import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blackListToken.js";

const authmiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

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

        next();

    } catch (error) {
        console.error("Auth middleware error:", error);

        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};

export default authmiddleware;