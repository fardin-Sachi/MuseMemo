import express from 'express'
import { 
    authenticateUser, 
    createUser, 
    getOneUserByUsername, 
    updateUserByUsername, 
    deleteUserByUsername, 
    getUsers, 
    getOneUsersIdNameByUsername, 
    getOneUserByID,
    updateUserByID, 
    deleteUserByID,
    loginUser, 
} from '../controller/user.controller.js'
import verifyToken from "../middleware/auth.middleware.js"

const router = express.Router()


router.post('/', createUser)

router.post('/login', loginUser)

router.post('/auth', verifyToken, authenticateUser)


router.get('/authorization/:username', verifyToken, getOneUsersIdNameByUsername)

// router.get('/user/:id', verifyToken, getOneUserByID)
router.get('/:username', verifyToken, getOneUserByUsername)

router.get('/', verifyToken, getUsers)



// router.patch('/:id', updateUserByID)
router.patch('/:username', verifyToken, updateUserByUsername)


// router.delete('/:id', deleteUserByID)
router.delete('/:username', verifyToken, deleteUserByUsername)


export default router