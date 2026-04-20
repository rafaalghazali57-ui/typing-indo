const textEl = document.getElementById("text");
const inputEl = document.getElementById("input");
const wpmEl = document.getElementById("wpm");
const timeEl = document.getElementById("time");

let text = "";
let time = 0;
let timer;
let started = false;

const words = [
  "saya belajar mengetik dengan cepat",
  "coding itu menyenangkan dan menantang",
  "indonesia memiliki budaya yang kaya",
  "latihan setiap hari membuat kita lebih baik"
];

function getText() {
  return words[Math.floor(Math.random() * words.length)];
}

function renderText() {
  textEl.innerHTML = "";
  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.innerText = char;
    if (i === 0) span.classList.add("current");
    textEl.appendChild(span);
  });
}

inputEl.addEventListener("input", () => {
  if (!started) {
    started = true;
    timer = setInterval(() => {
      time++;
      timeEl.innerText = time;
      updateWPM();
    }, 1000);
  }

  const chars = textEl.querySelectorAll("span");
  const inputChars = inputEl.value.split("");

  chars.forEach((charSpan, index) => {
    const typed = inputChars[index];

    charSpan.classList.remove("correct", "wrong", "current");

    if (typed == null) {
      charSpan.classList.add("current");
    } else if (typed === charSpan.innerText) {
      charSpan.classList.add("correct");
    } else {
      charSpan.classList.add("wrong");
    }
  });

  if (inputEl.value === text) {
    clearInterval(timer);
    alert("Mantap! 🎉");
  }
});

function updateWPM() {
  const wordsTyped = inputEl.value.length / 5;
  const wpm = Math.round((wordsTyped / time) * 60);
  wpmEl.innerText = wpm || 0;
}

function startTest() {
  clearInterval(timer);
  inputEl.value = "";
  time = 0;
  started = false;
  timeEl.innerText = 0;
  wpmEl.innerText = 0;

  text = getText();
  renderText();
}

startTest();

const hands = document.getElementById("hands");

inputEl.addEventListener("keydown", (e) => {
  animateHands(e.key);
});

function animateHands(key) {
  // animasi simple (getar dikit)
  hands.style.transform = "translateY(5px)";

  setTimeout(() => {
    hands.style.transform = "translateY(0)";
  }, 100);
}