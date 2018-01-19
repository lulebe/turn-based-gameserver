const router = require('express').Router()

const createUser = require('./createUser')
const signIn = require('./signin')
const search = require('./search')

router.post('/', createUser)
router.post('/signin', signIn)
router.get('/search', search)

module.exports = router