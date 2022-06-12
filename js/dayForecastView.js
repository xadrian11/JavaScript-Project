import { weatherHistory } from './weather-history';
import { DailyForecastComponent } from './dayForecastComponent';
import {
  fetchDayData,
  fetchLocationData,
  fetchSearchData,
} from './api-service';

export const createDayForecastView = async (mainElement, woeid, date) => {
  const dailyMainContainer = document.createElement('div');
  const dailyCityName = document.createElement('h1');
  const wrapper = document.createElement('div');
  wrapper.classList.add('daily-wrapper');
  dailyCityName.classList.add('daily-city-name');
  dailyMainContainer.classList.add('daily-main-container');
  mainElement.style.display = 'flex';
  mainElement.appendChild(dailyMainContainer);
  dailyMainContainer.appendChild(dailyCityName);
  dailyMainContainer.appendChild(wrapper);

  let historyData = await fetchDayData(woeid, date);
  let currentDayData = await fetchLocationData(woeid);

  weatherHistory(mainElement, historyData, date);
  wrapper.appendChild(
    DailyForecastComponent(
      currentDayData.consolidated_weather.find((dayWeather) => {
        return dayWeather.applicable_date === date;
      }),
    ),
  );
  dailyCityName.textContent = currentDayData.title;
};
