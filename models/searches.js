
import axios from 'axios';

class Searches {

    history = ['Santiago', 'Madrid','San José'];

    constructor() {
        //TODO: leer db si existe
    }

    get paramsMapbox(){
        return{
            'language': 'es', //en%2Ces
            'access_token': process.env.MAPBOX_KEY
        } 
    }
 
    get paramsWeather(){
        return{
            'lang': 'en', 
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        } 
    }

    async city( place = '' ){
        // peticion  http
        //console.log('City!: ', place);
  
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            });
 
            const resp = await instance.get(); 
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name_es,
                lng: place.center[0],
                lat: place.center[1],

            }));
 
            
        } catch (error) {  
            return [];
        }  
        
    }

    async weatherPlace( lat, lon){

        try {
            // instance axios.create
            const instance = axios.create({ 
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,  
                params: {...this.paramsWeather, lat, lon}
            });
            // resp.data
            const resp = await instance.get(); 
            
            const {weather, main} = resp.data
            
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

            // return resp.data.weather.map( weather, main => ({
            //     desc: weather.description,
            //     min: main.temp_min,
            //     max: main.temp_max,
            //     temp: main.temp

            // }));

        // return {
        //     desc: '',
        //     min: '',
        //     max: '',
        //     desc: ''
        // }
            
        } catch (error) {
            console.log(error);
            
        }

    }



}

export {Searches}