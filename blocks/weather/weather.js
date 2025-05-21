function initWeather() {

  const latitude = '12.9716';
  const longitude = '77.5946'; // Bangalore coordinates
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const weather = data.current_weather;
      const day = weather.is_day?'DayTime':'NightTime';

      if (!weather) {
        throw new Error("Current weather data not found.");
      }

      const weatherText = `
        <strong>Temperature:</strong> ${weather.temperature} °C<br>
        <strong>Wind Speed:</strong> ${weather.windspeed} km/h<br>
        <strong>Wind Direction:</strong> ${weather.winddirection}°<br>
        <strong>Time:</strong> ${weather.time}<br>
        <strong>is DAY:</strong> ${day}
      `;

      const weatherBlock = document.querySelector('.weather.block p');
      if (weatherBlock) {
        weatherBlock.innerHTML = weatherText;
      }
    })
    .catch((error) => {
      const weatherBlock = document.querySelector('.weather.block p');
      if (weatherBlock) {
        weatherBlock.innerHTML = 'Failed to load weather data.';
      }
    });
}

// Ensures it runs after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWeather);
} else {
  initWeather();
}
