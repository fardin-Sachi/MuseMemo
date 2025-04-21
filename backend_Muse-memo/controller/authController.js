import usersModel from "../models/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await usersModel.findOne({email})
        if(!user) return res.status(404).json({error: "User not found"})
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({error: "Invalid credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({message: "Login successful", token, user: {id: user._id, name: user.name, email: user.email}})
    } catch (error) {
        res.status(500).json({ error: `Login failed: ${error.message}` });
    }
}