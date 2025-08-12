import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum:["male", "female", "other"],
        required: true,
    },
    password: { 
        type: String, 
        required: true, 
        select: false,
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
}, {timestamps: true})

// usersSchema.virtual('userBlogs', {
//   ref: 'Blog',
//   localField: '_id',
//   foreignField: 'author'
// });


export default mongoose.model('User', usersSchema)