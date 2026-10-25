
const cities = [
    { name: "Islamabad", lat: 33.6844, lon: 73.0479 },
    { name: "Rawalpindi", lat: 33.5651, lon: 73.0169 },
    { name: "Lahore", lat: 31.5204, lon: 74.3587 },
    { name: "Karachi", lat: 24.8607, lon: 67.0011 },
    { name: "Peshawar", lat: 34.0151, lon: 71.5249 },
    { name: "Quetta", lat: 30.1798, lon: 66.9750 },
    { name: "Multan", lat: 30.1575, lon: 71.5249 },
    { name: "Gilgit", lat: 35.9208, lon: 74.3080 }
];

const API_URL = "https://api.open-meteo.com/v1/forecast";

const map = L.map("map", {
    zoomControl: true
}).setView([30.5, 69.3], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

const markersLayer = L.layerGroup().addTo(map);

let weatherData = cities.map(city => ({
    ...city,
    weather: null,
    error: null,
    marker: null
}));

let activeCity = null;

const searchInput = document.getElementById("searchInput");
const conditionFilter = document.getElementById("conditionFilter");
const temperatureFilter = document.getElementById("temperatureFilter");
const refreshButton = document.getElementById("refreshButton");
const resetButton = document.getElementById("resetButton");
const statusMessage = document.getElementById("statusMessage");
const locationList = document.getElementById("locationList");
const locationCount = document.getElementById("locationCount");
const loadedCount = document.getElementById("loadedCount");
const resultCount = document.getElementById("resultCount");

locationCount.textContent = cities.length;

function getWeatherDescription(code) {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code === 45 || code === 48) return "Fog";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([56, 57].includes(code)) return "Freezing drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([66, 67].includes(code)) return "Freezing rain";
    if ([71, 73, 75, 77].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Rain showers";
    if ([85, 86].includes(code)) return "Snow showers";
    if (code === 95) return "Thunderstorm";
    if ([96, 99].includes(code)) return "Thunderstorm with hail";
    return "Unknown conditions";
}

function getConditionCategory(code) {
    if (code === 0 || code === 1) return "clear";
    if ([2, 3, 45, 48].includes(code)) return "cloudy";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return "rain";
    }
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([95, 96, 99].includes(code)) return "storm";
    return "other";
}

function getTemperatureColor(temp) {
    if (temp < 15) return "#3b82f6";
    if (temp <= 30) return "#10b981";
    return "#f97316";
}

function formatValue(value, unit = "") {
    if (value === null || value === undefined || !Number.isFinite(value)) {
        return "Not available";
    }

    return `${value}${unit}`;
}

function setStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = "status-message";

    if (type) {
        statusMessage.classList.add(type);
    }
}

async function fetchCityWeather(city) {
    const params = new URLSearchParams({
        latitude: city.lat,
        longitude: city.lon,
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation",
            "weather_code",
            "wind_speed_10m"
        ].join(","),
        timezone: "Asia/Karachi"
    });

    const response = await fetch(`${API_URL}?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`Weather API returned status ${response.status}`);
    }

    const data = await response.json();

    if (!data.current) {
        throw new Error("Weather information is missing from the API response.");
    }

    return {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        feelsLike: data.current.apparent_temperature,
        precipitation: data.current.precipitation,
        windSpeed: data.current.wind_speed_10m,
        code: data.current.weather_code,
        time: data.current.time,
        temperatureUnit: data.current_units?.temperature_2m || "°C",
        humidityUnit: data.current_units?.relative_humidity_2m || "%",
        windUnit: data.current_units?.wind_speed_10m || "km/h",
        precipitationUnit: data.current_units?.precipitation || "mm"
    };
}

function createPopup(city) {
    const weather = city.weather;

    return `
        <div class="weather-popup">
            <h3>${city.name}</h3>
            <p><strong>Condition:</strong> ${getWeatherDescription(weather.code)}</p>
            <p><strong>Temperature:</strong> ${formatValue(weather.temperature, ` ${weather.temperatureUnit}`)}</p>
            <p><strong>Feels like:</strong> ${formatValue(weather.feelsLike, ` ${weather.temperatureUnit}`)}</p>
            <p><strong>Humidity:</strong> ${formatValue(weather.humidity, ` ${weather.humidityUnit}`)}</p>
            <p><strong>Wind speed:</strong> ${formatValue(weather.windSpeed, ` ${weather.windUnit}`)}</p>
            <p><strong>Precipitation:</strong> ${formatValue(weather.precipitation, ` ${weather.precipitationUnit}`)}</p>
            <p><strong>Observation time:</strong> ${weather.time || "Not available"}</p>
            <p><strong>Coordinates:</strong> ${city.lat}, ${city.lon}</p>
            <a href="https://open-meteo.com/" target="_blank" rel="noopener">Weather data source</a>
        </div>
    `;
}

function selectCity(city) {
    if (!city || !city.weather) return;

    activeCity = city.name;
    renderLocations();

    map.flyTo([city.lat, city.lon], 8, {
        duration: 0.7
    });

    if (city.marker) {
        city.marker.openPopup();
    }
}

function updateMapAndList() {
    markersLayer.clearLayers();

    weatherData.forEach(city => {
        city.marker = null;

        if (!city.weather) return;

        const color = getTemperatureColor(city.weather.temperature);

        const marker = L.circleMarker([city.lat, city.lon], {
            radius: 9,
            color: "#ffffff",
            weight: 2,
            fillColor: color,
            fillOpacity: 0.95
        });

        marker.bindPopup(createPopup(city));
        marker.bindTooltip(city.name);
        marker.addTo(markersLayer);

        marker.on("click", () => {
            activeCity = city.name;
            renderLocations();
        });

        city.marker = marker;
    });

    renderLocations();
}

function matchesFilters(city) {
    const search = searchInput.value.trim().toLowerCase();
    const condition = conditionFilter.value;
    const temperature = temperatureFilter.value;

    if (!city.name.toLowerCase().includes(search)) {
        return false;
    }

    if (!city.weather) {
        return false;
    }

    if (condition !== "all" && getConditionCategory(city.weather.code) !== condition) {
        return false;
    }

    const temp = city.weather.temperature;

    if (temperature === "cold" && temp >= 15) return false;
    if (temperature === "mild" && (temp < 15 || temp > 30)) return false;
    if (temperature === "hot" && temp <= 30) return false;

    return true;
}

function renderLocations() {
    locationList.replaceChildren();

    const filteredCities = weatherData.filter(matchesFilters);

    resultCount.textContent = `${filteredCities.length} result${filteredCities.length === 1 ? "" : "s"}`;

    if (filteredCities.length === 0) {
        const message = document.createElement("div");
        message.className = "empty-list";
        message.textContent = "No weather results match your search and filters. Try changing your selection.";
        locationList.appendChild(message);
        return;
    }

    filteredCities.forEach(city => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "location-card";

        if (activeCity === city.name) {
            card.classList.add("active");
        }

        const dot = document.createElement("span");
        dot.className = "weather-dot";
        dot.style.backgroundColor = getTemperatureColor(city.weather.temperature);

        const details = document.createElement("span");
        details.className = "city-details";

        const name = document.createElement("span");
        name.className = "city-name";
        name.textContent = city.name;

        const condition = document.createElement("span");
        condition.className = "city-condition";
        condition.textContent = getWeatherDescription(city.weather.code);

        const temp = document.createElement("span");
        temp.className = "city-temperature";
        temp.textContent = `${city.weather.temperature}°C`;

        details.append(name, condition);
        card.append(dot, details, temp);
        card.addEventListener("click", () => selectCity(city));

        locationList.appendChild(card);
    });
}

async function loadWeatherData() {
    refreshButton.disabled = true;
    refreshButton.textContent = "Loading...";
    setStatus("Fetching current weather data from Open-Meteo...");

    try {
        const results = await Promise.allSettled(
            cities.map(city => fetchCityWeather(city))
        );

        weatherData = cities.map((city, index) => {
            const result = results[index];

            if (result.status === "fulfilled") {
                return {
                    ...city,
                    weather: result.value,
                    error: null,
                    marker: null
                };
            }

            return {
                ...city,
                weather: null,
                error: result.reason?.message || "Unable to retrieve weather data.",
                marker: null
            };
        });

        const successful = weatherData.filter(city => city.weather).length;
        const failed = weatherData.length - successful;

        loadedCount.textContent = successful;
        updateMapAndList();

        if (successful === 0) {
            setStatus(
                "Weather data could not be loaded. Check your internet connection and try refreshing.",
                "error"
            );
        } else if (failed > 0) {
            setStatus(
                `Loaded weather for ${successful} of ${cities.length} cities. ${failed} request(s) failed. You can try refreshing.`,
                "error"
            );
        } else {
            setStatus(
                `Successfully loaded current weather for all ${successful} cities.`,
                "success"
            );
        }
    } catch (error) {
        console.error("Weather loading error:", error);
        setStatus("An unexpected error occurred while loading weather data. Please try again.", "error");
    } finally {
        refreshButton.disabled = false;
        refreshButton.textContent = "Refresh data";
    }
}

searchInput.addEventListener("input", renderLocations);
conditionFilter.addEventListener("change", renderLocations);
temperatureFilter.addEventListener("change", renderLocations);

refreshButton.addEventListener("click", loadWeatherData);

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    conditionFilter.value = "all";
    temperatureFilter.value = "all";
    activeCity = null;
    map.setView([30.5, 69.3], 5);
    renderLocations();
});

loadWeatherData();
