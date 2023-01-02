# Deno

Deno es una alternativa a node, que permite ejecutar TS sin necesidad de transpilar el código.

## Características
* Seguro por defecto, sin acceso a archivos, red o entorno de trabajo, a menos que esto esté habilitado.
* Soporte para TypeScript.
* Se envía un solo ejecutable (deno).
* Cuenta con utilidades integradas como por ejemplo, un inspector de dependencias (deno info) y un formateo de código (deno fmt).
* Tiene un conjunto de módulos estándar previamente auditados los cuales están garantizados para trabajar con Deno.
* Si se quiere, los Scripts pueden ser agrupados en un solo archivo Javascript.

## Node vs Deno
* **Es más seguro:** Cuando ejecutas un programa con Node éste tiene todos permisos para hacer cualquier cosa en tu equipo. Con Deno el desarrollador es capaz de otorgar solamente los permisos que sean absolutamente necesarios.
* **Usa los módulos ES6:** En lugar de CommonJS como usa NodeJS, esto lo hace mucho más cercano al estándar de Javascript.
* **Funciona con promesas:** Para gestionar los procesos asíncronos, Deno usa promesas en lugar de funciones callback, por lo que el código que se puede realizar es más legible. Además puedes usar await en cualquier punto del código, a cualquier nivel, sin necesidad de declarar una función async.
* **Ofrece más soporte a las API web:** Dispone de manera predeterminada de librerías o APIs del navegador, como fetch, que no están disponibles en Node.


# Notes
* To run a TS file: `deno run <FILE_NAME>`
* We may get a warning when importing libraries in TS format, to fix that, we need to create the .vscode folder with the settings.json file:

```
{
  "deno.enable": true,
  "deno.suggest.imports.hosts": {
    "https://deno.land": true,
    "https://x.nest.land": true,
    "https://crux.land": true
  }
}
```