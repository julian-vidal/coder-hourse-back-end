const fs = require("fs");
const encoding = "utf-8";

class ContenedorArchivo {
  constructor(path) {
    this.filePath = path;
    this.createFileIfNotExists();
    const data = fs.readFileSync(this.filePath, encoding);
    this.contenedor = JSON.parse(data);
  }

  createFileIfNotExists() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "[]");
    }
  }

  _saveAll(data) {
    const stringData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.filePath, stringData, encoding);
  }

  save(object) {
    if (!object.id) {
      const lastId = this.contenedor.reduce(
        (acc, el) => (el.id > acc ? el.id : acc),
        0
      ); // Acumulador inicial);
      const newId = lastId + 1;
      object.id = newId;
    }
    this.contenedor.push(object);
    this._saveAll(this.contenedor);
    return object.id;
  }

  getById(id) {
    return this.contenedor.find((c) => c.id === id);
  }

  getAll() {
    return this.contenedor;
  }

  deleteById(id) {
    const filtered = this.contenedor.filter((el) => el.id !== id);
    this.contenedor = filtered;
    this._saveAll(filtered);
  }

  deleteAll() {
    this.contenedor = [];
    this._saveAll([]);
  }

  updateById(id, object) {
    const index = this.contenedor.findIndex((el) => el.id === id);
    this.contenedor[index] = object;
    this._saveAll(this.contenedor);
    return this.contenedor[index];
  }
}

module.exports = ContenedorArchivo; // COMMONJS
