"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vio_1 = require("vio");
class Test extends vio_1.Controller {
    default(req, res) {
        res.json({
            method: "GET",
            result: "qwq"
        });
    }
    yyy(req, res) {
        res.json({
            method: "GET",
            result: "qwq/yyy"
        });
    }
}
__decorate([
    vio_1.get()
], Test.prototype, "default", null);
__decorate([
    vio_1.get()
], Test.prototype, "yyy", null);
exports.default = Test;
//# sourceMappingURL=qwq.js.map