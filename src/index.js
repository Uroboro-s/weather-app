import initialPageLoad from "./initialPageLoad";
import getLocation from "./API";
import { changeTemperatures } from './convert';

initialPageLoad();

const button = document.getElementById('search-button');
button.addEventListener('click', getLocation);


document.getElementById('change-temp').addEventListener('click', changeTemperatures);

getLocation();

    


