const bcrypt = require('bcrypt')
const promisify = require('util').promisify
const jwt = require('jsonwebtoken')

const AppError = require('../../error')
const config = require('../../config')
const User = require('../../db').User

module.exports = (req, res) => {
  let user = null
  if (!req.body.password || !req.body.username)
    return res.status(400).send()
  User.findOne({where: {name: req.body.username}})
  .then(u => {
    if (!u)
      return Promise.reject(new AppError(404, 'Account not found.'))
    user = u
    return promisify(bcrypt.compare)(req.body.password, user.password)
  })
  .then(bcryptResult => {
    if (!bcryptResult)
      return Promise.reject(new AppError(403, 'Wrong Password.'))
    res.status(200).send(jwt.sign({userId: user.id}, config.jwtKey, {expiresIn: '24h'}))
  })
  .catch(e => {
    res.status(e.httpStatus || 500).send(e.message)
  })
}