# BUENAS PRÁCTICAS EN EL DESARROLLO DE SERVIDORES NODE

**Adoptar un enfoque por capas:**
* **Controlador:** Rutas de API y endpoints.
* **Capa de servicios:** para la lógica de negocio.
* **Capa de acceso de datos:** para trabajar con la base de datos.
   
[Here's](https://docs.google.com/presentation/d/1a7RJ6QRxWMW7zOQAENWiVtPSyJPtcOl1T_jzEQ5iP4E/edit#slide=id.gf792494914_0_3904) an example of the structure


**Modelos de editor/suscriptor**
* Es un patrón de intercambio de datos popular en el que hay dos entidades comunicantes: editores y suscriptores. 
* Los **editores** envían mensajes a través de canales específicos sin ningún conocimiento de las entidades receptoras. 
* Los **suscriptores** (receptores de mensajes), por otro lado, expresan interés en uno o más de estos canales sin ningún conocimiento sobre las entidades editoriales.
* Es una buena idea incorporar un modelo de este tipo en nuestro proyecto para administrar varias operaciones secundarias correspondientes a una sola acción.


Watched until 46. Review teacher's code to check the jwt config