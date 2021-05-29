var nombre = 'Wolverine'
console.log(nombre)


let nombre2 = 'WOlverine2'

if(true){
    let nombre2 = 'Magneto'
    console.log(nombre2)
    // lo mismo pasa con el scope de las constantes const
}

console.log(nombre2)

// va a aparecerd undefined , si no tuviera la asignacion salta error
//  salta error directamente si es const o let si se define despues de llamar
console.log(nombre3)

var nombre3 = 'capo'