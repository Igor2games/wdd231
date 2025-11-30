// discover.js: Dynamic card generation and visit tracking
import { attractions } from './attractions.mjs';

// Utility: Format date difference in days
function daysBetween(date1, date2) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = Math.abs(date2 - date1);
    return Math.floor(diff / msPerDay);
}

// Visit tracking logic
function updateVisitMessage() {
    const visitMsgEl = document.querySelector('.visit-message');
    const lastVisit = localStorage.getItem('lastVisitCampos');
    const now = new Date();
    let message = '';

    if (!lastVisit) {
        message = 'Welcome! This is your first visit to Discover Campos.';
    } else {
        const lastVisitDate = new Date(lastVisit);
        const days = daysBetween(lastVisitDate, now);
        if (days === 0) {
            message = 'Welcome back! You last visited less than a day ago.';
        } else if (days === 1) {
            message = 'Welcome back! It’s been 1 day since your last visit.';
        } else {
            message = `Welcome back! It’s been ${days} days since your last visit.`;
        }
    }
    visitMsgEl.textContent = message;
    // Update localStorage with current visit
    localStorage.setItem('lastVisitCampos', now.toISOString());
}

// Card builder
function createCard(attraction, idx) {
    const article = document.createElement('article');
    article.className = 'attraction-card';
    article.setAttribute('tabindex', '-1');
    article.setAttribute('data-card', idx + 1);

    // Title
    const h2 = document.createElement('h2');
    h2.textContent = attraction.name;

    // Figure and image
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = `images/${attraction.image}`;
    img.alt = attraction.name;
    img.width = 300;
    img.height = 200;
    img.loading = 'lazy';
    figure.appendChild(img);

    // Address
    const address = document.createElement('address');
    address.innerHTML = `<span aria-hidden="true">📍</span> ${attraction.address}`;

    // Description
    const desc = document.createElement('p');
    desc.textContent = attraction.description;

    // Learn More button
    const btn = document.createElement('button');
    btn.className = 'learn-more-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Learn more about ${attraction.name}`);
    btn.textContent = 'Learn More';
    btn.addEventListener('click', () => {
        alert(`More information about "${attraction.name}" coming soon!`);
    });

    // Compose card
    article.appendChild(h2);
    article.appendChild(figure);
    article.appendChild(address);
    article.appendChild(desc);
    article.appendChild(btn);

    return article;
}

// Main render function
function renderAttractions() {
    const grid = document.querySelector('.cards-grid');
    // Remove any fallback content
    grid.innerHTML = '';
    attractions.forEach((attr, idx) => {
        const card = createCard(attr, idx);
        grid.appendChild(card);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateVisitMessage();
    renderAttractions();
});