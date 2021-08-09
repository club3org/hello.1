const jwt = require('jsonwebtoken')
const JWT_SECRET = 'hello word'

/**
 * @name: 创建token
 * @param {object} params: 登录后用户信息
 * @Author: luoyong/471826078@qq.com
 */
const createToken = (params) => {
    const token = jwt.sign(JWT_SECRET, params)
    return token
}

/**
 * @name: 校验token
 * @param {string} token
 * @Author: luoyong/471826078@qq.com
 */
const verToken = function(token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token, JWT_SECRET);
        resolve(info);
    })
}
const add0 = (num) => {
        return num < 10 ? '0' + num : num
    }
    /**
     * @name: 获取时间戳
     * @param {type} 
     * @Author: luoyong/471826078@qq.com
     */
const getNowDateTimes = () => {
        const nowDate = new Date();
        return parseInt(nowDate.getTime() / 1000)
    }
    /**
     * @name: 获取当前时间 yyyy-mm-dd HH:MM:SS
     * @param {type} 
     * @Author: luoyong/471826078@qq.com
     */
const formatDate = () => {
    const time = new Date();
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const day = time.getDate()
    const h = time.getHours()
    const minute = time.getMinutes()
    const second = time.getSeconds()
    return year + '-' + add0(month) + '-' + add0(day) + ' ' + add0(h) + ':' + add0(minute) + ':' + add0(second)
}

module.exports = {
    createToken,
    verToken,
    getNowDateTimes,
    formatDate
}