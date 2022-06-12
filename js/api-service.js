const baseUrl = `https://metaweather-api.glitch.me/api/`;

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();

const handleResponse = async (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(new Error(`${resp.status} ${resp.statusText}`));
};

export const fetchSearchData = async (query) => {
  try {
    return await fetch(`${baseUrl}location/search/?query=${query}`).then(
      handleResponse,
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchLocationData = async (woeid) => {
  try {
    return await fetch(`${baseUrl}location/${woeid}/`).then(handleResponse);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchDayData = async (woeid, date) => {
  try {
    return await fetch(
      `${baseUrl}location/${woeid}/${date.replaceAll('-', '/')}/`,
    ).then(handleResponse);
  } catch (error) {
    console.log(error);
    return null;
  }
};
