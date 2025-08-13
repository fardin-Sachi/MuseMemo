import express from "express"
import { logoutUser, refreshAccessToken } from "../controller/auth.controller.js"
import {verifyRefreshToken} from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/refresh", verifyRefreshToken, refreshAccessToken)

router.get("/logout", logoutUser)

export default router