const mongoose = require('mongoose');
const {
    Schema
} = mongoose

const commentsSchema=new Schema({
    body:{
        type:String,
        ref:'Post',
        required:true,
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    replies:[
        {
            body:{
                type:String,
            },user:{
                type:Schema.Types.ObjectId,
                ref:'User',
                required:true,
            },
            createdAt:{
                type:Date,
                default:new Date()
            }
        }
    ]
    
},{
    timestamps:true
})

const Comment=mongoose.model('Comment',commentsSchema);

module.exports=Comment