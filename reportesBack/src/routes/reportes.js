const { Router } = require('express');

const { inicio,
        getReportes,
        postReportes,
        getReportesid, 
        getEstados,
        getReportesGestion,
        postReportesGestion
} = require ('../controllers/reportes');

const router = Router();

//gestorclientes
router.get('/', inicio );
router.get('/reportes', getReportes );
router.get('/reportes/:id', getReportesid );
router.post('/reportes', postReportes );
router.get('/gestion', getReportesGestion );
router.post('/gestion', postReportesGestion );



//contaccenter
router.get('/estados', getEstados );



//ejemplo
//router.get('/prueba', (req, res) => {
//    res.send('Hola humdo');
//});




module.exports = router

