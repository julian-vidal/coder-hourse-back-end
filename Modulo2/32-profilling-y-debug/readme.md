# Artillery

* Artillery es una dependencia de Node moderna, potente, fácil y muy útil para realizar test de carga a servidores.
* Cuenta con un conjunto de herramientas para tests de performance que se usa para enviar aplicaciones escalables que se mantengan eficaces y resistentes bajo cargas elevadas.
* Podemos usar Artillery para ejecutar dos tipos de pruebas de rendimiento:
  * Pruebas que cargan un sistema, o sea, pruebas de carga, de estrés.
  * Pruebas que verifican que un sistema funciona como se esperaba, es decir, pruebas funcionales continuas.

👉 Solo puede ser utilizado en sistemas de backend, no se puede utilizar en el front.

# Steps

1. `npm i artillery`
2. `node 1-prime-numbers.js 8081 CLUSTER`
3. `npx artillery quick --count 50 -n 40 http://localhost:8081?max=100000 > results_primes_cluster.txt`
4. Stop server
5. Start in FORK mode: `node 1-prime-numbers.js 8081`
6. `npx artillery quick --count 50 -n 40 http://localhost:8081?max=100000 > results_primes_fork.txt`


# Profiling
* **Profiling** en español es **análisis de rendimiento**. Es la investigación del comportamiento de un programa usando información reunida desde el análisis dinámico del mismo.
* El objetivo es averiguar el tiempo dedicado a la ejecución de diferentes partes del programa para detectar los puntos problemáticos y las áreas donde sea posible llevar a cabo una optimización del rendimiento (ya sea en velocidad o en consumo de recursos).​
* Un profiler puede proporcionar distintas salidas, como una traza de ejecución o un resumen estadístico de los eventos observados.
* Google Chrome, tiene un built-in profiler integrado en DevTools, que registra toda la información sobre las funciones y cuánto tiempo lleva ejecutarlas en un archivo de registro

## Built-in node profiling

1. `node --prof 2-auth.js`
2. `curl -X GET http://localhost:8080/user?user=test1&password=test1`
3. `npx artillery quick --count 10 -n 50 "http://localhost:8080/auth_block?user=test1&password=test1" > results_block.txt`
4. `node --prof-process isolate-0x110040000-4123-v8.log > stats_block.txt`
5. `mv isolate-0x110040000-4123-v8.log log-v8_block.log`
6. Stop server
7. Repeat steps 1 and 2
8. `npx artillery quick --count 10 -n 50 "http://localhost:8080/auth_no_block?user=test1&password=test1" > results_non_block.txt`
9. `node --prof-process isolate-0x128078000-5506-v8.log > stats_non_block.txt`
10. `mv isolate-0x128078000-5506-v8.log log-v8_non_block.log`

Nota: en el summary de los prof-process, "shared libraries" incluye el codigo bloqueante

## Node Inspect
1. `node --inspect 2-auth.js`
2. `curl -X GET http://localhost:8080/user?user=test1&password=test1`
3. In Chrome, go to chrome://inspect and select the proper file 
4. Click "start"
5. `npx artillery quick --count 10 -n 50 "http://localhost:8080/auth_no_block?user=test1&password=test1" > results_non_block.txt`
6. In Chrome dev, click "stop"

# AutoCanon y 0x

1. **Autocannon** es una dependencia de Node (similar a Artillery) que nos ayuda a realizar los test de carga.
2. Es una herramienta de evaluación comparativa HTTP / 1.1.
3. **0x** es una dependencia que perfila y genera un gráfico de flama (flame graph) interactivo para un proceso Node en un solo comando.
4. En este caso, vamos a hacer los test de carga por código, en lugar de por consola como hicimos con Artillery.

## Setup
1. `npm i -D autocannon`
2. `npm i 0x`
3. In the package.json add the scripts

```
"start": "npx 0x 4-fork-cluster.js 8080",
"benchmark": "node benchmark.js"
```
4. npm run start
5. npm run benchmark