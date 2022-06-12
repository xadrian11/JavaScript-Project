import { createSearchView } from './search-view.js';
import { createWeeklyView } from './weeklyForecastView.js';
import { createDayForecastView } from './dayForecastView.js';
import { userPreferencesComponent } from './user-preferences-component';

// check url for parameters (page and woeid) and create the right page view
export function createPageView() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const page = params.get('page');
  const woeid = params.get('woeid');
  const date = params.get('date');
  const mainElement = document.querySelector('main');

  if (page === 'search' || !page) {
    createSearchView(mainElement);
  }
  if (page === 'day-forecast') {
    createDayForecastView(mainElement, woeid, date);
    userPreferencesComponent(woeid);
  }
  if (page === 'weekly-forecast') {
    createWeeklyView(mainElement, woeid);
    userPreferencesComponent(woeid);
  }
}

//add parameters to url and reload page
export function addParams(pageName, woeid, date) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  params.set('page', pageName);
  if (woeid) {
    params.set('woeid', woeid);
  }
  if (date) {
    params.set('date', date);
  }
  document.location.search = params;
}
