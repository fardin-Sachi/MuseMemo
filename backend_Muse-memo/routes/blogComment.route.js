import express from 'express'
import { 
    createBlogComment, 
    getBlogComments, 
    getOneBlogComment, 
    getCommentsOfOneBlog,
    updateBlogComment, 
    deleteBlogComment, 
        } from '../controller/blogComment.controller.js'
import verifyToken from '../middleware/auth.middleware.js'


const router = express.Router()

router.post('/', verifyToken, createBlogComment)


router.get('/', verifyToken, getBlogComments)

router.get('/:id', verifyToken, getCommentsOfOneBlog)

// router.get('/:id', getOneBlogComment)



router.patch('/:id', verifyToken, updateBlogComment)


router.delete('/:id', verifyToken, deleteBlogComment)


export default router