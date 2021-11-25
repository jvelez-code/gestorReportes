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

const getmonitoreo = async(req, res)=>{
    try {
        const response = await poolcont.query(`select  * from ask_estado_extension`);
        if (res !== undefined) {
            return res.json(response.rows);
            
          }
    } catch (error) {
        console.log('Monitoreo', error);
    }
}

const postDetalleGestiones= async (req, res) =>{
try {
     
    let fecha=req.body.fecha
    let fecha2=req.body.fechafin   
    console.log(fecha);
    console.log(fecha2);
    const response = await pool.query(`SELECT
    CAST(c.id_campana as varchar) || '_' || c.nombre as nombreCampana,
    clte.tipo_documento as tipoDocAportante,
    clte.nro_documento as numDocAporta,
    clte.razon_social as razonSocial,
    tc.nombre as tipoGestion,
    cont.nombre as nombreContacto,
    cont.telefono_celular as telefono1,
    cont.numero_contacto as telefono2,
    cont.telefono_directo as telefono3,
    dg.num_real_marcado as numeroRealMarcado,
    ag.usuario as usuario,
    emp.descripcion as empresa,
    egpdg.nombre as padreTipificacion,
    egdg.nombre as tipificacion,
    dg.fecha_gestion as fechaGestion,
    c.id_campana as numeroCampana,
    replace(replace(replace(replace(replace(replace(dg.observacion,chr(10), ' '),chr(11),' '),chr(13),' '),chr(27),' '),chr(32),' '),chr(39),' ') as observacion,
    g.id_gestion as idGestion
    FROM gestion g
    INNER JOIN estado_gestion eg ON g.id_estado_gestion=eg.id_estado_gestion
    INNER JOIN campana c ON g.id_campana=c.id_campana
    INNER JOIN tipo_campana tc ON c.id_tipo_campana=tc.id_tipo_campana
    INNER JOIN detalle_gestion dg ON g.id_gestion=dg.id_gestion
    LEFT JOIN estado_gestion egdg ON dg.id_estado_gestion=egdg.id_estado_gestion
    LEFT JOIN estado_gestion egpdg ON egdg.id_estado_gestion_padre=egpdg.id_estado_gestion
    INNER JOIN cliente clte ON g.id_cliente=clte.id_cliente
    LEFT OUTER JOIN contacto cont ON g.id_gestion = cont.id_gestion AND clte.id_cliente = cont.id_cliente
    LEFT JOIN usuario ag ON dg.id_agente=ag.id_usuario
    INNER JOIN empresa emp ON ag.empresa=emp.id_empresa AND emp.pseudonimo='CONTACT'
    
    ORDER BY g.fecha_gestion limit 4`);
    if (res !== undefined) {
        return res.json(response.rows);
        
      }
    
} catch (error) {
    /**WHERE g.fecha_gestion  BETWEEN $1 AND $2/ */
    
    console.log(error); 
}
}

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
        const response = await pool.query('SELECT * FROM reportes where id between  ($1) and ($2)',[33,36] );
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
    postReportesGestion,
    postDetalleGestiones,
    getmonitoreo
    
    
    
}
