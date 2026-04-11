const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_KEY = "FHV2SK7XT9PCED2JFRQZP58EJ";

function buildURL(location, params = {}) {
    const query = new URLSearchParams({
        key: API_KEY,
        ...params
    });

    return `${BASE_URL}/${location}?${query.toString()}`;
}

function fh2Deg(tempFahrenheit) {
    return (tempFahrenheit - 32) / 1.8;
}

function Data(responseData) {
    this.temp = fh2Deg(responseData.days[0].hours[0].temp);
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

getCurrentData("tartu");

// example usage: wait for the data before creating a Data instance
/*getData("tartu").then(function(resp) {
    const data = new Data(resp);
    console.log(data);
});*/

