const GameStatus = require('./consts').GameStatus
const NotificationService = require('./consts').NotificationService
const sendNotificationToAndroid = require('./fcm_notifications.js').sendMessage

function sendNotification(user, data) {
  return user.getDevices()
  .then(devices =>
    Promise.all(devices.map(device => sendNotificationToDevice(device, data)))
  )
  .catch(e => {
    console.error(e)
  })
}

const sendGameNotification = function (game, sendingUserId) {
  if (game.status === GameStatus.RUNNING)
    game.getPlayers()
    .then(players =>
      players.filter(player => player.order === game.turn % game.playerCount)[0].getUser()
    )
    .then(user => {
      sendNotification(user, {
        gameId: String(game.id),
        status: String(GameStatus.RUNNING)
      })
    })
    .catch(e => {
      console.error(e)
    })
  else
    game.getPlayers()
    .then(players =>
      Promise.all(
        players
          .filter(player => player.userId !== sendingUserId)
          .map(player => player.getUser().then(user => 
            sendNotification(user, {gameId: String(game.id), status: String(game.status)})
          ))
      )
    )
    .catch(e => {
      console.error(e)
    })
}

function sendNotificationToDevice(device, data) {
  if (device.service === NotificationService.FCM)
    return sendNotificationToAndroid(device.dataValues.token, data)
  return Promise.resolve()
}

module.exports = {sendGameNotification}