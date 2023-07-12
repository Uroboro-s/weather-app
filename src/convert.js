

//all operations on unit conversion AND storing
//required temperatures in a different array will be
// done here.
//DOM manipulation will not be handled here
import {updateTemperatures} from './UI';

let temperatures = [];
let unit = 'C';

//to be run when new location is detected???
function initialiseTemperatures(data) {
    temperatures = [data.current.temp_c, data.forecast.forecastday[0].day.mintemp_c, data.forecast.forecastday[0].day.maxtemp_c, data.current.feelslike_c,[
         data.forecast.forecastday[0].day.maxtemp_c,
         data.forecast.forecastday[1].day.maxtemp_c,
         data.forecast.forecastday[2].day.maxtemp_c,
         data.forecast.forecastday[3].day.maxtemp_c,
         data.forecast.forecastday[4].day.maxtemp_c,        
         data.forecast.forecastday[5].day.maxtemp_c,
         data.forecast.forecastday[6].day.maxtemp_c
    ],
    [
        data.forecast.forecastday[0].day.mintemp_c,
        data.forecast.forecastday[1].day.mintemp_c,
        data.forecast.forecastday[2].day.mintemp_c,
        data.forecast.forecastday[3].day.mintemp_c,
        data.forecast.forecastday[4].day.mintemp_c,
        data.forecast.forecastday[5].day.mintemp_c,
        data.forecast.forecastday[6].day.mintemp_c
    ]]
    console.log(temperatures);
    
}

//intermmediate function for  converting temperatures
function changeTemperatures() {

    convertTemperatures(temperatures);
    updateTemperatures(temperatures);
}


function convertTemperatures(temperatures) {
    if(getCurrentUnit() == 'C'){
        for (let index = 0; index < temperatures.length; index++) {
            let element = temperatures[index];
            element = 1.8*element + 32;
            temperatures[index] = element.toFixed(1);
            
        }
    }
    else {
        for (let index = 0; index < temperatures.length; index++) {
            let element = temperatures[index];
            element = 5*(element-32)/9;
            temperatures[index] = element.toFixed(1);
            
        }
    }
    changeUnit();
    console.log(temperatures);
}
function getTemperatures(){
    return temperatures;
}
function changeUnit() {
    if(unit == 'C')
        unit = 'F';
    else
        unit = 'C';
}
function getCurrentUnit(){
    return unit;
}

export {convertTemperatures, initialiseTemperatures, changeTemperatures, getTemperatures};