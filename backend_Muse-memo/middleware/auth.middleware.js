import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    try {
        // Authorization: Bearer Access_TOKEN
        const token = req.headers.authorization.split(" ")[1]
        if(!token){
            return res.status(401).json({success: false, message: "Access denied"})
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!decodedToken.userId){
            return res.status(401).json({success: false, message: "Access denied"})
        }

        req.userId = decodedToken.userId
        req.username = decodedToken.username

        next()
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

export default verifyToken