const apikey = "b6a8847a794d76d1ebe1ae262c7a1e9a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        if (response.status === 404) {
            card.style.height = '400px';
            weather.classList.remove("active");
            error.classList.add('active');
            return;
        }

        error.classList.remove('active');
        weather.classList.add("active");
        card.style.height = '510px';

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main;
        if (weatherCondition === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "images/mist.png";
        }
    } catch (err) {
        console.error("Error fetching weather data:", err);
    }
}

function handleSearch() {
    if (searchBox.value.trim() === "") {
        alert("Please enter a city name.");
        return;
    }
    checkWeather(searchBox.value);
}

searchBtn.addEventListener("click", handleSearch);

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});
