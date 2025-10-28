import express from 'express'
import { userController } from '../controller/user_controller.mjs'

const userRouter = express.Router()
export default userRouter

// Home page
userRouter.get('/', userController.home)

// Login logout managment
userRouter.get('/login', userController.login)
userRouter.post('/login', userController.loginProcess)
userRouter.get('/logout', userController.logout)

// Snippet creation management
userRouter.get('/create', userController.createForm)
userRouter.post('/create', userController.createUser)
