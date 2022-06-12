import $ from 'jquery';
import { fetchSearchData } from './api-service.js';
import { addParams } from './in-app-navigation.js';

export function createSearchView() {
  const template = document.querySelector('.search-view-template');
  const clon = template.content.cloneNode(true);
  document.querySelector('main').appendChild(clon);

  const returnedFunction = debounce(createLocations, 500);
  $('.search-bar').on('input', () => {
    returnedFunction();
  });
}

// when user types at least 2 characters it proposes locations that match
// when user clicks location the weekly forecast view is created for this location
function createLocations() {
  const locationsList = $('.locations-list');
  locationsList.html('');
  const searchTerm = $('.search-bar').val().toLowerCase();
  if (searchTerm.length >= 1) {
    fetchSearchData(searchTerm).then((locationsFromAPI) => {
      let results = locationsFromAPI;
      results.forEach((result) => {
        const locationElement = document.createElement('div');
        locationElement.setAttribute('woeid', result.woeid);
        locationElement.setAttribute('title', result.title);
        locationElement.className = 'filtered-location';
        locationElement.innerText = result.title;
        $(locationsList).append(locationElement);
        $(locationElement).on('click', function (e) {
          const selectedWoeid = this.getAttribute('woeid');
          addParams('weekly-forecast', selectedWoeid);
        });
      });
    });
  }
}

// The debounce function delays the processing of a function until
// the user has stopped typing for a predetermined amount of time.
const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
