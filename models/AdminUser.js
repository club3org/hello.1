const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String,
        set(val) {
            // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
            return require('bcryptjs').hashSync(val, 10)
        }
    }
})
const adminUser = mongoose.model('AdminUser', schema)

module.exports = adminUser