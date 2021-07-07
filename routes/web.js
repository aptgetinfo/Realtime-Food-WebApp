const express = require('express')
const router = express.Router()
const {index}=require('../app/http/controllers/homeController')
const {index_cart,update_cart}=require('../app/http/controllers/cartController')
const {login,postLogin,register,postRegister,postLogout}=require('../app/http/controllers/authController')
const {ensureAuth,ensureGuest}=require('../app/http/middleware/guest')


router.get('/',index)

router.get('/cart',index_cart)
router.post('/update-cart',update_cart)


router.get('/login',ensureGuest,login)
router.post('/login',postLogin)

router.get('/register',ensureGuest,register)
router.post('/register',postRegister)

router.post('/logout',postLogout)



module.exports = router