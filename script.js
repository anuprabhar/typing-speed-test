const paragraphs = [
    "Practice makes a person perfect.",
    "Typing fast requires patience and focus.",
    "Consistency is the key to success.",
    "Learning to code improves problem solving skills."
];

let time = 30;
let timer;
let running = false;

const textEl = document.getElementById("text");
const input = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

function getRandomText() {
    textEl.innerText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

getRandomText();

function startTest() {
    if (running) return;

    running = true;
    time = 30;
    input.value = "";
    input.disabled = false;
    input.focus();
    timeEl.innerText = time;

    timer = setInterval(() => {
        time--;
        timeEl.innerText = time;

        if (time === 0) {
            clearInterval(timer);
            input.disabled = true;
            calculateResult();
            running = false;
        }
    }, 1000);
}

function calculateResult() {
    const typed = input.value.trim();
    const original = textEl.innerText;

    const words = typed.split(/\s+/).length;
    const wpm = Math.round((words / 30) * 60);

    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === original[i]) correct++;
    }

    const accuracy = Math.round((correct / original.length) * 100);

    wpmEl.innerText = wpm;
    accuracyEl.innerText = accuracy;
}

function resetTest() {
    clearInterval(timer);
    running = false;
    input.value = "";
    input.disabled = true;
    wpmEl.innerText = 0;
    accuracyEl.innerText = 0;
    timeEl.innerText = 30;
    getRandomText();
}

function toggleDark() {
    document.body.classList.toggle("dark");
}
