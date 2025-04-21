import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    number: {
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
        required: true 
    },
})

usersSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})


export default mongoose.model('Users', usersSchema)