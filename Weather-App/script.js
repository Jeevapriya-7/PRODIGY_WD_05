const apiKey = "4801cb365b0f60e53d56d27c8f97e747";

async function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Enter city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            alert(data.message);
            return;
        }

        // Display data
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temp").innerText = "Temperature: " + data.main.temp + "°C";
        document.getElementById("desc").innerText = "Weather: " + data.weather[0].description;
        document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";

        // Weather icon
        const icon = data.weather[0].icon;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        // 🌤 Background change
        const weatherMain = data.weather[0].main.toLowerCase();

        document.body.classList.remove("sunny", "rainy", "cloudy");

        if (weatherMain.includes("clear")) {
            document.body.classList.add("sunny");
        } else if (weatherMain.includes("rain")) {
            document.body.classList.add("rainy");
        } else if (weatherMain.includes("cloud")) {
            document.body.classList.add("cloudy");
        }

    } catch (error) {
        console.log(error);
        alert("Error fetching data");
    }
}

// 🔥 Enter key support
document.getElementById("city").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});