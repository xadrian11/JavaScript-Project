import {
  getUserPreferences,
  setUserPreferences,
} from './user-preferences-service';

export function userPreferencesComponent(woeid) {
  const template = document.querySelector(
    '#template-user-preferences-component',
  );
  const node = template.content.cloneNode(true);

  const tempCbtn = node.querySelector('#radioTempC');
  const tempFbtn = node.querySelector('#radioTempF');
  const kphBtn = node.querySelector('#radioKph');
  const mphBtn = node.querySelector('#radioMph');
  const settingsBtn = node.querySelector('button.settings');
  const modal = node.querySelector('.modal');
  const modalCancelBtn = node.querySelector('button.cancel-btn');

  let localStorageData = getUserPreferences();

  tempFbtn.checked = localStorageData.temperatureUnit === 'f';

  kphBtn.checked = localStorageData.speedUnit === 'kph';

  settingsBtn.addEventListener('click', () => {
    modal.classList.add('visible');
  });

  modalCancelBtn.addEventListener('click', () =>
    modal.classList.remove('visible'),
  );

  tempCbtn.addEventListener('change', (e) => {
    setUserPreferences({
      temperatureUnit: e.target.value,
    });
  });

  tempFbtn.addEventListener('change', (e) => {
    setUserPreferences({
      temperatureUnit: e.target.value,
    });
  });

  kphBtn.addEventListener('change', (e) => {
    setUserPreferences({ speedUnit: e.target.value });
  });

  mphBtn.addEventListener('change', (e) => {
    setUserPreferences({ speedUnit: e.target.value });
  });

  document.body.appendChild(node);
}
