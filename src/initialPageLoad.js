
function initialPageLoad() {

    const body = document.querySelector('body');
    const mainElement = document.createElement('main');
    const forecastElement = document.createElement('div');


    //creating the left-side weather data display;
    const weatherDataElement = document.createElement('div'); 
    const tempHeading = document.createElement('h1');
    const tempChange = document.createElement('button');
    const conditionHeading = document.createElement('h2');
    const  maxMinElement = document.createElement('div');
    const feelsLikeElement = document.createElement('div');

    tempHeading.id = "current-temp";
    maxMinElement.id = "current-maxmin-temp";
    feelsLikeElement.id = "feels-like-temp";
    tempChange.setAttribute('type', 'submit');
    tempChange.id = "change-temp";
    tempChange.textContent = "change";

    const locationLabel = document.createElement('label');
    const locationInput = document.createElement('input');
    const searchButton = document.createElement('button');

    locationLabel.textContent = "Location:";
    locationLabel.setAttribute('for', 'location');

    Object.assign(locationInput, {
        id: 'location',
        name: 'location',
        type: 'text',
        required: true,
    });

    searchButton.textContent = "Go";
    searchButton.setAttribute('type', 'submit');
    searchButton.setAttribute('id', 'search-button');

    weatherDataElement.append(tempHeading, tempChange, conditionHeading, maxMinElement, feelsLikeElement, locationLabel, locationInput, searchButton);
    

    //creating the right-side data display
    const rightSideElement = document.createElement('div');
    const locationHeading = document.createElement('h1');
    const date_timeElement = document.createElement('div');
        const dateSpan = document.createElement('span');
        const timeSpan = document.createElement('span');
    
    date_timeElement.append(dateSpan, timeSpan);
    rightSideElement.append(locationHeading, date_timeElement);


    //creating the forecast
    //creating the daily forecast
    const dailyForecast = document.createElement('div');
    dailyForecast.id = "daily-forecast";
    console.log(dailyForecast);
    for(let i=0; i<7; i++){
        
        createDayElement(dailyForecast);
        
    }

    

    //creating the hourly forecast
    const hourlyForecast = document.createElement('div');

    forecastElement.append(dailyForecast);

    mainElement.append(weatherDataElement, rightSideElement);
    body.append(mainElement, forecastElement);

    
  
    tempHeading.textContent = "31 °C";
    conditionHeading.textContent = "Partly Cloudy";
    maxMinElement.textContent = "33°/24°";
    feelsLikeElement.textContent = "Feels like 34°";

    locationHeading.textContent = "Bhopal, India";
    dateSpan.textContent = "Thu,";
    timeSpan.textContent = " 11:38";

}

function createDayElement(element){
    

    const dayELements = document.createElement('div');
    dayELements.classList = "day-elements";
    const dayName = document.createElement('h2');
    dayName.classList = "day-names";
    const maxTemp = document.createElement('h2');
    maxTemp.classList = "max-temp-days";
    const minTemp = document.createElement('h3');
    minTemp.classList = "min-temp-days";


    dayName.textContent = "Thursday";
    maxTemp.textContent = "31°";
    minTemp.textContent = "23°";
   
    dayELements.append(dayName, maxTemp, minTemp);
   
    element.append(dayELements);
}
/* function someFunction(){
    const sho = document.getElementById('daily-forecast');
    console.log(sho);
} */


export default initialPageLoad;