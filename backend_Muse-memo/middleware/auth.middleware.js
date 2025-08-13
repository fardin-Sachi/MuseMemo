import jwt from "jsonwebtoken"
import envConfig from "../config/env.config.js"
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = envConfig

export const verifyAccessToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({success: false, message: "No token provided."})
        }

        // Authorization: Bearer Access_TOKEN
        const token = authHeader.split(" ")[1]
        
        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET)
        if(!decodedToken?.userId){
            return res.status(401).json({success: false, message: "Access denied."})
        }
        if (decodedToken.tokenType !== 'access') {
            return res.status(403).json({ success: false, message: "Invalid token type." });
        }
        
        req.user = {
            userId: decodedToken.userId,
            username: decodedToken.username
        }

        next()
    } catch (error) {
        res.status(403).json({success: false, message: `Invalid or Expired Token.\nInternal Server Error: ${error.message}`})
    }
}

export const verifyRefreshToken = (req, res, next) => {
    try {
        const token = req.cookies.refreshToken
        
        const decodedToken = jwt.verify(token, REFRESH_TOKEN_SECRET)
        if(decodedToken.tokenType !== "refresh"){
            return res.status(403).json({success: false, message: "Invalid token type."})
        }
        if(!decodedToken?.userId){
            return res.status(401).json({success: false, message: "Access denied."})
        }

        req.user = {
            userId: decodedToken.userId,
            username: decodedToken.username
        }

        next()
    } catch (error) {
        res.status(403).json({success: false, message: `Invalid or expired refresh token.\nInternal Server Error: ${error.message}`})
    }
}