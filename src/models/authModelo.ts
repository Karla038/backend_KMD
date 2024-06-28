import { pool } from "../config/connection";

class AuthModelo{

    // Metodo para buscar un usuario por el username
    public async getUserByEmail(email:string){
        const result = await pool.then(async (connection)=>{
            return await connection.query(
                'SELECT * FROM tbl_usuario WHERE email = ? ',
                [email]);
        })
        console.log('getUserByEmail' + result)
        return result;
    }


}

export const model = new AuthModelo();