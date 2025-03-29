const express=require('express')
const route=express.Router()
const {addPersonalInfo, editPersonalInfo, getPersonalInfo, deletePersonalInfo}=require('../controller/userAddressController')
const {protect}=require('../middleware/userLoginMiddleware')
route.post('/add',protect,addPersonalInfo)
route.put('/edit',protect,editPersonalInfo)
route.get('/get',protect,getPersonalInfo)
route.delete('/delete',protect,deletePersonalInfo)


module.exports=route

