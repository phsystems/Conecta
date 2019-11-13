const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    user:{
        type: String,
        required: true,     
    },
    bio: String,
    avatar:{
        type: String,
        required: false,
    },
    teach:[{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    learn:[{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
      createdAt:{
        type: Date,
        default: Date.now,    
    },
},{
    //CreatedAt, updateAt
    timestamps:true   
});


module.exports = model('Dev', DevSchema);