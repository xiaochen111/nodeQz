let express = require('express');
let path = require('path');
let ejs = require('ejs');
let app = express();
let cookieParser = require('cookie-parser');
let session = require('express-session');


// 实用session
app.use(cookieParser('sessiontest'));
app.use(session({
 secret: 'sessiontest',//与cookieParser中的一致
 resave: true,
 saveUninitialized:true
}));




let router = require('./models/router.js');

// 设置ejs
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
 
app.use(express.static('public')); //设置静态资源

app.get('/',router.indexGet);
app.post('/indexPost',router.indexPost); //设置缓存
app.post('/registPost',router.registPost); //注册
app.post('/loginPost',router.loginPost); //登录校验
app.post('/memberPost',router.memberPost); //显示个人信息
app.post('/doAvater',router.doAvater); //修改头像
app.post('/doNote',router.doNote);//提交留言
app.post('/showNote',router.showNote);//展示留言




//测试session
// app.post('/setssion',function(req,res){
// 	req.session.login = '1';
// 	res.send('设置了session login为1')
// })
// app.post('/getssion',function(req,res){
// 	let getRes = req.session.login;
// 	res.send('获得了session login为'+getRes)
// })

app.listen(3000,()=>{
	console.log('在3000端口运行');
})
