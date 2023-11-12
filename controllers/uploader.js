const { response, request } = require("express")

const uploaderImage =async(req=request,res=response)=>{

    const {coleccion,id}=req.params;
    const data=req.files.archivo
    console.log(data);

    res.json({
        msg:'subiendoimg',
        coleccion,
        id
    })


}

module.exports={
    uploaderImage
}