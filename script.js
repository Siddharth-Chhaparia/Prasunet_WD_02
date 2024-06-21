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
        const lapsContainer = document.querySelector('.laps-container');

        // Find the last ul element in the last column
        let lastUl = lapsContainer.querySelector('.laps-column:last-child .laps-list');

        // Check if the last ul has 8 children, if so, create a new column and ul
        if (lastUl.childElementCount >= 8) {
            const newColumn = document.createElement('div');
            newColumn.classList.add('laps-column');
            const newUl = document.createElement('ul');
            newUl.classList.add('laps-list');
            newColumn.appendChild(newUl);
            lapsContainer.appendChild(newColumn);
            lastUl = newUl;
        }

        // Append the lap to the last ul
        lastUl.appendChild(lapListItem);
    }
}

function restartStopwatch() {
    clearInterval(timer);
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('milliseconds').textContent = '000';
    startTime = 0;
    lapCounter = 1;
    const lapsContainer = document.querySelector('.laps-container');
    lapsContainer.innerHTML = '<div class="laps-column"><ul id="lapsList" class="laps-list"></ul></div>'; // Reset laps and start with a new list
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

// Initialize with an empty laps list
document.addEventListener('DOMContentLoaded', () => {
    const lapsContainer = document.querySelector('.laps-container');
    lapsContainer.innerHTML = '<div class="laps-column"><ul id="lapsList" class="laps-list"></ul></div>';
});
