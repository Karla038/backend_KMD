import { Router,RouterOptions } from 'express';

class AuthRoutes {

    public router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    config():void{
        this.router.get('/',(req,res) => {
            res.send('invocando authenticacion');
        });

    }


}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
