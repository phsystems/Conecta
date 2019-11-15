const { Schema, model } = require('mongoose');

const InterestSchema = new Schema({
    interest:{
        type: String,
        required: true,     
    },
    description:{
        type: String,
        require: true,
    },
    available:{
        type: String,
        require: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dev',
        require: true,
    },
        createdAt:{
        type: Date,
        default: Date.now,    
    },
},{
    //CreatedAt, updateAt
    timestamps:true   
});


module.exports = model('Interest', InterestSchema);