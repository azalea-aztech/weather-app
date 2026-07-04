const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_KEY = "FHV2SK7XT9PCED2JFRQZP58EJ";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function buildURL(location, params = {}) {
    const query = new URLSearchParams({
        key: API_KEY,
        ...params
    });

    return `${BASE_URL}/${location}?${query.toString()}`;
}

function CurrentData(responseData) {
    const currentAll = responseData.currentConditions;
    this.date = currentAll.datetime;
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
            setCurrentData(data);
            return data;
        });
}

const currentTempWidg = document.getElementById("temp");
const currentDayWidg = document.getElementById("day");
const currentTimeWidg = document.getElementById("time");

const currentCloudCoverWidg = document.getElementById("cloud-coverage");
const currentRainWidg = document.getElementById("rain");

const date = new Date();

function setCurrentData(data) {
    currentTempWidg.innerText = data.currentConditions.temp;
    currentDayWidg.innerText = DAYS[date.getDay()];
    currentTimeWidg.innerText = data.currentConditions.datetime;

    currentCloudCoverWidg.innerText = data.currentConditions.cloudcover;
    currentRainWidg.innerText = data.currentConditions.precip;
}

function get15DaysData(location) {
    const url = buildURL(location, {
        unitGroup: "metric",
        include: "days",
    });

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        });
}

const searchBar = document.getElementById("locationInput");
const searchBtn = document.getElementById("locationBtn");

searchBtn.addEventListener("click", () => {
    let location = searchBar.value;
    if(location !== "") {
        getCurrentData(location);
    }
});



/*getCurrentData("tartu").then(function(response) {
    const data = new CurrentData(response);
    console.log(data);
});*/

//get15DaysData("Tartu");



// example usage: wait for the data before creating a Data instance
/*getData("tartu").then(function(resp) {
    const data = new Data(resp);
    console.log(data);
});*/

