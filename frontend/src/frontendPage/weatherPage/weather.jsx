import { useEffect, useState } from "react";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

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

  useEffect(() => {
    fetchWeatherData("New York");
  }, []);

  return (
    <div className="absolute inset-0 ml-54 min-h-screen bg-cover bg-center text-white p-6" style={{ backgroundImage: "url('/images/weather.jpg')" }}>
      <div className="flex items-center justify-center min-h-screen">
        {/* Search Bar Section */}
        <div className="w-1/3 p-6">
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Enter Location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-white text-2xl"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
        {/* Weather Data Section */}
        <div className="w-2/3 p-6 text-center">
          {loading ? (
            <div className="text-center text-gray-300">Loading...</div>
          ) : (
            weatherData && (
              <div className="backdrop-blur-lg p-6 rounded-lg">
                <h2 className="text-7xl font-bold">
                  {weatherData.name}, <span className="text-7xl">{weatherData.sys?.country}</span>
                </h2>
                <div className=" text-2xl my-2 mb-3">{getCurrentDate()}</div>
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
