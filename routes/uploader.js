const { Router } = require('express');
const { check } = require('express-validator');
const { uploaderImage } = require('../controllers/uploader');
const { validarCampos } = require('../middlewares');



const router = Router();

router.post('/:coleccion/:id',[
    check('id','tiene que ser un id de mongo valido').isMongoId(),
    validarCampos
],uploaderImage);



module.exports = router;