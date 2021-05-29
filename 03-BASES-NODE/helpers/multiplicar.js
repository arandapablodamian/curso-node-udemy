
const fs = require('fs')
const colors = require('colors')


const crearArchivo = async (base = 5, listar = false, hasta = 10) => {
    try {
        let salida = ''
        for (let index = 0; index < hasta; index++) {
            salida += `$(base) x ${index} = ${base * index} \n`
        }
        if (listar) {
            console.log('==========================='.green)
            console.log(' Tabla del '.green, colors.blue(base))
            console.log('==================================')
            console.log(salida)

        }
        fs.writeFileSync(`salida/tabla-${base}.txt`, salida)
        return `tabla-${base}.txt`
    }catch (error) {
        throw error
    }
}


module.exports = {
    crearArchivo
}