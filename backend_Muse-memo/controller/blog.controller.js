import mongoose from 'mongoose'
import BlogModel from "../models/blog.model.js"
import mongoDbTimeToYYMMDD from '../lib/formatTime.js'
import UserModel from '../models/user.model.js'

// Create Blog
export const createBlog = async (req, res, next) => {
    try {
        // TODO: Add the following if statement to all the POST/PATCH req
        if(!req.body){
            return res.status(404).json({success: false, message: "No update provided."})
        }
        const { title, author, content, categories } = req.body
        
        if(!title || !author || !content || !Array.isArray(categories) || categories.length>3){
            return res.status(404).json({success: false, message: "Please provide requirements accordingly."})
        }
        
        const user = await UserModel.findById(author)
        if(!user){
            return res.status(404).json({success: false, message: "Author not found."})
        }
        
        const newBlog = new BlogModel({ title, author, content, categories })
        const savedBlog = await newBlog.save()

        // Push the blog ID to the associate User model
        user.blogs.push(savedBlog._id)
        await user.save()

        res.status(201).send(savedBlog)

    } catch(error){
        res.status(404).send(`Error: ${error.message}`)
    }
}


// Get all Blogs
export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await BlogModel.find()
            .populate('author', 'name username')
            // .populate('author')
            .populate({
                path: 'comments',
                populate: {
                            path: 'commentor', 
                            select: 'username name'
                        }
            })
        
        if(!blogs || blogs.length === 0){
            return res.status(404).json({error: "No Blog found"})
        }
    
        const formattedBlogs = blogs.map(blog => ({
            ...blog._doc,
            createdAt: mongoDbTimeToYYMMDD(blog.createdAt) // YYYY-MM-DD
        }))
        res.status(200).json(formattedBlogs)
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` })
    }
}


// Get one Blog
export const getOneBlog = async (req, res, next) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No such Blog"})
        }
    
        const blog = await BlogModel.findById(id)
            .populate("author", "name username")
            .populate({
                path: 'comments',
                populate: {
                            path: 'commentor', 
                            select: 'username name'
                        }
            })
        if(!blog){
            return res.status(404).json({error:"No such Blog"})
        }
        
        const formattedBlog = {
            ...blog._doc,
            createdAt: mongoDbTimeToYYMMDD(blog.createdAt) // YYYY-MM-DD
        }
        res.status(200).json(formattedBlog)
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` })
    }
}


// Update one Blog detail
export const updateBlog = async (req, res, next) => {
    try {
        if(!req.body){
            return res.status(404).json({success: false, message: "No update provided."})
        }

        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success: false, message: "Invalid Blog ID."})
        }
    
        const { title, content, categories } = req.body
    
    
        const blog = await BlogModel.findById(id).select("title content categories")
        if(!blog){
            return res.status(404).json({success: false, message: "No such blog found."})
        }
    
        //Check if the provided body are already the old data
        if(title && blog.title === title){
            return res.status(404).json({success: false, message: "Old title is provided."})
        }
        if(content && blog.content === content){
            return res.status(404).json({success: false, message: "Old content is provided."})
        }
        if(categories && blog.categories === categories){
            return res.status(404).json({success: false, message: "Old categories is provided."})
        }
    
    
        if(title) blog.title = title
        if(content) blog.content = content
        if(categories) blog.categories = categories
        
        const updatedBlog = await blog.save()
    
        if(!updatedBlog){
            return res.status(404).json({success: false, message: "Blog update failed."})
        }
        
        res.status(200).json({success: true, data: updatedBlog})
        
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}


// Delete a Blog
export const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No such Blog"})
        }
    
        const deletedBlog = await BlogModel.findOneAndDelete({_id: id})
    
        if(!deletedBlog){
            return res.status(400).json({error:"No such Blog"})
        }

        await UserModel.findByIdAndUpdate(deletedBlog.author, {
            $pull: {blogs: deletedBlog._id}
        })
    
        res.status(200).json({success: true, data: `Blog "${deletedBlog.title}" deleted successfully`})
        
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}