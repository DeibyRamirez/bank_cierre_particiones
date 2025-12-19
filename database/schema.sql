-- Esquema de la base de datos para el sistema de gestión de tareas

create extension if not exists pgcrypto;


create table usuarios (
    id uuid primary key,
    nombre varchar(100) not null,
    correo_electronico varchar(100) unique not null,
    contrasena varchar(255) not null,
    rol varchar(50) not null,
    estado varchar(20) default 'ACTIVO',
    fecha_creacion timestamp default current_timestamp,
    fecha_desactivacion timestamp
);

create table particiones (
    id uuid primary key,
    nombre varchar(100) not null,
    descripcion text,
    tipo varchar(50) not null, -- diario, mensual, sucursal
    fecha_operativa date not null,
    estado varchar(30) default 'ABIERTA',
    fecha_creacion timestamp default current_timestamp
);

create table cierres (
    id uuid primary key,
    particion_id uuid references particiones(id),
    usuario_autorizador uuid references usuarios(id),
    fecha_inicio timestamp not null,
    fecha_fin timestamp,
    resultado varchar(20), -- EXITOSO / FALLIDO
    observacion text
);

create table validaciones (
    id uuid primary key,
    cierre_id uuid references cierres(id),
    tipo_validacion varchar(50),
    resultado boolean,
    detalle text,
    fecha timestamp default current_timestamp
);

create table auditoria_eventos (
    id uuid primary key,
    entidad varchar(50) not null,
    entidad_id uuid not null,
    accion varchar(50) not null,
    usuario_id uuid,
    fecha_evento timestamp default current_timestamp,
    ip_origen varchar(50),
    detalle text,
    hash_integridad varchar(255)
);

-- Funciones

-- Esta función registra los cambios en las tablas auditadas
-- Si es una inserción, actualización o eliminación
-- El curret_setting('app.current_user_id') debe ser seteado en la sesión y se obtinene la ip del cliente con inet_client_addr()
-- La función debe ser llamada desde un trigger asociado a las tablas que se desean auditar
create or replace function fn_auditoria_cambios()
returns trigger as $$
begin
    if (TG_OP = 'Insert') then
        insert into auditoria_eventos(entidad, entidad_id, accion, usuario_id, ip_origen, detalle, hash_integridad)
        values (TG_TABLE_NAME, NEW.id, 'INSERT', current_setting('app.current_user_id')::uuid, inet_client_addr()::varchar,
                row_to_json(NEW)::text,
                encode(digest(row_to_json(NEW)::text, 'sha256'), 'hex'));
        return NEW;

    elsif (TG_OP = 'Update') then
        insert into auditoria_eventos(entidad, entidad_id, accion, usuario_id, ip_origen, detalle, hash_integridad)
        values (TG_TABLE_NAME, NEW.id, 'UPDATE', current_setting('app.current_user_id')::uuid, inet_client_addr()::varchar,
                row_to_json(NEW)::text,
                encode(digest(row_to_json(NEW)::text, 'sha256'), 'hex'));
        return NEW;
    
    elsif (TG_OP = 'Delete') then
        insert into auditoria_eventos(entidad, entidad_id, accion, usuario_id, ip_origen, detalle, hash_integridad)
        values (TG_TABLE_NAME, OLD.id, 'DELETE', current_setting('app.current_user_id')::uuid, inet_client_addr()::varchar,
                row_to_json(OLD)::text,
                encode(digest(row_to_json(OLD)::text, 'sha256'), 'hex'));
        return OLD;
    end if;
    return null;
end;

$$ language plpgsql;

-- Triggers para auditoría
create trigger trg_auditoria_usuarios
after insert or update or delete on usuarios
for each row execute function fn_auditoria_cambios();

create trigger trg_auditoria_particiones
after insert or update or delete on particiones
for each row execute function fn_auditoria_cambios();

create trigger trg_auditoria_cierres
after insert or update or delete on cierres
for each row execute function fn_auditoria_cambios();

create trigger trg_auditoria_validaciones
after insert or update or delete on validaciones
for each row execute function fn_auditoria_cambios();
