const express=require('express')
const addressSchema=require('../models/userAddressModel')

const addAddress=async(req,res)=>{
    try{
        const{doorNo,street,city,pincode,district,state}=req.body
        if(!doorNo||!street||!city||!pincode||!district||!state){
            return res.status(400).json({msg:"please enter all fields"})
        }
        const newAddress=await addressSchema.create({
            userID:req.user.id,
            doorNo,
            street,
            city,
            pincode,
            district,
            state
        })
        await newAddress.save()
    }catch(e){
        res.status(500).json({msg:e.message})
    }
}

const editAddress=async(req,res)=>{
    try{

    }
    catch(e){
        res.status(500).json({msg:e.message})
    }
}

module.exports={addAddress,editAddress}