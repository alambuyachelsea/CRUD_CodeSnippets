import User from '../model/user.mjs'
import bcrypt from 'bcryptjs'

export const userController = {}

/**
 * Home page where to start.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
userController.home = (req, res) => {
  res.render('home', res.data)
}

/**
 * Show the login form.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
userController.login = (req, res) => {
  res.render('login_form', res.data)
}

/**
 * Process the login.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
userController.loginProcess = async (req, res) => {
  const { acronym, password } = req.body

  try {
    const user = await User.findByAcronym(acronym)

    if (user) {
      const success = await bcrypt.compare(password, user.password)

      if (success) {
        req.session.user = { acronym: user.acronym, role: user.role }
        req.session.flashMessage = `Welcome '${acronym}'!`
        return res.redirect('/user')
      } else {
        req.session.user = null
        req.session.flashMessage = 'Wrong user or password!'
        res.redirect('/user/login')
      }
    } else {
      req.session.user = null
      req.session.flashMessage = 'User Account Not Found!'
      res.redirect('/user/login')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
}

/**
 * Check if user is loggedin.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @returns {boolean} If the user is logged in or not.
 */
userController.isLoggedin = async (req, res) => {
  if (res.data.user.acronym) {
    return true
  }
  return false
}

/**
 * Logout the user.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
userController.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.redirect('/')
    res.clearCookie('connect.sid')
    res.redirect('/login')
  })
}

/**
 * Present a form where users can create new account.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
userController.createForm = async (req, res) => {
  res.data.user.acronym = null
  res.render('register', res.data)
}

/**
 * Creates a new user.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
userController.createUser = async (req, res) => {
  const { name, acronym, password } = req.body

  try {
    // Step 1: Check if the user already exists
    const existingUser = await findExistingUser(acronym)

    if (existingUser) {
      req.session.flashMessage = 'User acronym already exists!'
      return res.redirect('/user/create')
    }

    // Step 2: Create and save a new user
    await createAndSaveUser(name, acronym, password)

    req.session.flashMessage = 'User created successfully!'
    res.redirect('/user/login')
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
}

/**
 * Finds an existing user by acronym.
 *
 * @param {string} acronym The acronym of the user.
 * @returns {object} The user object or null if not found.
 */
async function findExistingUser (acronym) {
  return await User.findOne({ acronym })
}

/**
 * Creates a new user and saves it to the database.
 *
 * @param {string} name The name of the user.
 * @param {string} acronym The acronym of the user.
 * @param {string} password The password of the user.
 * @returns {object} The saved user object.
 */
async function createAndSaveUser (name, acronym, password) {
  const newUser = new User({ name, acronym, password })
  return await newUser.save()
}
