let parseBody = require('parse-body');
let mysql      = require('mysql');
let querystring = require('querystring');
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');
let moment = require('moment');




let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'newTest',
  dateStrings:true,
});

connection.connect();



// 路由接口
let router = {
	indexGet:function(req,res,next){
		res.render('index')
	},
	indexPost:function(req,res,next){  //设置缓存
		
		let loginName = req.session.login; //登录成功设置缓存session
		if(loginName){
			console.log('登录了');
			res.send(loginName);
			return;
		}
		res.send('0')
		
	},
	registPost:function(req,res,next){ //注册
		console.log(req.query)
		let obj = req.query;
		let searchUsername = `select username from user where username = '${obj.username}'`;
		connection.query(searchUsername,function(error, results, fields){
			 if (error) throw error;
			 if(results.length){
			 	res.send('2'); //2 用户名已存在
			 	return;
			 }
			 let userAddSql = `insert into user(username,password) values('${obj.username}','${obj.pw}')`;
			 connection.query(userAddSql, function (error, results, fields) {
				    if (error) throw error;
					res.send('1') //1 成功
			 });
		})
		
	},
	loginPost:function(req,res,next){ //登录校验
		let obj = req.query;
		req.session.login = obj;
		console.log(req.session)
		let serchSql = `select * from user where username = '${obj.username}' and password = '${obj.pw}'`;
		connection.query(serchSql, function (error, results, fields) {
		      if (error) throw error;
		      if(!results.length){
		      	res.send('没有查到结果');
		      	return;
		      }
		      let obj = results[0]
		      obj.data = 1
			  res.send(obj)
		});
	},
	memberPost:function(req,res,next){ //显示个人信息
		let obj = req.session.login;
		let userAddSql = `select * from user where username = '${obj.username}' and password = '${obj.pw}'`;
		connection.query(userAddSql, function (error, results, fields) {
			    if (error) throw error;
				res.send(results)
		});
	},
	doAvater:function(req,res,next){ //上传头像
		let obj = req.session.login;
		var form = new formidable.IncomingForm();
		form.uploadDir = path.normalize(__dirname+'/../public/portrait');
		form.parse(req, function(err, fields, files) {
		  var oldPath = files.upload.path;
		  var newPath = path.normalize(__dirname+'/../public/portrait/')+files.upload.name;
		  // 数据库修改
		  let sqlUpdat = `UPDATE user SET avatar = '${files.upload.name}' where username = '${obj.username}'`;
		  connection.query(sqlUpdat, function (error, results, fields) {
			    if (error) throw error;
				//res.send('数据库更新成功！')
		  });
		  // 文件修改名字
		  fs.rename(oldPath, newPath, function(err){
		  	if(err){
		  		console.log('失败！')
		  		return;
		  	}
		  	console.log('成功！')
		  	// 跳转到首页
		  	res.redirect('/')
		  });
	    });
	},
	doNote:function(req,res,next){ //提交留言
		let reqParmes = req.query;
		let obj = req.session.login;
		let serchSql = `select id from user where username = '${obj.username}' and password = '${obj.pw}'`;
		connection.query(serchSql, function (error, results, fields) {
		    if (error) throw error;
			console.log(results)
			let userId = results[0].id;
			// let date = new Date();
			// let year =  date.getFullYear();
			// let month = date.getMonth()+1;
			// let day = date.getDate();
			// let dateStr = `${year}-${month}-${day}`;
			let dateStr = moment().format('YYYY-MM-DD');
			console.log(dateStr);
			let insertSql = `insert into notes(title,time,userid,content)
			values('${reqParmes.title}','${dateStr}','${userId}','${reqParmes.content}')`;
			connection.query(insertSql,function(error, results, fields){
			    if (error) throw error;
			 	res.send('留言成功')
			})
		});
	},
	showNote:function(req,res,next){ //留言展示
		let showSql = `SELECT * From notes n,user u where n.userid = u.id `;
		connection.query(showSql, function (error, results, fields) {
			 if (error) throw error;
			 res.send(results)
		})
	}
}



module.exports = router;