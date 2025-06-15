// Stopwatch functionality
let startTime, updatedTime, difference, timerInterval;
let running = false;
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - (difference || 0);
    timerInterval = setInterval(updateTime, 10);
    running = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  }
});

pauseBtn.addEventListener('click', () => {
  if (running) {
    clearInterval(timerInterval);
    difference = Date.now() - startTime;
    running = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  difference = 0;
  running = false;
  timeDisplay.textContent = '00:00:00.000';
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = timeDisplay.textContent;
  laps.appendChild(li);
});

function updateTime() {
  updatedTime = Date.now() - startTime;
  let ms = updatedTime % 1000;
  let s = Math.floor(updatedTime / 1000) % 60;
  let m = Math.floor(updatedTime / (1000 * 60)) % 60;
  let h = Math.floor(updatedTime / (1000 * 60 * 60));

  timeDisplay.textContent =
    `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}

function pad(number, digits = 2) {
  return number.toString().padStart(digits, '0');
}

// Live Clock
function updateCurrentTime() {
  const now = new Date();
  document.getElementById('current-time').textContent = now.toLocaleTimeString();
}
setInterval(updateCurrentTime, 1000);

// Alarm
const setAlarmBtn = document.getElementById('set-alarm-btn');
const alarmInput = document.getElementById('alarm-time');
const alarmStatus = document.getElementById('alarm-status');
let alarmTimeout = null;

setAlarmBtn.addEventListener('click', () => {
  const inputTime = alarmInput.value;
  if (!inputTime) {
    alarmStatus.textContent = 'Please enter a valid time.';
    return;
  }

  const now = new Date();
  const [hours, minutes] = inputTime.split(':');
  const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

  if (alarmDate <= now) {
    alarmDate.setDate(alarmDate.getDate() + 1); // Set for next day
  }

  const timeToAlarm = alarmDate.getTime() - now.getTime();
  clearTimeout(alarmTimeout);

  alarmTimeout = setTimeout(() => {
    alert('⏰ Alarm ringing!');
    alarmStatus.textContent = '';
  }, timeToAlarm);

  alarmStatus.textContent = `Alarm set for ${alarmDate.toLocaleTimeString()}`;
});
