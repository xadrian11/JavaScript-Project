import {
  getUserPreferences,
  convertDistance,
  convertTemperaure,
  convertSpeed,
} from './user-preferences-service';

export const DailyForecastComponent = (data) => {
  const userPreferences = getUserPreferences();

  const template = document.querySelector('.weekly-view-template');
  const node = template.content.cloneNode(true);
  const wind = node.querySelector('.wind-direction');
  const windValue = data.wind_direction;

  let today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const nextDay = String(today.getDate() + 1).padStart(2, '0');
  today = `${year}-${month}-${day}`;
  const tomorrow = `${year}-${month}-${nextDay}`;
  const currentDay = data.applicable_date.substring(8);

  function getDayName(dayString, locale) {
    let date = new Date(dayString);
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }
  const dayString = data.applicable_date;
  let dayName = getDayName(dayString, 'en-EN').substring(0, 3);

  function getMonthName(monthString, locale) {
    let date = new Date(monthString);
    return date.toLocaleDateString(locale, { month: 'long' });
  }
  const monthString = data.applicable_date;
  let monthName = getMonthName(monthString, 'en-EN').substring(0, 3);

  const weatherImage = node.querySelector('.wheater-state-img');
  weatherImage.src = `https://coderscamp2021.github.io/team-mw-project-1/static/img/weather/${data.weather_state_abbr}.svg`;

  wind.style.transform = `rotate(${windValue}deg)`;

  if (data.applicable_date === today) {
    node.querySelector('.current-day').textContent = 'Today';
  } else if (data.applicable_date === tomorrow) {
    node.querySelector('.current-day').textContent = 'Tomorrow';
  } else {
    node.querySelector(
      '.current-day',
    ).textContent = `${dayName} ${currentDay} ${monthName}`;
  }

  node.querySelector('.weather-state-name').textContent =
    data.weather_state_name;
  node.querySelector('.max-temp').textContent = `Max: ${convertTemperaure(
    data.max_temp,
    userPreferences.temperatureUnit,
  )}`;
  node.querySelector('.min-temp').textContent = `Min: ${convertTemperaure(
    data.min_temp,
    userPreferences.temperatureUnit,
  )}`;
  node.querySelector('.wind-speed').textContent = `${convertSpeed(
    data.wind_speed,
    userPreferences.speedUnit,
  )}`;
  node.querySelector('.humidity-value').textContent = `${data.humidity}%`;
  node.querySelector('.visibility-value').textContent = `${convertDistance(
    data.visibility,
    userPreferences.speedUnit,
  )}`;
  node.querySelector('.pressure-value').textContent = `${Math.round(
    data.air_pressure,
  )} mb`;
  node.querySelector('.confidence-value').textContent = `${Math.round(
    data.predictability,
  )}%`;

  return node;
};
