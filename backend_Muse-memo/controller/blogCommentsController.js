//Need to change

import mongoose from 'mongoose'
import usersModel from '../models/usersModel.js'
import blogsModel from '../models/blogsModel.js'
import blogCommentsModel from '../models/blogCommentsModel.js'

// Create Blog comment
export const createBlogComment = async (req, res, next) => {
    try {
        // console.log("Hello 1")
        const { blog, commentor, commentContent } = req.body
        
        if(!blog || !commentor || !commentContent){
            const error = new Error("Please provide comment")
            error.status = 404
            return next(error)
        }

        const blogExists = await blogsModel.findById(blog)
        if(!blogExists) return res.status(404).json({error: "Blog not found."})
        
        const userExists = await usersModel.findById(commentor)
        if(!userExists) return res.status(404).json({error: "Commentor not found."})

        
        // console.log("Hello 2")
        
        const newBlogComment = new blogCommentsModel({ blog, commentor, commentContent })
        
        const savedBlogComment = await newBlogComment.save()
        res.status(201).send(savedBlogComment)
        // console.log("Hello 3")
    } catch(error){
        res.status(404).send(`Error: ${error.message}`)
    }
}


// Get all Blog comments
export const getBlogComments = async (req, res) => {
    try {
        // Fetch all comments and populate related fields
        const comments = await blogCommentsModel.find()
            .populate({
                path: 'blog',
                select: 'title author',
                populate: {
                    path: 'author',
                    select: 'name username'
                }
            }) // Fetch the title of the related blog
            .populate('commentor', 'name username'); // Fetch the name and username of the commentor

        // Check if there are no comments
        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: "No comments found" });
        }
        
        const formattedComments = comments.map(comment => ({
            ...comment._doc,
            timeOfComment: comment.timeOfComment.toISOString().split('T')[0] // yyyy-mm-dd
        }))
        res.status(200).json(formattedComments);
    } catch (error) {
        // Handle server errors
        console.error("Error fetching comments:", error.message);
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    }
}


// Get one Blog Comment
export const getOneBlogComment = async (req, res, next) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such comment"})
    }

    const blogComment = await blogCommentsModel.findById(id)

    if(!blogComment){
        return res.status(404).json({error:"No such comment"})
    }

    const formattedComment = {
        ...blogComment._doc,
        timeOfComment: blogComment.timeOfComment.toISOString().split('T')[0] // YYYY-MM-DD
    }

    res.status(200).json(formattedComment)
}


// Update one Blog detail
export const updateBlogComment = async (req, res, next) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such comment"})
    }

    const blogComment = await blogCommentsModel.findById(id)
    if(!blogComment){
        return res.status(404).json({error:"No such comment"})
    }

    const { commentContent } = req.body

    const updatedFields = {}
    if(commentContent) updatedFields.commentContent = commentContent
    
    const updatedBlogComment = await blogCommentsModel.findOneAndUpdate({_id: id}, updatedFields)

    if(!updatedBlogComment){
        return res.status(404).json({error:"Failed to update"})
    }
    res.status(200).json(updatedBlogComment)
}


// Delete a Blog
export const deleteBlogComment = async (req, res, next) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Blog"})
    }

    const blogComment = await blogCommentsModel.findOneAndDelete({_id: id})

    if(!blogComment){
        return res.status(400).json({error:"Failed to delete comment"})
    }

    res.status(200).json(blogComment)
}