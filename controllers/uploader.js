const { response, request } = require("express");
const cloudinary = require('cloudinary').v2;

const Usuario=require('../models/usuario');

const uploaderImage =async(req=request,res=response)=>{
    res.json({ msg:"uploaderImage"})
}

const updateImage=async(req=request,res=response)=>{
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
                msg:'coleccion no valida'
            })
    }

    //borrar imagenes repetidas
    if (model.img) {
        //borrar la imagen del servidor
        const nombreArr=model.img.split('/');
        const nombre=nombreArr[nombreArr.length - 1];
        const [img_id]=nombre.split('.');
        await cloudinary.uploader.destroy(img_id);
    
      }


    const {tempFilePath}=req.files.archivo

    //const algo=archivo.join(__dirname,'../uploader',urlImg);
    const {secure_url}=await cloudinary.uploader.upload(tempFilePath);

    model.img=secure_url;
    await model.save();

    res.json({
        mod:model
    })

}

module.exports={
    uploaderImage,
    updateImage
}