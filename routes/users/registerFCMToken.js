const Device = require('../../db').Device
const FCM = require('../../consts').NotificationService.FCM

module.exports = (req, res) => {
  const newToken = req.body.newToken || false
  const oldToken = req.body.oldToken || false
  res.status(200).send()
  if (newToken)
    Device.create({
      token: newToken,
      service: FCM
    })
    .then(device => {
      return device.setUser(req.user)
    })
    .catch(e => {
      console.error(e)
    })
  if (oldToken)
  Device.findOne({where: {token: oldToken, service: FCM}})
  .then(device => device.destroy())
  .catch(e => {
    console.error(e)
  })
}