import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blackListToken.js";

// for the authentication of the user and check if the user is authorized or not
const authmiddleware= async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(400).json({message:"token not provided"});
        }
        // check if token is blacklisted or not
        const isBlacklisttoken= await tokenBlacklistModel.findOne({token});
        if(isBlacklisttoken){
            return res.status(400).json({message:"token is blacklisted"});
        }
        const decoded=jwt.verify(token,process.env.jwt_secret);
        req.user=decoded;
        next(); 
    }catch(error){
        res.status(400).json({message:"user not unauthorized"});
    }
}
export default authmiddleware;