import { pool } from '../config/connection';
import { User } from "../interfaces/user";

// @Entity()
export class UserModelo {

    async listar() {

        const result = await pool.then(async (connection) => {
            return await connection.query('SELECT u.email, u.password, u.role FROM tbl_usuario u')
        })
        return result;
    }

    async insertar(usuario:User){
        const result = await pool.then(async (connection)=>{
            return await connection.query('INSERT INTO tbl_usuario SET ?',[usuario]);
        })
        return result;
    }

    async actualizar(password:any,email:string){
        const result = await pool.then(async(connection) =>{
            return await connection.query('UPDATE tbl_usuario SET ? WHERE email = ?',[password,email])
        })
        return result;
    }

    public async eliminar(email: string) {
        console.log('Eliminando DAO');
        const result = await pool.then( async (connection) => {
            return await connection.query(
             'DELETE FROM tbl_usuario WHERE email = ?',[email]
             );
        });
        return result;
    }

}

export const modelUser = new UserModelo();