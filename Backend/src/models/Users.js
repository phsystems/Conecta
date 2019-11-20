const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    user:{
        type: String,
        required: true,     
    },
    name:{
        type:String,
    },
    bio: String,
    avatar:{
        type: String,
        required: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,    
    },
},{
    //CreatedAt, updateAt
    timestamps:true   
});


module.exports = model('Dev', DevSchema);