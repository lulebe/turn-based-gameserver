const Game = require('../../db').Game
const Player = require('../../db').Player
const User = require('../../db').User
const GameStatus = require('../../consts').GameStatus
const sendGameNotification = require('../../notifications').sendGameNotification
const AppError = require('../../error')

module.exports = (req, res) => {
  if (!req.body.data || req.body.data.length > 10000) 
    return res.status(400).send()
  let game = null
  Game.findById(req.params.gameId)
  .then(g => {
    if (!g)
      return Promise.reject(new AppError(404, 'game not found'))
    game = g
    return game.getPlayers()
  })
  .then(players => {
    if (!players.some(player => player.userId == req.user.id && player.order == (game.turn % game.playerCount)))
      return Promise.reject(new AppError(403, 'you are not allowed to submit a turn to this game.'))
    game.turn++
    game.oldData = game.data
    game.data = JSON.stringify(req.body.data)
    if (req.body.gameStatus)
      game.status = req.body.gameStatus
    return game.save()
  })
  .then(savedGame => {
    sendGameNotification(savedGame, req.user.id)
    res.status(200).send()
  })
  .catch(e => {
    res.status(e.httpStatus || 500).send(e.message)
  })
}