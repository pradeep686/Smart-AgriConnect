const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    scintificName:{
        type:String,
        required:true
    },
    soilType:{
        type:String,
        required:true
    },
    yieldPricePerAcer:{
        type:String,
        required:true
    },
    uses:{
        type:String,
        required:true
    },
    nutritionlValue:{
        type:String,
        required:true
    },
})

module.exports=mongoose.model('subSidiesData',schema)