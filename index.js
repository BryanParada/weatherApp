import {
    leerInput } from './helpers/inquirer.js';

const main = async() =>{
    
    const text = await leerInput('Hi: ')

    console.log(text);
    
}

main();