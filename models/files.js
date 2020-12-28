let mongoose = require('mongoose');

// File Schema
let fileSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  fileType:{
    type: String,
    required: true
  }
});

let Files = module.exports = mongoose.model('Files', fileSchema);