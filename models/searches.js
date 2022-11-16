import axios from 'axios';
import capitalize from 'capitalize';
import * as fs from 'fs';

class Searches {

    history = [];
    dbPath = './db/database.json'

    constructor() {
        this.readDB();
    }

    get historyCapitalize(){
        // sin libreria capitalize
        // return this.history.map( place =>{
        //     let words = place.split(' ');
        //     words = words.map( w => w[0].toUpperCase() + w.substring(1) );

        //     return words.join(' ')
        // })

        return this.history.map( place =>{
            return capitalize.words(place);
        })
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
 
            
        } catch (error) {
            console.log(error);
            
        }

    }

    addHistory( place = ''){ 

    if ( this.history.includes(place.toLocaleLowerCase() )){
        return;
    }
    this.history = this.history.splice(0,5);

    this.history.unshift( place.toLocaleLowerCase() ); //añade al inicio

    //grabar en DB
    this.storeDB();

    }

    storeDB(){

        const payload = {
            history: this.history
        };

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ));
    }

    readDB(){
        // debe existir
        if ( !fs.existsSync(this.dbPath) ){ 
            return ;
        }
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });

        const data = JSON.parse(info); 
        
        this.history = data.history; 

    }



}

export {Searches}