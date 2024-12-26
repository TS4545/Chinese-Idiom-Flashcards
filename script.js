// Path to the CSV file
const csvFilePath = 'idioms.csv';

async function loadCSVData() {
    const response = await fetch(csvFilePath);
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
}

function flipCard() {
    const flashcard = document.getElementById("flashcard");
    flashcard.classList.toggle("flipped");
}

function nextCard() {
    currentCard = (currentCard + 1) % idioms.length;
    loadCard();
}

window.onload = loadCard;