"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vio_1 = require("vio");
/**
 * 道理上，用户列表应该存在数据库之类的地方，但我们为了简便起见就搞一个静态的数组存着，并且明文存储密码。
 */
exports.AllUsers = [
    {
        name: "张三",
        password: "qwq",
        permission: "admin"
    }
];
/**
 * 定义一个用户产生器类，实现UserProvider接口并至少定义get方法、可选定义authenticate方法。这些方法都可以是异步的。
 * get方法用于在一般的请求函数中获取用户信息，
 * 而authenticate方法用于在装饰器中指定了authentication: true的请求函数中获取用户信息，这时往往还要加上一个设置session之类的操作以便之后的get方法的使用。
 *
 * 实践中一般只有loginAPI才会是authentication: true，从请求中附带的用户名密码找到用户。通常login接口的处理函数中会有setCookie，设置一个session共之后get方法的鉴权使用。
 * 实现了上述方法之后，一般的API则会在进入处理函数前自动调用MyUserProvider的get方法，并把得到的MyUser结果加进req.user字段，从而在处理函数里面就可以直接取用了。
 */
class MyUserProvider {
    async authenticate(req) {
        let user = exports.AllUsers.find((u) => u.name === req.body["name"]);
        if (user.password === req.body["password"])
            return user;
        else
            return undefined;
    }
    async get(req) {
        if (!req.cookies.session)
            return undefined;
        return exports.AllUsers.find((u) => u.session === req.cookies.session);
    }
}
exports.MyUserProvider = MyUserProvider;
/**
 * 可选的，如果需要使用自动鉴权功能，就定义一个继承了PermissionDescriptor<MyPermission>的类
 * 并实现抽象方法validate，接受的参数是MyPermission。
 *
 * 之后若某个请求函数有permission字段，类型为MyPermissionDescriptor的话，则会自动用get获得用户、自动取用户的permission、
 * 自动传入validate函数进行验证、验证失败自动返回403。
 * 例如以下定义，则只需要在请求函数的装饰器的参数加入字段：permission: MyPermissionDescriptor(["admin"])，即可实现自动鉴权管理员。
 */
class MyPermissionDescriptor extends vio_1.PermissionDescriptor {
    constructor(allowedPermissions) {
        super();
        this.allowedPermissions = allowedPermissions;
    }
    validate(userPermission) {
        return !!this.allowedPermissions.find((u) => u === userPermission);
    }
}
exports.MyPermissionDescriptor = MyPermissionDescriptor;
//# sourceMappingURL=userDef.js.map