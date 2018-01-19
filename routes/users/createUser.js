const bcrypt = require('bcrypt')
const promisify = require('util').promisify

const User = require('../../db').User
const AppError = require('../../error')

module.exports = (req, res) => {
  if (!req.body.username || req.body.username.length < 3 || !req.body.password)
    return res.status(400).send()
  User.findOne({where: {name: req.body.username}}).then(user => {
    if (user)
      return Promise.reject(new AppError(400, 'User exists already'))
    return promisify(bcrypt.hash)(req.body.password, 10)
  })
  .then(pwhash => {
    const searchName = req.body.username.toLowerCase().trim().replace(/\W/g, '')
    return User.create({password: pwhash, name: req.body.username, searchName})
  })
  .then(user => {
    res.status(201).send({id: user.id, name: req.body.username})
  })
  .catch(e => {
    res.status(e.httpStatus || 500).send(e.message)
  })
}