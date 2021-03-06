const express= require('express')
const socketio=require('socket.io')
const path = require('path')
const flash = require('express-flash')
const mongoose=require('mongoose')
const ejs= require('ejs')
const web=require('./routes/web')
const expressLayouts= require('express-ejs-layouts')
require('./app/db/mongoose')
const session=require('express-session')
const MongoStore=require('connect-mongo')(session)
const passport= require('passport')
const Emitter = require('events')




const app = express()



const eventEmitter = new Emitter()
app.set('eventEmitter',eventEmitter)


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie:{maxAge:1000 * 60 * 60 * 24 }
}))


require('./app/config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())


app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Global Middlewares
app.use((req,res,next) => {
    res.locals.session =req.session
    res.locals.user=req.user
    next()
})

app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')

app.use(web)






const PORT = process.env.PORT || 3000
const server=app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})