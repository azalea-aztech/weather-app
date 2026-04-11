const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_KEY = "FHV2SK7XT9PCED2JFRQZP58EJ";

function buildURL(location, params = {}) {
    const query = new URLSearchParams({
        key: API_KEY,
        ...params
    });

    return `${BASE_URL}/${location}?${query.toString()}`;
}

function CurrentData(responseData) {
    const currentAll = responseData.currentConditions;
    this.temp = currentAll.temp;
    this.cloudCover = currentAll.cloudcover;
    this.rain = currentAll.precip;
    this.uvindex = currentAll.uvindex;
    this.wind = {
        direction: currentAll.winddir,
        speed: currentAll.windspeed
    };
    this.sunrise = currentAll.sunrise;
    this.sunset = currentAll.sunset;
    this.humidity = currentAll.humidity;
    this.visibility = currentAll.visibility;
}

function getCurrentData(location) {
    const url = buildURL(location, {
        unitGroup: "metric",
        include: "current",
    });

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        });
}

getCurrentData("tartu").then(function(response) {
    const data = new CurrentData(response);
    console.log(data);
});



// example usage: wait for the data before creating a Data instance
/*getData("tartu").then(function(resp) {
    const data = new Data(resp);
    console.log(data);
});*/

