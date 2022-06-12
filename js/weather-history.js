export const weatherHistory = (mainElement, dayData, date) => {
  const findLowestTemp = (dayData) => {
    let minTemps = dayData.map(({ min_temp }) => Math.round(min_temp));
    return Math.min(...minTemps);
  };

  const findHighestTemp = (dayData) => {
    let maxTemps = dayData.map(({ max_temp }) => Math.round(max_temp));
    return Math.max(...maxTemps);
  };

  const dayForecastWeatherHisContainer = document.createElement('div');
  dayForecastWeatherHisContainer.classList.add('weather-history-container');

  let historyTitle = document.createElement('h2');
  historyTitle.classList.add('weather-history-header');
  historyTitle.textContent = 'Hourly forecast';
  dayForecastWeatherHisContainer.appendChild(historyTitle);

  const options = { month: 'short', day: 'numeric', year: 'numeric' };

  let weatherDate = document.createElement('p');
  weatherDate.classList.add('weather-history-date');
  weatherDate.textContent = `${new Date(date).toLocaleDateString(
    'en-US',
    options,
  )}`;
  dayForecastWeatherHisContainer.appendChild(weatherDate);

  let weatherHistoryDiv = document.createElement('div');
  weatherHistoryDiv.classList.add('weather-history-div');

  let historyDiv = document.createElement('div');
  historyDiv.classList.add('history-div');

  let weatherImgDiv = document.createElement('div');
  weatherImgDiv.classList.add('weather-img-div');

  let tempChartContainer = document.createElement('div');
  tempChartContainer.classList.add('temp-chart-container');

  let weatherPieceContainer = document.createElement('div');
  weatherPieceContainer.classList.add('weather-piece-container');

  let windDiv = document.createElement('div');
  windDiv.classList.add('wind-container');

  for (let forecast of dayData) {
    let imgPiece = document.createElement('div');
    imgPiece.classList.add('img-piece');

    let weatherImg = document.createElement('img');
    weatherImg.src = `https://coderscamp2021.github.io/team-mw-project-1/static/img/weather/${forecast.weather_state_abbr}.svg`;
    imgPiece.appendChild(weatherImg);
    weatherImgDiv.appendChild(imgPiece);

    let tempChart = document.createElement('div');
    tempChart.classList.add('temp-chart');

    let maxTemp = document.createElement('p');
    let maxTempNum = Math.round(forecast.max_temp);
    maxTemp.textContent = `${maxTempNum}`;
    maxTemp.style.margin = '0';

    let minTemp = document.createElement('p');
    let minTempNum = Math.round(forecast.min_temp);
    minTemp.textContent = `${minTempNum}`;
    minTemp.style.margin = '0';

    let tempBox = document.createElement('div');
    if (minTempNum >= 0) {
      tempBox.style.height = `${(maxTempNum - minTempNum) * 8}px`;
    } else if (minTempNum < 0 && maxTempNum <= 0) {
      tempBox.style.height = `${
        (Math.abs(minTempNum) - Math.abs(maxTempNum)) * 8
      }px`;
    } else if (minTempNum < 0 && maxTempNum > 0) {
      tempBox.style.height = `${(Math.abs(minTempNum) + maxTempNum) * 8}px`;
    }

    tempBox.style.backgroundColor = 'rgba(255, 250, 182, 1)';
    tempBox.classList.add('temp-box');

    if (findLowestTemp(dayData) <= 0 && findHighestTemp(dayData) >= 0) {
      weatherPieceContainer.style.height = `${
        (findHighestTemp(dayData) + Math.abs(findLowestTemp(dayData))) * 14 +
        Math.abs(minTempNum) * 14
      }px`;
      if (minTempNum > 0) {
        tempChart.style.transform = `translateY(-${
          (Math.abs(findLowestTemp(dayData)) + minTempNum) * 8
        }px)`;
        tempBox.style.backgroundImage =
          'linear-gradient(180deg, rgba(255, 250, 182, 1) 18%, rgba(255, 255, 255, 1) 80%)';
      } else if (minTempNum <= 0) {
        tempChart.style.transform = `translateY(-${
          (Math.abs(findLowestTemp(dayData)) - Math.abs(minTempNum)) * 8
        }px)`;
        tempBox.style.backgroundImage =
          'linear-gradient(180deg, rgba(255, 250, 182, 1) 0%, rgba(255, 255, 255, 1) 38%, rgba(124, 220, 236, 1) 100%)';
      }
    }
    if (findLowestTemp(dayData) >= 0) {
      tempChart.style.transform = `translateY(-${
        (minTempNum - findLowestTemp(dayData)) * 8
      }px)`;
      tempBox.style.backgroundImage =
        'linear-gradient(180deg, rgba(255, 250, 182, 1) 18%, rgba(255, 255, 255, 1) 80%)';
      weatherPieceContainer.style.height = `${
        findHighestTemp(dayData) * 7 +
        (minTempNum - findLowestTemp(dayData)) * 8
      }px`;
    }
    if (findHighestTemp(dayData) <= 0) {
      tempChart.style.transform = `translateY(-${
        (Math.abs(findLowestTemp(dayData)) - Math.abs(minTempNum)) * 8
      }px)`;
      tempBox.style.backgroundImage =
        'linear-gradient(180deg, rgba(255, 250, 182, 1) 0%, rgba(255, 255, 255, 1) 38%, rgba(124, 220, 236, 1) 100%)';
      weatherPieceContainer.style.height = `${
        (findHighestTemp(dayData) + Math.abs(findLowestTemp(dayData))) * 7 +
        Math.abs(minTempNum) * 7
      }px`;
    }

    tempChart.append(maxTemp, tempBox, minTemp);
    tempChartContainer.append(tempChart);

    let windPiece = document.createElement('div');
    windPiece.classList.add('wind-piece');

    let windDirection = document.createElement('span');
    windDirection.textContent = `\u2191`;
    windDirection.style.transform = `rotate(${forecast.wind_direction}deg)`;
    windDirection.style.margin = '0';

    let windSpeed = document.createElement('p');
    windSpeed.textContent = `${Math.round(forecast.wind_speed)} mph`;
    windSpeed.style.margin = '0';

    windPiece.append(windDirection, windSpeed);
    windDiv.append(windPiece);
    weatherPieceContainer.appendChild(tempChartContainer);
    historyDiv.append(weatherImgDiv, weatherPieceContainer, windDiv);
    weatherHistoryDiv.appendChild(historyDiv);
  }
  dayForecastWeatherHisContainer.appendChild(weatherHistoryDiv);
  mainElement.appendChild(dayForecastWeatherHisContainer);
};
