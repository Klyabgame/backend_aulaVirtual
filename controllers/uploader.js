const { response, request } = require("express")
const { v4: uuidv4 } = require('uuid');


const extensionesValidas=['jpg','png,PNG,GIF,TIFF,PSD,RAW'];

const uploaderImage =async(req=request,res=response)=>{

    const {coleccion,id}=req.params;
    const {name,tempFilePath}=req.files.archivo
    const nameArray=name.split('.');
    const nameImg=uuidv4();
    const nameType=nameArray[nameArray.length-1];
    const urlImg=nameImg+'.'+nameType;
    console.log(urlImg);

    res.json({
        msg:'subiendoimg',
        coleccion,
        id
    })


}

module.exports={
    uploaderImage
}