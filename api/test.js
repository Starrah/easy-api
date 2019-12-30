"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vio_1 = require("vio");
const delay_1 = require("delay");
class Test extends vio_1.Controller {
    default(req, res) {
        res.json({
            method: "GET",
            result: "success"
        });
    }
    /**
     * 注意vio在寻找定义的请求处理函数时，对于装饰器没有指定path的情况，是会把该函数的函数名**转为小写横线格式**后作为path的。
     * 因此如果以驼峰格式命名，则必须要写一下path字段。
     */
    yyyAa(req, res) {
        res.json({
            method: "GET",
            result: "success",
            body: req.body
        });
    }
    //必须用@ts-ignore，因为vio包中HttpMethod的声明没有包括ws。
    //@ts-ignore
    ws(ws, req) {
        Test.sendInterval(ws);
        ws.on('message', (data) => {
            console.log(data);
        });
        ws.on('close', () => {
            console.log("ws closed");
        });
        req["headersSent"] = true; //因为vio会自动把函数的第二个参数当成res并在函数返回后检查res是否有被end，因此我们可以添加这样一个属性假装这个res被end了，以免vio对req对象调用并不存在的end方法引起报错。
    }
    static async sendInterval(ws) {
        while (ws.readyState === ws.OPEN) {
            ws.send("qwq");
            await delay_1.default(1000);
        }
    }
}
__decorate([
    vio_1.get()
], Test.prototype, "default", null);
__decorate([
    vio_1.post({
        path: "yyyAa"
    })
], Test.prototype, "yyyAa", null);
__decorate([
    vio_1.route("ws")
], Test.prototype, "ws", null);
exports.default = Test;
//# sourceMappingURL=test.js.map