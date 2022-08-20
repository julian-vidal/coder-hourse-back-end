SHOW DATABASES;

-- DB creation
CREATE DATABASE plataforma;

-- Selecting DB
USE plataforma;

-- Table creation
CREATE TABLE IF NOT EXISTS usuarios (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE
);

-- CRUD

-- CREATE
-- Doc for dates: https://mariadb.com/kb/en/str_to_date/ 
INSERT INTO usuarios(nombre, apellido, fecha_nacimiento)
VALUES ('Julian', 'Vidal', STR_TO_DATE("2022-08-16", "%Y-%m-%d"));

INSERT INTO usuarios(nombre, apellido, fecha_nacimiento)
VALUES ('Jeniffer', 'Reyes', STR_TO_DATE("1992-11-29", "%Y-%m-%d"),
		('Juan', 'Vidal', STR_TO_DATE("2003-12-03", "%Y-%m-%d"));

INSERT INTO usuarios(nombre, apellido, fecha_nacimiento)
VALUES ('Juan', 'Vidal', STR_TO_DATE("2003-12-03", "%Y-%m-%d"));

-- READ
-- * means all records
SELECT *
FROM usuarios; 

-- WHERE  sirve para filtrar data
SELECT *
FROM usuarios
WHERE id=2;  

-- EXTRACT Devuelve la parte de fecha
SELECT *
FROM usuarios
WHERE EXTRACT(year FROM fecha_nacimiento) = 2022;

-- Solo retornar las columnas ID y nombre
SELECT id,nombre
FROM usuarios;

-- UPDATE
-- Never do a DELETE or UPDATE request without WHERE

update usuarios
set
	nombre = 'David', apellido = 'Gonzalez'
where id = 1;


-- DELETE
DELETE FROM usuarios WHERE id=1;
