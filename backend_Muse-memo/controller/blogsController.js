import mongoose from 'mongoose'
import BlogsModel from '../models/blogsModel.js'


// Create Blog
export const createBlog = async (req, res, next) => {
    try {
        // console.log("Hello 1")
        const { title, author, postContent, categories } = req.body
        
        if(!title || !author || !postContent || categories.length>3){
            const error = new Error("Please provide requirements accordingly")
            error.status = 404
            return next(error)
        }
        
        // console.log("Hello 2")
        
        const newBlog = new BlogsModel({ title, author, postContent, categories })
        
        const savedBlog = await newBlog.save()
        res.status(201).send(savedBlog)
        // console.log("Hello 3")
    } catch(error){
        res.status(404).send(`Error: ${error.message}`)
    }
}


// Get all Blogs
export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await BlogsModel.find().populate('author', 'name username')
    
        if(!blogs){
            return res.status(404).json({error: "No Blog found"})
        }
    
        const formattedBlogs = blogs.map(blog => ({
            ...blog._doc,
            timeOfPost: blog.timeOfPost.toISOString().split('T')[0] // yyyy-mm-dd
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
            console.log("getOneBlog function called")
            return res.status(404).json({error: "No such Blog"})
        }
    
        const blog = await BlogsModel.findById(id)
    
        if(!blog){
            return res.status(404).json({error:"No such Blog"})
        }

        const formattedBlog = {
            ...blog._doc,
            timeOfPost: blog.timeOfPost.toISOString().split('T')[0] // YYYY-MM-DD
        }
        res.status(200).json(formattedBlog)
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` })
    }
}


// Update one Blog detail
export const updateBlog = async (req, res, next) => {
    const { id } = req.params
    const { title, postContent, categories } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Blog"})
    }

    const updatedFields = {}
    if(title) updatedFields.title = title
    if(postContent) updatedFields.title = postContent
    if(categories) updatedFields.title = categories
    
    const updatedBlog = await BlogsModel.findOneAndUpdate({_id: id}, updatedFields)

    if(!updatedBlog){
        return res.status(404).json({error:"Failed to update the blog"})
    }
    res.status(200).json(updatedBlog)
}


// Delete a Blog
export const deleteBlog = async (req, res, next) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Blog"})
    }

    const Blog = await BlogsModel.findOneAndDelete({_id: id})

    if(!Blog){
        return res.status(400).json({error:"No such Blog"})
    }

    res.status(200).json(Blog)
}