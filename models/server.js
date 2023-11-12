const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 3000;

/*         this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth'; */
        this.path={
            usuariosPath:'/api/usuarios',
            authPath:'/api/auth',
            uploader:'/api/uploader'
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes() {
        
        this.app.use( this.path.authPath, require('../routes/auth'));
        this.app.use( this.path.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.path.uploader, require('../routes/uploader'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
