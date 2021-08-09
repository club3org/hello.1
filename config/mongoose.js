var mongoose = require("mongoose");
var express = require('express');
//连接数据库服务器
mongoose.connect('mongodb://localhost:27017/wxminapp', {
        useCreateIndex: true,
        useNewUrlParser: true
    }, function(error) {
        if (error) {
            console.log("数据库连接失败")
        } else {
            console.log("数据库连接成功")
        }
    })
    //导出
module.exports = mongoose;