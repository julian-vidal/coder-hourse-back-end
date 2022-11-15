# Notes

- TDD (Test-Driven Development) es una **práctica de programación** que consiste en **escribir primero las pruebas** (generalmente unitarias), **después** escribir el **código fuente** que pase la prueba satisfactoriamente y, **por último, refactorizar** el código escrito.

# Install and setup
1. `npm init --y`
2. `npm i -D jest`
3. Create a file with the name `file.test.js` and follow [these steps](https://jestjs.io/docs/getting-started)
4. At the **package.json** file, set the test script like this:
```
"scripts": {
    "test": "jest"
  }
```

# Useful links
- https://mochajs.org/
- https://jestjs.io/
- https://www.mockaroo.com/
- https://fakerjs.dev/
- https://www.npmjs.com/package/supertest