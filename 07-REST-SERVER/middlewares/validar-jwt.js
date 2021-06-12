
const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')


const validarJWT = async  ( req = request,res = response, next) =>{

    const token = req.header('x-token')
    console.log(token);


    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try{

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )

        req.uid = uid


        // leer el usuario que corresponde al uuid de la base para guardarlo 
        const usuario = await Usuario.findById( uid )

        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no válido ~ usuario no existe en la DB'
            })
        }
        // verificar si el usuario no tiene baja lógica
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido ~ usuario con estado: false'
            })
        }
        req.usuario = usuario

        next()
    }catch (error){
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
    next();
}

module.exports = {
    validarJWT
}