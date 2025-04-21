import mongoose from "mongoose";

const Schema = mongoose.Schema

const blogCommentsSchema = new Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
        required: true,
    },
    commentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    commentContent: {
        type: String,
        trim: true,
        required: true,
    },
    timeOfComment: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model('BlogComments', blogCommentsSchema)