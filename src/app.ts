import "reflect-metadata";

import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { authRoutes } from "./routes/authRoutes";
import { usuarioRoutes } from "./routes/usuarioRoutes";
import cors from 'cors';

require('dotenv').config();

const port = process.env.PORT;



class Server {
    private app!:Application;

    constructor(){
        this.app  = express()
        this.config();
        this.routes();
        this.app.listen(port,()=>{
            return console.log(`Express is listening at http://localhost:${port}`)
        })

    }

    config():void{
        // Configuración del puerto para el servidor
        this.app.set("port",3000);
        // Muestra las peticiones en consola
        this.app.use(morgan("dev"))
        // solo se permiten peticiones en formato JSON
        this.app.use(bodyParser.json());
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({extended: false,}))
    }

    routes():void{ 
        this.app.use('/',authRoutes.router)
        this.app.use('/usuario',usuarioRoutes.router)

    }
}

const server = new Server();