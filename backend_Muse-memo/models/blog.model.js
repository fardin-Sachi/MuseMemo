import mongoose from "mongoose";

const Schema = mongoose.Schema

const blogsSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    categories: {
        type: [String],
        enum:[
            "Technology", "Science", "Health", "Education", "Business", "Lifestyle", "Entertainment", "Sports", "Travel", "Food", "Performance", "Innovation", "Design", "Accessibility", "Frontend"
        ],
        validate: {
            validator: function(value) {
                return value.length <= 3;
            },
            message: "A blog post can have a maximum of 3 categories."
        },
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogComment"
    }]
}, {timestamps: true})

export default mongoose.model('Blog', blogsSchema)