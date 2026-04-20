const textEl = document.getElementById("text");
const inputEl = document.getElementById("input");
const wpmEl = document.getElementById("wpm");
const timeEl = document.getElementById("time");
const accEl = document.getElementById("accuracy");
const lessonList = document.getElementById("lessonList");
const keyboardEl = document.getElementById("keyboard");

let text = "";
let time = 0;
let timer;
let started = false;
let mistakes = 0;

/* LESSON */
const lessons = [
  { title: "Home Row", text: "asdf jkl; asdf jkl;" },
  { title: "Tambah G & H", text: "asdfg hjkl asdfg hjkl" },
  { title: "Baris Atas", text: "qwer uiop qwer uiop" },
  { title: "Baris Bawah", text: "zxcv nm zxcv nm" },
  { title: "Kalimat", text: "saya belajar mengetik dengan cepat" }
];

let currentLesson = 0;

/* KEYBOARD LAYOUT */
const keyboardLayout = [
  ["1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
  ["q","w","e","r","t","y","u","i","o","p","[","]","\\"],
  ["a","s","d","f","g","h","j","k","l",";","'","Enter"],
  ["Shift","z","x","c","v","b","n","m",",",".","/","Shift"],
  ["Space"]
];

/* GENERATE KEYBOARD */
keyboardLayout.forEach(row => {
  const rowEl = document.createElement("div");
  rowEl.classList.add("keyboard-row");

  row.forEach(key => {
    const keyEl = document.createElement("div");
    keyEl.classList.add("key");
    keyEl.innerText = key;

    keyEl.dataset.key = key.toLowerCase();

    if (key === "Backspace" || key === "Shift" || key === "Enter")
      keyEl.classList.add("wide");

    if (key === "Space")
      keyEl.classList.add("space");

    rowEl.appendChild(keyEl);
  });

  keyboardEl.appendChild(rowEl);
});

/* SIDEBAR */
lessons.forEach((lesson, index) => {
  const div = document.createElement("div");
  div.innerText = lesson.title;
  div.classList.add("lesson-item");

  div.onclick = () => loadLesson(index);

  lessonList.appendChild(div);
});

/* LOAD LESSON */
function loadLesson(index) {
  currentLesson = index;
  const lesson = lessons[index];

  document.getElementById("lessonTitle").innerText = lesson.title;
  text = lesson.text;

  renderText();
  inputEl.value = "";

  highlightLesson();
}

/* SIDEBAR ACTIVE */
function highlightLesson() {
  document.querySelectorAll(".lesson-item").forEach((el, i) => {
    el.classList.toggle("active", i === currentLesson);
  });
}

/* RENDER TEXT */
function renderText() {
  textEl.innerHTML = "";

  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.innerText = char;

    if (i === 0) span.classList.add("current");

    textEl.appendChild(span);
  });
}

/* TIMER */
function startTimer() {
  timer = setInterval(() => {
    time++;
    timeEl.innerText = time;
    updateWPM();
  }, 1000);
}

/* INPUT */
inputEl.addEventListener("input", () => {
  if (!started) {
    started = true;
    startTimer();
  }

  const chars = textEl.querySelectorAll("span");
  const inputChars = inputEl.value.split("");

  mistakes = 0;

  chars.forEach((span, i) => {
    const char = inputChars[i];

    span.classList.remove("correct", "wrong", "current");

    if (char == null) {
      span.classList.add("current");
    } else if (char === span.innerText) {
      span.classList.add("correct");
    } else {
      span.classList.add("wrong");
      mistakes++;
    }
  });

  updateAccuracy();
  highlightNextKey();

  if (inputEl.value === text) {
    clearInterval(timer);

    setTimeout(() => nextLesson(), 1000);
  }
});

/* WPM */
function updateWPM() {
  const words = inputEl.value.length / 5;
  const wpm = Math.round((words / time) * 60);
  wpmEl.innerText = wpm || 0;
}

/* ACCURACY */
function updateAccuracy() {
  const total = inputEl.value.length;
  const acc = total === 0 ? 100 : Math.round(((total - mistakes) / total) * 100);
  accEl.innerText = acc + "%";
}

/* NEXT KEY */
function highlightNextKey() {
  const nextChar = text[inputEl.value.length];

  document.querySelectorAll(".key").forEach(k => {
    k.classList.remove("next");
  });

  if (!nextChar) return;

  let key = nextChar.toLowerCase();
  if (key === " ") key = "space";

  const el = document.querySelector(`[data-key="${key}"]`);
  if (el) el.classList.add("next");
}

/* KEY PRESS */
document.addEventListener("keydown", (e) => {
  let key = e.key.toLowerCase();

  if (key === " ") key = "space";

  const el = document.querySelector(`[data-key="${key}"]`);
  if (el) el.classList.add("active");
});

document.addEventListener("keyup", (e) => {
  let key = e.key.toLowerCase();

  if (key === " ") key = "space";

  const el = document.querySelector(`[data-key="${key}"]`);
  if (el) el.classList.remove("active");
});

/* NEXT LESSON */
function nextLesson() {
  currentLesson++;
  if (currentLesson >= lessons.length) currentLesson = 0;

  reset();
  loadLesson(currentLesson);
}

/* RESET */
function reset() {
  clearInterval(timer);
  inputEl.value = "";
  time = 0;
  started = false;
  mistakes = 0;

  wpmEl.innerText = 0;
  timeEl.innerText = 0;
  accEl.innerText = "100%";
}

/* INIT */
loadLesson(0);