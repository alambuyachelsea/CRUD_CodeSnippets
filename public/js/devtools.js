/**
 * To check that the tools are working.
 */
import SomeClass from './modules/SomeClass.js'
import SomeModule from './modules/SomeModule.js'

/**
 * Return a hello message.
 *
 * @returns {string} With hello message.
 */
function helloWorld () {
  return 'Hello World'
}

// use the function
console.log(helloWorld())

// Use the class
const some = new SomeClass()
console.log(some)

// Use the module
console.log(SomeModule.message())
