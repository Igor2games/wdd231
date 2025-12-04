// planets.js - ES module

const planetsContainer = document.getElementById('planets-container');
const modal = document.getElementById('planet-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModalBtn = document.getElementById('close-modal');

// Fetch NASA image for a given planet name
async function fetchNasaPlanetImage(planetName) {
    const query = encodeURIComponent(planetName);
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('NASA API request failed');

        const data = await response.json();
        const items = data.collection.items;
        if (items.length === 0) return null;

        for (const item of items) {
            if (item.links && item.links.length > 0) {
                const imageLink = item.links.find(link => link.render === 'image');
                if (imageLink) return imageLink.href;
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching NASA image:', error);
        return null;
    }
}

// Display planets with images fetched from NASA API or fallback placeholder
async function displayPlanetsWithNasaImages(planets) {
    planetsContainer.innerHTML = '';

    // Fetch images in parallel for better performance
    const planetsWithImages = await Promise.all(
        planets.map(async (planet) => {
            const imageUrl = (await fetchNasaPlanetImage(planet.name)) || 'images/placeholder.webp';
            return { ...planet, imageUrl };
        })
    );

    planetsWithImages.forEach(planet => {
        const planetCard = document.createElement('article');
        planetCard.className = 'planet-card';
        planetCard.tabIndex = 0;
        planetCard.setAttribute('role', 'button');
        planetCard.setAttribute('aria-pressed', 'false');
        planetCard.dataset.id = planet.id;

        planetCard.innerHTML = `
      <img src="${planet.imageUrl}" alt="Image of ${planet.name}" loading="lazy" />
      <h3>${planet.name}</h3>
      <p><strong>Distance:</strong> ${planet.distance} light years</p>
      <p><strong>Atmosphere:</strong> ${planet.atmosphere}</p>
      <p><strong>Habitability Score:</strong> ${planet.habitability}</p>
    `;

        planetsContainer.appendChild(planetCard);

        // Add event listeners for modal open
        planetCard.addEventListener('click', () => openModal(planet));
        planetCard.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(planet);
            }
        });
    });
}

// Open modal with detailed planet info
function openModal(planet) {
    modalTitle.textContent = planet.name;
    modalDescription.innerHTML = `
    <img src="${planet.imageUrl}" alt="Image of ${planet.name}" loading="lazy" style="max-width:100%;border-radius:8px;margin-bottom:1rem;" />
    <p><strong>Distance from Earth:</strong> ${planet.distance} light years</p>
    <p><strong>Atmosphere Composition:</strong> ${planet.atmosphere}</p>
    <p><strong>Habitability Score:</strong> ${planet.habitability}</p>
    <p><strong>Description:</strong> ${planet.description}</p>
  `;

    modal.showModal();
}

// Close modal event handlers
closeModalBtn.addEventListener('click', () => modal.close());
modal.addEventListener('click', e => {
    if (e.target === modal) modal.close();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.open) modal.close();
});

// Initialize planets page by loading data and displaying planets
async function initPlanetsPage() {
    try {
        const response = await fetch('data/planets.json');
        if (!response.ok) throw new Error('Failed to load planets data');
        const planets = await response.json();

        await displayPlanetsWithNasaImages(planets);
    } catch (error) {
        console.error('Error initializing planets page:', error);
        planetsContainer.innerHTML = `<p>Error loading planets: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', initPlanetsPage);