// Example: could be used for footer copyright year or elsewhere
document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.current-year');
    const year = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = year;
    });
});