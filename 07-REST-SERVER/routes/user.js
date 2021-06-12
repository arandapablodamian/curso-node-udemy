const { Router } = require('express')
const { check } = require('express-validator')
const { esRoleValido,emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')
// const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt')
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles')

// para llamar a los require de arriba pero en una sola vez e importados en el archivo index.js de la carpeta
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete } = require('../controllers/user.js')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut,[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos,
   
])


router.post('/', [

    check('nombre', 'El nombre es obligatoria').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', "El password debe ser mas de 6 letras").isLength({ min: 6 }),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    check('correo').custom(emailExiste),
    validarCampos

], usuariosPost)

router.delete('/:id',[
    // esAdminRole,
    tieneRole('ADMIN_ROLE',"VENTAS_ROLE"),
    validarJWT,
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
], usuariosDelete)

router.get('/error', (req, res) => {
    res.status(403).json({
        'ok': false,
        "msg": "Error not found"
    })
})

module.exports = router;