const express= require('express')
var cors = require('cors')
const { dbConnection } = require('../database/config')


class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // conectar a base de datos
        this.conectarDB()
        // middleware
        this.middleware()
        // rutas de aplicación
        this.routes()
    }

    async conectarDB(){
        await dbConnection();
    }
    middleware() {
        this.app.use( cors() )

        // parseo y lectura del body
        this.app.use( express.json())
        
        this.app.use( express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port,() => {
           console.log('Servidor corriendo en el puerto: '+ this.port )
        })
    }
}

module.exports = Server
