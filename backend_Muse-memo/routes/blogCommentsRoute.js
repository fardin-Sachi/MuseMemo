import express from 'express'
import { 
    createBlogComment, 
    deleteBlogComment, 
    getBlogComments, 
    getOneBlogComment, 
    updateBlogComment 
        } from '../controller/blogCommentsController.js'


const router = express.Router()

router.get('/', getBlogComments)

router.get('/:id', getOneBlogComment)

router.post('/', createBlogComment)

router.put('/:id', updateBlogComment)

router.delete('/:id', deleteBlogComment)


export default router