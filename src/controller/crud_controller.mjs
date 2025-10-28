import Snippet from '../model/snippet.mjs'
import { userController } from '../controller/user_controller.mjs'

export const crudController = {}

/**
 * Show crud homepage for user or guest.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
crudController.pickHome = async (req, res) => {
  const allSnippets = await Snippet.listAll()

  if (await userController.isLoggedin(req, res)) {
    return res.render('userCRUD', {
      user: req.session.user,
      snippets: allSnippets,
      flashMessage: req.session.flashMessage
    })
  } else {
    req.session.flashMessage = 'Login to create, edit and delete snippets.'
    return res.render('guestCrud', {
      snippets: allSnippets,
      flashMessage: req.session.flashMessage
    })
  }
}

/**
 * Show a create  snippet form.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
crudController.createForm = (req, res) => {
  res.render('createSnippetForm', res.data)
}

/**
 * Manage the posted create snippet form.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
crudController.createSave = async (req, res) => {
  const userAcronym = req.session.user.acronym
  const { title, code } = req.body

  const newSnippet = new Snippet({ title, code, userAcronym })
  await newSnippet.save()

  const allSnippets = await Snippet.listAll()

  req.session.flashMessage = 'Snippet Created!'

  return res.render('userCRUD', {
    user: req.session.user,
    snippets: allSnippets,
    flashMessage: req.session.flashMessage
  })
}

/**
 * Show an update snippet form.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
crudController.updateForm = async (req, res) => {
  const itemId = req.params.id
  const snippet = await Snippet.findBySnippetId(itemId)

  req.session.flashMessage = null

  return res.render('updateSnippetForm', {
    id: itemId,
    user: req.session.user,
    flashMessage: req.session.flashMessage,
    title: snippet.title,
    code: snippet.code
  })
}

/**
 * Mange the posted update snippet form.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
crudController.updateSnippet = async (req, res) => {
  const snippet = await Snippet.findBySnippetId(req.params.id)

  await snippet.updateOne({ title: req.body.title })
  await snippet.updateOne({ code: req.body.code })

  req.session.flashMessage = 'Snippet Updated!'
  const allSnippets = await Snippet.listAll()

  return res.render('userCRUD', {
    user: req.session.user,
    snippets: allSnippets,
    flashMessage: req.session.flashMessage
  })
}

/**
 * Show a snippet delete form with a particular id to delete.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
crudController.deleteSnippetForm = async (req, res) => {
  const itemId = req.params.id
  const snippet = await Snippet.findBySnippetId(itemId)

  res.render('deleteSnippetFormUser', {
    id: itemId,
    user: req.session.user,
    flashMessage: req.session.flashMessage,
    title: snippet.title,
    code: snippet.code
  })
}

/**
 * Manage the posted snippet delete form.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
crudController.deleteSnippet = async (req, res) => {
  const itemId = req.params.id

  await Snippet.deleteBySnippetId(itemId)

  const allSnippets = await Snippet.listAll()

  req.session.flashMessage = 'Snippet Deleted!'

  return res.render('userCRUD', {
    user: req.session.user,
    snippets: allSnippets,
    flashMessage: req.session.flashMessage
  })
}
