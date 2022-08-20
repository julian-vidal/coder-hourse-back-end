# ¿Qué es webpack?
- Webpack es iun empaquetador de módulos  que genera un archivo único con todos los modulos que necesita la aplicación para funcionar.
- Permite encapsular todos los archivos JavaScript en un único archivo.

# Instalación y configuración
1. `npm init -y`
2. `npm i -D webpack webpack-cli`
3. En el *package.json* creamos los scripts:
   * `"build": "webpack ./mensaje1.js ./mensaje2.js ./mensaje3.js --mode=production"`
   * `"watch": "webpack ./mensaje1.js ./mensaje2.js ./mensaje3.js -w --mode=dev"`
   * Cambiar `"main": "index.js"` por `"main": "./dist/main.js"`,
4. 

De Node v17 en adelante hay que usar `NODE_OPTIONS=--openssl-legacy-provider npm start` ya que esa libreria que usa webpack esta deprecated desde para esa version de Node.

# Webpack y TypeScript


