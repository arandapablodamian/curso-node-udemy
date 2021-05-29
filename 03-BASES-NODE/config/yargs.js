const argv = require('yargs')
            .option('b',{
                alias: 'base',
                type: 'number',
                demandOption: true,
                describe: 'Es la base de la tabla de multiplicaciones'
            })
            .option('hasta',{
                alias: 'h',
                type: 'number',
                demandOption: true,
                describe: 'Es la hasta donde quieres la tabla'
            })
            .option('l',{
                alias: 'listar',
                type: 'boolean',
                demandOption: true,
                default: false,
                describe: 'Es la base que tiene que ser el número'

            })
            // .check( (argv,options) => {
            //     console.log('yargs',argv)
            //     if( isNaN(argv.b)){
            //         throw 'La base tiene que ser un número'
            //     }
            // })
            .argv

module.exports = argv;