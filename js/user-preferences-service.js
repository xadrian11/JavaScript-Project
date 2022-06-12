const STORAGE_KEY = 'userPreferences';

export function setUserPreferences(userPreferences) {
  const storageData = getUserPreferences();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...storageData, ...userPreferences }),
  );
  window.location.reload();
}

export function getUserPreferences() {
  const storageData = localStorage.getItem(STORAGE_KEY);
  return storageData
    ? JSON.parse(storageData)
    : {
        favourites: [],
        temperatureUnit: 'c',
        speedUnit: 'mph',
      };
}

export function convertTemperaure(value, unit) {
  if (unit === 'c') {
    return `${value.toFixed(0)} ${String.fromCodePoint(0x2103)} `;
  } else {
    return `${(value * 1.8 + 32).toFixed(0)} ${String.fromCodePoint(0x2109)}`;
  }
}

export function convertDistance(value, unit) {
  if (unit === 'mph') {
    return `${value.toFixed(0)} miles`;
  } else {
    return `${(value * 1.609344).toFixed(0)} kilometers`;
  }
}
export function convertSpeed(value, unit) {
  if (unit === 'mph') {
    return `${value.toFixed(0)} mph`;
  } else {
    return `${(value * 1.609344).toFixed(0)} kph`;
  }
}
