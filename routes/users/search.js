const User = require('../../db').User
const Op = require('sequelize').Op

module.exports = (req, res) => {
  if (!req.query.q || req.query.q.length < 3)
    return res.status(400).send()
  User.findAll({where: {searchName: {[Op.like]: req.query.q.toLowerCase().trim().replace(/\W/g, '')+'%'}}})
  .then(users => {
    res.status(200).send(users.map(user => ({id: user.id, name: user.name})))
  })
  .catch(e => {
    res.status(e.httpStatus || 500).send(e.message)
  })
}