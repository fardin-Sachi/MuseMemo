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
        ref: "Users",
        required: true,
    },
    postContent: {
        type: String,
        trim: true,
        required: true,
    },
    categories: [{
        type: String,
        enum:[
            "Technology", "Science", "Health", "Education", "Business", "Lifestyle", "Entertainment", "Sports", "Travel", "Food",
        ],
        validate: {
            validator: function(value) {
                return value.length <= 3;
            },
            message: "A blog post can have a maximum of 3 categories."
        },
        minlength: 1,
    }],
    timeOfPost: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model('Blogs', blogsSchema)