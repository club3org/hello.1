var express = require('express');
var router = express.Router();
const Models = require('../models/order');
const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        let extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + extname)
    }
})
var upload = multer({ storage: storage })
router.post('/add', upload.any(), (req, res) => {
    let orderdata = new Models.addorder({
        openId,
        color,
        paperFormat,
        direction,
        singleSide,
        num,
        remarks,
        deliver,
        phone,
        detailInfo,
        ordertime,
        cityName,
        name,
        fileName,
        filePath,
        stautes
    } = req.body)
    orderdata.save(orderdata, (err, data) => { if (err) { res.end(err) } else { res.end("succuessed") } })
})
module.exports = router;