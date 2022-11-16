import {inquirerMenu,
        readInput,
        pause } from './helpers/inquirer.js';
import { Searches } from './models/searches.js';

const main = async() =>{
    
    const searches = new Searches();

    let opt;
    
    do{ 
      opt = await inquirerMenu();  
      
      switch(opt) {

        case 1:
          // mostrar mensaje
          const place = await readInput('City: ');
          await searches.city( place );

          // buscar los lugares

          //seleccionar el lugar

          //clima

          // mostrar resultados
          console.log('\nInfo from the city\n'.green);
          console.log('City:', );
          console.log('Lat:', );
          console.log('Lng:', );
          console.log('Temperature:', );
          console.log('Minimum:', );
          console.log('Maximum:', );
          
          
          

          break;
      }


 
    if ( opt !== 0) await pause();

  } while(opt !== 0);
}

main();