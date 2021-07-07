const User =require('../../models/user')
const bcrypt = require('bcrypt')
const passport=require('passport')

const _getRedirectUrl=(req)=>{
    return req.user.role==='admin'?'/admin/orders':'/customer/orders'
}
module.exports={
    
    login:async (req,res)=>{
        res.render('auth/login')
    },
    postLogin:async (req,res,next)=>{
        const {name,email,password} = req.body
        if(!email || !password){
            req.flash('error','All fields are required')
            return res.redirect('/login');
        }
        passport.authenticate('local',(err,user,info)=>{
            if(err){
                req.flash('error',info.message)
                return next(err)
            }
            if(!user){ 
                req.flash('error',info.message)
                return res.redirect('/login')
            }
            req.logIn(user,(err)=>{
                if(err){
                    req.flash('error',info.message)
                return next(err)
                }
                res.redirect(_getRedirectUrl(req))
            })
        })(req,res,next)
    },
    register:async (req,res)=>{
        res.render('auth/register')
    },
    postRegister:async (req,res)=>{
        const {name,email,password} = req.body
        if(!name || !email || !password){
            req.flash('error','All fields are required')
            req.flash('name',name)
            req.flash('email',email)
            return res.redirect('/register');
        }
        User.exists({email:email},(err,user)=>{
            if(user){
            req.flash('error','Email Already Taken')
            req.flash('name',name)
            req.flash('email',email)
            return res.redirect('/register');
            }
        })

        const hashedPassword =await bcrypt.hash(password,10)
        const user=new User({
            name,
            email,
            password: hashedPassword
        })
        try{
            await user.save()
            res.redirect('/')
        }catch(err){
            req.flash('error','Something went Wrong')
            res.render('/register')
        }
        
    },
    postLogout:async (req,res)=>{
        req.logout()
        res.redirect('/login')
    }
}
