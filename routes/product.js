const express = require('express'),
    router = express.Router();

const product = require('../models/product');


//To insert product details
router.post('/', async (req, res, next) => {
    var result;
        const data = new product({
            productName: req.body.productName,
            category: req.body.category,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price
        });
        result = await data.save();
    
    if (result) {
        res.json(result)
    }
    else {
        res.json('no data found')
    }
})

//Get maximum price product from each category
router.get('/search/maxprice', async (req, res) => {
    var data = await product.aggregate([
        {
            $group: {
                _id: '$category',
                maxPrice: { $max: "$price" }
            }
        }
    ])
    if(data){
        res.json(data);
    }else{
        res.json('No data found');
    }
})

//get Nth highest price product from all the available category based on the input
router.get('/search/position/:id', async (req, res) => {
    var id = req.params.id;
    var data = await product.find({}).sort("-price");
    if(id > data.length){
        res.json('Input is greater than total products');
    }
    else{
        res.json(data[id - 1]);
    }
})

//get products by color and size, it should allow color is red, blue and size is 10,20
router.get('/search', async (req, res) => {
    var data = await product.find({ color: { $in: ['red', 'blue'] }, size: { $in: ['10', '20'] } });
    if(data){
        res.json(data);
    }else{
        res.json('No data found');
    }
})

module.exports = router