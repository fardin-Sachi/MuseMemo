import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: process.env.PORT || 8000,

    NODE_ENV: process.env.NODE_ENV || 'development',

    MONGODB_ATLAS: process.env.MONGODB_ATLAS,

    MONGODB_COLLECTION: process.env.MONGODB_COLLECTION,

    JWT_SECRET: process.env.JWT_SECRET,

    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,

    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
}

export default Object.freeze(config)