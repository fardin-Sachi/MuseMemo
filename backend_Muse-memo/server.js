import express from 'express'
import mongoose from 'mongoose'
import logger from './middleware/logger.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/error.js'
import users from './routes/usersRoute.js'
import blogs from './routes/blogsRoute.js'
import blogComments from './routes/blogCommentsRoute.js'
import UsersModel from './models/usersModel.js'
import authRoute from './routes/authRoute.js'
// import blogComments from './routes/'

const port = process.env.PORT
const mongoDb = process.env.MONDODB_ATLAS
const mongodb_collection = process.env.MONGODB_COLLECTION

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Logger middleware
app.use(logger)

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", users);
app.use("/api/blogs/comments", blogComments);
app.use("/api/blogs", blogs);

// Error handler
app.use(notFound)
app.use(errorHandler)


mongoose.connect(`${mongoDb}/${mongodb_collection}`)
    .then(() => {
        console.log("Connected to mongodb")

        //Ensure indexes are created
        UsersModel.createIndexes()

        app.listen(port, () => console.log(`Server running on ${port}`))
    })
    .catch(error => {
        console.log(error)
    })
    

// MongoDB Atlas Trials
