const currentTemp = document.querySelector('#temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#desc');
const high = document.querySelector('#high');
const low = document.querySelector('#low');
const humidity = document.querySelector('#humidity');
const e = document.querySelector('#today');
const t = document.querySelector('#tomorrow');
const a = document.querySelector('#dayAfter');

const lat = -21.764064112994504;
const lon = -41.31994486952687;
const api = 'a02b3deeea15373d2be7d0a012df61e5';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;
const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;

const { todayLabel, tomorrowLabel, dayAfterLabel } = getThreeDayVariables('en-US');

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('current weather', data);
        displayResults(data);
    } catch (error) {
        console.error('apiFetch error:', error);
    }
}

async function apiFetch2() {
    try {
        const response = await fetch(url2);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data2 = await response.json();
        console.log('forecast', data2);
        displayResults2(data2);
    } catch (error) {
        console.error('apiFetch2 error:', error);
    }
}

function getThreeDayVariables(locale = undefined) {
    const today = new Date();
    const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "long" });
    const todayLabel = "today";
    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(today.getDate() + 1);
    const tomorrowLabel = weekdayFormatter.format(tomorrowDate).replace(/^\w/, c => c.toUpperCase());
    const dayAfterDate = new Date(today);
    dayAfterDate.setDate(today.getDate() + 2);
    const dayAfterLabel = weekdayFormatter.format(dayAfterDate).replace(/^\w/, c => c.toUpperCase());
    return { todayLabel, tomorrowLabel, dayAfterLabel };
}

function displayResults(data) {
    if (!data || !data.main) return;
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}.png`;
    const desc = data.weather?.[0]?.description ?? '';
    if (weatherIcon) {
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
    }
    if (captionDesc) captionDesc.textContent = desc;
    if (high) high.textContent = `High: ${Math.round(data.main.temp_max)}°C`;
    if (low) low.textContent = `Low: ${Math.round(data.main.temp_min)}°C`;
    if (humidity) humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

function displayResults2(data2) {
    if (!data2?.list || !Array.isArray(data2.list) || data2.list.length === 0) {
        console.warn('displayResults2: forecast data missing or empty', data2);
        return;
    }

    const todayTemp = data2.list?.[0]?.main?.temp;
    const tomorrowTemp = data2.list?.[9]?.main?.temp;
    const dayAfterTemp = data2.list?.[16]?.main?.temp;

    const tToday = typeof todayTemp === 'number' ? Math.round(todayTemp) : '';
    const tTomorrow = typeof tomorrowTemp === 'number' ? Math.round(tomorrowTemp) : '';
    const tDayAfter = typeof dayAfterTemp === 'number' ? Math.round(dayAfterTemp) : '';

    if (e) e.innerHTML = `${todayLabel}: ${tToday}&deg;C`;
    if (t) t.innerHTML = `${tomorrowLabel}: ${tTomorrow}&deg;C`;
    if (a) a.innerHTML = `${dayAfterLabel}: ${tDayAfter}&deg;C`;
}

apiFetch();
apiFetch2();