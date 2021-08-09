var express = require('express');
const AdminUser = require('../models/AdminUser');
var router = express.Router();
const { routes } = require('../app');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
// 访问/user根目录
router.get('/', (req, res) => res.send('user'))
    // 访问/user/getUserList
router.get('/getUserList', (req, res) => {
    fs.readFile('./routes/user.json', 'UTF8', (err, data) => {
        if (err) throw err
        res.send(data)
    })
})
router.post("/login", async(req, res) => {
    const user = await AdminUser.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: "用户不存在"
        })
    }
    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password,
        user.password
    )
    if (!isPasswordValid) {
        return res.status(422).send({
            message: "密码无效"
        })
    }
    // 生成token
    res.render('oks')
})



/**router.post('/createuser', async(req, res) => {
    const user = await AdminUser.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send(user)
})**/
module.exports = router;