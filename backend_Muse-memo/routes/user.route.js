import express from 'express'
import { 
    // authenticateUser, 
    createUser, 
    getOneUserByUsername, 
    updateUserByUsername, 
    deleteUserByUsername, 
    getUsers, 
    // getOneUsersIdNameByUsername, 
    // getOneUserByID,
    // updateUserByID, 
    // deleteUserByID,
    loginUser, 
} from '../controller/user.controller.js'
import { verifyAccessToken } from '../middleware/auth.middleware.js'

const router = express.Router()

// router.post('/refresh', )
router.post('/', createUser)

router.post('/login', loginUser)

// router.post('/auth', verifyAccessToken, authenticateUser)


// router.get('/authorization/:username', verifyAccessToken, getOneUsersIdNameByUsername)

// router.get('/:id', verifyAccessToken, getOneUserByID)

router.get('/:username', verifyAccessToken, getOneUserByUsername)

router.get('/', verifyAccessToken, getUsers)


// router.patch('/:id', updateUserByID)
router.patch('/:username', verifyAccessToken, updateUserByUsername)


// router.delete('/:id', deleteUserByID)
router.delete('/:username', verifyAccessToken, deleteUserByUsername)


export default router