// ===============================
// GRABBING THE DOM ELEMENTS
// ===============================
const time = document.querySelector('#time');
const city = document.querySelector('.city');
const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const icon = document.querySelector('.icon');
const description = document.querySelector('#description');
const selectCity = document.querySelector('select');
const getWeather = document.querySelector('button');


// ===============================
// ERROR HANDLER
// ===============================

function showError() {
  description.textContent = "Oops! Something went wrong. Check again later.";
}


// ===============================
// MAIN WEATHER FUNCTION
// ===============================

async function loadWeather() {

  try {
    // 1️⃣ Get selected city FIRST
    const cityName = selectCity.value;

    // 2️⃣ Build API URL with the city variable
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=86b374a48d5dbb70676c3f0d713f5d25`;

    // 3️⃣ Fetch data
    const res = await fetch(url);
 

    // 4️⃣ Manually handle bad responses
    if (!res.ok) {
      throw new Error("City not found");
    }

    // 5️⃣ Convert response to JSON
    const data = await res.json();

    //calculating and updating time
const timestamp = data.dt * 1000;
const localTime = timestamp + (data.timezone * 1000);
const date = new Date(localTime);
const readableTime = date.toLocaleString();
time.textContent = readableTime;


    // 6️⃣ Update UI correctly
    city.textContent = data.name;
    temperature.textContent = `${data.main.temp} °C`;
    humidity.textContent = `${data.main.humidity} %`;
    wind.textContent = `${data.wind.speed} m/s`;
    icon.textContent = data.weather[0].main;
    description.textContent = data.weather[0].description;

  } catch (err) {
    showError();
    console.error(err);
  }

};


// ===============================
// EVENT LISTENER
// ===============================

getWeather.addEventListener('click', loadWeather);




