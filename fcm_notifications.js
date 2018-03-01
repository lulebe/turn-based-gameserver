const admin = require('firebase-admin')

const config = require('./config')
const GameStatus = require('./consts').GameStatus
const serviceAccount = require(config.FbKey)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.FbUrl
})

module.exports = {
  sendMessage (token, data) {
    const msg = {
      data: data,
      notification: {
        title: "Play " + config.GameName,
        body: data.status == String(GameStatus.RUNNING) ? "It's your turn!" : "A game has ended."
      },
      android: {
        priority: 'normal',
        ttl: 48 * 3600 * 1000,
        collapseKey: 'gamenotification'
      },
      token: token
    }
    console.log(msg)
    return admin.messaging().send(msg).catch(e => {})
  }
}