export class UsuariosRepository {

    static async crearUsuario(client, data) {
        return client.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id',
        );
        
    }
}