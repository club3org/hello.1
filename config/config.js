const adminPhone = [] // 管理员电话号码
const JWT_SECRET = 'hello word' //token 秘钥
const WX_CONFIG = {
        'appid': 'wx5c9c1c2d0e9e9335',
        'secret': 'ba13931a86e497d9a24090df0a4c4622'
    } //小程序相关参数
const OSS_CONFIG = { //OSS 相关参数
    region: 'oss-cn-beijing',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    endPoint: 'oss-cn-beijing.aliyuncs.com',
    BucketName: '',
}
const NO_TOKEN = ['../routes/appuser'] //无需进行token校验的接口列表

module.exports = {
    adminPhone,
    JWT_SECRET,
    WX_CONFIG,
    OSS_CONFIG,
    NO_TOKEN
}