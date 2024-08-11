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
        require: true,
    },
    isStock:{
        type: Boolean,
        require: true,
    },
    quantity:{
        type: Number,
        default: 1,
    },

},{timestamps: true});

const poroduct =  mongoose.model('Product', productsSchema);
module.exports = poroduct;