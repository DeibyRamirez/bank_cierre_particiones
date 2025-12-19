export class UsuariosService {
    static async registrarUsuario(data) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');


            await client.query('COMMIT');

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}