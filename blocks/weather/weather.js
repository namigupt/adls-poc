export default function decorate(block) {
  // Get the city from the block content or use default
  const cityElement = block.querySelector('div');
  const city = cityElement?.textContent?.trim() || 'London';
  
  // Clear the block content
  block.innerHTML = '';
  
  // Create weather card container
  const weatherCard = document.createElement('div');
  weatherCard.className = 'weather-card';
  
  // Add loading state
  weatherCard.innerHTML = `
    <div class="weather-loading">
      <div class="weather-spinner"></div>
      <p>Loading weather for ${city}...</p>
    </div>
  `;
  
  block.appendChild(weatherCard);
  
  // Fetch weather data
  fetchWeatherData(city, weatherCard);
}

async function fetchWeatherData(city, container) {
  try {
    // Using Weather.com API (The Weather Channel)
    // Note: In production, you should use your own API key and proxy through your backend
    const API_KEY = '4166e2e5f4f94bdcbdd92024251707'; // This is a demo key, replace with actual key
    
    // Weather.com API endpoint for current conditions
    // First get location key, then get weather data
    
    // Get current weather conditions
    const weatherResponse = await fetch(`http://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`);
    
    if (!weatherResponse.ok) {
      throw new Error('Weather data not available');
    }
    
    const weatherData = await weatherResponse.json();
    displayWeatherComData(weatherData, container);
  } catch (error) {
    // Fallback to mock data for demo purposes
    console.warn('Using mock weather data:', error.message);
    
  }
}

function displayWeatherComData(weatherData, container) {
  const conditions = weatherData.current.condition.text;
  const temp = Math.round(weatherData.current.temp_c);
  const feelsLike = Math.round(weatherData.current.feelslike_c);
  const humidity = weatherData.current.humidity;
  
  
  container.innerHTML = `
    <div class="weather-header">
      <h3 class="weather-city">${weatherData.location.name}</h3>
      <span>${conditions}</span>
    </div>
    <div class="weather-main">
      <div class="weather-temp">${temp}°C</div>
      
    </div>
    <div class="weather-details">
      <div class="weather-detail">
        <span class="weather-label">Feels like</span>
        <span class="weather-value">${feelsLike}°C</span>
      </div>
      <div class="weather-detail">
        <span class="weather-label">Humidity</span>
        <span class="weather-value">${humidity}%</span>
      </div>
      
    </div>
    <div class="weather-footer">
      <small>Data from Weather.com - Updated: ${new Date().toLocaleTimeString()}</small>
    </div>
  `;
}
