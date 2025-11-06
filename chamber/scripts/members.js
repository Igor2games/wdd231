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
        
        name.textContent = member.name;

        //portrait.setAttribute('src', prophet.imageurl);
       // portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        //portrait.setAttribute('loading', 'lazy');
       // portrait.setAttribute('width', '340');
        //portrait.setAttribute('height', '440');


        card.appendChild(name);
        
        cards.appendChild(card);
    });
}

getMemberData(src);