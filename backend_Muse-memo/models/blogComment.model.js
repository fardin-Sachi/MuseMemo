import mongoose from "mongoose";

const Schema = mongoose.Schema

const blogCommentsSchema = new Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    commentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    commentContent: {
        type: String,
        trim: true,
        required: true,
    },
}, {timestamps: true})

export default mongoose.model('BlogComment', blogCommentsSchema)