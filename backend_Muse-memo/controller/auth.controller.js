import {generateAccessToken} from "../lib/generateToken.js"

export const refreshAccessToken = async (req, res, next) => {
    const {userId, username} = req.user

    try {
        const newAccessToken = generateAccessToken({userId, username})

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 15*60*1000 //15 min
        })

        res.status(200).json({success: true})

    } catch (error) {
        res.status(403).json({success: false, message: `Invalid or expired refresh token.\nInternal Server Error: ${error.message}`})
    }
}

// User logout
export const logoutUser = (req, res, next) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    
    res.status(200).json({success: true, data: "User logged out successfully."})
}