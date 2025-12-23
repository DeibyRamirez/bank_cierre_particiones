import type { PoolClient } from "pg";
import type { Usuario } from "../interfaces/usuario.interface.js";

export class UsuariosRepository {

    // Método existente para crear un usuario
    static async crearUsuario(client: PoolClient, data: Usuario) {
        
        return client.query(
        `INSERT INTO usuarios 
        (nombre, correo_electronico, contrasena, rol, estado, fecha_creacion)
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id`,
            [
                data.nombre, 
                data.correo_electronico, 
                data.contrasena, 
                data.rol, 
                data.estado || 'ACTIVO', 
                new Date()
            ]
        );
        
    }
    // Nuevo método para obtener un usuario por ID
    static async usuarioPorId(client: PoolClient, id: string){
        return client.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    }

    // Nuevo método para listar usuarios con paginación
    static async listaUsuarios(client: PoolClient, offset: number, limit: number){
        return client.query('SELECT * FROM usuarios ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
    }

    static async actualizarUsuario(client: PoolClient, id: string, data: Partial<Usuario>) { // El Partial permite que los campos sean opcionales
        
        // Construir dinámicamente la consulta de actualización
        const campos: string[] = []; // Array para almacenar los campos a actualizar
        const valores: any[] = []; // Array para almacenar los valores de los campos
        let indice = 1;
        for (const [key, value] of Object.entries(data)) { // Recorre cada par clave-valor en el objeto data
            campos.push(`${key} = $${indice}`); // Agrega el campo a la lista de campos con su respectivo placeholder
            valores.push(value); // Agrega el valor al array de valores
            indice++;
        }

        return client.query(
            `UPDATE usuarios SET ${campos.join(', ')} WHERE id = $${indice} RETURNING *`, // Une los campos con comas para la consulta SQL
            [...valores, id]
        );
    }
}
