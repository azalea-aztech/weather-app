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

const weekOverviewDiv = document.getElementById("week-overview");
let weekDivs = weekOverviewDiv.querySelectorAll("div");

function setWeekData(data) {
    let i = 0;
    weekDivs.forEach(div => {
        const day = document.createElement("p");
        const conditions = document.createElement("p");
        const temps = document.createElement("p");

        day.innerText = data.days[i].datetime;
        conditions.innerText = data.days[i].conditions;
        temps.innerText = `${data.days[i].tempmax} / ${data.days[i].tempmin}`;
        
        div.appendChild(day);
        div.appendChild(conditions);
        div.appendChild(temps);
        i += 1;
    });
}

function setHighlights(data) {
    const uvIndex = document.getElementById("uvidex-value");
    const windSpeed = document.getElementById("wind-speed");
    const windDir = document.getElementById("wind-direction");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");
    const humidity = document.getElementById("humidity-value");
    const visibility = document.getElementById("visibility-value");

    uvIndex.innerText = data.currentConditions.uvindex;
    windSpeed.innerText = data.currentConditions.windspeed;
    windDir.innerText = data.currentConditions.winddir;
    sunrise.innerText = data.currentConditions.sunrise;
    sunset.innerText = data.currentConditions.sunset;
    humidity.innerText = `${data.currentConditions.humidity} %`;
    visibility.innerText = `${data.currentConditions.visibility} km`; 
}

function setCurrentData(data) {
    currentTempWidg.innerText = data.currentConditions.temp;
    currentDayWidg.innerText = DAYS[date.getDay()];
    currentTimeWidg.innerText = data.currentConditions.datetime;

    currentCloudCoverWidg.innerText = data.currentConditions.cloudcover;
    currentRainWidg.innerText = data.currentConditions.precip;

    setWeekData(data);
    setHighlights(data);
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

