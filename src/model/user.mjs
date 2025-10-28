import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
dotenv.config()

// Connect to the MongoDB database
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000
})

// Create schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  acronym: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
})

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Instance method to compare the password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

/**
 * Find a user by acronym.
 *
 * @param {string} candidateAcronym A name to search for.
 * @returns {Array} With user.
 */
userSchema.statics.findByAcronym = async function (candidateAcronym) {
  return await this.findOne({ acronym: candidateAcronym })
}

// Admin Functions

/**
 * Find a user by id.
 *
 * @param {string} userID An ID to search for.
 * @returns {Array} With user.
 */
userSchema.statics.findByID = async function (userID) {
  return await this.findOne({ _id: userID })
}
/**
 * Lists all users.
 *
 * @returns {Array} With users.
 */
userSchema.statics.listAll = async function () {
  return await this.find()
}

/**
 * Find and delete user by ID.
 *
 * @param {string} userId An id to search for.
 */
userSchema.statics.deleteByUserId = async function (userId) {
  await this.deleteOne({ _id: userId })
}

/**
 * Delete all users.
 */
userSchema.statics.deleteAllUsers = async function () {
  return await this.deleteMany({ role: 'user' })
}

const User = mongoose.model('User', userSchema)

export default User
