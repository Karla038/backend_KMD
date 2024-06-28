import { Request, Response } from "express";
import { model } from '../models/authModelo';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {utils} from '../utils/util';
import { connection } from "../config/mysql";

class AuthController {
    /**
     * 
     * @param req Petición
     * @param res Respuesta
     * @returns mensaje para el usuario
     */

    public async iniciarSesion(req: Request, res: Response) {
        try {
            console.log(req.body)
            const { email, password } = req.body;
            if (validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
                return res.status(400).json({
                    msg: "Los campos son requeridos", code: 1
                })
            }
            console.log(email)

            // Obtenemos el usuario
            const usuarioDB = await model.getUserByEmail(email);
            console.log(usuarioDB)
            if (usuarioDB.length <= 0) {
                return res.status(404).json({
                    msg: 'El usuario y/o contraseña es incorrecto',
                    code: 1
                })
            }
            console.log(usuarioDB)
            const usuario = {
                id:usuarioDB[0].id,
                name: usuarioDB[0].name,
                lastname:usuarioDB[0].lastname,
                username: usuarioDB[0].username,
                password: usuarioDB[0].password,
                role: usuarioDB[0].role
            }
      
            const token = jwt.sign(usuario,connection.keys.secret,{expiresIn:'1h'})

            return res.status(200).json({
                msg: "Autentificación correcta",
                token:token,
                code: 0
            })

        } catch (error: any) {
            return res.status(500).json({
                msg: `${error.message}`
            })
        }
    }
}

export const authController = new AuthController()