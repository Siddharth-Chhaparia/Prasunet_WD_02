let timer = null;
let running = false;
let startTime = 0;
let lapCounter = 1;
let storedTime = 0; // Variable to store the time when stopwatch is stopped

function startStop() {
    const startStopBtn = document.getElementById('startStopBtn');
    if (!running) {
        startStopBtn.textContent = 'Stop';
        startStopBtn.style.backgroundColor = '#e74c3c';
        startTimer();
    } else {
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#2ecc71';
        stopTimer();
    }
    running = !running;
}

function startTimer() {
    if (startTime === 0) {
        startTime = Date.now();
    } else {
        startTime += (Date.now() - storedTime);
    }
    timer = setInterval(updateTimer, 10);
}

function stopTimer() {
    clearInterval(timer);
    storedTime = Date.now(); // Store the current time when stopwatch is stopped
}

function lapReset() {
    if (running) {
        const lapTime = getFormattedTime(Date.now() - startTime);
        const lapListItem = document.createElement('li');
        lapListItem.textContent = `Lap ${lapCounter++}: ${lapTime.minutes}:${lapTime.seconds}.${lapTime.milliseconds}`;
        document.getElementById('lapsList').appendChild(lapListItem);
        // Scroll to bottom of laps list
        document.getElementById('lapsList').scrollTop = document.getElementById('lapsList').scrollHeight;
    }
}

function restartStopwatch() {
    clearInterval(timer);
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('milliseconds').textContent = '000';
    startTime = 0;
    lapCounter = 1;
    document.getElementById('lapsList').innerHTML = '';
    storedTime = 0; // Reset storedTime when restarting stopwatch
    const startStopBtn = document.getElementById('startStopBtn');
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#2ecc71';
    running = false;
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = getFormattedTime(elapsedTime);
    document.getElementById('minutes').textContent = formattedTime.minutes;
    document.getElementById('seconds').textContent = formattedTime.seconds;
    document.getElementById('milliseconds').textContent = formattedTime.milliseconds;
}

function getFormattedTime(elapsedTime) {
    let minutes = Math.floor(elapsedTime / (60 * 1000)).toString().padStart(2, '0');
    let seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000).toString().padStart(2, '0');
    let milliseconds = (elapsedTime % 1000).toString().padStart(3, '0');
    return { minutes, seconds, milliseconds };
}
