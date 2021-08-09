const mongoose = require('../config/mongoose')
const schema = new mongoose.Schema({
    color: Number,
    paperFormat: String,
    direction: String,
    singleSide: String,
    num: Number,
    remarks: String,
    detailInfo: String,
    cityName: String,
    deliver: String,
    phone: String,
    name: String,
    ordertime: String,
    openId: String,
    price: Number,
    papernum: Number,
    orderdetail: String,
    filename: String,
    filePath: String,
    stautes: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updataAt: {
            type: Date,
            default: Date.now()
        }
    }
})
schema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updataAt = Date.now()
    } else {
        this.meta.updataAt = Date.now()
    }
    next()
})
schema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort({ 'mea.updateAt': -1 })
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({ _id: id })
            .exec(cb)
    }
}
const Models = {
    addorder: mongoose.model('order', schema)
}
module.exports = Models