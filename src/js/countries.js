const debounce = require('debounce');
import multyCountriesTemplate from '../templates/multycountries.hbs'
import oneCountryTemplate from '../templates/onecountry.hbs'
const { error } = require('@pnotify/core');
const { defaults } = require('@pnotify/core');


console.log(multyCountriesTemplate());
console.log(oneCountryTemplate());

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
  console.log(numberOfCountries);
  if (numberOfCountries > 1 && numberOfCountries <= 10) {
    console.log(countries);
    countriesRef.innerHTML = multyCountriesTemplate(countries)
  } else if (numberOfCountries === 1){
    console.log(countries);
    oneCountryTemplate(countries)
    countriesRef.innerHTML = oneCountryTemplate(...countries)
  } else if (numberOfCountries > 10) {
    showAlert()
  }
}

function showAlert (){
  defaults.closer = false;
  defaults.sticker = false;
  defaults.width = '300px';
  defaults.delay = 80000;

  error ({
    text: 'Too many matches found. Please enter a more specific query!'
  })

}
