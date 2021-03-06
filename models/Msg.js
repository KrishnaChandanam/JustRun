const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const MsgSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports= mongoose.model('Msg', MsgSchema);
