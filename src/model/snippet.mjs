import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

// Connect to the MongoDB database
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000
})

const SnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  userAcronym: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

/**
 * Lists all snippets.
 *
 * @returns {Array} With snippets.
 */
SnippetSchema.statics.listAll = async function () {
  return await this.find()
}

/**
 * Find a snippet by ID.
 *
 * @param {string} snippetId An id to search for.
 * @returns {Array} Results array.
 */
SnippetSchema.statics.findBySnippetId = async function (snippetId) {
  return await this.findById(snippetId)
}

/**
 * Delete a snippet by ID.
 *
 * @param {string} snippetId An id to search for.
 */
SnippetSchema.statics.deleteBySnippetId = async function (snippetId) {
  await this.deleteOne({ _id: snippetId })
}

// Admin Functions

/**
 * Delete all snippets.
 */
SnippetSchema.statics.deleteAllSnippets = async function () {
  return await this.deleteMany({})
}

const Snippet = mongoose.model('Snippet', SnippetSchema)

export default Snippet
