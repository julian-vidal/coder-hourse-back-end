import express from 'express';
import Perimetro from './perimetro';
import Superficie from './superficie';


const app = express();


app.get("/", (req, res) => {
  const query = req.query;
  // const {figura:any} = query || "";
  const figura:any = query.figura || "";

  switch(figura) {
    case "cuadrado":
      let lado = Number(query.lado);
      res.send({
        perimetro: Perimetro.cuadrado(lado),
        superficie: Superficie.cuadrado(lado)
      });
      break;
    case "rectangulo":
      let ladoRectangulo = Number(query.lado);
      let alturaRectangulo = Number(query.altura);
      res.send({
        perimetro: Perimetro.rectangulo(ladoRectangulo, alturaRectangulo),
        superficie: Superficie.rectangulo(ladoRectangulo, alturaRectangulo)
      });
      break;
      
      case "circulo":
        let radio = Number(query.radio);
        
        res.send({
          perimetro: Perimetro.circulo(radio),
          superficie: Superficie.circulo(radio)
        });
        break;

  }

  res.send("Hola mundo");
});

app.listen(8080, () => {
  console.log('Servidor corriendo en el puerto 8080');
});