const src = "data/members.json";

const cards = document.querySelector('#cards');

async function getMemberData(src) {
    const response = await fetch(src);
    const data = await response.json(); 
    displayMembers(data.members);
}

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let image = document.createElement('img');
        let address = document.createElement('p');
        
        name.textContent = member.name;

        image.setAttribute('src', member.image);
        image.setAttribute('alt', `image of ${member.name}`);
        image.setAttribute('loading', 'lazy');

        address.textContent = member.address;
        card.appendChild(image);
        card.appendChild(name);

       
        card.appendChild(address)

        cards.appendChild(card);
    });
}

getMemberData(src);