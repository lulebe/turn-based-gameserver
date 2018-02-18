const Game = require('../../db').Game
const Player = require('../../db').Player
const User = require('../../db').User
const GameStatus = require('../../consts').GameStatus
const sendGameNotification = ('../../notifications').sendGameNotification

module.exports = (req, res) => {
  if (!req.body.players || typeof req.body.data != 'string') 
    return res.status(400).send()
  let game = null
  Game.create({
    data: req.body.data,
    oldData: req.body.oldData || null,
    turn: 1,
    playerCount: req.body.players.length,
    status: GameStatus.RUNNING
  })
  .then(g => {
    game = g
    const cleanedPlayers = []
    for (let i = 0; i < req.body.players.length; i++) {
      const playerId = req.body.players[i];
      if (typeof playerId == 'number' && !cleanedPlayers.includes(playerId))
        cleanedPlayers.push(playerId)
    }
    let playerIndex = -1
    return Promise.all(cleanedPlayers.map(playerId => {
      let user = null
      let player = null
      return User.findById(playerId)
      .then(u => {
        user = u
        playerIndex++
        return Player.create({order: playerIndex})
      })
      .then(p => {
        player = p
        return player.setUser(user)
      })
      .then(() =>
        player.setGame(game)
      )
    }))
  })
  .then(() => {
    sendGameNotification(game)
    res.status(201).send(game)
  })
  .catch(e => {
    if (game)
      game.destroy()
    res.status(e.httpStatus || 500).send(e.message)
  })
}