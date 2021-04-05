const debounce = require('debounce');
import multyCountriesTemplate from '../templates/multycountries.hbs'

console.log(multyCountriesTemplate());


const inputRef = document.querySelector('input');
const countriesRef = document.querySelector('.countries')

document.addEventListener('input', debounce(e=>onInput(inputRef.value), 500))

function findCountries (value) {
  const requestRef = `https://restcountries.eu/rest/v2/name/${value}`;
  return fetch(requestRef).then(res=>res.json()).then(res=>res) 
}

function onInput (value) {
  findCountries(value).then(res=>checkCountries(res))
}

function checkCountries (countries) {
  const numberOfCountries = countries.length

  if (numberOfCountries > 1 && numberOfCountries <= 10) {
    console.log(countries);
    countriesRef.innerHTML = multyCountriesTemplate(countries)
  }
  // if (numberOfCountries = 1){

  // } else 
}

