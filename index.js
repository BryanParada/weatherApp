import {inquirerMenu,
        readInput,
        pause,
        listPlaces } from './helpers/inquirer.js';
import { Searches } from './models/searches.js';
import {} from 'dotenv/config'
  
const main = async() =>{ 

    const searches = new Searches();

    let opt;
    
    do{ 
      opt = await inquirerMenu();  
      
      switch(opt) {

        case 1:
          // mostrar mensaje
          const term = await readInput('City: ');
 
          // buscar los lugares
          const places = await searches.city( term );
           
          //seleccionar el lugar
          const idSel = await listPlaces(places)
          const placeSelected = places.find( p => p.id === idSel) 
          

          //clima

          // mostrar resultados
          console.log('\nInfo from the city\n'.green);
          console.log('City:', placeSelected.name);
          console.log('Lat:', placeSelected.lat);
          console.log('Lng:', placeSelected.lng);
          console.log('Temperature:', );
          console.log('Minimum:', );
          console.log('Maximum:', );
          
          
          

          break;
      }


 
    if ( opt !== 0) await pause();

  } while(opt !== 0);
}

main();