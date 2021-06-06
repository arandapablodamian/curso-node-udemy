
const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const{validationResult } = require('express-validator')

const usuariosGet = async (req = request, res = response ) => {

    // const { q, nombre = 'No name', apikey, page = 1 , limit } = req.query
    const {limite = 5, desde = 0 } = req.query

    const query = { estado: true}
    // const usuarios = await Usuario.find(query)
    //     .limit(Number(limite))
    //     .skip(Number(desde))

    // const total = await Usuario.countDocuments(query)



    // res.json({
    //     total,
    //     usuarios
    // })


    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
    ])

    res.json({
        total,
        usuarios
    })
//     res.json({
//         "msg": "get api - controlador",
//         q,
//         nombre,
//         apikey,
//         page,
//         limit
//     })

}

const usuariosPost = async (req, res = response ) => {


    const {nombre, correo, password, rol } = req.body

    const usuario = new Usuario(nombre, correo, password, rol )
    
    
    // encriptar la contraseña
    const salt = bcrypt.salt()
    usuario.password = bcrypt.hashSync(password, salt)

    
    usuario.save()

    res.json({
        "msg": "post api - usuariosPost",
        usuario
    })
}


const usuariosPut= async(req, res = response ) => {

    const  { id } = req.params.id

    const {_id, password, google,correo, ...resto} = req.body

    //validar contra base de datos

    if( password){
        // encriptar la contraseña
        const salt = bcrypt.salt()
        resto.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)


    res.json({
        "msg": "put api - usuariosPUT",
        id
    })
}

const usuariosDelete = async (req, res = response ) => {

    const { id } = req.params;

    // const usuario = await Usuario.findByIdAndDelete( id )
    // baja logica por defecto traigo el estado en false
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json({
        usuario
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}