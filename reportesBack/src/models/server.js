const express =require('express');
var cors = require('cors');
//const app = express();
//const bodyParser = require('body-parser');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    
   }

   routes(){
    this.app.use(require('../routes/reportes'));
            
   /* this.app.get('/',(req, res)=>{
     res.send("Hola mundo env")
     });*/
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Corriendo en puerto",this.port )
    });
    }

   }
      module.exports = Server;


