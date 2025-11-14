const container = document.querySelector('#business-cards');

const MEMBERS_JSON_URL = 'data/members.json';

function membershipName(level) {
    if (level === 3) return 'Gold';
    if (level === 2) return 'Silver';
    return 'Member';
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

async function fetchMembers(url = MEMBERS_JSON_URL) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
        const json = await res.json();
        if (!json?.members || !Array.isArray(json.members)) throw new Error('Invalid JSON shape');
        return json.members;
    } catch (err) {
        console.error('fetchMembers error:', err);
        return null;
    }
}

function createSpotlightCard(member) {
    const card = document.createElement('section');
    card.className = 'spotlight-card';

    const logo = document.createElement('img');
    logo.className = 'spotlight-logo';
    logo.src = member.image || '';
    logo.alt = member.name || 'Company logo';
    card.appendChild(logo);

    const info = document.createElement('div');
    info.className = 'spotlight-info';

    const name = document.createElement('h3');
    name.className = 'spotlight-name';
    name.textContent = member.name || '';
    info.appendChild(name);

    const level = document.createElement('div');
    level.className = 'spotlight-level';
    level.textContent = membershipName(member.membership_level);
    info.appendChild(level);

    const addr = document.createElement('div');
    addr.className = 'spotlight-address';
    addr.textContent = member.address || '';
    info.appendChild(addr);

    const phone = document.createElement('div');
    phone.className = 'spotlight-phone';
    if (member.phone) {
        const a = document.createElement('a');
        a.href = `tel:${member.phone.replace(/\s+/g, '')}`;
        a.textContent = member.phone;
        phone.appendChild(a);
    } else {
        phone.textContent = '';
    }
    info.appendChild(phone);

    const site = document.createElement('div');
    site.className = 'spotlight-website';
    if (member.website) {
        const a = document.createElement('a');
        a.href = member.website;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = member.website.replace(/^https?:\/\//, '');
        site.appendChild(a);
    } else {
        site.textContent = '';
    }
    info.appendChild(site);

    card.appendChild(info);
    return card;
}

async function renderSpotlights(options = { minToShow: 2, maxToShow: 3, sourceUrl: MEMBERS_JSON_URL }) {
    if (!container) return;

    container.innerHTML = '';

    const members = await fetchMembers(options.sourceUrl);
    if (!members) {
        container.textContent = 'Unable to load members.';
        return;
    }

    const eligible = members.filter(m => m.membership_level === 3 || m.membership_level === 2);
    if (eligible.length === 0) {
        container.textContent = 'No gold or silver members available.';
        return;
    }

    shuffleArray(eligible);

    const count = Math.min(
        eligible.length,
        Math.max(options.minToShow, Math.floor(Math.random() * (options.maxToShow - options.minToShow + 1)) + options.minToShow)
    );

    const selected = eligible.slice(0, count);
    for (const member of selected) {
        const card = createSpotlightCard(member);
        container.appendChild(card);
    }
}

renderSpotlights();