var express = require('express');
var router = express.Router();
const Models = require('../models/order');
const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public2/download');
    },
    filename: function(req, file, cb) {
        let extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + extname)
    }
})
var upload = multer({ storage: storage })
router.post('/add', upload.any(), function(req, res) {
    let files = req.files
    let filename1;
    for (var i in files) {
        let file = files[i];
        filename1 = file.filename
    }
    let orderdata = new Models.addorder({
        openId: req.body.openId,
        color: req.body.color,
        paperFormat: req.body.paperFormat,
        direction: req.body.direction,
        singleSide: req.body.singleSide,
        num: req.body.num,
        remarks: req.body.remarks,
        deliver: req.body.deliver,
        phone: req.body.phone,
        detailInfo: req.body.detailInfo,
        ordertime: req.body.ordertime,
        cityName: req.body.cityName,
        name: req.body.name,
        filePath: req.body.filePath,
        stautes: req.body.stautes,
        filename: filename1
    }, function(err, doc) {
        if (!err) {
            console.log(添加成功);
        }
    })
    orderdata.save(orderdata, (err, data) => { if (err) { res.end(err) } else { res.end("succuessed") } })
})
module.exports = router;