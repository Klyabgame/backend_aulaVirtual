const { response, request } = require("express")
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2

const Usuario=require('../models/usuario');


const extensionesValidas=['jpg','png,PNG,GIF,TIFF,PSD,RAW'];

const coleccionesPermitidas=[
    'usuarios'
]

const uploaderImage =async(req=request,res=response)=>{

    const {coleccion,id}=req.params;
    let model;
    switch (coleccion) {
        case 'usuarios':
             model=await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg:'el usuario ingresado no se encontro en la bd'
                })
            }
            break;
    
        default:
            return res.status(400).json({
                msg:'no se encontraron en las colecciones'
            })
    }

    const {name,tempFilePath}=req.files.archivo

    const nameArray=name.split('.');
    const nameImg=uuidv4();
    const nameType=nameArray[nameArray.length-1];
    const urlImg=nameImg+'.'+nameType;

    //const algo=archivo.join(__dirname,'../uploader',urlImg);
    const {secure_url}=await cloudinary.uploader.upload(tempFilePath);

    model.img=secure_url;
    model.save();

    res.json({
        mod:model
    })


}

module.exports={
    uploaderImage
}