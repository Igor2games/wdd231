/* Create Variable */
const navbuttom = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

// toggle show and off
navbuttom.addEventListener('click', () => {
    navbuttom.classList.toggle('show');
    navlinks.classList.toggle('show');
});