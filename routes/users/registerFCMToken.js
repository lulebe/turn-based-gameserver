const Device = require('../../db').Device
const FCM = require('../../consts').NotificationService.FCM

module.exports = (req, res) => {
  if (!req.body.newToken)
    return res.status(400).send()
  const newToken = req.body.newToken
  const oldToken = req.body.oldToken || false
  Device.create({
    token: newToken,
    service: FCM
  })
  .then(device => {
    return device.setUser(req.user)
  })
  .then(() => {
    if (oldToken)
      return Device.findOne({where: {token: oldToken, service: FCM}})
          .then(device => device.destroy())
    return Promise.resolve()
  })
  .then(() => {
    res.status(200).send()
  })
}