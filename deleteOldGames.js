const Op = require('sequelize').Op

const Game = require('./db').Game
const config = require('./config')

module.exports = function () {
  const date = new Date()
  date.setHours(date.getHours() - config.maxGameAge)
  Game.findAll({where: {updatedAt: {[Op.lt]: date}}})
  .then(games => {
    games.forEach(game => {
      game.destroy()
    })
  })
  .catch(e => {
    console.error(e)
  })
}