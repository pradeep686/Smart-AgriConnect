const mongoose=require('mongoose')


const schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'enter the name']
        },
        email:{
            type:String,
            required:[true,'enter the email']
        },
        password:{
            type:String,
            required:[true,'enter the password']
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('userLogin',schema)
