/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/API.js":
/*!********************!*\
  !*** ./src/API.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _convert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert.js */ "./src/convert.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.js");



async function getWeatherDataBYLocation(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e41da91f19cc43e683c105740232806&q=${location}&days=7`);
    const weatherData = await response.json();

    return weatherData;
}
function checkError(data){
    if(data.error && data.error.code == '1006')
        (0,_UI__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)();
    else{
        console.log(data);
        (0,_convert_js__WEBPACK_IMPORTED_MODULE_0__.initialiseTemperatures)(data);
        (0,_UI__WEBPACK_IMPORTED_MODULE_1__.updatePage)(data);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLocation);

/***/ }),

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showErrorMessage: () => (/* binding */ showErrorMessage),
/* harmony export */   updatePage: () => (/* binding */ updatePage),
/* harmony export */   updateTemperatures: () => (/* binding */ updateTemperatures)
/* harmony export */ });
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert */ "./src/convert.js");




function updatePage(data) {
    console.log(data);
    
    updateTemperatures((0,_convert__WEBPACK_IMPORTED_MODULE_0__.getTemperatures)());
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






/***/ }),

/***/ "./src/convert.js":
/*!************************!*\
  !*** ./src/convert.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeTemperatures: () => (/* binding */ changeTemperatures),
/* harmony export */   convertTemperatures: () => (/* binding */ convertTemperatures),
/* harmony export */   getTemperatures: () => (/* binding */ getTemperatures),
/* harmony export */   initialiseTemperatures: () => (/* binding */ initialiseTemperatures)
/* harmony export */ });
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


//all operations on unit conversion AND storing
//required temperatures in a different array will be
// done here.
//DOM manipulation will not be handled here


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
    (0,_UI__WEBPACK_IMPORTED_MODULE_0__.updateTemperatures)(temperatures);
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



/***/ }),

/***/ "./src/initialPageLoad.js":
/*!********************************!*\
  !*** ./src/initialPageLoad.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initialPageLoad);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _initialPageLoad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initialPageLoad */ "./src/initialPageLoad.js");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./API */ "./src/API.js");
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./convert */ "./src/convert.js");




(0,_initialPageLoad__WEBPACK_IMPORTED_MODULE_0__["default"])();

const button = document.getElementById('search-button');
button.addEventListener('click', _API__WEBPACK_IMPORTED_MODULE_1__["default"]);


document.getElementById('change-temp').addEventListener('click', _convert__WEBPACK_IMPORTED_MODULE_2__.changeTemperatures);

(0,_API__WEBPACK_IMPORTED_MODULE_1__["default"])();

    



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW9EO0FBQ0Y7QUFDbEQ7QUFDQTtBQUNBLHNIQUFzSCxTQUFTO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscURBQWdCO0FBQ3hCO0FBQ0E7QUFDQSxRQUFRLG1FQUFzQjtBQUM5QixRQUFRLCtDQUFVO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDa0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlEQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsV0FBVztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNkJBQTZCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDZCQUE2QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLEtBQUs7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLGlFQUFlLGVBQWU7Ozs7OztVQ3BIOUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTmdEO0FBQ2hCO0FBQ2U7QUFDL0M7QUFDQSw0REFBZTtBQUNmO0FBQ0E7QUFDQSxpQ0FBaUMsNENBQVc7QUFDNUM7QUFDQTtBQUNBLGlFQUFpRSx3REFBa0I7QUFDbkY7QUFDQSxnREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL1VJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5pdGlhbFBhZ2VMb2FkLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbml0aWFsaXNlVGVtcGVyYXR1cmVzfSBmcm9tICcuL2NvbnZlcnQuanMnO1xyXG5pbXBvcnQge3VwZGF0ZVBhZ2UsIHNob3dFcnJvck1lc3NhZ2V9IGZyb20gJy4vVUknO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGFCWUxvY2F0aW9uKGxvY2F0aW9uKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1lNDFkYTkxZjE5Y2M0M2U2ODNjMTA1NzQwMjMyODA2JnE9JHtsb2NhdGlvbn0mZGF5cz03YCk7XHJcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XHJcbn1cclxuZnVuY3Rpb24gY2hlY2tFcnJvcihkYXRhKXtcclxuICAgIGlmKGRhdGEuZXJyb3IgJiYgZGF0YS5lcnJvci5jb2RlID09ICcxMDA2JylcclxuICAgICAgICBzaG93RXJyb3JNZXNzYWdlKCk7XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIGluaXRpYWxpc2VUZW1wZXJhdHVyZXMoZGF0YSk7XHJcbiAgICAgICAgdXBkYXRlUGFnZShkYXRhKTtcclxuICAgICAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGludGVybWVkaWF0ZUZ1bmN0aW9uKGxvY2F0aW9uKVxyXG57XHJcbiAgICBsZXQgb2JqID0gYXdhaXQgZ2V0V2VhdGhlckRhdGFCWUxvY2F0aW9uKGxvY2F0aW9uKTtcclxuICAgIGNoZWNrRXJyb3Iob2JqKTtcclxuXHJcbiAgICBjb25zdCB4ID0gbmV3IERhdGUoKTtcclxuICAgIFxyXG4gICBcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9jYXRpb24oKSB7XHJcbiAgICBjb25zdCBsb2NhdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uJyk7XHJcbiAgICBsZXQgbG9jYXRpb24gPSBsb2NhdGlvbklucHV0LnZhbHVlO1xyXG4gICAgY29uc29sZS5sb2cobG9jYXRpb24pO1xyXG4gICAgaW50ZXJtZWRpYXRlRnVuY3Rpb24oJ211bWJhaScpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRMb2NhdGlvbjsiLCJpbXBvcnQgeyBnZXRUZW1wZXJhdHVyZXMgfSBmcm9tIFwiLi9jb252ZXJ0XCI7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVBhZ2UoZGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBcclxuICAgIHVwZGF0ZVRlbXBlcmF0dXJlcyhnZXRUZW1wZXJhdHVyZXMoKSk7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMV0udGVtcF9jKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVGVtcGVyYXR1cmVzKHRlbXBfZGF0YSkge1xyXG4gICAgY29uc3QgdGVtcEhlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC10ZW1wJyk7XHJcbiAgICBjb25zdCBtYXhNaW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnQtbWF4bWluLXRlbXAnKTtcclxuICAgIGNvbnN0IGZlZWxzTGlrZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlbHMtbGlrZS10ZW1wJyk7XHJcblxyXG4gICAgdGVtcEhlYWRpbmcudGV4dENvbnRlbnQgPSB0ZW1wX2RhdGFbMF0gKyBcIsKwIFwiIDtcclxuICAgIG1heE1pbkVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZW1wX2RhdGFbMV0gKyBcIsKwL1wiKyB0ZW1wX2RhdGFbMl0gK1wiwrBcIjtcclxuICAgIGZlZWxzTGlrZUVsZW1lbnQudGV4dENvbnRlbnQgPSBcIkZlZWxzIGxpa2UgXCIrIHRlbXBfZGF0YVszXSArXCLCsFwiO1xyXG5cclxuICAgIGNvbnN0IGRheU5hbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRheS1uYW1lcycpO1xyXG4gICAgY29uc3QgbWF4VGVtcERheXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWF4LXRlbXAtZGF5cycpO1xyXG4gICAgY29uc3QgbWluVGVtcERheXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWluLXRlbXAtZGF5cycpO1xyXG4gICAgZGF5TmFtZXNbMF0udGV4dENvbnRlbnQgPSBcIlRvZGF5XCI7XHJcbiAgICBkYXlOYW1lc1sxXS50ZXh0Q29udGVudCA9IFwiVG9tb3Jyb3dcIjtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA3OyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYoaW5kZXggPiAxKXtcclxuICAgICAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCcyMDIzLTA3LTEzJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQuZ2V0RGF5KCkpO1xyXG4gICAgICAgICAgICBkYXlOYW1lcy50ZXh0Q29udGVudCA9IGQuZ2V0RGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1heFRlbXBEYXlzW2luZGV4XS50ZXh0Q29udGVudCA9IHRlbXBfZGF0YVs0XVtpbmRleF0gKyBcIsKwXCI7XHJcbiAgICAgICAgbWluVGVtcERheXNbaW5kZXhdLnRleHRDb250ZW50ID0gdGVtcF9kYXRhWzVdW2luZGV4XSArIFwiwrBcIjtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dFcnJvck1lc3NhZ2UoKSB7XHJcbiAgICBhbGVydCgnTG9jYXRpb24gbm90IGZvdW5kJyk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7dXBkYXRlUGFnZSwgc2hvd0Vycm9yTWVzc2FnZSwgdXBkYXRlVGVtcGVyYXR1cmVzfTsiLCJcclxuXHJcbi8vYWxsIG9wZXJhdGlvbnMgb24gdW5pdCBjb252ZXJzaW9uIEFORCBzdG9yaW5nXHJcbi8vcmVxdWlyZWQgdGVtcGVyYXR1cmVzIGluIGEgZGlmZmVyZW50IGFycmF5IHdpbGwgYmVcclxuLy8gZG9uZSBoZXJlLlxyXG4vL0RPTSBtYW5pcHVsYXRpb24gd2lsbCBub3QgYmUgaGFuZGxlZCBoZXJlXHJcbmltcG9ydCB7dXBkYXRlVGVtcGVyYXR1cmVzfSBmcm9tICcuL1VJJztcclxuXHJcbmxldCB0ZW1wZXJhdHVyZXMgPSBbXTtcclxubGV0IHVuaXQgPSAnQyc7XHJcblxyXG4vL3RvIGJlIHJ1biB3aGVuIG5ldyBsb2NhdGlvbiBpcyBkZXRlY3RlZD8/P1xyXG5mdW5jdGlvbiBpbml0aWFsaXNlVGVtcGVyYXR1cmVzKGRhdGEpIHtcclxuICAgIHRlbXBlcmF0dXJlcyA9IFtkYXRhLmN1cnJlbnQudGVtcF9jLCBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2MsIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfYywgZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jLFtcclxuICAgICAgICAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jLFxyXG4gICAgICAgICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5tYXh0ZW1wX2MsXHJcbiAgICAgICAgIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1heHRlbXBfYyxcclxuICAgICAgICAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVszXS5kYXkubWF4dGVtcF9jLFxyXG4gICAgICAgICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzRdLmRheS5tYXh0ZW1wX2MsICAgICAgICBcclxuICAgICAgICAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVs1XS5kYXkubWF4dGVtcF9jLFxyXG4gICAgICAgICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzZdLmRheS5tYXh0ZW1wX2NcclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9jLFxyXG4gICAgICAgIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1pbnRlbXBfYyxcclxuICAgICAgICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5taW50ZW1wX2MsXHJcbiAgICAgICAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVszXS5kYXkubWludGVtcF9jLFxyXG4gICAgICAgIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbNF0uZGF5Lm1pbnRlbXBfYyxcclxuICAgICAgICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzVdLmRheS5taW50ZW1wX2MsXHJcbiAgICAgICAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVs2XS5kYXkubWludGVtcF9jXHJcbiAgICBdXVxyXG4gICAgY29uc29sZS5sb2codGVtcGVyYXR1cmVzKTtcclxuICAgIFxyXG59XHJcblxyXG4vL2ludGVybW1lZGlhdGUgZnVuY3Rpb24gZm9yICBjb252ZXJ0aW5nIHRlbXBlcmF0dXJlc1xyXG5mdW5jdGlvbiBjaGFuZ2VUZW1wZXJhdHVyZXMoKSB7XHJcblxyXG4gICAgY29udmVydFRlbXBlcmF0dXJlcyh0ZW1wZXJhdHVyZXMpO1xyXG4gICAgdXBkYXRlVGVtcGVyYXR1cmVzKHRlbXBlcmF0dXJlcyk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjb252ZXJ0VGVtcGVyYXR1cmVzKHRlbXBlcmF0dXJlcykge1xyXG4gICAgaWYoZ2V0Q3VycmVudFVuaXQoKSA9PSAnQycpe1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZW1wZXJhdHVyZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGVtcGVyYXR1cmVzW2luZGV4XTtcclxuICAgICAgICAgICAgZWxlbWVudCA9IDEuOCplbGVtZW50ICsgMzI7XHJcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlc1tpbmRleF0gPSBlbGVtZW50LnRvRml4ZWQoMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZW1wZXJhdHVyZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGVtcGVyYXR1cmVzW2luZGV4XTtcclxuICAgICAgICAgICAgZWxlbWVudCA9IDUqKGVsZW1lbnQtMzIpLzk7XHJcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlc1tpbmRleF0gPSBlbGVtZW50LnRvRml4ZWQoMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoYW5nZVVuaXQoKTtcclxuICAgIGNvbnNvbGUubG9nKHRlbXBlcmF0dXJlcyk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0VGVtcGVyYXR1cmVzKCl7XHJcbiAgICByZXR1cm4gdGVtcGVyYXR1cmVzO1xyXG59XHJcbmZ1bmN0aW9uIGNoYW5nZVVuaXQoKSB7XHJcbiAgICBpZih1bml0ID09ICdDJylcclxuICAgICAgICB1bml0ID0gJ0YnO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHVuaXQgPSAnQyc7XHJcbn1cclxuZnVuY3Rpb24gZ2V0Q3VycmVudFVuaXQoKXtcclxuICAgIHJldHVybiB1bml0O1xyXG59XHJcblxyXG5leHBvcnQge2NvbnZlcnRUZW1wZXJhdHVyZXMsIGluaXRpYWxpc2VUZW1wZXJhdHVyZXMsIGNoYW5nZVRlbXBlcmF0dXJlcywgZ2V0VGVtcGVyYXR1cmVzfTsiLCJcclxuZnVuY3Rpb24gaW5pdGlhbFBhZ2VMb2FkKCkge1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICBjb25zdCBtYWluRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcclxuICAgIGNvbnN0IGZvcmVjYXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHJcbiAgICAvL2NyZWF0aW5nIHRoZSBsZWZ0LXNpZGUgd2VhdGhlciBkYXRhIGRpc3BsYXk7XHJcbiAgICBjb25zdCB3ZWF0aGVyRGF0YUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgXHJcbiAgICBjb25zdCB0ZW1wSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XHJcbiAgICBjb25zdCB0ZW1wQ2hhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBjb25kaXRpb25IZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIGNvbnN0ICBtYXhNaW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBmZWVsc0xpa2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgdGVtcEhlYWRpbmcuaWQgPSBcImN1cnJlbnQtdGVtcFwiO1xyXG4gICAgbWF4TWluRWxlbWVudC5pZCA9IFwiY3VycmVudC1tYXhtaW4tdGVtcFwiO1xyXG4gICAgZmVlbHNMaWtlRWxlbWVudC5pZCA9IFwiZmVlbHMtbGlrZS10ZW1wXCI7XHJcbiAgICB0ZW1wQ2hhbmdlLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcclxuICAgIHRlbXBDaGFuZ2UuaWQgPSBcImNoYW5nZS10ZW1wXCI7XHJcbiAgICB0ZW1wQ2hhbmdlLnRleHRDb250ZW50ID0gXCJjaGFuZ2VcIjtcclxuXHJcbiAgICBjb25zdCBsb2NhdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIGNvbnN0IGxvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgY29uc3Qgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgbG9jYXRpb25MYWJlbC50ZXh0Q29udGVudCA9IFwiTG9jYXRpb246XCI7XHJcbiAgICBsb2NhdGlvbkxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ2xvY2F0aW9uJyk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihsb2NhdGlvbklucHV0LCB7XHJcbiAgICAgICAgaWQ6ICdsb2NhdGlvbicsXHJcbiAgICAgICAgbmFtZTogJ2xvY2F0aW9uJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICBzZWFyY2hCdXR0b24udGV4dENvbnRlbnQgPSBcIkdvXCI7XHJcbiAgICBzZWFyY2hCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xyXG4gICAgc2VhcmNoQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2VhcmNoLWJ1dHRvbicpO1xyXG5cclxuICAgIHdlYXRoZXJEYXRhRWxlbWVudC5hcHBlbmQodGVtcEhlYWRpbmcsIHRlbXBDaGFuZ2UsIGNvbmRpdGlvbkhlYWRpbmcsIG1heE1pbkVsZW1lbnQsIGZlZWxzTGlrZUVsZW1lbnQsIGxvY2F0aW9uTGFiZWwsIGxvY2F0aW9uSW5wdXQsIHNlYXJjaEJ1dHRvbik7XHJcbiAgICBcclxuXHJcbiAgICAvL2NyZWF0aW5nIHRoZSByaWdodC1zaWRlIGRhdGEgZGlzcGxheVxyXG4gICAgY29uc3QgcmlnaHRTaWRlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgbG9jYXRpb25IZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgIGNvbnN0IGRhdGVfdGltZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBkYXRlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCB0aW1lU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIFxyXG4gICAgZGF0ZV90aW1lRWxlbWVudC5hcHBlbmQoZGF0ZVNwYW4sIHRpbWVTcGFuKTtcclxuICAgIHJpZ2h0U2lkZUVsZW1lbnQuYXBwZW5kKGxvY2F0aW9uSGVhZGluZywgZGF0ZV90aW1lRWxlbWVudCk7XHJcblxyXG5cclxuICAgIC8vY3JlYXRpbmcgdGhlIGZvcmVjYXN0XHJcbiAgICAvL2NyZWF0aW5nIHRoZSBkYWlseSBmb3JlY2FzdFxyXG4gICAgY29uc3QgZGFpbHlGb3JlY2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGFpbHlGb3JlY2FzdC5pZCA9IFwiZGFpbHktZm9yZWNhc3RcIjtcclxuICAgIGNvbnNvbGUubG9nKGRhaWx5Rm9yZWNhc3QpO1xyXG4gICAgZm9yKGxldCBpPTA7IGk8NzsgaSsrKXtcclxuICAgICAgICBcclxuICAgICAgICBjcmVhdGVEYXlFbGVtZW50KGRhaWx5Rm9yZWNhc3QpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vY3JlYXRpbmcgdGhlIGhvdXJseSBmb3JlY2FzdFxyXG4gICAgY29uc3QgaG91cmx5Rm9yZWNhc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICBmb3JlY2FzdEVsZW1lbnQuYXBwZW5kKGRhaWx5Rm9yZWNhc3QpO1xyXG5cclxuICAgIG1haW5FbGVtZW50LmFwcGVuZCh3ZWF0aGVyRGF0YUVsZW1lbnQsIHJpZ2h0U2lkZUVsZW1lbnQpO1xyXG4gICAgYm9keS5hcHBlbmQobWFpbkVsZW1lbnQsIGZvcmVjYXN0RWxlbWVudCk7XHJcblxyXG4gICAgXHJcbiAgXHJcbiAgICB0ZW1wSGVhZGluZy50ZXh0Q29udGVudCA9IFwiMzEgwrBDXCI7XHJcbiAgICBjb25kaXRpb25IZWFkaW5nLnRleHRDb250ZW50ID0gXCJQYXJ0bHkgQ2xvdWR5XCI7XHJcbiAgICBtYXhNaW5FbGVtZW50LnRleHRDb250ZW50ID0gXCIzM8KwLzI0wrBcIjtcclxuICAgIGZlZWxzTGlrZUVsZW1lbnQudGV4dENvbnRlbnQgPSBcIkZlZWxzIGxpa2UgMzTCsFwiO1xyXG5cclxuICAgIGxvY2F0aW9uSGVhZGluZy50ZXh0Q29udGVudCA9IFwiQmhvcGFsLCBJbmRpYVwiO1xyXG4gICAgZGF0ZVNwYW4udGV4dENvbnRlbnQgPSBcIlRodSxcIjtcclxuICAgIHRpbWVTcGFuLnRleHRDb250ZW50ID0gXCIgMTE6MzhcIjtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURheUVsZW1lbnQoZWxlbWVudCl7XHJcbiAgICBcclxuXHJcbiAgICBjb25zdCBkYXlFTGVtZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGF5RUxlbWVudHMuY2xhc3NMaXN0ID0gXCJkYXktZWxlbWVudHNcIjtcclxuICAgIGNvbnN0IGRheU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgZGF5TmFtZS5jbGFzc0xpc3QgPSBcImRheS1uYW1lc1wiO1xyXG4gICAgY29uc3QgbWF4VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBtYXhUZW1wLmNsYXNzTGlzdCA9IFwibWF4LXRlbXAtZGF5c1wiO1xyXG4gICAgY29uc3QgbWluVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICBtaW5UZW1wLmNsYXNzTGlzdCA9IFwibWluLXRlbXAtZGF5c1wiO1xyXG5cclxuXHJcbiAgICBkYXlOYW1lLnRleHRDb250ZW50ID0gXCJUaHVyc2RheVwiO1xyXG4gICAgbWF4VGVtcC50ZXh0Q29udGVudCA9IFwiMzHCsFwiO1xyXG4gICAgbWluVGVtcC50ZXh0Q29udGVudCA9IFwiMjPCsFwiO1xyXG4gICBcclxuICAgIGRheUVMZW1lbnRzLmFwcGVuZChkYXlOYW1lLCBtYXhUZW1wLCBtaW5UZW1wKTtcclxuICAgXHJcbiAgICBlbGVtZW50LmFwcGVuZChkYXlFTGVtZW50cyk7XHJcbn1cclxuLyogZnVuY3Rpb24gc29tZUZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCBzaG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFpbHktZm9yZWNhc3QnKTtcclxuICAgIGNvbnNvbGUubG9nKHNobyk7XHJcbn0gKi9cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsUGFnZUxvYWQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5pdGlhbFBhZ2VMb2FkIGZyb20gXCIuL2luaXRpYWxQYWdlTG9hZFwiO1xyXG5pbXBvcnQgZ2V0TG9jYXRpb24gZnJvbSBcIi4vQVBJXCI7XHJcbmltcG9ydCB7IGNoYW5nZVRlbXBlcmF0dXJlcyB9IGZyb20gJy4vY29udmVydCc7XHJcblxyXG5pbml0aWFsUGFnZUxvYWQoKTtcclxuXHJcbmNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYnV0dG9uJyk7XHJcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldExvY2F0aW9uKTtcclxuXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhbmdlLXRlbXAnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoYW5nZVRlbXBlcmF0dXJlcyk7XHJcblxyXG5nZXRMb2NhdGlvbigpO1xyXG5cclxuICAgIFxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==