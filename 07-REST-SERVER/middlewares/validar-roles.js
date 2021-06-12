const { response } = require("express")


const esAdminRole = (req, res = response, next) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin verificar el token primero'
        })
    }


    const {role , nombre } = req.usuario 

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }
    next()
}


const tieneRole = (...roles ) => {
    return(req, res = response, next) =>{

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin verificar el token primero'
            })
        }

        if( !roles.includes( req.usuario.rol )){
            return res.status(401).json({
                msg: `El msg require uno de estos roles ${roles}`
            })
        }
        // sino continuo con la ruta
        next()
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}