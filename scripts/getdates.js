const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

lastModified.innerHTML = `Last modified on <span class="highlight">${new Intl.DateTimeFormat(
    "en-US",
    {
        dateStyle: "medium"
    }
).format(today)}</span>`;