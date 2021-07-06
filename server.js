const express= require('express')
const path = require('path')
const ejs= require('ejs')
const expressLayouts= require('express-ejs-layouts')
const app = express()


app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')



app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart')
})

app.get('/login',(req,res)=>{
    res.render('auth/login')
})
app.get('/register',(req,res)=>{
    res.render('auth/register')
})






const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})