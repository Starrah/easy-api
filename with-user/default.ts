import {Controller, ExpressResponse, get, post, Request} from "vio";
import {MyPermissionDescriptor, MyUser} from "./userDef";

export default class Default extends Controller{
    @post({
       authentication: true
    })
    login(req: Request<MyUser>, res: ExpressResponse){
        if(req.user){
            //user非undefined即为authenticate方法鉴权通过
            let session = new Date().getTime().toString();
            req.user.session = session;
            res.cookie("session", session);
        }else{
            res.sendStatus(401);
        }
    }

    @get()
    all(req: Request<MyUser>, res: ExpressResponse){
        //所有请求都会进来，而如果用户判断失败user是undefined
        res.json({
            result: "success",
            name: req.user && req.user.name
        })
    }

    @get({
        permission: new MyPermissionDescriptor(["admin"])
    })
    onlyadmin(req: Request<MyUser>, res: ExpressResponse){
        //鉴权失败的会直接403掉，进不到函数里面
        res.json({result: "successAdmin"})
    }
}