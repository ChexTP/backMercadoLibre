import mongoose from 'mongoose'

const userSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    document:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    birthday:{
        type:Date,
        required:true
    },

    gender:{
        type:String,
        enum:["Hombre","Mujer","Helicoptero de combate"],
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',

    }],

    image:{
        type:String,
    }

})

export default mongoose.model('User',userSchema)