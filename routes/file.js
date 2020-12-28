const express = require('express'),
    router = express.Router();
    multer = require('multer'),
    path = require('path');

const file = require('../models/files.js');

const storage = multer.diskStorage({
    destination: '../server',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }
}).array('file');

//Upload multiple file at the same time using multer
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.json('Error Occured');
        }
        else {
            var fileData = req.files;
            var newFile = {}
            fileData.forEach(val => {
                newFile = {};
                newFile.name = val.originalname,
                newFile.fileType = val.mimetype;
                file.insertMany(newFile);
            });
            res.json('File uploaded successfully');
        }
    })
});

//get details of files uploaded
router.get('/', async (req, res) => {
    var data = await file.find({});
    if(data){
        res.json(data);
    }else{
        res.json('No data found');
    }
})

module.exports = router