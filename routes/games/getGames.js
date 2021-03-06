const Game = require('../../db').Game
const User = require('../../db').User

module.exports = (req, res) => {
  req.user.getPlayers({include: [{model: Game}]})
  .then(p => {
    return Promise.all(
      p
        .map(player => player.game)
        .map(game => 
          game.getPlayers({include: [{model: User}]})
          .then(players => {
            game.players = players
            return Promise.resolve(game)
          })
        )
    )
  })
  .then(games => {
    return Promise.resolve(games.map(game => {
      const ret = Object.assign({}, game.dataValues)
      ret.myTurn = (game.turn % game.playerCount) === game.players.filter(player => player.userId === req.user.id)[0].order
      ret.players = game.players.map(player => ({id: player.userId, name: player.user.name, order: player.order}))
      ret.data = JSON.parse(ret.data)
      return ret
    }))
  })
  .then(games => {
    res.status(200).send(games)
  })
  .catch(e => {
    res.status(e.httpStatus || 500).send(e.message)
  })
}