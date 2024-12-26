async function loadCSVData() {
    const response = await fetch('idioms.csv');
    const text = await response.text();
    const rows = text.split("\n").slice(1); // Skip header row

    const idioms = rows.map(row => {
        const [chinese, pinyin, translation, explanation, sentence] = row.split(",");
        return {
            chinese,
            pinyin,
            translation,
            explanation,
            sentence
        };
    });

    // Shuffle idioms array
    for (let i = idioms.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idioms[i], idioms[j]] = [idioms[j], idioms[i]];
    }

    return idioms;
}

let currentCard = 0;

async function loadCard() {
    const idioms = await loadCSVData();
    const front = document.getElementById("front");
    const back = document.getElementById("back");

    const card = idioms[currentCard];
    front.textContent = card.chinese;
    back.innerHTML = `
        <p><strong>Pinyin:</strong> ${card.pinyin}</p>
        <p><strong>Translation:</strong> ${card.translation}</p>
        <p><strong>Explanation:</strong> ${card.explanation}</p>
        <p><strong>Sentence:</strong> ${card.sentence}</p>
    `;

    // Update the counter
    document.getElementById("counter").textContent = `${currentCard + 1}/${idioms.length}`;
}

function flipCard() {
    const flashcard = document.getElementById("flashcard");
    flashcard.classList.toggle("flipped");
}

function nextCard() {
    loadCSVData().then(idioms => {
        currentCard = (currentCard + 1) % idioms.length;
        loadCard();
        // Ensure the flashcard flips every time a new idiom is loaded
        setTimeout(() => {
            flipCard();
        }, 200); // Delay slightly for the flip animation to take effect
    });
}

document.getElementById("flashcard").addEventListener("click", flipCard);

window.onload = loadCard;