var express = require('express');
var router = express.Router();
const querystring = require('querystring');
const request = require('request');
const Models = require('../models/order');
const { createToken } = require('../config/index')
router.post('/getopenid', (req, res, next) => {
    const data = {
        'appid': 'wx9e5df6f8ad6e8d6f',
        'secret': 'c3e5e40105ed6b7571cba3907485bab9',
        'js_code': req.body.code,
        'grant_type': 'authorization_code'
    }
    var content = querystring.stringify(data);
    var url = 'https://api.weixin.qq.com/sns/jscode2session?' + content;
    request.get({
        'url': url
    }, (error, response, body) => {
        let abody = JSON.parse(body);
        const { openid, session_key } = abody
        console.log(openid)
        if (openid) {
            Models.addorder.findOne({ openId: openid }).exec((err, doc) => {
                if (err) {
                    res.send({ isSuccess: false, message: '拒绝访问' });
                } else {
                    let token = createToken(String({ openId: 'openId', session_key }))
                    if (!doc) {
                        new Models.addorder({ openId: openid, session_key, isAdmin: 0, token }).save((err1, doc) => {
                            if (err1) {
                                console.log("1245")
                                res.send({ isSuccess: false, message: '123' });
                            } else {
                                res.send({ isSuccess: true, message: '12345', token: token, openId: openid });
                            }
                        })
                    } else {
                        Models.addorder.findByIdAndUpdate({ _id: doc._id }, { token, session_key }, { new: true }).exec((err2, doc2) => {
                            if (err2) {
                                res.send({ isSuccess: false, message: '321' });
                            } else {
                                res.send({ isSuccess: true, message: '123', token: token, openId: openid });
                            }
                        })
                    }
                }
            })
        } else {
            res.send({ isSuccess: false, message: '123' });
        }
    })
})
module.exports = router