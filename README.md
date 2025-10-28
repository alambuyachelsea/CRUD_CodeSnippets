# B2 CRUD

## Code Snippet Manager API

An Express.js and Mongoose-based API for managing code snippets, users, and admin functions. Includes full CRUD operations, user authentication, and role-based access control. Built with a modular MVC structure and ES Modules.

The video presentation can be found [here](https://youtu.be/sRXjBEkseeA)

## Features

- User registration and login using session-based authentication
- Admin-only routes with elevated privileges
- Full CRUD operations for managing code snippets
- Flash messages for user feedback
- Express-session for session handling
- ES Modules (import/export syntax)
- MVC project structure
- MongoDB with Mongoose, supports both Docker and mLab

## Starting the application

Run `npm run start`

This will build the docker container housing the database and will start the application on port 3000. A default admin user will created if one does not exist with the credentials:

- acronym: 'admin'
- password: 'admin123'

At this point you can create an account and login using the credentials, create, edit and delete code snippets created by you. You can logout and view the snippets in 'guest' mode where you will only be able to view the snippets.

If you login as the Admin, you can view the admin dashboard where you can remove 1 or multiple users and code snippets.

## Application routes

### User Routes (/user)

GET,POST /create – Presents a user registration form, requires name, unique acronym, and password.

GET,POST /login – Presents a login form and creates a session.

GET,POST /logout – Destroys the session and logs the user out.

### Snippet Routes (/crud)

GET / – Returns all snippetsin the database.

This route is public, a guest that is not logged in may only view the snippets saved in the database.

GET,POST /create – Presents a for the user to create a code snippet. Requires a title and code body before saving to the database.

GET,POST /update/:id – Presents a form to the user to edit and save info on the selected snippet.

GET,POST /delete/:id – Presents a form to confirm if the user wants to delete the snippet and removes it from the database.

These snippet routes require the user to be logged in.

### Admin Routes (/admin)

GET /admin – Presents the admin dashboard with all users and snippets.

GET,POST /deleteUser/:id – Deletes a user by ID.

GET,POST /deleteSnippet/:id – Deletes a snippet by ID.

GET,POST /deleteAllUsers – Presents a form to confirm deleting all users in the database.

GET,POST /deleteSnippet/:id – Presents a form to confirm deleting all snippets in the database.

Admin routes require the user to be logged in and have the admin role.

## Application Models

### User Model (user.mjs)

Fields:

- acronym: String
- username: String
- password: String (hashed)
- role: String, either "user" or "admin"

Before save, the password is hashed using bcrypt.

### Snippet Model (snippet.mjs)

Fields:

- title: String
- code: String
- userAcronym: Reference to a user
- createdAt: Date created

Snippets are associated with the user who created them.
Middleware and Session Handling

Uses express-session for session management.

Role-based access middleware checks if a user is authenticated and if they are an admin (for restricted routes).
Flash messages are used to provide feedback 