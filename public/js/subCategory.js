const subCategoryMap = {
    "Humanity": [
        "Emotion & Psychology",
        "Faith & Meaning",
        "Culture & Identity",
        "Society & Community",
        "History & Memory",
        "Voices from the Margins"
    ],
    "Civilization & Power": [
        "Governance & Politics",
        "Economy & Work",
        "Law, Justice & Rights",
        "Conflict & Peace",
        "Cities, Nations & Borders",
        "Globalization & Power Structures"
    ],
    "Science, Technology & the Future": [
        "Scientific Thinking & Discovery",
        "Emerging Technologies (AI, BioTech, Quantum)",
        "Digital Society & Ethics (Surveillance, Data, Privacy)",
        "Environment & Climate Science",
        "Space & Exploration",
        "Futurism & Existential Risks"
    ],
    "Personal Growth & Creativity": [
        "Self-Development & Life Design",
        "Education & Lifelong Learning",
        "Mental Health & Resilience",
        "Creativity & the Arts (Writing, Music, Design)",
        "Spiritual & Emotional Growth",
        "Purpose, Productivity & Fulfillment"
    ]
};

const categorySelect = document.getElementById("category");
const subCategorySelect = document.getElementById("subCategory");

categorySelect.addEventListener("change", function () {
    const selectedCategory = this.value;
    const options = subCategoryMap[selectedCategory] || [];

    // Clear old options
    subCategorySelect.innerHTML = '<option>Choose a sub-category</option>';

    // Add new relevant sub-categories
    options.forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub;
        opt.textContent = sub;
        subCategorySelect.appendChild(opt);
    });

    // Disable the field until a category is chosen
    subCategorySelect.disabled = options.length === 0;
});