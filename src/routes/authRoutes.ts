import { Router } from 'express';
import {authController} from '../controllers/authController';

class AuthRoutes {

    public router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    config():void{
        this.router.post('/',authController.iniciarSesion)

    }


}

export const authRoutes = new AuthRoutes();
