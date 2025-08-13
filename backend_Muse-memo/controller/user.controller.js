import mongoose from 'mongoose'
import UsersModel from '../models/user.model.js'
import bcrypt from "bcryptjs"
import { generateAccessToken, generateRefreshToken } from '../lib/generateToken.js'

// Create User account - Sign Up Page
export const createUser = async (req, res, next) => {
    try {
        if(!req.body) 
            return res.status(400).json({success: false, message: "No user information provided."})
        const { name, username, email, dateOfBirth, gender, password } = req.body

        if(!name || !username || !email || !dateOfBirth || !["male", "female", "other"].includes(gender) || !password){
            return res.status(400).json({success: false, message: "All information are required"})
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format." });
        }

        const existingUsers = await UsersModel.findOne({username})
        if(existingUsers){
            return res.status(409).json({success: false, message: "Username already exist."})
        }
        
        
        if(password.length <8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)){
            return res.status(400).json({success: false, message: "Password must be at least 8 characters, contain one uppercase letter, and one number"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        
        const newUser = new UsersModel({
            name, username, email, dateOfBirth, gender, password: hashedPassword,
        })
        const savedUser = await newUser.save()
        
        const accessToken = generateAccessToken({userId: savedUser._id, username: savedUser.username})
        const refreshToken = generateRefreshToken({userId: savedUser._id, username: savedUser.username})
        
        const userObj = savedUser.toObject()
        delete userObj.password
        delete userObj._id
        delete userObj.id
        delete userObj.name
        delete userObj.email
        delete userObj.dateOfBirth
        delete userObj.gender
        delete userObj.createdAt
        delete userObj.updatedAt
        delete userObj.__v

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
            path: '/',
            maxAge: 15*60*1000 //15 min
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
            path: '/',
            maxAge: 24*60*60*1000 //1 day
        })
        
        res.status(201).json({success: true, data: {user: userObj}})
        
    } catch(error){
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// User Login - Sign in Page
export const loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body
        if(!username?.trim() || !password){
            return res.status(400).json({success: false, message: "Username and password are required."})
        }
        const user = await UsersModel.findOne({username})
                // .select("+password")
                .select("+password -name -email -blogs -gender -dateOfBirth -createdAt -updatedAt")
        if(!user){
            return res.status(401).json({success: false, message: "No user found."})
        }
        
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            return res.status(401).json({success: false, message: "Authentication failed."})
        }
        
        const accessToken = generateAccessToken({userId: user._id, username: user.username})
        const refreshToken = generateRefreshToken({userId: user._id, username: user.username})

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15*60*1000 //15 min
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24*60*60*1000 //1 day
        })
        
        const userObj = user.toObject()
        delete userObj.password
        delete userObj._id
        delete userObj.id
        delete userObj.name
        delete userObj.email
        delete userObj.dateOfBirth
        delete userObj.gender
        delete userObj.createdAt
        delete userObj.updatedAt
        delete userObj.__v

        res.status(200).json({success: true, data: {user: userObj}})

    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await UsersModel.find({}).select("-password")
                .populate('userBlogs')
    
        if(!users){
            return res.status(404).json({success: false, message: "No user found."})
        }
    
        res.status(200).json({success: true, data: users})
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// Get one user By ID
export const getOneUserByID = async (req, res, next) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success: false, message: "Invalid User ID."})
        }
    
        const user = await UsersModel.findById(id)
    
        if(!user){
            return res.status(404).json({success: false, message: "No such user found."})
        }

        res.status(200).json({success: true, data: user})

    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// Get one user By Username
export const getOneUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params

        if(req.user.username !== username){
            return res.status(403).json({success: false, message: "Access denied. You can only view your own data."})
        }
    
        const user = await UsersModel.findOne({username})
                .select("-password")
                .populate("userBlogs")
                // .select("name email dateOfBirth gender -_id")
    
        if(!user){
            return res.status(404).json({success: false, message: "No such user found."})
        }

        if(req.user.userId !== user._id.toString()){
            return res.status(403).json({success: false, message: "Access denied. You can only view your own data."})
        }
        
        res.status(200).json({success: true, data: user})

    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// //Get one user's userID and username - Authorization purpose
// export const getOneUsersIdNameByUsername = async (req, res, next) => {
//     try {
//         const { username } = req.params
    
//         const user = await UsersModel.findOne({username}).select("_id")
    
//         if(!user){
//             return res.status(404).json({success: false, message: "No such user found."})
//         }
    
//         res.status(200).json({success: true, data: user})
//     } catch (error) {
//         res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
//     }
// }

// // Update one user detail by ID
// export const updateUserByID = async (req, res, next) => {
//     try {
//         if(!req.body){
//             return res.status(404).json({success: false, message: "No update provided."})
//         }
//         //TODO: Update this function like updateUserByUsername function
//         const { id } = req.params
//         if(!mongoose.Types.ObjectId.isValid(id)){
//             return res.status(404).json({success: false, message: "Invalid User ID."})
//         }
//         const { name, username, email, password } = req.body
    
    
//         const updateFields = {}
//         if(name) updateFields.name = name
//         if(username) updateFields.username = username
//         if(email) updateFields.email = email
//         if(password) {
//             if(password.length <8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)){
//                 return res.status(400).json({success: false, message: "Password must be at least 8 characters, contain one uppercase letter, and one number"})
//             }
//             const hashedPassword = await bcrypt.hash(password, 12)
//             updateFields.password = hashedPassword
//         }
    
//         const updatedUser = await UsersModel.findOneAndUpdate({_id: id}, updateFields, {new: true})
    
//         if(!updatedUser){
//             return res.status(404).json({success: false, message: "User update failed."})
//         }
//         res.status(200).json({success: true, data: updatedUser})
//     } catch (error) {
//         res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
//     }
// }

// Update one user detail by Username
export const updateUserByUsername = async (req, res, next) => {
    try {
        if(!req.body){
            return res.status(400).json({success: false, message: "No update provided."})
        }
        
        const { username } = req.params
        if(req.user.username !== username){
            return res.status(403).json({success: false, message: "Access denied. You can only view your own data."})
        }

        const { name, email, password } = req.body
        
        const user = await UsersModel.findOne({username}).select("name email +password")
        if (!user) {
            return res.status(400).json({ success: false, message: "No such user found." });
        }
        if(req.user.userId !== user._id.toString()){
            return res.status(403).json({success: false, message: "Access denied. You can only view your own data."})
        }
        
        //Check if the provided body are already the old data
        if(name && user.name === name.trim()){
            return res.status(400).json({success: false, message: "Old name is provided."})
        }
        if(email && user.email === email.trim()){
            return res.status(400).json({success: false, message: "Old email is provided."})
        }
        if(password && await bcrypt.compare(password, user.password)){
            return res.status(400).json({success: false, message: "Old password is provided."})
        }
        
        if(name) user.name = name
        if(email) user.email = email
        if(password) {
            if(password.length <8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)){
                return res.status(400).json({success: false, message: "Password must be at least 8 characters, contain one uppercase letter, and one number"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            user.password = hashedPassword
        }
        
        const updatedUser = await user.save()
        if(!updatedUser){
            return res.status(400).json({success: false, message: "No such user found."})
        }

        const userObj = updatedUser.toObject();
        delete userObj.password;
        
        res.status(200).json({ success: true, data: userObj });
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// // Delete an user by ID
// export const deleteUserByID = async (req, res, next) => {
//     try {
//         const { id } = req.params
    
//         if(!mongoose.Types.ObjectId.isValid(id)){
//             return res.status(404).json({success: false, message: "Invalid User ID."})
//         }
    
//         const user = await UsersModel.findOneAndDelete({_id: id})
    
//         if(!user){
//             return res.status(400).json({success: false, message: "No such user found."})
//         }
    
//         res.status(200).json({success: true, data: `User ${user.username} deleted successfully`})
//     } catch (error) {
//         res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
//     }
// }

// Delete an user by username
export const deleteUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params
        if(req.user.username !== username){
            return res.status(403).json({success: false, message: "Access denied. You can only view your own data."})
        }

        const user = await UsersModel.findOne({username})
        if(!user){
            return res.status(400).json({success: false, message: "No such user found."})
        }
        if(req.user.userId !== user._id.toString()){
            return res.status(403).json({success: false, message: "Access denied. You can only view your own data."})
        }

        await UsersModel.findByIdAndDelete(user._id)
        
        res.status(200).json({success: true, data: `User ${username} deleted successfully`})
        
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// //User Authentication
// export const authenticateUser = async(req,res,next) => {
//     try {
//         const {username, password} = req.body
        
//         const user = await UsersModel.findOne({username}).select("+password")
//         if(!user) return res.status(404).json({success: false, message: "No such user found."})

//         const isPasswordMatch = await bcrypt.compare(password, user.password)
//         if(!isPasswordMatch) return res.status(401).json({error: "Invalid Credentials"})

//         const {_id} = user
        
//         res.status(200).json({success: true, data: _id, username})
//     } catch (error) {
//         res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
//     }
// }

// Get a User's information and blogs with comments
export const getUserDashboard = async (req, res, next) => {
    try {
        const {username} = req.params
        if(req.user.username !== username){
            return res.status(403).json({success: false, message: "Access denied. You can only view your own data."})
        }
        const user = await UsersModel.findOne({username})
                .select("-password")
                .populate({
                    path: 'userBlogs',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'commentor',
                            select: 'username name'
                        }
                    }
                })
        if(!user) return res.status(400).json({success: false, message: "No such user found."})
        if(req.user.userId !== user._id.toString()){
            return res.status(403).json({success: false, message: "Access denied. You can only view your own data."})
        }
        
        res.status(200).json({success: true, data: user})
        
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}