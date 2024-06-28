import { Request, Response } from "express";
import { pool } from "../config/connection";
import validator from "validator";

import { modelUser } from "../models/userModelo";
import { utils } from "../utils/util";
import { model } from '../models/authModelo';

class UsuarioController {

    /**
     * @description Lista los usuarios disponibles
     * @param req
     * @param res
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async listar(req: Request, res: Response) {
        try {
            const result = await modelUser.listar();
            res.json(result);
        } catch (error: any) {
            return res.status(500).json({ msg: `${error.message}` });
        }
    }

    /**
     *  @description Inserción de usuarios a la bd
     * @param req
     * @param res
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async insertar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            const usuario = req.body;
            console.log(usuario);

            // validar que los datos no sean nulos o indefinidos
            if (!usuario.email
                || !usuario.password
                || !usuario.role
                || !usuario.name
                || !usuario.lastname) {
                return res.status(500).json({ msg: "Todos los datos son requeridos", code: 1 });
            }

            const usuarioDB:any[] = await model.getUserByEmail(usuario.username);
            console.log(usuarioDB)

            if(usuarioDB.length >= 1){
                return res.status(400).json({ msg: "El nombre de usuario existe :(", code: 1 });

            }


            // encriptar nuestra contraseña
            const encryptedText = await utils.hashPassword(usuario.password);
            usuario.password = encryptedText;
            console.log("Contraseña encriptada " + typeof usuario.password);

            const newUser = {
                name:usuario.name,
                lastname:usuario.lastname,
                email: usuario.email,
                password: usuario.password,
                role: usuario.role
            }


            console.log(newUser);

            // inserción de los datos
            //Agregar enunciado

            const result = await modelUser.insertar(newUser);

            if (result.affectedRows > 0) {
                return res.json({ msg: "Los datos se guardaron correctamente", code: 0 });
            } else {
                return res.status(500).json({ msg: result.message, code: 1 });
            }


        } catch (error: any) {
            return res.status(500).json({ msg: `${error.message}` });
        }
    }

    public async actualizar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            const usuario = req.body;

            // validar que los datos no sean nulos o indefinidos
            if (!usuario.email
                || !usuario.password) {
                return res.status(404).json({ msg: "Todos los datos son requeridos", code: 1 });
            }

            // se verifica que los datos no se encuentren vacios
            if (validator.isEmpty(usuario.email) || validator.isEmpty(usuario.password)) {
                return res.status(404).json({ msg: "Todos los datos son requeridos", code: 1 });
            }

            const encryptedText = await utils.hashPassword(usuario.password);
            usuario.password = encryptedText;

            const newUser = {
                password: usuario.password,
            }

            // actualización de los datos
            //Agregar enunciado

            const result = await modelUser.actualizar(newUser,usuario.email);
            if (result.affectedRows > 0) {
                return res.json({ msg: "Los datos se actualizaron correctamente", code: 0 });
            } else {
                return res.status(404).json({ msg: result.message, code: 1 });
            }

        } catch (error: any) {
            return res.status(500).json({ msg: `${error.message}` });
        }
    }

    public async eliminar(req: Request, res: Response) {
        try {
            // se obtienen los datos del
            const email = req.params.email;

            // validar que los datos no sean nulos o indefinidos
            if (!email) {
                return res.status(404).json({ msg: "Todos los datos son requeridos", code: 1 });
            }

            // se verifica que los datos no se encuentren vacios
            if (validator.isEmpty(email)) {
                return res.status(404).json({ msg: "Todos los datos son requeridos", code: 1 });
            }

            // actualización de los datos
            //Agregar enunciado
            const result = await modelUser.eliminar(email);

            if (result.affectedRows > 0) {
                return res.json({ message: "Los datos se eliminaron correctamente", code: 0 });
            } else {
                return res.status(404).json({ msg: result.message, code: 1 });
            }

        } catch (error: any) {
            console.log("Error");
            return res.status(500).json({ msg: `${error.message}` });
        }
    }


}


export const usuarioController = new UsuarioController();