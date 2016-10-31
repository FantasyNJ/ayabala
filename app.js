'use strict'
// express 模块
var express = require('express');
//文件
var fs = require('fs');
//文件路径
var path = require('path');
// 模板引擎模块
var swig = require('swig');
// 数据库模块
var mongoose = require('mongoose');
// post数据处理模块
var bodyParser = require('body-parser');
// 创建一个app
var app = express();

//设置静态资源
app.use(express.static(path.join(__dirname + '/src')))
app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')))
//解析处理post提交过来的数据:urlencoded。返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',function(req, res){
    let content = fs.readFileSync('src/index.html').toString();
    res.send(content);
})
app.get('/login',function(req, res){
    let content = fs.readFileSync('src/login.html').toString();
    res.send(content);
})
app.get('/comments',function(req, res){
    let content = fs.readFileSync('src/comments.html').toString();
    res.send(content);
})

//api模块
app.use('/api', require('./api/api'))

// 数据库连接地址
var url = 'mongodb://localhost:27017/ayabala';

mongoose.connection.on('connected', function(){
    console.log('Connection success!');
});
mongoose.connection.on('error', function(err){
    console.log('Connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Connection disconnected');
});

// 当app启动的时候，连接数据库
mongoose.connect(url).then(function(d) {
    //当数据库连接成功以后，开始监听用户请求
    app.listen(9999, 'localhost');
    console.log('服务器已经开启成功');
}).catch(function(err){
    console.log('启动失败 '+err);
});
