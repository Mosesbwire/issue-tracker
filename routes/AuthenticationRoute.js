const express = require ('express')
const { loginViaLink, login, resetPassword,isAuthenticated } = require('../controllers/AuthenticationController')
const { authenticate } = require('../middleware/authenticate')

const AuthenticateRouter = express.Router()

// this router will be further developed when front end is added
AuthenticateRouter.post('/:token/:id', loginViaLink)  
AuthenticateRouter.post('/reset', resetPassword)  

AuthenticateRouter.post('/', login)

AuthenticateRouter.get('/', authenticate, isAuthenticated)

module.exports = AuthenticateRouter