<template>
<div class="container">
    <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
            <input
                type="text"
                v-model="city"
                placeholder="Enter city name"
                class="search-input"
            />
            <button @click="searchByCity" class="search-button">Search</button>
        </div>
    </div>
</div>  

 
      <main>
        <!--If there are no data returned, then skip rendering the information-->  
        <div v-if="weatherData">
          <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->  
          <h2>
              {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->  
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
</template>
  
<script>
  // Import axios for making API requests
  import axios from "axios";

  const apikey = "77517e68d878c665508f172efbe226a8";

  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    computed: {
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp )
          : null;
      },
      // Get the current weather icon URL
      iconUrl() {
        return this.weatherData
          ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      // Fetch weather data based on the user's current location
      this.fetchCurrentLocationWeather();
    },
    methods: {
  async searchByCity() {
    if (!this.city) {
      alert("Please enter a city name."); 
      return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`;
    await this.fetchWeatherData(url);
  },
  async fetchCurrentLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
        await this.fetchWeatherData(url);
      });
    }
  },
  async fetchWeatherData(url) {
    try {
      const response = await axios.get(url);
      this.weatherData = response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
    }
  },
},
  };
</script>
