import jwt from "jsonwebtoken"

const generateAccessToken = (userId, username) => {
    return jwt.sign(
                {
                    userId,
                    username,
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN}
            )
}

export default generateAccessToken