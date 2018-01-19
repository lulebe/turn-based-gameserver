const jwt = require('jsonwebtoken')

const User = require('../../db').User
const AppError = require('../../error')
const config = require('../../config')

module.exports = {
  auth (req, res, next) {
    console.log(req.headers)
    if (!req.headers.authorization)
      res.status(401).send()
    jwt.verify(req.headers.authorization, config.jwtKey, (err, tokenPayload) => {
      if (err)
        return res.status(401).send()
      User.findById(tokenPayload.userId)
      .then(user => {
        if (!user)
          return Promise.reject(new AppError(401, 'User not found'))
        req.user = user
        next()
      })
      .catch(e => {
        res.status(e.httpStatus || 500).send(e.message)
      })
    })
  }
}