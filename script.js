document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
  
    const location = document.getElementById('locationInput').value;
    const apiKey = '8f2bd2bc32414599bea93142243112'; // Your API key
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;
  
        document.getElementById('temperature').textContent = `🌡️ Temperature: ${temperature}°C`;
        document.getElementById('condition').textContent = `☁️ Condition: ${condition}`;
  
        // Add dynamic weather icon based on condition
        const weatherIcon = document.createElement('div');
        weatherIcon.id = 'weatherIcon';
        document.getElementById('weatherResult').prepend(weatherIcon);
  
        // Example: Add a sun icon for clear weather
        if (condition.toLowerCase().includes('clear')) {
          weatherIcon.style.backgroundImage = 'url("https://img.icons8.com/color/96/000000/sun.png")';
        } else if (condition.toLowerCase().includes('cloud')) {
          weatherIcon.style.backgroundImage = 'url("https://img.icons8.com/color/96/000000/cloud.png")';
        } else if (condition.toLowerCase().includes('rain')) {
          weatherIcon.style.backgroundImage = 'url("https://img.icons8.com/color/96/000000/rain.png")';
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('temperature').textContent = 'Failed to fetch weather data.';
        document.getElementById('condition').textContent = '';
      });
  });