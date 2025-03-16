const express=require('express')
const app=express()
const env=require('dotenv').config()
const PORT=process.env.PORT||9009


app.listen(PORT,()=>{
    console.log("app is running in:"+PORT)
})