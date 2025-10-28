import express from 'express'
import { crudController } from '../controller/crud_controller.mjs'

const crudRouter = express.Router()
export default crudRouter

// crud home page
crudRouter.get('/', crudController.pickHome)

// C create new snippet into the database
crudRouter.get('/create', crudController.createForm)
crudRouter.post('/create', crudController.createSave)

// U update an existing snippet in the database
crudRouter.get('/update/:id', crudController.updateForm)
crudRouter.post('/update/:id', crudController.updateSnippet)

// D delete snippet from database
crudRouter.get('/delete/:id', crudController.deleteSnippetForm)
crudRouter.post('/delete/:id', crudController.deleteSnippet)
