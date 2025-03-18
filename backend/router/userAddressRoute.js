const express=require('express')
const route=express.Router()
const {addAddress,editAddress}=require('../controller/userAddressController')
route.post('/add',addAddress)
route.put('/edit',editAddress)



module.exports=route