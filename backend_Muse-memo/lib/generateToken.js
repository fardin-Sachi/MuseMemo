import jwt from "jsonwebtoken"

export const generateAccessToken = (payload) => {
    return jwt.sign(
                {...payload, tokenType: 'access'},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
            )
}

export const generateRefreshToken = (payload) => {
    return jwt.sign(
                {...payload, tokenType: 'refresh'},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN}
            )
}