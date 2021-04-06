const debounce = require('debounce');
import multyCountriesTemplate from '../templates/multycountries.hbs';
import oneCountryTemplate from '../templates/onecountry.hbs';
const { error } = require('@pnotify/core');
const { defaults } = require('@pnotify/core');




const inputRef = document.querySelector('input');
const countriesRef = document.querySelector('.countries');

document.addEventListener('input', debounce(e=>onInput(inputRef.value), 500));

function findCountries (value) {
  const requestRef = `https://restcountries.eu/rest/v2/name/${value}`;
  return fetch(requestRef).then(res=>res.json());
}

function onInput (value) {
  if (value === ''){
   return cleanMarkup();
  };
  findCountries(value).then(res=>checkCountries(res));
}

function checkCountries (countries) {
  const numberOfCountries = countries.length;
  
  if (numberOfCountries > 1 && numberOfCountries <= 10) {
    deleteAlert();
    markupCountrieList(countries);
  } 
    else if (numberOfCountries === 1){
    deleteAlert();
    markupForOneCountry(countries);
  } 
    else if (numberOfCountries > 10) {
    deleteAlert();
    cleanMarkup();
    showAlert();
  } 
    else if (numberOfCountries === undefined) {
    deleteAlert();
    cleanMarkup();
    showErrorAlert();
  }
}

function markupForOneCountry (country) {
  countriesRef.innerHTML = oneCountryTemplate(...country);
}

function markupCountrieList (countries) {
  countriesRef.innerHTML = multyCountriesTemplate(countries);
}

function showAlert (){
  defaults.closer = false;
  defaults.sticker = false;
  defaults.width = '300px';
  defaults.delay = 5000;

  error ({
    text: 'Too many matches found. Please enter a more specific query!',
  })

}

function showErrorAlert () {
  defaults.closer = false;
  defaults.sticker = false;
  defaults.width = '300px';
  defaults.delay = 5000;

  error ({
    text: 'Ups. Something went wrong. Try to check spelling.',
  });
}

function deleteAlert () {
  const alertMessage = document.querySelector('.pnotify');
  if (document.body.contains(alertMessage)) {
     alertMessage.style.display = 'none';
  }
}

function cleanMarkup () {
  countriesRef.innerHTML = '';
}