import express from 'express'
import { adminController } from '../controller/admin_controller.mjs'

const adminRouter = express.Router()
export default adminRouter

adminRouter.get('/', adminController.adminDashboard)

// D delete single snippet from database
adminRouter.get('/deleteSnippet/:id', adminController.deleteSnippetForm)
adminRouter.post('/deleteSnippet/:id', adminController.deleteSnippet)

// D delete single user from database
adminRouter.get('/deleteUser/:id', adminController.deleteUserForm)
adminRouter.post('/deleteUser/:id', adminController.deleteUser)

// D delete all snippets from database
adminRouter.get('/deleteAllSnippets', adminController.deleteAllSnippetsForm)
adminRouter.post('/deleteAllSnippets', adminController.deleteAllSnippets)

// D delete all users from database
adminRouter.get('/deleteAllUsers', adminController.deleteAllUsersForm)
adminRouter.post('/deleteAllUsers', adminController.deleteAllUsers)
