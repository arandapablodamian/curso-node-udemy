const deadpol = {
    nombre: 'Wade',
    apellido: 'Wildson',
    poder: 'Regeneración',
    getNombre: function () {
        return `${this.nombre} ${this.apellido} ${this.poder}  `
    }
}

// const nombre = deadpol.nombre
// const apellido = deadpol.apellido
// const poder = deadpol.poder

const {nombre , apellido  , poder , edad = 0 } = deadpol


console.log(nombre, apellido , poder)


function imprimirHerore( {nombre, apellido, poder, edad = 0}){

    console.log(nombre,apellido,poder,edad)
}

imprimirHerore(deadpol)


const herores = ['Deadpoool', 'SUperman' , 'Batman']

const[,h2,h3] = herores


console.log(h2,h3)