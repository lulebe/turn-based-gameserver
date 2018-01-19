const admin = require('firebase-admin')

const fb = admin.initializeApp()

module.exports = {
  sendMessage (token, data) {
    return fb.messaging().sendToDevice(token, data).catch(e => {})
  }
}