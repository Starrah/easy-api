"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const stylus = require("stylus");
const vio = require("vio");
const ExpressWS = require("express-ws");
var DEFAULT_PORT = 8080;
var port = Number.parseInt(process.argv[2]);
if (isNaN(port))
    port = DEFAULT_PORT;
var app = express();
//向express.Router()原型注入ws方法
ExpressWS(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
//静态文件放在public中即可自动发现；不用加前缀。
app.use(express.static(path.join(__dirname, 'public')));
//模版渲染功能。.hbs放在views文件夹下，对应脚本放在views/scripts文件夹下；访问URL为/views
//vio.Router类的构造函数已经带了app.use，因此不用再use。
new vio.Router(app, {
    routesRoot: path.join(__dirname, "views/scripts"),
    viewsRoot: path.join(__dirname, "views"),
    prefix: "/views",
    viewsExtension: ".hbs",
    /**
     * 根据vio的源码，如果production是true的话那么动态加载功能会被禁用；
     * 在没有传入此字段的情况下，会自动获取process.env中的值决定是否是production模式。
     * 为了保证动态功能可用，这里我直接指定production为false这样就不会受到环境变量的干扰了。
     */
    production: false
});
//用户管理功能示例。在with-user文件夹下；访问URL为/with-user
//vio.Router类的构造函数已经带了app.use，因此不用再use。
let userRouter = new vio.Router(app, {
    routesRoot: path.join(__dirname, "with-user"),
    prefix: "with-user",
    /**
     * 根据vio的源码，如果production是true的话那么动态加载功能会被禁用；
     * 在没有传入此字段的情况下，会自动获取process.env中的值决定是否是production模式。
     * 为了保证动态功能可用，这里我直接指定production为false这样就不会受到环境变量的干扰了。
     */
    production: false
});
const userDef_1 = require("./with-user/userDef");
//需要在此处为Router声明userProvider
userRouter.userProvider = new userDef_1.MyUserProvider();
//还可以结合原生的express.Router使用
const router_1 = require("./native/router");
app.use('/native', router_1.default);
//基础的API功能，存放文件夹为api，URL无前缀（相当于到'/'的路由）
// vio.Router类的构造函数已经带了app.use，因此不用再use。
new vio.Router(app, {
    routesRoot: "./api",
    prefix: "/",
    /**
     * 根据vio的源码，如果production是true的话那么动态加载功能会被禁用；
     * 在没有传入此字段的情况下，会自动获取process.env中的值决定是否是production模式。
     * 为了保证动态功能可用，这里我直接指定production为false这样就不会受到环境变量的干扰了。
     */
    production: false
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(port)
    .on('error', function (err) { console.error(err); })
    .on('listening', function () { console.log("listening on " + JSON.stringify(this.address())); });
module.exports = app;
//# sourceMappingURL=app.js.map