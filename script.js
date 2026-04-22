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

  /* ================= DASAR ================= */
  { title: "Home Row 1", text: "asdf jkl;" },
  { title: "Home Row 2", text: "asdf jkl; asdf jkl;" },
  { title: "Home Row 3", text: "as as df df jk jk l;" },
  { title: "Home Row 4", text: "asdf asdf jkl; jkl;" },

  /* ================= TAMBAH G H ================= */
  { title: "Tambah G H 1", text: "asdfg hjkl" },
  { title: "Tambah G H 2", text: "gag hag dag fag" },
  { title: "Tambah G H 3", text: "asdfg hjkl asdfg hjkl" },

  /* ================= BARIS ATAS ================= */
  { title: "Baris Atas 1", text: "qwer uiop" },
  { title: "Baris Atas 2", text: "qwe rty uio p" },
  { title: "Baris Atas 3", text: "qwerty uiop qwerty uiop" },

  /* ================= BARIS BAWAH ================= */
  { title: "Baris Bawah 1", text: "zxcv nm" },
  { title: "Baris Bawah 2", text: "zxc vbn nm" },
  { title: "Baris Bawah 3", text: "zxcvbnm zxcvbnm" },

  /* ================= HURUF CAMPUR ================= */
  { title: "Huruf Campur 1", text: "asdf qwer zxcv" },
  { title: "Huruf Campur 2", text: "qaz wsx edc rfv tgb" },

  /* ================= KATA PENDEK ================= */
  { title: "Kata 1", text: "saya makan nasi" },
  { title: "Kata 2", text: "ibu pergi ke pasar" },
  { title: "Kata 3", text: "dia belajar di sekolah" },
  { title: "Kata 4", text: "kami bermain bola" },

  /* ================= KATA MENENGAH ================= */
  { title: "Kata Menengah 1", text: "belajar mengetik setiap hari" },
  { title: "Kata Menengah 2", text: "latihan membuat kita lebih cepat" },
  { title: "Kata Menengah 3", text: "komputer digunakan untuk belajar" },

  /* ================= KALIMAT ================= */
  { title: "Kalimat 1", text: "saya belajar mengetik dengan cepat" },
  { title: "Kalimat 2", text: "latihan setiap hari membuat kita lebih baik" },
  { title: "Kalimat 3", text: "mengetik tanpa melihat keyboard adalah tujuan utama" },

  /* ================= PARAGRAF ================= */
  { title: "Paragraf 1", text: "saya belajar mengetik setiap hari agar bisa mengetik lebih cepat dan akurat tanpa melihat keyboard" },
  { title: "Paragraf 2", text: "latihan mengetik membantu meningkatkan produktivitas terutama saat mengerjakan tugas di komputer" },

  /* ================= HURUF KAPITAL ================= */
  { title: "Kapital 1", text: "Saya Belajar Mengetik" },
  { title: "Kapital 2", text: "Indonesia Adalah Negara Yang Indah" },

  /* ================= ANGKA ================= */
  { title: "Angka 1", text: "12345 67890" },
  { title: "Angka 2", text: "2026 adalah tahun sekarang" },

  /* ================= SIMBOL ================= */
  { title: "Simbol 1", text: "! @ # $ % ^ & * ( )" },
  { title: "Simbol 2", text: "? , . ; : - _ = +" },

  /* ================= CAMPURAN ================= */
  { title: "Campuran 1", text: "Saya mengetik 100 kata dalam 1 menit!" },
  { title: "Campuran 2", text: "Belajar typing itu seru dan bermanfaat." },

  /* ================= ADVANCED ================= */
  { title: "Advanced 1", text: "keterampilan mengetik cepat sangat berguna di era digital modern ini" },
  { title: "Advanced 2", text: "latihan konsisten akan meningkatkan kecepatan dan akurasi secara signifikan" }

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