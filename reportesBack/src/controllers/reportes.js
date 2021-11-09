const { Pool }= require('pg');

const configes ={
    host: 'localhost',
    user: 'postgres',
    password: '123456' ,
    database: 'gestorclientes',
    port: '5432'
}

const configcont ={
    host: 'localhost',
    user: 'postgres',
    password: '123456' ,
    database: 'contactcenter',
    port: '5432'
}


/// conexiones a las bases de datos
const pool = new Pool(configes);
const poolcont = new Pool(configcont);




const inicio =((req, res) => {
    res.send('Hola mundo inicio');
});
//REPORTES BD DE GESTORCLIENTES
//Cantidad Gestiones

const postReportesGestion = async (req, res) =>{
    try {
         
        //parametro de url
        //let fecha1=req.query.fecha;
        //console.log(req.query.fecha);
        
        //parametro de header
        //alt +96 `
        let fecha2=req.body.fecha   
        console.log(req.body.fecha);
        console.log(req.body.fechafin);
        const response = await pool.query(`select id_gestion,id_campana,id_agente,fecha_gestion 
        from gestion where fecha_gestion>=$1 order by fecha_gestion `,[fecha2] );
    if (res !== undefined) {
        return res.json(response.rows);
        
      }
       
    } 
    catch (error) {
        console.log(error); 
    } 
};

const getReportesGestion = async (req, res) =>{
    try {
        const response = await pool.query(`select id_gestion,id_campana,id_agente,fecha_gestion 
        from gestion where fecha_gestion is not null order by fecha_gestion limit 5 `);
    if (res !== undefined) {
        return res.json(response.rows);
      }
      
    } 
    catch (error) {
        console.log(error); 
    } 
};


const getReportes = async (req, res) =>{
    try {
        const response = await pool.query('SELECT * FROM reportes where id in ($1,$2)',[33,34] );
    if (res !== undefined) {
        return res.json(response.rows);
        pool.close();
      }
      
    } 
    catch (error) {
        console.log(error); 
    } 
};



const getEstados = async (req, res) =>{
    try {
        const response = await poolcont.query('SELECT * FROM ask_estado' );
    if (res !== undefined) {
        return res.json(response.rows);
      }
      poolcont.close();
    } 
    
    catch (error) {
        console.log(error); 
    } 
};

const getReportesid = async (req, res, next) => {
    //console.log(req.params.id);
    //res.end();
 
        const id = req.params.id;
        try {
            const response = await pool.query
            ("SELECT * FROM reportes WHERE id = $1 ORDER BY 2 ", [id]);
        if (res !== undefined) {
            return res.json(response.rows);
          }
          pool.close();
        } 
        catch (error) {
            console.log(error); 
        } 
} 

    const postReportes =async (req, res) => {
        const {id, nombre_reporte, nombre_jasper, nombre_descarga, estado, aplica_bd_asterisk, empresas} = req.body;
        const response = await pool.query('insert into reportes values ($1, $2, $3, $4, $5, $6, $7 )', [id, nombre_reporte, nombre_jasper, nombre_descarga, estado, aplica_bd_asterisk, empresas] );
       
        res.send('Hola mundo post final');
        pool.close();
    };



getReportes();

module.exports = {
    inicio,
    getReportes,
    postReportes,
    getReportesid,
    getEstados,
    getReportesGestion,
    postReportesGestion
    
    
    
}
