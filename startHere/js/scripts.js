const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo)


document.querySelector('#results').innerHTML = `
<p>Appointment for ${myInfo.get('first')} ${myInfo.get('last')}<p>`