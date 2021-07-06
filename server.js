const express= require('express')
const path = require('path')
const flash = require('express-flash')
const mongoose=require('mongoose')
const ejs= require('ejs')
const web=require('./routes/web')
const expressLayouts= require('express-ejs-layouts')
require('./app/db/mongoose')
const session=require('express-session')
const MongoStore=require('connect-mongo')(session)



const app = express()


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie:{maxAge:1000 * 60 * 60 * 24 }
}))

app.use(flash())




app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use((req,res,next) => {
    res.locals.session =req.session
    next()
})

app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')

app.use(web)






const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})