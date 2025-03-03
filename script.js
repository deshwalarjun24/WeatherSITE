const apiKey = '9b1d49ed265b905a54faebf842486595';// ✅ तुम्हारी Working A PI Key

async function getWeatherByCity() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }
    getWeather(null, null, city);
}


async function getWeather(lat = null, lon = null, city = null) {
    let url = '';

    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById('weatherInfo').innerHTML = `
                <h2>${data.name}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
        } else {
            alert('City not found!');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data.');
    }
}


function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeather(lat, lon, null);
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Please enable location access for weather updates.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


window.onload = getUserLocation;
