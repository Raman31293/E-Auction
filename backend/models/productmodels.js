const mongoose =require('mongoose');

const productSchemna = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    image: {
        type : String,
        required : true
    },
    startingBid: {
        type : Number,
        required : true
    },
    auctionDuration: {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('Product', productSchemna);