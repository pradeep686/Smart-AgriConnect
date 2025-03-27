const express=require('express')
const route=express.Router()
const {addAddress,editAddress,getAddress,deleteAddress}=require('../controller/userAddressController')
const {protect}=require('../middleware/userLoginMiddleware')
route.post('/add',protect,addAddress)
route.put('/edit/:addressId',protect,editAddress)
route.get('/get',protect,getAddress)
route.delete('/delete/:id',protect,deleteAddress)


module.exports=route

