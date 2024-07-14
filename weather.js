submit = document.querySelector('.submit')
cityInput = document.querySelector('.city')
countryInput = document.querySelector('.country')

clear = document.querySelector('.clear')
weatherContainer = document.querySelector('.weather-info')
cityName = document.querySelector('.city-name')

key = getKey()

async function getKey() {
  const file = await fetch('key.txt')
  const text = await file.text()
  key = text
}

submit.addEventListener('click', async () => {
  try {
    let city = cityInput.value;
    const country = countryInput.value;

    clearInput();

    city = city.replace(' ', '+');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod >= 400) {
      notVisable();
      alert('City not found');
      throw new Error('City not found');
    }
    displayWeather(data);
    visable();
  }
  catch (error) {
    console.log(error);
  }
});

clear.addEventListener('click', clearInput); 

function displayWeather(data) {
  const city = document.querySelector('.city-name');
  const weather = document.querySelector('.weather-value');
  const temperature = document.querySelector('.temperature-value');
  const humidity = document.querySelector('.humidity-value');
  const wind = document.querySelector('.wind-value');

  city.textContent = data.name;
  weather.textContent = data.weather[0].main;
  temperature.textContent = data.main.temp + '°C';
  humidity.textContent = data.main.humidity + '%';
  wind.textContent = data.wind.speed + 'm/s';

};

function clearInput() {
  cityInput.value = '';
  countryInput.value = '';
}

function visable() {
  weatherContainer.classList.remove('not-visible');
  cityName.classList.remove('not-visible');
};

function notVisable() {
  weatherContainer.classList.add('not-visible');
  cityName.classList.add('not-visible');
};




