// Selectors
const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const pomomdoroBtn = document.querySelector("#pomodoro");
const shortBrn = document.querySelector("#short");
const longBtn = document.querySelector("#long");
const timeInput = document.querySelector("#time-input");
const timeDOM = document.querySelector("#time");

let time = 1500;
let count;

// Set time with input
timeInput.addEventListener("input", () => {
  time = Number(timeInput.value) * 60;
  render();
});

// Countdown function
const countdown = () => {
  count = setInterval(() => {
    time--;
    render();

    // 0 stops countdown
    if (time === 0) {
      clearInterval(count);
      time = 1500;
      timeDOM.classList.add("time--finished");
      startBtn.textContent = "RESET";
      startBtn.classList.add("reset");
      timeInput.removeAttribute("disabled");
      return;
    }
  }, 1000);
};

// Buttons events

// Start button
startBtn.addEventListener("click", () => {
  if (startBtn.textContent === "START") {
    countdown();
    startBtn.textContent = "STOP";
    pauseBtn.removeAttribute("disabled");
    timeInput.setAttribute("disabled", "true");
    timeInput.value = "";
    startBtn.classList.remove("start");
    startBtn.classList.add("stop");
  } else if (startBtn.textContent === "RESET") {
    startBtn.textContent = "START";
    timeDOM.classList.remove("time--finished");
    time = 1500;
    startBtn.classList.remove("reset");
    startBtn.classList.remove("stop");
    startBtn.classList.add("start");
    render();
  } else {
    clearInterval(count);
    time = 1500;
    pauseBtn.textContent = "PAUSE";
    startBtn.textContent = "START";
    pauseBtn.setAttribute("disabled", "true");
    timeInput.removeAttribute("disabled");
    startBtn.classList.add("start");
    startBtn.classList.remove("stop");
    render();
  }
});

// Pause Btn
pauseBtn.addEventListener("click", () => {
  if (pauseBtn.textContent === "PAUSE") {
    pauseBtn.textContent = "RESUME";
    clearInterval(count);
  } else {
    pauseBtn.textContent = "PAUSE";
    countdown();
    render();
  }
  pauseBtn.classList.toggle("start");
  pauseBtn.classList.toggle("pause");
});

// Pomodoro Btn
pomomdoroBtn.addEventListener("click", () => {
  clearInterval(count);
  time = 1500;
  reset();
  render();
});

// Short Break Btn
shortBrn.addEventListener("click", () => {
  clearInterval(count);
  time = 300;
  reset()
  render();
});

// Long Break Btn
longBtn.addEventListener("click", () => {
  clearInterval(count);
  time = 600;
  reset()
  render();
});

// Reset Function
const reset = () => {
  startBtn.textContent = "START";
  pauseBtn.setAttribute("disabled", "disabled");
  timeInput.removeAttribute("disabled");
  pauseBtn.textContent = "PAUSE";
  pauseBtn.classList.add("pause");
  pauseBtn.classList.remove("start");
  startBtn.classList.add("start");
  startBtn.classList.remove("stop");
};

// Render time to DOM

const render = () => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  if (seconds < 10) {
    timeDOM.textContent = `${minutes} : 0${seconds}`;
  } else if (minutes < 10) {
    timeDOM.textContent = `0${minutes} : ${seconds}`;
  } else if (minutes < 10 && seconds < 10) {
    timeDOM.textContent = `0${minutes} : 0${seconds}`;
  } else {
    timeDOM.textContent = `${minutes} : ${seconds}`;
  }
};

render();
