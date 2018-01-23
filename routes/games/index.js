const router = require('express').Router()

const MWauth = require('../users/middleware').auth

const createGame = require('./createGame')
const getGames = require('./getGames')
const updateGame = require('./updateGame')

router.post('/', [MWauth], createGame)
router.get('/', [MWauth], getGames)
router.put('/:gameId', [MWauth], updateGame)

module.exports = router