//Need to change

import mongoose from 'mongoose'
import usersModel from '../models/user.model.js'
import blogsModel from '../models/blog.model.js'
import blogCommentsModel from '../models/blogComment.model.js'

// Create Blog comment
export const createBlogComment = async (req, res, next) => {
    try {
        if(!req.body){
            return res.status(404).json({success: false, message: "No comment provided."})
        }
        const { blog, commentor, commentContent } = req.body
        
        if(!blog || !commentor || !commentContent){
            return res.status(400).json({success: false, message: "Please provide a comment."})
        }

        
        const [blogExists, userExists] = await Promise.all([
            blogsModel.findById(blog),
            usersModel.findById(commentor),
        ])
        if(!blogExists) return res.status(404).json({success: false, message: "Blog not found."})
        if(!userExists) return res.status(404).json({success: false, message: "Commentor not found."})

        
        const newBlogComment = new blogCommentsModel({ blog, commentor, commentContent: commentContent.trim() })
        const savedBlogComment = await newBlogComment.save()

        // Push the blog ID to the associate Blog model
        // await blogsModel.findByIdAndUpdate(blog._id, { comments: savedBlogComment._id })
        blogExists.comments.push(savedBlogComment._id)
        await blogExists.save()

        res.status(201).json({success: true, data: savedBlogComment})
        
    } catch(error){
        res.status(500).send(`Error: ${error.message}`)
    }
}


// Get all Blog comments
export const getBlogComments = async (req, res) => {
    try {
        const comments = await blogCommentsModel.find()
            .populate({
                path: 'blog',
                select: 'title author',
                populate: {
                    path: 'author',
                    select: 'name username'
                }
            })
            .populate('commentor', 'name username')

        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: "No comments found" });
        }
        
        const formattedComments = comments.map(comment => ({
            ...comment._doc,
            timeOfComment: comment.timeOfComment.toISOString().split('T')[0] // yyyy-mm-dd
        }))
        res.status(200).json(formattedComments);
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    }
}

// Get all Blog comments for a specific Blog
export const getCommentsOfOneBlog = async (req, res) => {
    try {
        const {id} = req.params
        console.log("Blog ID::",id,typeof(id))
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "Invalid Blog ID format."})
        }

        const blogComments = await blogCommentsModel.find({blog: id}).populate('commentor', 'username name')

        if(blogComments.length === 0)
            return res.status(404).json({error: "No comments found for this blog"})

        res.status(200).json(blogComments)

    } catch (error) {
         res.status(500).json({ error: `Something went wrong: ${error.message}` })
    }
}


// Get one Blog Comment
export const getOneBlogComment = async (req, res, next) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "No such comment"})
        }
    
        const blogComment = await blogCommentsModel.findById(id)
    
        if(!blogComment){
            return res.status(404).json({error:"No such comment"})
        }
    
        const formattedComment = {
            ...blogComment._doc,
            timeOfComment: blogComment.timeOfComment?.toISOString().split('T')[0] // YYYY-MM-DD
        }
    
        res.status(200).json(formattedComment)

    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` })
    }
}


// Update one Blog Comment
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




// blogsController.js:
// // Get one Blog
// export const getOneBlog = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         if(!mongoose.Types.ObjectId.isValid(id)){
//             return res.status(404).json({error: "No such Blog"})
//         }
    
//         const blog = await BlogsModel.findById(id)
//             .populate({
//                 path: 'comments',
//                 populate: {path: 'commentor', select: 'username name'}
//             })
    
//         if(!blog){
//             return res.status(404).json({error:"No such Blog"})
//         }

//         const formattedBlog = {
//             ...blog._doc,
//             timeOfPost: blog.timeOfPost.toISOString().split('T')[0] // YYYY-MM-DD
//         }
//         res.status(200).json(formattedBlog)
//     } catch (error) {
//         res.status(500).json({ error: `Something went wrong: ${error.message}` })
//     }
// }

// blogCommentsController.js:
// // Get all Blog comments for a particular Blog
// export const getCommentsOfOneBlog = async (req, res) => {
//     try {
//         const {blogId} = req.params
//         if(!mongoose.Types.ObjectId.isValid(blogId)) {
//             return res.status(400).json({error: "Invalid Blog ID format."})
//         }

//         const blogComments = await blogCommentsModel.find({blog: blogId}).populate('commentor', 'username name')

//         if(blogComments.length === 0)
//             return res.status(404).json({error: "No comments found for this blog"})

//         res.status(200).json(blogComments)

//     } catch (error) {
//          res.status(500).json({ error: `Something went wrong: ${error.message}` })
//     }
// }

// blogsRoute.js:
// import express from 'express'
// import { createBlog, deleteBlog, getBlogs, getOneBlog, updateBlog } from '../controller/blogsController.js'
// const router = express.Router()
// router.get('/:id', getOneBlog)
// export default router

// GET request to http://localhost:8000/api/blogs/67fec925ec31bb2c9722891c sends the following response:
// {
//     "comments": [],
//     "_id": "67fec925ec31bb2c9722891c",
//     "title": "Exploring the Wonders of AI",
//     "author": "67feb87557f1ced406e326a4",
//     "postContent": "Artificial Intelligence has revolutionized the way we interact with technology. In this blog, we'll explore its applications, challenges, and future potential.",
//     "categories": [
//         "Technology",
//         "AI",
//         "Innovation"
//     ],
//     "timeOfPost": "2025-04-15",
//     "__v": 0
// }

// GET request to 