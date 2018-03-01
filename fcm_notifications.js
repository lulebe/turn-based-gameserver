const admin = require('firebase-admin')

const serviceAccount = require('./firebase.json')
const config = require('./config')
const GameStatus = require('./consts').GameStatus

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.FbUrl
})

module.exports = {
  sendMessage (token, data) {
    const msg = {
      data: data,
      android: {
        priority: 'normal',
        ttl: 48 * 3600 * 1000,
        collapseKey: 'gamenotification',
        notification: {
          title: "Play " + config.GameName,
          body: data.status == GameStatus.RUNNING ? "It's your turn!" : "A game has ended.",
          clickAction: 'PLAY_NOTIFICATION'
        }
      },
      token: token
    }
    return admin.messaging().send(msg).catch(e => {})
  }
}