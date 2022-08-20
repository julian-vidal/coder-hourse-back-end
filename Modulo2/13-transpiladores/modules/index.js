import Contenedor from "./container.js";
import { saludar } from "./container.js";


const c = new Contenedor("./db.json");
c.save({name: "Julian", age: 25});

console.log(c.getAll())
saludar();