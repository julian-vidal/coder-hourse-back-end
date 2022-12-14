# Proxy Server

* Es un servidor que hace de intermediario entre las conexiones de un cliente y un servidor de destino, filtrando todos los paquetes entre ambos.
* Sin el proxy, la conexión entre cliente y servidor de origen a través de la web es directa.
* Se utiliza para navegar por internet de forma más anónima ya que oculta las IP, sea del cliente o del servidor de origen.
* Por ser intermediario, ofrece funcionalidades como control de acceso, registro del tráfico, mejora de rendimiento, entre otras.

##  Forward proxy (The user is protected)
* Es un servidor proxy que se coloca entre el cliente y la web.
* Recibe la petición del cliente para acceder a un sitio web, y la transmite al servidor del sitio, para que este no se entere de qué cliente está haciendo la petición.
* Lo utiliza un cliente cuando quiere anonimizar su IP. 
* Es útil para mejorar la privacidad, y para evitar restricciones de contenido geográfico (contenido bloqueado en cierta región).


## Reverse proxy (The server is protected)
* Es este caso, el servidor proxy se coloca entre la web y el servidor de origen.
* Entonces, el que se mantiene en el anonimato es el servidor de origen. * Garantiza que ningún cliente se conecte directo con él y por ende mejore su seguridad.
* En general el cifrado SSL de un sitio web seguro se crea en el proxy (y no directamente en el servidor).
* Además, es útil para distribuir la carga entre varios servidores web.


# Reverse proxy in backend

## Benefits
* **Balancear la carga:** Un solo servidor de origen, en una página con millones de visitantes diarios, no puede manejar todo el tráfico entrante. El proxy inverso puede recibir el tráfico entrante antes de que llegue al servidor de origen. Si este está sobrecargado o cae completamente, puede distribuir el tráfico a otros servidores sin afectar la funcionalidad del sitio. Es el principal uso de los servidores proxy inverso.

* **Seguridad mejorada:** Al ocultar el proxy inverso la IP del servidor de origen de un sitio web, se puede mantener el anonimato del mismo, aumentando considerablemente su seguridad. Al tener al proxy como intermediario, cualquier atacante que llegue va a tener una traba más para llegar al servidor de origen.

* **Potente caching:** Podemos utilizar un proxy inverso para propósitos de aceleración de la web, almacenando en caché tanto el contenido estático como el dinámico. Esto puede reducir la carga en el servidor de origen, resultando en un sitio web más rápido.

* **Compresión superior:** Un proxy inverso es ideal para comprimir las respuestas del servidor. Esto se utiliza mucho ya que las respuestas del servidor ocupan mucho ancho de banda, por lo que es una buena práctica comprimirlas antes de enviarlas al cliente.

* **Cifrado SSL optimizado:** Cifrar y descifrar las solicitudes SSL/TLS para cada cliente puede ser muy difícil para el servidor de origen. Un proxy inverso puede hacer esta tarea para liberar los recursos del servidor de origen para otras tareas importantes, como servir contenido.

* **Monitoreo y registro del tráfico:** Un proxy inverso captura cualquier petición que pase por él. Por lo tanto, podemos usarlos como un centro de control para monitorear y registrar el tráfico. Incluso si utilizamos varios servidores web para alojar todos los componentes de nuestro sitio web, el uso de un proxy inverso facilitará la supervisión de todos los datos entrantes y salientes del sitio.

# NGINX

* Nginx es un servidor web, orientado a eventos (como Node) que **actúa como un proxy** lo que nos permite redireccionar el tráfico entrante en función del dominio de dónde vienen, hacia el proceso y puerto que nos interese.
* Se usa para solucionar el problema que se genera al correr nuestra app Node en el puerto 80, para que sea accesible desde una IP o dominio, y queremos utilizar el mismo puerto con otro proceso.

Rutas importantes:
* */opt/homebrew/etc/nginx/nginx.conf* -> Ruta de configuraciones para nginx
* */opt/homebrew/Cellar/nginx/1.23.1* -> ruta de instalación de nginx


## Install and initial setup NGINX

1. Install it: `brew install nginx`
2. Start it: `brew services start nginx`
3. Get the ngix version: `nginx -v`
4. Go to the root folder of the Mac user and add this to the `.zshrc`

```
export NGINX=/opt/homebrew/Cellar/nginx/X.XX.X/bin
export PATH=$PATH:$NGINX
```
`X.XX.X` is the ngnix version.

5. In that folder, run `source .zshrc`
6. Stop and start again the ngnix service (`nginx -s reload)
7. If everything is working as expeceted, go to `http://localhost:8080` and you should see the nginx welcome page

## Use NGINX as a load balancer
1. Install pm2
2. Start the server with pm2 using the cluster mode `pm2 start server.js --name="Server1" --watch -i max -- 8081`
3. Start the server with pm2 using the fork mode `pm2 start server.js --name="Server2" --watch -- 8082`
4. Go to /opt/homebrew/etc/nginx/nginx.conf then under http, add:

```
upstream node_app {
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
}
```
5. Then under http -> server, add 

```
location /datos/ {
    proxy_pass: http://node_app/datos
}
```

6. Reload ngnix `nginx -s reload`

7. To change the weight of a server:
```
upstream node_app {
    server 127.0.0.1:8081;
    server 127.0.0.1:8082 weight=3;
}
```

8. Reload ngnix `nginx -s reload`

P.S. `pm2 monit` is a list of the servers running
P.S.S. To delete one instance run `pm2 del Server1`


## Change port from 8080 to 80
1. Go to /opt/homebrew/etc/nginx/nginx.conf then under http -> server, change the parameter "listen" to 80 
2. Reload ngnix `nginx -s reload`
3. You should see the nginx home page at http://localhost

##


en el nginx.conf, "upstream" -> config por aplicacion.


## Serve static files

1. At the NGINX config file, under http -> server add

```
location /indice/ {
    autoindex on;
    alias /Volumes/Datos/CoderHouse/Backend/Modulo2/30-proxy-ngnix/1-ejm-intro/static
}
```
