
import axios from 'axios';

class Searches {

    history = ['Santiago', 'Madrid','San José'];

    constructor() {
        //TODO: leer db si existe
    }

    async city( place = '' ){
        // peticion  http
        //console.log('City!: ', place);

        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2')
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