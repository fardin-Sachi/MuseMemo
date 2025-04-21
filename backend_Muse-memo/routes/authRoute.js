import express from "express"
import { loginUser } from "../controller/authController"
import protect from "../middleware/authMiddleware"
import { createBlog } from "../controller/blogsController"

const router = express.Router()

router.post("/login",loginUser)
router.post("/", protect, createBlog)

export default router