import { getTemperatures } from "./convert";



function updatePage(data) {
    console.log(data);
    
    updateTemperatures(getTemperatures());
    console.log(data.forecast.forecastday[0].hour[1].temp_c);

}



function updateTemperatures(temp_data) {
    const tempHeading = document.getElementById('current-temp');
    const maxMinElement = document.getElementById('current-maxmin-temp');
    const feelsLikeElement = document.getElementById('feels-like-temp');

    tempHeading.textContent = temp_data[0] + "° " ;
    maxMinElement.textContent = temp_data[1] + "°/"+ temp_data[2] +"°";
    feelsLikeElement.textContent = "Feels like "+ temp_data[3] +"°";

    const dayNames = document.querySelectorAll('.day-names');
    const maxTempDays = document.querySelectorAll('.max-temp-days');
    const minTempDays = document.querySelectorAll('.min-temp-days');
    dayNames[0].textContent = "Today";
    dayNames[1].textContent = "Tomorrow";
    for (let index = 0; index < 7; index++) {
        if(index > 1){
            const d = new Date('2023-07-13');
            console.log(d.getDay());
            dayNames.textContent = d.getDay();
        }
        maxTempDays[index].textContent = temp_data[4][index] + "°";
        minTempDays[index].textContent = temp_data[5][index] + "°";
        
    }
   
}

function showErrorMessage() {
    alert('Location not found');
}




export {updatePage, showErrorMessage, updateTemperatures};