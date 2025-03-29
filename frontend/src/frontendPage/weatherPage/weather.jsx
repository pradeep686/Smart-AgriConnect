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
    fetchWeatherData("bangalore");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter City Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          weatherData && (
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                {weatherData.name}, <span className="text-lg">{weatherData.sys?.country}</span>
              </h2>
              <div className="text-gray-600 text-sm">{getCurrentDate()}</div>
              <div className="text-4xl font-semibold my-3">{weatherData.main?.temp}°C</div>
              <p className="text-lg capitalize text-gray-700">
                {weatherData.weather?.[0]?.description || ""}
              </p>
              <div className="flex justify-around mt-4 text-gray-600">
                <div>
                  <p className="text-xl font-medium">{weatherData.wind?.speed} m/s</p>
                  <p>Wind Speed</p>
                </div>
                <div>
                  <p className="text-xl font-medium">{weatherData.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
