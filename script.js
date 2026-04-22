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
let currentLesson = 0;

/* ================= LESSON ================= */
const lessons = [

  // DASAR
  { title: "Home Row", text: "asdf jkl;" },
  { title: "Latihan G H", text: "asdfg hjkl" },
  { title: "Baris Atas", text: "qwer uiop" },
  { title: "Baris Bawah", text: "zxcv nm" },

  // KALIMAT
  { title: "Kalimat", text: "saya belajar mengetik dengan cepat" },

  // SIMBOL
  { title: "Simbol", text: "! @ # $ % ^ & * ( )" },

  // MAHIR
  { title: "Mahir 1", text: "keterampilan mengetik cepat sangat penting dalam dunia digital saat ini" },

  // PARAGRAF
  { title: "Paragraf", text: "saya belajar mengetik setiap hari agar lebih cepat dan akurat tanpa melihat keyboard" },

  // CERITA PANJANG
  {
    title: "Legenda Tangkuban Perahu",
    text: "pada zaman dahulu di tanah sunda hiduplah seorang pemuda bernama sangkuriang yang tidak mengetahui bahwa wanita yang ia temui adalah ibunya sendiri yaitu dayang sumbi setelah dewasa sangkuriang jatuh cinta kepada dayang sumbi dan berniat menikahinya namun dayang sumbi menyadari hal tersebut dan berusaha menggagalkan pernikahan itu dengan memberikan syarat yang mustahil yaitu membuat danau dan perahu dalam satu malam dengan kesaktiannya sangkuriang hampir berhasil namun dayang sumbi menggagalkan usaha itu sehingga sangkuriang marah dan menendang perahu tersebut hingga terbalik dan menjadi gunung yang sekarang dikenal sebagai tangkuban perahu"
  },

  {
    title: "Legenda Danau Toba",
    text: "di sebuah desa hiduplah seorang pria yang suatu hari menangkap ikan ajaib yang berubah menjadi wanita cantik mereka menikah dan memiliki seorang anak namun sang ayah melanggar janji untuk tidak mengungkap asal usul istrinya sehingga sang ibu kembali menjadi ikan dan air meluap hingga membentuk danau luas yang dikenal sebagai danau toba"
  },

  {
    title: "Keajaiban Raja Ampat",
    text: "raja ampat adalah salah satu keindahan alam indonesia yang terkenal dengan lautnya yang jernih serta keanekaragaman hayati yang luar biasa banyak wisatawan datang untuk menikmati keindahan bawah lautnya yang menakjubkan"
  },

  {
    title: "Cerita Nusantara Panjang",
    text: "indonesia adalah negara yang kaya akan budaya dan keindahan alam dari sabang sampai merauke terdapat berbagai suku bahasa dan tradisi yang menjadikan indonesia sangat istimewa kekayaan ini harus dijaga dan dilestarikan"
  },

  { title: "Palung mariana",
    text:"Palung Mariana adalah titik terdalam di muka bumi yang terletak di barat Samudra Pasifik, sebelah timur Kepulauan Mariana. Terbentuk akibat subduksi lempeng Pasifik di bawah lempeng Filipina sekitar 180 juta tahun lalu, palung berbentuk huruf V ini memiliki kedalaman ekstrem mencapai kurang lebih 11.000 meter (Challenger Deep). Kondisi di dasarnya gelap total, bersuhu beku (1-4 C), dan memiliki tekanan 1.000 kali lipat dari tekanan atmosfer di permukaan."
  }

];

/* ================= KEYBOARD ================= */
const keyboardLayout = [
  [
    { key: "1", shift: "!" },
    { key: "2", shift: "@" },
    { key: "3", shift: "#" },
    { key: "4", shift: "$" },
    { key: "5", shift: "%" },
    { key: "6", shift: "^" },
    { key: "7", shift: "&" },
    { key: "8", shift: "*" },
    { key: "9", shift: "(" },
    { key: "0", shift: ")" },
    { key: "-", shift: "_" },
    { key: "=", shift: "+" },
    "Backspace"
  ],
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l","Enter"],
  ["Shift","z","x","c","v","b","n","m","Shift"],
  ["Space"]
];

/* ================= GENERATE KEYBOARD ================= */
keyboardLayout.forEach(row => {
  const rowEl = document.createElement("div");
  rowEl.classList.add("keyboard-row");

  row.forEach(key => {
    const keyEl = document.createElement("div");
    keyEl.classList.add("key");

    if (typeof key === "object") {
      keyEl.innerHTML = `
        <span class="top">${key.shift}</span>
        <span class="bottom">${key.key}</span>
      `;
      keyEl.dataset.key = key.key;
    } else {
      keyEl.innerHTML = `<span class="bottom">${key}</span>`;
      keyEl.dataset.key = key.toLowerCase();
    }

    if (["Backspace","Shift","Enter"].includes(key))
      keyEl.classList.add("wide");

    if (key === "Space")
      keyEl.classList.add("space");

    rowEl.appendChild(keyEl);
  });

  keyboardEl.appendChild(rowEl);
});

/* ================= SIDEBAR ================= */
lessons.forEach((lesson, i) => {
  const div = document.createElement("div");
  div.innerText = lesson.title;
  div.classList.add("lesson-item");

  div.onclick = () => loadLesson(i);

  lessonList.appendChild(div);
});

/* ================= LOAD LESSON ================= */
function loadLesson(i) {
  currentLesson = i;
  text = lessons[i].text;
  document.getElementById("lessonTitle").innerText = lessons[i].title;

  renderText();
  inputEl.value = "";
  highlightLesson();
}

/* ================= HIGHLIGHT SIDEBAR ================= */
function highlightLesson() {
  document.querySelectorAll(".lesson-item").forEach((el, i) => {
    el.classList.toggle("active", i === currentLesson);
  });
}

/* ================= RENDER TEXT ================= */
function renderText() {
  textEl.innerHTML = "";

  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.innerText = char;

    if (i === 0) span.classList.add("current");

    textEl.appendChild(span);
  });
}

/* ================= TIMER ================= */
function startTimer() {
  timer = setInterval(() => {
    time++;
    timeEl.innerText = time;
    updateWPM();
  }, 1000);
}

/* ================= INPUT ================= */
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

/* ================= WPM ================= */
function updateWPM() {
  const words = inputEl.value.length / 5;
  const wpm = Math.round((words / time) * 60);
  wpmEl.innerText = wpm || 0;
}

/* ================= ACCURACY ================= */
function updateAccuracy() {
  const total = inputEl.value.length;
  const acc = total === 0 ? 100 : Math.round(((total - mistakes) / total) * 100);
  accEl.innerText = acc + "%";
}

/* ================= NEXT KEY ================= */
function highlightNextKey() {
  const nextChar = text[inputEl.value.length];

  document.querySelectorAll(".key").forEach(k => k.classList.remove("next"));

  if (!nextChar) return;

  let key = nextChar.toLowerCase();
  if (key === " ") key = "space";

  const el = document.querySelector(`[data-key="${key}"]`);
  if (el) el.classList.add("next");
}

/* ================= KEY PRESS ================= */
document.addEventListener("keydown", (e) => {
  let key = e.key.toLowerCase();
  if (key === " ") key = "space";

  const el = document.querySelector(`[data-key="${key}"]`);
  if (el) el.classList.add("active");

  if (e.shiftKey) {
    document.querySelectorAll(".top").forEach(t => t.style.color = "#38bdf8");
  }
});

document.addEventListener("keyup", (e) => {
  let key = e.key.toLowerCase();
  if (key === " ") key = "space";

  const el = document.querySelector(`[data-key="${key}"]`);
  if (el) el.classList.remove("active");

  document.querySelectorAll(".top").forEach(t => t.style.color = "#94a3b8");
});

/* ================= NEXT LESSON ================= */
function nextLesson() {
  currentLesson++;
  if (currentLesson >= lessons.length) currentLesson = 0;

  reset();
  loadLesson(currentLesson);
}

/* ================= RESET ================= */
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

/* ================= INIT ================= */
loadLesson(0);