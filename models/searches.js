
import axios from 'axios';

class Searches {

    history = ['Santiago', 'Madrid','San José'];

    constructor() {
        //TODO: leer db si existe
    }

    get paramsMapbox(){
        return{
            'language': 'en-es', //en%2Ces
            'access_token': 'pk.eyJ1IjoiYnJ5YW4tcGMiLCJhIjoiY2xhNzRrc3NvMDJ6djQxb3ozNW8zcnpwayJ9.-5db4LGACiAHDDwIWOwVxw' 
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

            //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/santiago.json?language=en%2Ces&access_token=pk.eyJ1IjoiYnJ5YW4tcGMiLCJhIjoiY2xhNzRrc3NvMDJ6djQxb3ozNW8zcnpwayJ9.-5db4LGACiAHDDwIWOwVxw')
            console.log(resp.data);

            return []
            
        } catch (error) {  
            return [];
        }


        


        //retorna los lugares que coincidan con el place ingresado
        return []; 
        
    }

}

export {Searches}