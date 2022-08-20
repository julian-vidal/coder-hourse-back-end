# Instalacion y Setup

1. `npm init -y`
2. `npm i -D typescript ts-loader webpack webpack-cli webpack-node-externals`
3. `npm i -S express @types/express`
4. `./node_modules/.bin/tsc --init` -> esto genera el archivo tsconfig.json
5. En el archivo *tsconfig.json* descomentamos `"noImplicitAny": true` y lo cambiamos a `"noImplicitAny": false`         
6.  Creamos el archivo *webpack.config.js* y agregamos:
7. En el archivo *package.json*:
    * `"build": "webpack"`,
    * `"watch": "webpack -w"`
    * `"start": "node ."`
    * Cambiamos main