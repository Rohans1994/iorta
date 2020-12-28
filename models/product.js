let mongoose = require('mongoose');

// Product Schema
let productSchema = mongoose.Schema({
  productName:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  color:{
    type: String,
    required: true
  },
  size:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Products', productSchema);