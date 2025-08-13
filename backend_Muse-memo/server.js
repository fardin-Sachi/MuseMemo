import express from 'express'
import cors from "cors"
import mongoose from 'mongoose'
import logger from './middleware/logger.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/error.js'
import users from './routes/user.route.js'
import blogs from './routes/blog.route.js'
import authRoute from './routes/auth.route.js'
import blogComments from './routes/blogComment.route.js'
// import UsersModel from './models/user.model.js'
import {verifyAccessToken} from './middleware/auth.middleware.js'
import cookieParser from 'cookie-parser'
import envConfig from './config/env.config.js'

const {PORT, MONGODB_ATLAS, MONGODB_COLLECTION} = envConfig
const app = express()

const allowedOrigin = [
    "http://localhost:3000",

]
app.use(cors({
    origin: (origin, callback) => {
        if(!origin || allowedOrigin.includes(origin)){
            return callback(null, true)
        }
        callback(new Error("Not allowed by CORS."))
    },
    credentials: true,
  }))

// Body parser middleware
app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

// Logger middleware
app.use(logger)

// Routes
app.use("/api/auth", authRoute)
app.use("/api/users", users);
app.use("/api/blog/comments", verifyAccessToken, blogComments);
app.use("/api/blog", verifyAccessToken, blogs);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({success: true, data: "Server is healthy."})
})

// Error handler
app.use(notFound)
app.use(errorHandler)


mongoose.connect(`${MONGODB_ATLAS}/MuseMemo`)
    .then(() => {
        console.log("Connected to mongodb")

        // UsersModel.createIndexes()

        app.listen(PORT, () => console.log(`Server running on ${PORT}`))
    })
    .catch(error => {
        console.log(error)
    })
    