const express=require('express')
const app=express()
const cors=require('cors')
const env=require('dotenv').config()
const db=require('./config/db')
const userLogin=require('./router/userLoginRouter')
const PORT=process.env.PORT||9009
app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path)
    next()
})

app.use('/userLogin',userLogin)

app.listen(PORT,()=>{
    console.log("app is running in:"+PORT)
    db()
})

