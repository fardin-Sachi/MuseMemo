import jwt from "jsonwebtoken"
import usersModel from "../models/usersModel"

const protect = async (req,res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || ! authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "Not authorized"})
    }

    try {
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.status(401).json({error: "Token is not valid"})
    }
}

export default protect