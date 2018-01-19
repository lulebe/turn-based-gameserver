function AppError (status, msg) {
  this.message = msg
  this.httpStatus = status
}

AppError.prototype = Object.create(Error.prototype)
AppError.prototype.name = 'AppError'


module.exports = AppError
