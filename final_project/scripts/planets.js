const planetsContainer = document.getElementById('planets-container');
const modal = document.getElementById('planet-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModalBtn = document.getElementById('close-modal');

async function fetchPlanets() {
    try {
        const response = await fetch('data/planets.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const planets = await response.json();
        displayPlanets(planets);
    } catch (error) {
        planetsContainer.innerHTML = `<p>Error loading planets data: ${error.message}</p>`;
    }
}

function displayPlanets(planets) {
    planetsContainer.innerHTML = planets.map(planet => `
    <article class="planet-card" tabindex="0" role="button" aria-pressed="false" data-id="${planet.id}">
      <img src="${planet.image}" alt="Image of ${planet.name}" loading="lazy" />
      <h3>${planet.name}</h3>
      <p><strong>Distance:</strong> ${planet.distance} light years</p>
      <p><strong>Atmosphere:</strong> ${planet.atmosphere}</p>
      <p><strong>Habitability Score:</strong> ${planet.habitability}</p>
    </article>
  `).join('');

    // Add event listeners for modal open
    document.querySelectorAll('.planet-card').forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.id));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card.dataset.id);
            }
        });
    });
}

async function openModal(id) {
    try {
        const response = await fetch('data/planets.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const planets = await response.json();
        const planet = planets.find(p => p.id === id);
        if (!planet) throw new Error('Planet not found');

        modalTitle.textContent = planet.name;
        modalDescription.innerHTML = `
      <img src="${planet.image}" alt="Image of ${planet.name}" loading="lazy" style="max-width:100%;border-radius:8px;margin-bottom:1rem;" />
      <p><strong>Distance from Earth:</strong> ${planet.distance} light years</p>
      <p><strong>Atmosphere Composition:</strong> ${planet.atmosphere}</p>
      <p><strong>Habitability Score:</strong> ${planet.habitability}</p>
      <p><strong>Description:</strong> ${planet.description}</p>
    `;

        modal.showModal();
    } catch (error) {
        alert(`Error loading planet details: ${error.message}`);
    }
}

closeModalBtn.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.close();
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.open) {
        modal.close();
    }
});

document.addEventListener('DOMContentLoaded', fetchPlanets);