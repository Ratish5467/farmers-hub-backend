import axios from "axios";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.OPENWEATHER_API_KEY;

export const getWeather = async (req, res) => {
  try {
    const { city = "Bhopal" } = req.query; // default city Bhopal
    const response = await axios.get(WEATHER_URL, {
      params: {
        q: `${city},IN`,  // city + India country code
        appid: API_KEY,
        units: "metric"   // Celsius
      },
    });

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      windSpeed: response.data.wind.speed,
    };

    return res.json(weatherData);
  } catch (error) {
    console.error("Weather API Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch weather data" });
  }
};
