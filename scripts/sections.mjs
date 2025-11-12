export function setSectionSelection(sections) {
    const sectionSelect = document.querySelector("#sectionNumber");
    if (!sectionSelect) return;
    sectionSelect.innerHTML = ""; // clear existing options
    sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section.sectionNumber;
        option.textContent = `${section.sectionNumber}`;
        sectionSelect.appendChild(option);
    });
}
