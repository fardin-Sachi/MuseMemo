import express from 'express'
import cors from "cors"
import mongoose from 'mongoose'
import logger from './middleware/logger.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/error.js'
import users from './routes/user.route.js'
import blogs from './routes/blog.route.js'
import blogComments from './routes/blogComment.route.js'
import UsersModel from './models/user.model.js'
import verifyToken from './middleware/auth.middleware.js'

const port = process.env.PORT
const mongoDb = process.env.MONDODB_ATLAS
const mongodb_collection = process.env.MONGODB_COLLECTION

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }))

// Body parser middleware
app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// Logger middleware
app.use(logger)

// Routes
app.use("/api/users", users);
app.use("/api/blog/comments", verifyToken, blogComments);
app.use("/api/blog", verifyToken, blogs);

// Error handler
app.use(notFound)
app.use(errorHandler)


mongoose.connect(`${mongoDb}/MuseMemo`)
    .then(() => {
        console.log("Connected to mongodb")

        UsersModel.createIndexes()

        app.listen(port, () => console.log(`Server running on ${port}`))
    })
    .catch(error => {
        console.log(error)
    })
    