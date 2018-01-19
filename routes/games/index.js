const router = require('express').Router()

const MWauth = require('../users/middleware').auth

const createGame = require('./createGame')

router.post('/', [MWauth], createGame)

module.exports = router