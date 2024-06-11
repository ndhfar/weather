const container = document.querySelector(".container");
const inputCity = document.querySelector(".input-city");
const inputBtn = document.querySelector(".input-btn");
const information = document.querySelector(".cont-information");
const mainInfo = document.querySelector(".main-info");
const windElement = document.querySelector(".wind");
const humElement = document.querySelector(".humidity");
const pressElement = document.querySelector(".pressure");

async function getData() {
  inputBtn.classList.add("scaled");
  setTimeout(() => {
    inputBtn.classList.toggle("scaled");
  }, 300);

  if (inputCity.value === "") {
    alert("Please enter the city!");
    return;
  }

  mainInfo.innerHTML = "";
  information.classList.remove("showed");

  const cityName = inputCity.value;

  const apiKey = "1bdb6fcc0c61b88793e0f4713d051135";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert("City not found!");
      return;
    }
    const data = await response.json();

    const cityElement = document.createElement("h2");
    const imageElement = document.createElement("img");
    const tempElement = document.createElement("h1");
    const weatherElement = document.createElement("p");

    cityElement.classList.add("city");
    imageElement.classList.add("weather-image");
    tempElement.classList.add("temp");
    weatherElement.classList.add("weather");

    cityElement.textContent = data.name;
    imageElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    tempElement.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    weatherElement.textContent = data.weather[0].main;
    windElement.textContent = `${data.wind.speed} m/s`;
    humElement.textContent = `${data.main.humidity} %`;
    pressElement.textContent = `${data.main.pressure} hPa`;

    mainInfo.append(cityElement, imageElement, tempElement, weatherElement);
    information.classList.add("showed");

    inputCity.value = "";

    console.log(data);
  } catch (error) {
    alert("Error fetching data!");
  }
}

inputBtn.addEventListener("click", getData);
