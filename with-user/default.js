"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vio_1 = require("vio");
const userDef_1 = require("./userDef");
class Default extends vio_1.Controller {
    login(req, res) {
        if (req.user) {
            //user非undefined即为authenticate方法鉴权通过
            let session = new Date().getTime().toString();
            req.user.session = session;
            res.cookie("session", session);
        }
        else {
            res.sendStatus(401);
        }
    }
    all(req, res) {
        //所有请求都会进来，而如果用户判断失败user是undefined
        res.json({
            result: "success",
            name: req.user && req.user.name
        });
    }
    onlyadmin(req, res) {
        //鉴权失败的会直接403掉，进不到函数里面
        res.json({ result: "successAdmin" });
    }
}
__decorate([
    vio_1.post({
        authentication: true
    })
], Default.prototype, "login", null);
__decorate([
    vio_1.get()
], Default.prototype, "all", null);
__decorate([
    vio_1.get({
        permission: new userDef_1.MyPermissionDescriptor(["admin"])
    })
], Default.prototype, "onlyadmin", null);
exports.default = Default;
//# sourceMappingURL=default.js.map