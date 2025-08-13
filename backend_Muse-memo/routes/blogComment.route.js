import express from 'express'
import { 
    createBlogComment, 
    getBlogComments, 
    getOneBlogComment, 
    getCommentsOfOneBlog,
    updateBlogComment, 
    deleteBlogComment, 
        } from '../controller/blogComment.controller.js'


const router = express.Router()

router.post('/', createBlogComment)


router.get('/', getBlogComments)

router.get('/:id', getCommentsOfOneBlog)

// router.get('/:id', getOneBlogComment)



router.patch('/:id', updateBlogComment)


router.delete('/:id', deleteBlogComment)


export default router