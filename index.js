const app = require('express')()
const bodyparser = require('body-parser')

const config = require('./config')
const deleteOldGames = require('./deleteOldGames')

const userRouter = require('./routes/users')
const gameRouter = require('./routes/games')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

//routes
app.use('/user', userRouter)
app.use('/game', gameRouter)

app.get('/', (req, res) => {
  res.status(200).send(config.GameName + ' Gameserver is running.')
})

app.listen(config.Port, () => {console.log('server started on', config.Port)})

setInterval(deleteOldGames, 3600 * 1000)