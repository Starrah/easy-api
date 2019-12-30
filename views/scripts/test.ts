import {Controller, Request, ExpressResponse, get} from 'vio'

export default class Test extends Controller{
    @get()
    default(req: Request<any>, res:ExpressResponse){
        return {
            title: "Hello World",
            body: "test page",
            name: req.ip
        }
    }
}