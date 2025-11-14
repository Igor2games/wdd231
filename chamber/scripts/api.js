const currentTemp = document.querySelector('#temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#desc');
const high = document.querySelector('#high')
const low = document.querySelector('#low')
const humidity = document.querySelector('#humidity')


const lat = -21.764064112994504;

const lon = -41.31994486952687;

const api = 'a02b3deeea15373d2be7d0a012df61e5'

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;

const url2 = `https://api.openweathermap.org/data/2.5/daily?lat=${lat}&lon=${lon}&appid=${api}&units=metric&cnt=3`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data)
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
    high.textContent = `High: ${data.main.temp_max}°C`
    low.textContent = `Low: ${data.main.temp_min}°C`
    low.textContent = `Humidity: ${data.main.humidity}%`
}

apiFetch();
