const express = require('express')
const router = express.Router()
const {index}=require('../app/http/controllers/homeController')
const {index_cart,update_cart}=require('../app/http/controllers/cartController')
const {login,postLogin,register,postRegister,postLogout}=require('../app/http/controllers/authController')
const {adminIndex,status}=require('../app/http/controllers/adminController')

const {store,orderIndex,show}=require('../app/http/controllers/orderController')

const {ensureAuth,ensureGuest,admin}=require('../app/http/middleware/guest')


router.get('/',index)

router.get('/cart',index_cart)
router.post('/update-cart',update_cart)


router.get('/login',ensureGuest,login)
router.post('/login',postLogin)
router.post('/logout',postLogout)

router.get('/register',ensureGuest,register)
router.post('/register',postRegister)



router.post('/orders',ensureAuth,store)
router.get('/customer/orders',ensureAuth,orderIndex)
router.get('/customer/orders/:id',ensureAuth,show)


router.get('/admin/orders',admin,adminIndex)
router.post('/admin/order/status',admin,status)



module.exports = router