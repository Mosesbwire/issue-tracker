const express = require ('express')
const { firstTimeLogin, login, isAuthenticated } = require('../controllers/AuthenticationController')
const { authenticate } = require('../middleware/authenticate')

const AuthenticateRouter = express.Router()

// this router will be further developed when front end is added
AuthenticateRouter.post('/:token/:id', firstTimeLogin)  

AuthenticateRouter.post('/', login)

AuthenticateRouter.get('/', authenticate, isAuthenticated)

module.exports = AuthenticateRouter