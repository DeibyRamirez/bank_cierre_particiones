export interface Usuario {
    id?: string;
    nombre: string;
    correo_electronico: string;
    contrasena: string; // Hasheada
    rol: string; // ADMIN, USUARIO
    estado?: string; // ACTIVO o INACTIVO
    fecha_creacion?: Date;
    fecha_desactivacion?: Date;
}

export interface UsuarioLogin {
    correo_electronico: string;
    contrasena: string; 
}