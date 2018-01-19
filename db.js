const Sequelize = require('sequelize')

const config = require('./config')

const dialectOptions = process.env.DBSSLKEY ? {
  ssl: {
    key: config.DBSSLKey,
    cert: config.DBSSLCert,
    ca: config.DBSSLCA
  }
} : null

const db = new Sequelize(config.DBName, config.DBUser, config.DBPW, {
  host: config.DBHost,
  port: config.DBPort,
  dialect: 'mysql',
  pool: {
    max: 3,
    min: 0,
    idle: 10000
  },
  dialectOptions
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  searchName: Sequelize.STRING,
  password: {
    type: Sequelize.STRING(60),
    allowNull: false
  }
}, {
  timestamps: false
})

const Device = db.define('device', {
  token: {
    type: Sequelize.TEXT,
    unique: true
  },
  service: Sequelize.INTEGER
})

const Game = db.define('game', {
  data: Sequelize.BLOB,
  turn: Sequelize.INTEGER,
  playerCount: Sequelize.INTEGER,
  status: Sequelize.INTEGER
})

const Player = db.define('player', {
  order: Sequelize.INTEGER
}, {
  timestamps: false
})

User.hasMany(Player)
Player.belongsTo(User)

User.hasMany(Device)
Device.belongsTo(User)

Game.hasMany(Player)
Player.belongsTo(Game)

Game.hasOne(User, {as: 'winner'})
User.hasMany(Game, {as: 'winner'})

module.exports = {
  User, Game, Player
}
