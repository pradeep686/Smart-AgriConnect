const express=require('express')
const route=express.Router()
const{create,login,me,forgotPassword}=require('../controller/userLoginController')
const{protect}=require('../middleware/userLoginMiddleware')
route.post('/create',create)

route.post('/login',login)

route.get('/me',protect,me)

route.put('/edit-password',forgotPassword)

module.exports=route


