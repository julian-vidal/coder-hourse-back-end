# NVM
* NVM (Node Version Manager) es un script bash simple para administrar múltiples versiones activas de Node en nuestro sistema. 
* Nos permite instalar múltiples versiones de Node, ver todas las versiones disponibles para la instalación y todas las versiones instaladas en nuestro sistema.
* También admite la ejecución de una versión específica de Node, puede mostrar la ruta al ejecutable donde se instaló, y mucho más.

# Install
1. `brew install nvm`
2. Go to the user folder -> and add `export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion` to the **.zshrc** file

## Uselful commands

1. `nvm list` -> List all available node versions
2. `nvm -h`
3. `nvm install --lts`
4. `node -v`
5. `nvm use XX.XX.XX` -> XX.XX.XX is the specific version to be used
6. `nvm alias default XX.XX.XX` -> set a default node version to be used

To set a default node version for a project:
1. `node -v > .nvmrc`
2. `nvm use`  will load the version in the **.nvmrc** file


# Package managers
Un administrador de paquetes de Node interactúa con los repositorios de paquetes en línea (que contienen bibliotecas, aplicaciones y paquetes) y ayuda de muchas maneras, inclusive con la instalación de paquetes y la administración de dependencias.

* npm
* yarn -> It's more efficient than npm
* pnpm

## Yarn
Yarn doesn't use the package.lock file, it uses yarn.lock instead
1. `npm i -g yarn`
2. `yarn --help`
3. `yarn add <package_name>` -> to install a new package
4. `yarn install` -> intalls packages from the package.json
5. `yarn add <package_name> --dev` -> install a dep in dev dep only

Do NOT mix npm and yarn!

Scripts are created in the same way than npm, but to run no need to use "run":

```
scripts {
    "start": "nodemon ./index.js"
}
```
 `yarn start`

## PNPM
* It's more efficient in terms of size thanks to symbolic links

`pnpm i <package_name>`
Symbolic links are like shortcuts: `ln -S desktop`


node_modules size-> yarn: 3,1M