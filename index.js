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
          if (places.length === 0){
            console.log('Place not found!');
          }else{
            const idSel = await listPlaces(places)
            if (idSel === '0') continue;
            
            const placeSelected = places.find( p => p.id === idSel) 

            //guardar en DB
            searches.addHistory( placeSelected.name)
            
             
            //clima
            const weather = await searches.weatherPlace(placeSelected.lat, placeSelected.lng); 
            //console.log(weather);
            
  
            // mostrar resultados
            console.clear();
            console.log('\nInfo from the city\n'.green);
            console.log('City:', placeSelected.name);
            console.log('Lat:', placeSelected.lat);
            console.log('Lng:', placeSelected.lng);
            console.log('Temperature:', weather.temp);
            console.log('Minimum:', weather.min );
            console.log('Maximum:', weather.max);
            console.log('Weather:', weather.desc.green);
            
            
          } 
          break;

          case 2:
            // searches.history.forEach( (place, i) =>{ 
            searches.historyCapitalize.forEach( (place, i) =>{
              const idx = `${i+1}`.green;
              console.log(`${idx} ${ place}`);
              
            } )
            
          break;
      }


 
    if ( opt !== 0) await pause();

  } while(opt !== 0);
}

main();