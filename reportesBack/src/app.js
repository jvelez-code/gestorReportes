require('dotenv').config();

const Server = require('./models/server.js');


const server = new Server();
server.listen();


/*const express =require('express');
const app = express();

app.get('/', function(req, res){
res.send("Hola mundo env")

});
app.listen(process.env.PORT,()=>{
console.log("Corriendo en puerto",process.env.PORT )
})*/