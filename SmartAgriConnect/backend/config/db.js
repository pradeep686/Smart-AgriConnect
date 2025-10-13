const mongoose=require('mongoose')

const db=async()=>{
    try{
        const check=await mongoose.connect(process.env.MONGO_URL)
        if(check){
            console.log("DB connected")
        }
    }
    catch(e){
        console.log(e.message)
    }
}
module.exports=db