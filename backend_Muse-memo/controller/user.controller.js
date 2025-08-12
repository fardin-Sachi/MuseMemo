import mongoose from 'mongoose'
import UsersModel from '../models/user.model.js'
import bcrypt from "bcryptjs"
import generateAccessToken from '../lib/generateAccessToken.js'

// Create User account
export const createUser = async (req, res, next) => {
    try {
        const { name, username, email, dateOfBirth, gender, password } = req.body

        const existingUsers = await UsersModel.findOne({username})
        if(existingUsers){
            return res.status(400).json({success: false, message: "Username already exist."})
        }
        
        if(!name || !username || !email || !dateOfBirth || !["male", "female", "other"].includes(gender) || !password){
            return res.status(404).json({success: false, message: "All information are required"})
        }
        
        if(password.length <8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)){
            return res.status(400).json({success: false, message: "Password must be at least 8 characters, contain one uppercase letter, and one number"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        
        const newUser = new UsersModel({
            name, username, email, dateOfBirth, gender, password: hashedPassword,
        })
        const savedUser = await newUser.save()
        
        const token = generateAccessToken(savedUser._id, savedUser.username)
        
        res.status(200).json({success: true, data: {userId: user._id,  token}})

        // TODO: savedPassword showing password as well, password should not be returned.
        res.status(201).json({success: true, data: savedUser})
    } catch(error){
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await UsersModel.find({})
    
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
    
        const user = await UsersModel.findOne({username}).select("name email dateOfBirth gender -_id")
    
        if(!user){
            return res.status(404).json({success: false, message: "No such user found."})
        }
        
        res.status(200).json({success: true, data: user})
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

//Get one user's userID and username - Authorization purpose
export const getOneUsersIdNameByUsername = async (req, res, next) => {
    try {
        const { username } = req.params
    
        const user = await UsersModel.findOne({username}).select("_id")
    
        if(!user){
            return res.status(404).json({success: false, message: "No such user found."})
        }
    
        res.status(200).json({success: true, data: user})
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// Update one user detail by ID
export const updateUserByID = async (req, res, next) => {
    try {
        if(!req.body){
            return res.status(404).json({success: false, message: "No update provided."})
        }
        //TODO: Update this function like updateUserByUsername function
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success: false, message: "Invalid User ID."})
        }
        const { name, username, email, password } = req.body
    
    
        const updateFields = {}
        if(name) updateFields.name = name
        if(username) updateFields.username = username
        if(email) updateFields.email = email
        if(password) {
            if(password.length <8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)){
                return res.status(400).json({success: false, message: "Password must be at least 8 characters, contain one uppercase letter, and one number"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            updateFields.password = hashedPassword
        }
    
        const updatedUser = await UsersModel.findOneAndUpdate({_id: id}, updateFields, {new: true})
    
        if(!updatedUser){
            return res.status(404).json({success: false, message: "User update failed."})
        }
        res.status(200).json({success: true, data: updatedUser})
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// Update one user detail by Username
export const updateUserByUsername = async (req, res, next) => {
    try {
        if(!req.body){
            return res.status(404).json({success: false, message: "No update provided."})
        }
        const { username } = req.params
        const { name, email, password } = req.body
        
        const user = await UsersModel.findOne({username}).select("name email +password")
        if (!user) {
            return res.status(404).json({ success: false, message: "No such user found." });
        }
        
        //Check if the provided body are already the old data
        if(name && user.name === name){
            return res.status(404).json({success: false, message: "Old name is provided."})
        }
        if(email && user.email === email){
            return res.status(404).json({success: false, message: "Old email is provided."})
        }
        if(password && await bcrypt.compare(password, user.password)){
            return res.status(404).json({success: false, message: "Old password is provided."})
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
            return res.status(404).json({success: false, message: "No such user found."})
        }

        const userObj = updatedUser.toObject();
        delete userObj.password;
        
        res.status(200).json({ success: true, data: userObj });
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// Delete an user by ID
export const deleteUserByID = async (req, res, next) => {
    try {
        const { id } = req.params
    
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success: false, message: "Invalid User ID."})
        }
    
        const user = await UsersModel.findOneAndDelete({_id: id})
    
        if(!user){
            return res.status(400).json({success: false, message: "No such user found."})
        }
    
        res.status(200).json({success: true, data: `User ${user.username} deleted successfully`})
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// Delete an user by username
export const deleteUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params
    
        const user = await UsersModel.findOneAndDelete({username})
    
        if(!user){
            return res.status(400).json({success: false, message: "No such user found."})
        }
    
        res.status(200).json({success: true, data: `User ${username} deleted successfully`})
        
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

//User Authentication
export const authenticateUser = async(req,res,next) => {
    try {
        const {username, password} = req.body
        
        const user = await UsersModel.findOne({username}).select("+password")
        if(!user) return res.status(404).json({success: false, message: "No such user found."})

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) return res.status(401).json({error: "Invalid Credentials"})

        const {_id} = user
        
        res.status(200).json({success: true, data: _id, username})
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

// User Login
export const loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body

        const user = await UsersModel.findOne({username}).select("+password -name -email -blogs -gender -dateOfBirth")
        if(!user){
            return res.status(401).json({success: false, message: "No user found."})
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            return res.status(401).json({success: false, message: "Authentication failed."})
        }
        
        const token = generateAccessToken(user._id, user.username)

        res.status(200).json({success: true, data: {userId: user._id,  token}})

    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}