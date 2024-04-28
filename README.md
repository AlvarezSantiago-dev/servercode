# ServerCoder

```sh
Developing
```

Coder server: 
Es un proyecto en `construcción` de un servidor para una aplicacion e-commerce, creado a partir del entorno de Node.js.

## Características

- Se pueden crear/leer/actualizar/eliminar. => users/products/carts.
- Cuenta con Routes api. Para tener un control del proyecto del lado del backend.
- Routes view. Para tener control del aspecto visual.
- Managers utilizando fileSistem, memory y Mongo (Manejo actual) para los archivos api/views.


## Tecnología

ServerCoder utiliza por el momento ciertas tecnologias para su funcionamiento:

- Node.js: Utilizado como base del servidor.
- Express: Actúa como el framework para construir la aplicación web o API. Se encarga de manejar las solicitudes y respuestas HTTP, configurar middleware, y definir rutas que especifican cómo debe responder el servidor a ciertos tipos de peticiones (GET, POST, etc.).
- Express-Handlebars: Utilizado para renderizar las vistas.
- Nodemon: Utilizado en el entorno de desarrollo para aumentar la productividad. Monitoriza los cambios en los archivos del código fuente y reinicia automáticamente el servidor cada vez que guardas un cambio.
- MongoDB/Mongoose: MongoDB almacena los datos que tu aplicación necesita, mientras que Mongoose es utilizado para interactuar con esta base de datos desde tu aplicación Node.js.
- Dotenv: Utilizado para ocultar y gestionar información sensible (como cadenas de conexión a bases de datos o claves secretas), asegurando que no se incluyan directamente en el código fuente.
- Morgan: Funciona como un registrador de solicitudes HTTP. Cada vez que tu servidor recibe una solicitud, Morgan puede registrar detalles de esta solicitud, como la dirección IP del cliente, el método de la solicitud, la URL solicitada, y el estado de la respuesta.
- JavaScript: Es el lenguaje utilizado para escribir todo el código del servidor. Desde la configuración inicial del servidor, la definición de rutas, la lógica de manejo de solicitudes, hasta la interacción con la base de datos y el procesamiento de datos, todo se hace utilizando JavaScript.


Actualmente ServerCoder se encuentra publico en GitHub.

## Instalación

ServerCoder requiere [Node.js](https://nodejs.org/) v.lts para funcionar.

Instale las dependencias y devDependencias. Luego inicie el servidor.

```sh
cd servercode
npm i
npm run dev
```



## Herramientas para el desarrollo

Para la construccion y el test de ServerCoder, utilizamos algunas herramientas adicionales.

| MongoDbCompas | 
| Postman |

## Mini guia
Para probar el funcionamiento debemos clonar el reposotorio.
Luego pararnos en la consola en la carpeta main del archivo. (cd servercode) y ejecutar el cmd (npm run dev).
Para realizar las solicitudes de tipo ` GET PUT POST DELETE ` utilizamos Postman.
En postman colocamos la ruta `http://localhost:8080/api/(carts,users or products)`. En el codigo, se encuentran ubicados estos endpoints disponibles de la api mas detallados en `src/routers/api`.
Luego en postman simplemente realizamos la peticion que necesitamos y listo.

Para las vistas solo por el momento estan configuradas algunas, para visualizarlas el servidor debe estar iniciado.
Algunas de las vistas son: 

- http://localhost:8080/
- http://localhost:8080/products (tocando en detalles nos lleva a la ruta de abajo.)
- http://localhost:8080/products/:id 
- http://localhost:8080/register
- http://localhost:8080/users/:id (deberian tomar un id de un user.)
