import {Controller, Request, ExpressResponse, get} from 'vio'

export default class Test extends Controller{
    @get()
    default(req: Request<any>, res:ExpressResponse){
        res.json({
            method: "GET",
            result: "qwq"
        })
    }

    @get()
    yyy(req: Request<any>, res:ExpressResponse){
        res.json({
            method: "GET",
            result: "qwq/yyy"
        })
    }
}