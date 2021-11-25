const { Router } = require('express');

const { inicio,
        getReportes,
        postReportes,
        getReportesid, 
        getEstados,
        getReportesGestion,
        postReportesGestion,
        postDetalleGestiones,
        getmonitoreo
} = require ('../controllers/reportes');

const router = Router();

//gestorclientes
router.get('/', inicio );
router.get('/repo/reportes', getReportes );
router.get('/repo/reportes/:id', getReportesid );
router.post('/reportes', postReportes );
router.get('/repo/gestion', getReportesGestion );
router.post('/gestion', postReportesGestion );
router.post('/detallegestiones', postDetalleGestiones );



//contaccenter
router.get('/estados', getEstados );
router.get('/moni/monitoreo', getmonitoreo );



//ejemplo
//router.get('/prueba', (req, res) => {
//    res.send('Hola humdo');
//});




module.exports = router

