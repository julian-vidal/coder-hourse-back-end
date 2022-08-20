# Notes
## Qué es una BD
- Una BD es un **repositorio persistente** que nos permite **almacenar** gran número de **información** de una **forma organizada** para su futura consulta, realización de búsquedas, nuevo ingreso de datos y muchas otras operaciones.
- **Un servidor de BD** es un contenerdor que puede alojar un gran número de BD y ofrece los servicios para conectarlas a los clientes.
- Mediante los **clientes** podemos interacturar con las bases de datos y estos pueden estar implementados en modo cosola, en modo app grafica o desde nuestra app de server.

## Clientes de base de datos
- La arquitectura **cliente-servidor** es un modelo de diseño de software en el que las tareas se reparten entre los proveedores de recursos o servicios, llamados servidores, y los demandantes, llamados clientes.
- **Un cliente** realiza peticiones a otro programa, el servidor, quien le da respuesta
- **Un cliente de base de datos** se conecta e interactúa con el servidor de base de datos


Setup
1. Install Docker and Workbench
2. Run 

```
docker run --detach --name mariadb_server \
-p 3306:3306 \
--env MARIADB_USER=antonio \
--env MARIADB_PASSWORD=password1234 \
--env MARIADB_ROOT_PASSWORD=root_password \
 mariadb:latest
```
3. Open workbench and create a new connection using:
   1. Hostname = 127.0.0.1
   2. Port = 3306
   3. Username = root
   4. Pwd = root_password

4. Para Ejecutar comandos en el workbench hay que seleccionar la(s) linea(s) a ejecutar y dar click en el icono del rayo
5. 
```
SHOW DATABASES;

CREATE DATABASE plataforma;

USE plataforma;




CREATE TABLE IF NOT EXISTS usuarios (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, // NOT NULL forza que la column no puede estar vacia y AUTO_INCREMENT es un contador. PRIMARY KEY es para que se considere como un campo con unique ID
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE
);
```