const Game = require('../../db').Game
const User = require('../../db').User

module.exports = (req, res) => {
  let players
  req.user.getPlayers({include: [{model: Game}]})
  .then(p => {
    players = p
    return Promise.all(
      players.map(player => player.game)
      .map(game => game.getPlayers({include: [{model: User}]}))
    )
  })
  .then(games => {
    games.map(game => {
      const ret = Object.assign({}, game)
      ret.myTurn = game.turn % game.playerCount === players.filter(player => player.userId === req.user.id)[0].order
      ret.players = players.map(player => ({id: player.userId, name: player.user.name}))
      ret.data = JSON.parse(ret.data)
    })
    return Promise.resolve(games)
  })
  .then(games => {
    res.status(200).send(games)
  })
  .catch(e => {
    res.status(e.httpStatus || 500).send(e.message)
  })
}