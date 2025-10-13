import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Initial 3-sec loading
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Show the loader for 3 seconds before fetching weather data
    const timer = setTimeout(() => {
      fetchWeatherData("Erode");
    }, 2500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e&units=metric`
      );
      const data = await response.json();
      if (data) {
        setWeatherData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    if (search.trim() !== "") {
      fetchWeatherData(search);
    }
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="absolute inset-0 ml-54 bg-cover bg-center text-white p-0" style={{ backgroundImage: "url('/images/weather.jpg')" }}>
      <div className="flex items-center justify-center min-h-screen">
        {/* Search Bar Section */}
        <div className="w-1/3 p-2 ml-20">
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Enter Location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-2xl placeholder-white opacity-400"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-3 !bg-red-600 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
        
        {/* Weather Data Section */}
        <div className="w-2/3 p-6 text-center">

          {loading ? (
            // Motion-based circular loading spinner
            <motion.div 
  className="flex flex-col items-center justify-center space-y-3"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  {/* Circular Loading Animation */}
  <motion.div
    className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
  />

  {/* Glowing "Loading..." Text */}
  <motion.p
    className="text-white text-lg font-semibold"
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
  >
    Loading...
  </motion.p>
</motion.div>

          
            
          ) : (
            weatherData && (
              <div className="backdrop-blur-lg p-6 rounded-lg">
                <h2 className="text-7xl font-bold">
                  {weatherData.name}, <span className="text-7xl">{weatherData.sys?.country}</span>
                </h2>
                <div className="text-2xl my-2 mb-3">{getCurrentDate()}</div>
                <div className="text-6xl font-semibold my-3">{weatherData.main?.temp}°C</div>
                <p className="text-3xl capitalize text-gray-100">
                  {weatherData.weather?.[0]?.description || ""}
                </p>
                <div className="flex justify-around mt-6 text-gray-100">
                  <div>
                    <p className="text-4xl font-medium">{weatherData.wind?.speed} m/s</p>
                    <p>Wind Speed</p>
                  </div>
                  <div>
                    <p className="text-4xl font-medium">{weatherData.main?.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
