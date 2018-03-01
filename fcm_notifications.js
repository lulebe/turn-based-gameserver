const admin = require('firebase-admin')

const serviceAccount = require('./firebase.json')
const config = require('./config')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.FbUrl
})

module.exports = {
  sendMessage (token, data) {
    return admin.messaging().sendToDevice(token, data).catch(e => {})
  }
}