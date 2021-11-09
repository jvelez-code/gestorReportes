
const express =require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

class Server{
    constructor(){
        this.app = express();

        thismiddleware();

        this.routes();

    }
}


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//routes
app.use(require('../routes/reportes'));



app.listen(3000);
console.log('Server on port 3000')








