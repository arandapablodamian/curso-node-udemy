const axios = require('axios')

class Busquedas {
    historial = ["Tegucigalpa",'Madrid', 'San Jośe']

    constructor(){
        // leer db si existe
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'languague':'es'
        }
    }

    get paramsWeather(){
        return {
            appid: process.env.OPEN_WHEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }
    async ciudad (lugar = ''){

        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapBox
        })

        const resp = await instance.get()

        return resp.data.features.map( lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]
        }))
        // console.log('ciudad', lugar)
        // peticion http
        console.log('aca')
        console.log(resp.data)

        return []
    }

    async climaLugar ( lat, lon ){
        try{

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather , lat, lon }
            })
            
            const resp = await instance.get()
            const {weather, main} = resp.data
            console.log(resp)

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error){
            console.log(error)
        }
    }

}



module.exports = Busquedas;