const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const historyList = document.getElementById("historyList");

const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const successState = document.getElementById("successState");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const weatherDesc = document.getElementById("weatherDesc");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");

let searchHistory = [];

// anh xa ma thoi tiet sang tieng Viet va icon
function getWeatherInfo(code) {
    switch (code) {
        case 0:
            return { desc: "Trời quang đãng", icon: "☀️" };
        case 1:
        case 2:
        case 3:
            return { desc: "Mây rải rác / Nhiều mây", icon: "⛅" };
        case 45:
        case 48:
            return { desc: "Có sương mù", icon: "🌫️" };
        case 51:
        case 53:
        case 55:
            return { desc: "Có mưa phùn nhẹ", icon: "🌧️" };
        case 61:
        case 63:
        case 65:
            return { desc: "Có mưa rào", icon: "🌧️" };
        case 71:
        case 73:
        case 75:
            return { desc: "Có tuyết rơi", icon: "❄️" };
        case 80:
        case 81:
        case 82:
            return { desc: "Mưa rào nặng hạt", icon: "🌧️" };
        case 95:
        case 96:
        case 99:
            return { desc: "Có dông sét", icon: "⛈️" };
        default:
            return { desc: "Có mây thay đổi", icon: "☁️" };
    }
}

// lay thong tin thoi tiet tu API
async function fetchWeather(city) {
    // an cac giao dien cu
    successState.style.display = "none";
    errorState.style.display = "none";
    loadingState.style.display = "block";

    try {
        // 1. Goi API Geocoding de tim kiem toa do tu ten thanh pho
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoRes = await fetch(geoUrl);
        if (!geoRes.ok) throw new Error("Loi tai Geocoding API");
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Khong tim thay thanh pho");
        }

        const location = geoData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;
        const nameDisplay = `${location.name}, ${location.country}`;

        // 2. Goi API thoi tiet cua Open-Meteo theo toa do vua tim
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code`;
        const weatherRes = await fetch(weatherUrl);
        if (!weatherRes.ok) throw new Error("Loi tai Weather API");
        const weatherData = await weatherRes.json();

        const current = weatherData.current;
        const info = getWeatherInfo(current.weather_code);

        // 3. Hien thi du lieu len man hinh
        cityName.textContent = nameDisplay;
        weatherIcon.textContent = info.icon;
        weatherDesc.textContent = info.desc;
        temperature.textContent = `${current.temperature_2m}°C`;
        humidity.textContent = `${current.relative_humidity_2m}%`;

        loadingState.style.display = "none";
        successState.style.display = "block";

        // them vao lich su tim kiem neu chua co
        addToHistory(city);

    } catch (error) {
        console.error(error);
        loadingState.style.display = "none";
        errorState.style.display = "block";
    }
}

// quan ly lich su tim kiem bang localstorage
function loadHistory() {
    const saved = localStorage.getItem("weatherHistory");
    if (saved) {
        searchHistory = JSON.parse(saved);
    }
    renderHistory();
}

function saveHistory() {
    localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
}

function addToHistory(city) {
    const normalized = city.trim();
    // loc bo trung lap
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== normalized.toLowerCase());
    // them vao dau
    searchHistory.unshift(normalized);
    // gioi han toi da 5 thanh pho
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    saveHistory();
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    searchHistory.forEach(city => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-outline-secondary btn-sm me-1 mb-1";
        btn.textContent = city;
        btn.addEventListener("click", () => {
            fetchWeather(city);
        });
        historyList.appendChild(btn);
    });
}

// dang ky su kien cho form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.value = "";
    }
});

// khoi chay app
loadHistory();
// mac dinh tai thoi tiet cua Hanoi
fetchWeather("Hanoi");
