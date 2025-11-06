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
        let phone = document.createElement('p');
        let url = document.createElement('a');
        
        name.textContent = member.name

        image.setAttribute('src', member.image);
        image.setAttribute('alt', `image of ${member.name}`);
        image.setAttribute('loading', 'lazy');

        address.textContent = member.address;
        address.setAttribute('class', 'address');

        phone.textContent = member.phone;

        url.textContent = member.website;
        const href = member.website && String(member.website).trim();
        url.href = (/^https?:\/\//i.test(href) ? href : `https://${href}`);

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address)
        card.appendChild(phone);
        card.appendChild(url);

        cards.appendChild(card);
    });
}

getMemberData(src);

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
    // example using arrow function
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}