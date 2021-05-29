require('dotenv').config()


const { leerInput, inquirerMenu, pausa,listarLugares } = require("./helpers/inquirer")
const Busquedas = require("./models/busquedas")


// console.log(process.env.MAPBOX_KEY)

const main = async() => {
    const busquedas = new Busquedas()

    let opt


    do{
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                // mostrar mensaje
                const termino = await leerInput('Ciudad: ')
                const lugares = await busquedas.ciudad(termino)
                const idSeleccionado = await listarLugares(lugares)

                const lugarSel = lugares.find( l => l.id === idSeleccionado)

                console.log({ lugarSel })


                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
                console.log(clima)

                // buscar el lugar


                // seleccionar el lugar

                // clima

                // mostrar resultados

                console.log('\nInformacion del a ciudad\n'.green)
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:',lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Como está el clima', clima.desc)
                break;
        
            default:
                break;
        }

        
        // console.log({opt})
        if( opt !== 0 ) await pausa()
    }while ( opt !== 0 )
}

main()