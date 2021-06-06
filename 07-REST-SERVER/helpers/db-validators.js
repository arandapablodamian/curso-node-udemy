const Role = require('../models/role')
const Usuario = require('../models/usuario')


const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({ rol })
    if( !existeRol){
        throw new Error (`El rol ${rol} no esta registrado en la BD` )
    }
}


const emailExiste = async(correo = '') =>{
    // verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    if( existeEmail) {
        throw new Error(`Ese correo ${correo}, ya está registrado`)
    }
}


const existeUsuarioPorId = async(id = '') =>{
    // verificar si el correo existe
    const existeUsuario = await Usuario.findOneById({id})
    if( existeUsuario) {
        throw new Error(`Este id no existe ${id}`)
    }
}

module.exports = {
   esRoleValido,
   emailExiste,
   existeUsuarioPorId
}