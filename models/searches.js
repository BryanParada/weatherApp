
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

            return []
            
        } catch (error) {  
            return [];
        }


        


        //retorna los lugares que coincidan con el place ingresado
        return []; 
        
    }

}

export {Searches}