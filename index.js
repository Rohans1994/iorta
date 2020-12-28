const express = require('express'),
    app = express(),
    multer = require('multer'),
    path = require('path'),
    mongoose = require('mongoose');

app.use(express.json());

const productRoute = require('./routes/product');
app.use('/product', productRoute);

const fileRoute = require('./routes/file');
app.use('/file',fileRoute);

mongoose.connect(
    'mongodb://localhost/project1')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/',(req,res)=>{
    res.send('This route is working fine');

})

app.listen(3000, () => {
    console.log(`Server started on 3000...`);
});