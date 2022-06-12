import { fetchLocationData } from './api-service';
import { DailyForecastComponent } from './dayForecastComponent';
import { addParams } from './in-app-navigation';

export const createWeeklyView = async (mainElement, woeid) => {
  const mainContainer = document.createElement('div');
  const weeklyView = document.createElement('div');
  const cityName = document.createElement('h1');
  cityName.classList.add('city-name');

  mainContainer.classList.add('main-container');
  weeklyView.classList.add('weekly-view');

  mainElement.appendChild(mainContainer);

  const cityDataView = (data) => {
    const weeklyTemplate = document.querySelector('.city-data-template');
    const weeklyNode = weeklyTemplate.content.cloneNode(true);
    const cityData = weeklyNode.querySelector('.city-data');
    cityData.appendChild(cityName);

    weeklyNode.querySelector('.country-name').textContent =
      ',' + data.parent.title;
    weeklyNode.querySelector('.current-time-value').textContent =
      data.time.substring(11, 16);
    weeklyNode.querySelector('.sunrise-time-value').textContent =
      data.sun_rise.substring(11, 16);
    weeklyNode.querySelector('.sunset-time-value').textContent =
      data.sun_set.substring(11, 16);

    mainContainer.appendChild(weeklyNode);
    mainContainer.appendChild(weeklyView);
  };

  let dayData = await fetchLocationData(woeid);
  cityName.textContent = dayData.title;

  for (let weatherForDay of dayData.consolidated_weather) {
    let dayComponent = document.createElement('div');
    dayComponent.classList.add('wrapper');
    dayComponent.setAttribute('woeid', woeid);
    weeklyView.appendChild(dayComponent);
    dayComponent.appendChild(DailyForecastComponent(weatherForDay));
    dayComponent.addEventListener('click', function (e) {
      const selectedWoeid = this.getAttribute('woeid');
      addParams('day-forecast', selectedWoeid, weatherForDay.applicable_date);
    });
  }
  cityDataView(dayData);
};
