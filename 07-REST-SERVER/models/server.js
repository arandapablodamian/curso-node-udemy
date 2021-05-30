const express= require('express')
var cors = require('cors')


class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        // middleware
        this.middleware()
        // rutas de aplicación
        this.routes()
    }

    middleware() {
        this.app.use( cors() )
        this.app.use( express.static('public'))
    }

    routes(){
        this.app.get('/api', (req, res) => {
            res.json({
                'ok':true,
                "msg": "get api"
            })
        })

        this.app.put('/api', (req, res) => {
            res.json({
                'ok':true,
                "msg": "put api"
            })
        })


        this.app.post('/api', (req, res) => {
            res.json({
                'ok':true,
                "msg": "post api"
            })
        })

        this.app.delete('/api', (req, res) => {
            res.json({
                'ok':true,
                "msg": "delete api"
            })
        })

        this.app.get('/error', (req, res) => {
            res.status(403).json({
                'ok':false,
                "msg": "Error not found"
            })
        })
    }

    listen(){
        this.app.listen(this.port,() => {
           console.log('Servidor corriendo en el puerto: '+ this.port )
        })
    }
}

module.exports = Server
