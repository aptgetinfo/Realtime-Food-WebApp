const express = require('express')
const router = express.Router()
const {index}=require('../app/http/controllers/homeController')
const {index_cart,update_cart}=require('../app/http/controllers/cartController')

router.get('/',index)

router.get('/cart',index_cart)
router.post('/update-cart',update_cart)


router.get('/login',(req,res)=>{
    res.render('auth/login')
})
router.get('/register',(req,res)=>{
    res.render('auth/register')
})


module.exports = router