const express= require('express')
const path = require('path')
const ejs= require('ejs')
const expressLayouts= require('express-ejs-layouts')
const app = express()



app.get('/',(req,res)=>{
    res.render('home')
})


app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')




const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})