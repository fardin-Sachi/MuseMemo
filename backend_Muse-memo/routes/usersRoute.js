import express from 'express'
import { createUser, deleteUser, getOneUser, getUsers, updateUser } from '../controller/userController.js'

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getOneUser)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)


export default router