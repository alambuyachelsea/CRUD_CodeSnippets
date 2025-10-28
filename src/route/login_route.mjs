import express from 'express'
import { userController } from '../controller/user_controller.mjs'

const router = express.Router()
export default router

router.get('/', userController.isLoggedin, userController.home)
