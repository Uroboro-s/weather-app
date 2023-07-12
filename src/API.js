import {initialiseTemperatures} from './convert.js';
import {updatePage, showErrorMessage} from './UI';

async function getWeatherDataBYLocation(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e41da91f19cc43e683c105740232806&q=${location}&days=7`);
    const weatherData = await response.json();

    return weatherData;
}
function checkError(data){
    if(data.error && data.error.code == '1006')
        showErrorMessage();
    else{
        console.log(data);
        initialiseTemperatures(data);
        updatePage(data);
        }
}

async function intermediateFunction(location)
{
    let obj = await getWeatherDataBYLocation(location);
    checkError(obj);

    const x = new Date();
    
   
}

function getLocation() {
    const locationInput = document.getElementById('location');
    let location = locationInput.value;
    console.log(location);
    intermediateFunction('mumbai');
}

export default getLocation;