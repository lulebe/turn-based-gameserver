const router = require('express').Router()

const MWauth = require('../users/middleware').auth

const createUser = require('./createUser')
const signIn = require('./signin')
const search = require('./search')
const registerFCMToken = require('./registerFCMToken')

router.post('/', createUser)
router.post('/signin', signIn)
router.get('/search', search)
router.post('/device/fcm', [MWauth], registerFCMToken)

module.exports = router