const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const productsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true,
    },
    price:{
        type: Number,
    },
    isStock:{
        type: boolean,
    },
    quantity:{
        type: Number,
        default: 0,
    },

},{timestamps: true});

module.exports  = mongoose.model('Product', productsSchema);
