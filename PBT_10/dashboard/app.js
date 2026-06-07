// Promise.allSettled — xử lý khi 1 API lỗi
async function loadDashboard() {
    const startTime = Date.now();
    
    document.getElementById("global-loading").style.display = "inline";
    document.getElementById("timer").innerText = "";
    for(let i=0; i<3; i++) document.querySelector(`#w-${i} .content`).innerText = "Loading...";
    
    const results = await Promise.allSettled([
        fetch("https://api.open-meteo.com/v1/forecast?latitude=21.02&longitude=105.85&current_weather=true").then(r => r.json()),
        fetch("https://restcountries.com/v3.1/name/vietnam").then(r => r.json()),
        fetch("https://randomuser.me/api/?results=1").then(r => r.json())
    ]);
    
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });
    
    console.log(`Loaded in ${Date.now() - startTime}ms`);

    // Ẩn loading và in số ms ra màn hình
    document.getElementById("global-loading").style.display = "none";
    document.getElementById("timer").innerText = `Data loaded in ${Date.now() - startTime}ms`;
}

// hàm render phục vụ cho đoạn code bắt buộc trên
function renderWidget(index, data) {
    const div = document.querySelector(`#w-${index} .content`);
    if (index === 0) div.innerHTML = `Nhiệt độ: ${data.current_weather.temperature}°C`;
    if (index === 1) div.innerHTML = `Quốc gia: ${data[0].name.common}`;
    if (index === 2) div.innerHTML = `User: ${data.results[0].name.first}`;
}

function renderWidgetError(index, message) {
    document.querySelector(`#w-${index} .content`).innerHTML = `<span style="color:red;">Lỗi: ${message}</span>`;
}


window.onload = loadDashboard;