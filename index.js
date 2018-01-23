const app = require('express')()
const bodyparser = require('body-parser')

const config = require('./config')

const userRouter = require('./routes/users')
const gameRouter = require('./routes/games')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

//routes
app.use('/user', userRouter)
app.use('/game', gameRouter)

app.get('/', (req, res) => {
  res.status(200).send('Turn based Gameserver is running.')
})

app.listen(config.Port, () => {console.log('server started on', config.Port)})