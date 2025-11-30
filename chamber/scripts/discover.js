// scripts/discover.js
// Module script: imports data from ../data/attractions.mjs
import { attractions } from '../data/attractions.mjs';

const GRID_SELECTOR = '#discover-grid';
const VISIT_SELECTOR = '#visit-message';
const STORAGE_KEY = 'chamber_lastVisit';

function formatVisitMessage(lastTimestamp) {
    if (!lastTimestamp) return 'Welcome! Let us know if you have any questions.';
    const now = Date.now();
    const diffMs = now - Number(lastTimestamp);
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Back so soon! Awesome!';
    return `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
}

function updateVisitMessage() {
    const el = document.querySelector(VISIT_SELECTOR);
    const last = localStorage.getItem(STORAGE_KEY);
    el.textContent = formatVisitMessage(last);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
}

function createCard(item) {
    const article = document.createElement('article');
    article.className = 'card';

    const h2 = document.createElement('h2');
    h2.textContent = item.name;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.image || 'https://via.placeholder.com/300x200.webp?text=No+Image';
    img.alt = item.name;
    img.width = 300;
    img.height = 200;
    figure.appendChild(img);

    const address = document.createElement('address');
    address.textContent = item.address;

    const p = document.createElement('p');
    p.textContent = item.description;

    const btn = document.createElement('button');
    btn.className = 'learn-more';
    btn.type = 'button';
    btn.textContent = 'Learn more';
    btn.addEventListener('click', () => {
        // Simple accessible modal alternative: use alert for now
        // Replace with a modal or overlay if desired
        alert(`${item.name}\n\n${item.address}\n\n${item.description}`);
    });

    article.appendChild(h2);
    article.appendChild(figure);
    article.appendChild(address);
    article.appendChild(p);
    article.appendChild(btn);

    return article;
}

function renderGrid(items) {
    const container = document.querySelector(GRID_SELECTOR);
    if (!container) return;
    container.innerHTML = '';
    items.forEach(item => container.appendChild(createCard(item)));
}


document.addEventListener('DOMContentLoaded', () => {
    updateVisitMessage();
    renderGrid(attractions);
});