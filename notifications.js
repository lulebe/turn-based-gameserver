const GameStatus = require('./consts').GameStatus
const NotificationService = require('./consts').NotificationService
const sendNotificationToAndroid = require('./fcm_notifications.js').sendMessage

function sendNotification(user, data) {
  return user.getDevices()
  .then(devices =>
    Promise.all(devices.map(device => sendNotificationToDevice(device, data)))
  )
  .catch(e => {})
}

function sendGameNotification (game) {
  if (game.status === GameStatus.RUNNING)
    game.getPlayers()
    .then(players =>
      players.filter(player => player.order === game.turn % game.playerCount)[0].getUser()
    )
    .then(user => {
      sendNotification(user, {
        gameId: game.id,
        status: GameStatus.RUNNING
      })
    })
    .catch(e => {})
}

function sendNotificationToDevice(device, data) {
  if (device.service === NotificationService.ANDROID)
    return sendNotificationToAndroid(device, data)
  return Promise.resolve()
}

module.exports = {sendGameNotification}