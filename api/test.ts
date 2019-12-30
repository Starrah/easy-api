import {Controller, Request, ExpressResponse, get, post, route} from 'vio'
import * as WebSocket from 'ws';
import delay from 'delay'

export default class Test extends Controller{
    @get()
    default(req: Request<any>, res:ExpressResponse){
        res.json({
            method: "GET",
            result: "success"
        })
    }

    /**
     * 注意vio在寻找定义的请求处理函数时，对于装饰器没有指定path的情况，是会把该函数的函数名**转为小写横线格式**后作为path的。
     * 因此如果以驼峰格式命名，则必须要写一下path字段。
     */
    @post({
        path: "yyyAa"
    })
    yyyAa(req: Request<any>, res:ExpressResponse){
        res.json({
            method: "GET",
            result: "success",
            body: req.body
        })
    }

    //必须用@ts-ignore，因为vio包中HttpMethod的声明没有包括ws。
    //@ts-ignore
    @route("ws")
    ws(ws: WebSocket, req: Request<any>){
        Test.sendInterval(ws);
        ws.on('message', (data)=>{
            console.log(data);
        });
        ws.on('close', ()=>{
            console.log("ws closed");
        });
        req["headersSent"] = true;//因为vio会自动把函数的第二个参数当成res并在函数返回后检查res是否有被end，因此我们可以添加这样一个属性假装这个res被end了，以免vio对req对象调用并不存在的end方法引起报错。
    }

    static async sendInterval(ws: WebSocket){
        while(ws.readyState === ws.OPEN){
            ws.send("qwq");
            await delay(1000);
        }
    }
}