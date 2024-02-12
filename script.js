const apiKey = "90985cd0635423f09f09812bfd58d073";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?q=";

const inputBox = document.querySelector(".input-box input");
const searchButton = document.querySelector(".input-box button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}&units=metric`);
  if (response.status === 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error-text p").style.display = "block";

    inputBox.addEventListener("click", () => {
      document.querySelector(".error-text p").style.display = "none";
    });
  } else {
    document.querySelector(".weather").style.display = "block";
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".wind").innerText = data.wind.speed + "km/h";
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";

    switch (data.weather[0].main) {
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/unknown_weather.png";
    }
  }
}

async function getUserLocation() {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${apiKey}`
      );
      const data = await response.json();
      getWeather(data[0].name);
      console.log(data[0].name);
    } catch (error) {
      console.error(error);
    }
  }
}

searchButton.addEventListener("click", () => {
  if (inputBox.value !== "") {
    getWeather(inputBox.value);
  } else {
    alert("Please enter a city name");
  }
  inputBox.value = "";
});

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && inputBox.value !== "") {
    getWeather(inputBox.value);
    inputBox.value = "";
  }
  else if (e.key === "Enter" && inputBox.value === "") {
    alert("Please enter a city name");
  }
});
