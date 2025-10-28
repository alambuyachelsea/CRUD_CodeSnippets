import User from '../model/user.mjs'
import Snippet from '../model/snippet.mjs'

export const adminController = {}

/**
 * Admin dashboard with all users and snippets.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
adminController.adminDashboard = async (req, res) => {
  if (res.data.user.role === 'admin') {
    req.session.flashMessage = 'Welcome to the Admin Dashboard.'
    const allUsers = await User.listAll()
    const allSnippets = await Snippet.listAll()

    res.render('adminDasboard', {
      user: req.session.user,
      users: allUsers,
      snippets: allSnippets,
      flashMessage: req.session.flashMessage
    })
  } else {
    res.send(403)
  }
}

/**
 * Show a snippet delete form with a particular id to delete.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
adminController.deleteSnippetForm = async (req, res) => {
  const itemId = req.params.id
  const snippet = await Snippet.findBySnippetId(itemId)

  res.render('deleteSnippetFormAdmin', {
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
adminController.deleteSnippet = async (req, res) => {
  const itemId = req.params.id

  await Snippet.deleteBySnippetId(itemId)

  const allSnippets = await Snippet.listAll()
  const allUsers = await User.listAll()

  req.session.flashMessage = 'Snippet Deleted!'

  res.render('adminDasboard', {
    user: req.session.user,
    users: allUsers,
    snippets: allSnippets,
    flashMessage: req.session.flashMessage
  })
}

/**
 * Show a user delete form with a particular id to delete.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
adminController.deleteUserForm = async (req, res) => {
  const itemId = req.params.id
  const userToDelete = await User.findByID(itemId)

  res.render('deleteUserForm', {
    id: itemId,
    user: req.session.user,
    flashMessage: req.session.flashMessage,
    name: userToDelete.name,
    acronym: userToDelete.acronym
  })
}

/**
 * Manage the posted user delete form.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
adminController.deleteUser = async (req, res) => {
  const itemId = req.params.id

  await User.deleteByUserId(itemId)

  const allSnippets = await Snippet.listAll()
  const allUsers = await User.listAll()

  req.session.flashMessage = 'User Deleted!'

  res.render('adminDasboard', {
    user: req.session.user,
    users: allUsers,
    snippets: allSnippets,
    flashMessage: req.session.flashMessage
  })
}

/**
 * Show a form to delete all snippets saved.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
adminController.deleteAllSnippetsForm = async (req, res) => {
  res.render('deleteAllSnippetsForm', {
    user: req.session.user,
    flashMessage: req.session.flashMessage
  })
}

/**
 * Manage the posted delete all snippets form.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
adminController.deleteAllSnippets = async (req, res) => {
  await Snippet.deleteAllSnippets()

  const allSnippets = await Snippet.listAll()
  const allUsers = await User.listAll()

  req.session.flashMessage = 'Deleted All Snippets!'

  res.render('adminDasboard', {
    user: req.session.user,
    users: allUsers,
    snippets: allSnippets,
    flashMessage: req.session.flashMessage
  })
}

/**
 * Show a form to delete all users.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
adminController.deleteAllUsersForm = async (req, res) => {
  res.render('deleteAllUsersForm', {
    user: req.session.user,
    flashMessage: req.session.flashMessage
  })
}

/**
 * Manage the posted delete all users form.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
adminController.deleteAllUsers = async (req, res) => {
  await User.deleteAllUsers()

  const allSnippets = await Snippet.listAll()
  const allUsers = await User.listAll()

  req.session.flashMessage = 'Deleted All Users!'

  res.render('adminDasboard', {
    user: req.session.user,
    users: allUsers,
    snippets: allSnippets,
    flashMessage: req.session.flashMessage
  })
}
