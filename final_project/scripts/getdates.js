document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.current-year');
    const year = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = year;
    });
});