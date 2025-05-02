CREATE TABLE roles (


    id_rol      INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_rol  VARCHAR (255) NOT NULL UNIQUE KEY,
    
    fyh_creacion  DATETIME NULL,
    fyh_actualizacion DATETIME NULL,
    estado   VARCHAR (11)

)ENGINE=InnoDB;
INSERT INTO roles (nombre_rol,fyh_creacion,estado) VALUES ('ADMINISTRADOR','2025-03-27 11:32:32','1');
INSERT INTO roles (nombre_rol,fyh_creacion,estado) VALUES ('DIRECTOR ACADEMICO','2025-03-27 11:32:32','1');
INSERT INTO roles (nombre_rol,fyh_creacion,estado) VALUES ('DIRECTOR ADMINISTRATIVO','2025-03-27 11:32:32','1');
INSERT INTO roles (nombre_rol,fyh_creacion,estado) VALUES ('CONTADOR','2025-03-27 11:32:32','1');
INSERT INTO roles (nombre_rol,fyh_creacion,estado) VALUES ('SECRETARIA','2025-03-27 11:32:32','1');


CREATE TABLE usuarios (
    id_usuario  INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombres     VARCHAR (255) NOT NULL,
    rol_id      INT (11) NOT NULL,
    email       VARCHAR (255) NOT NULL  UNIQUE KEY,
    password    TEXT NOT NULL,
    
    fyh_creacion  DATETIME NULL,
    fyh_actualizacion DATETIME NULL,
    estado   VARCHAR (11),

    FOREIGN KEY (rol_id) REFERENCES roles (id_rol) on delete no action on update cascade

)ENGINE=InnoDB;
INSERT INTO usuarios (nombres,rol_id,email,password,fyh_creacion,estado)
VALUES ('manuel gomez tafur','1','admin@admin.com','25d55ad283aa400af464c76d713c07ad','2025-03-19 11:41:10','1');

CREATE TABLE configuracion_instituciones (

    id_config_instituciones             INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_institucion                  VARCHAR (255) NOT NULL,
    logo                                VARCHAR (255) NULL,
    direccion                           VARCHAR (255) NOT NULL,
    telefono                            VARCHAR (100) NULL,
    celular                             VARCHAR (100) NULL,
    correo                              VARCHAR (100) NULL,

    fyh_creacion  DATETIME NULL,
    fyh_actualizacion DATETIME NULL,
    estado   VARCHAR (11)

)ENGINE=InnoDB;
INSERT INTO configuracion_instituciones (nombre_institucion,logo,direccion,telefono,celular,correo,fyh_creacion,estado)
VALUES ('Manuel Web School','logo.jpg','Zona La Merced calle Miguel Rubio Av. 4 nro 251','2228837','59175657007','info@manuelweb.com','2025-03-19 11:41:10','1');




