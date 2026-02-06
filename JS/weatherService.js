function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  return fetch(url)
    .then(res => res.json())
    .then(data => data.current_weather);
}

function updateWeatherCard(weather, cityName) {
  const card = document.getElementById(`weather-card-${cityName}`);
  if (!card) return;

  card.querySelector(".temperature").textContent = `${weather.temperature}°C`;
  card.querySelector(".wind").textContent = `Wind: ${weather.windspeed} km/h`;
  card.querySelector(".updated").textContent = `Updated at ${new Date().toLocaleTimeString()}`;
}

function loadThreeCitiesWeather() {
  const cities = [
    { name: "Chennai", lat: 13.0827, lon: 80.2707 },
    { name: "Tiruvallur", lat: 13.1431, lon: 79.9089 },
    { name: "Coimbatore", lat: 11.0168, lon: 76.9558 }
  ];

  const promises = cities.map(city =>
    fetchWeatherByCoords(city.lat, city.lon)
      .then(weather => {
        updateWeatherCard(weather, city.name);
        return {
          Location: city.name,
          Temperature: `${weather.temperature}°C`,
          WindSpeed: `${weather.windspeed} km/h`
        };
      })
  );

  Promise.all(promises)
    .then(results => {
      console.log("====================================");
      console.log("Live Weather — Tamil Nadu Cities");
      console.log("====================================");
      console.table(results);
    })
    .catch(err => console.error("Failed to fetch city weather:", err.message));
}

document.getElementById("refreshWeatherBtn").addEventListener("click", loadThreeCitiesWeather);

loadThreeCitiesWeather();