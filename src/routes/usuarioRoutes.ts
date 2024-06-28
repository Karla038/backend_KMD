import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController';


class UsuarioRoutes{

    public router!:Router ;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        // Listado
        this.router.get('/',usuarioController.listar);
        this.router.post('/',usuarioController.insertar);
        this.router.put('/',usuarioController.actualizar);
        this.router.delete('/:email',usuarioController.eliminar);

    }
}

export const usuarioRoutes = new UsuarioRoutes();