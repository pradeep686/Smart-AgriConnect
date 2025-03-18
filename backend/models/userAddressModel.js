const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userlogin",
        required:"true"
    },
    doorNo:{
        type:String,
    },
    street:{
        type:String,
    },
    city:{
        type:String,
    },
    pincode:{
        type:String
    },
    district:{
        type:String
    },
    state:{
        type:String
    }
})

module.exports=mongoose.model('adress',schema);