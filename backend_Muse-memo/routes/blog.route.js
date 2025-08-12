import express from 'express'
import {    
        createBlog, 
        deleteBlog, 
        getBlogs, 
        getOneBlog, 
        updateBlog 
} from '../controller/blog.controller.js'

const router = express.Router()

router.get('/', getBlogs)

router.get('/:id', getOneBlog)


router.post('/', createBlog)


router.patch('/:id', updateBlog)


router.delete('/:id', deleteBlog)


export default router