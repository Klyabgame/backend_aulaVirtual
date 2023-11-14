const { Router } = require('express');
const { check } = require('express-validator');
const { uploaderImage, updateImage } = require('../controllers/uploader');
const { validarCampos, validarJWT } = require('../middlewares');



const router = Router();

router.put('/:coleccion/:id',[
    validarJWT,
    check('id','tiene que ser un id de mongo valido').isMongoId(),
    validarCampos
],updateImage);



module.exports = router;