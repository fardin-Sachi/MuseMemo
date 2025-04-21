import mongoose from 'mongoose'
import UsersModel from '../models/usersModel.js'


// Create User
export const createUser = async (req, res, next) => {
    try {
        // console.log("Hello 1")
        const { name, username, email, number, dateOfBirth, gender } = req.body

        const existingUsers = await UsersModel.findOne({username})
        if(existingUsers){
            return res.status(400).json({error: "Username already exist."})
        }
        
        if(!name || !username || !email || !number || !dateOfBirth || !["male", "female", "other"].includes(gender)){
            const error = new Error("All information are required")
            error.status = 404
            return next(error)
        }
        // console.log("Hello 2")
        
        const newUser = new UsersModel({
            name, username, email, number, dateOfBirth, gender
        })
        
        const savedUser = await newUser.save()
        res.status(201).send(savedUser)
        // console.log("Hello 3")
    } catch(error){
        res.status(404).send(`Error: ${error.message}`)
    }
}


// Get all users
export const getUsers = async (req, res, next) => {
    // const { id } = req.body._id

    const users = await UsersModel.find({})

    if(!users){
        return res.status(404).json({error: "No user found"})
    }

    res.status(200).json(users)
}


// Get one user
export const getOneUser = async (req, res, next) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"})
    }

    const user = await UsersModel.findById(id)

    if(!user){
        return res.status(404).json({error:"No such user"})
    }
    res.status(200).json(user)
}


// Update one user detail
export const updateUser = async (req, res, next) => {
    const { id } = req.params
    const { name, username, email, number } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"})
    }

    updateFields = {}
    if(name) updateFields.name = name
    if(username) updateFields.username = username
    if(email) updateFields.email = email
    if(number) updateFields.number = number

    const updatedUser = await UsersModel.findOneAndUpdate({_id: id},updateFields)

    if(!updatedUser){
        return res.status(404).json({error:"No such user"})
    }
    res.status(200).json(updatedUser)
}


// Delete an user
export const deleteUser = async (req, res, next) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"})
    }

    const user = await UsersModel.findOneAndDelete({_id: id})

    if(!user){
        return res.status(400).json({error:"No such user"})
    }

    res.status(200).json(user)
}