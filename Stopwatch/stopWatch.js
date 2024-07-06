let hour = document.querySelector('#h1');
let minute = document.querySelector('#m1');
let second = document.querySelector('#s1');

let startButton = document.querySelector('#startButton');
let pauseButton = document.querySelector('#pauseButton');
let resetButton = document.querySelector('#resetButton');

let alarm = document.querySelector('audio');
let timer;

hour.value = '00';
minute.value = '00';
second.value = '00';

const max = '59';
const min = '00';

startButton.addEventListener('click', function () {
    if (hour.value === '00' && minute.value === '00' && second.value === '00') {
        alert("Error: The duration hasn't been specified!")
    }
    else {
        startCountDown();
    }
})

pauseButton.addEventListener('click', function () {
    stopCountDown();
})

resetButton.addEventListener('click', function () {
    reset();
    stopCountDown();
    alarm.pause();
})

const reset = function () {
    hour.value = '00';
    minute.value = '00';
    second.value = '00';
}
const countDown = function () {
    second.value = parseInt(second.value) - 1;
    if (second.value === '-1' && !(minute.value === '')) {
        second.value = '59';
        if (parseInt(minute.value) - 1 === '0') {
            minute.value = '00';
        }
        else {
            minute.value = parseInt(minute.value) - 1;
        }
    }
    if (minute.value === '-1' && !(minute.value === '')) {
        minute.value = '59';
        if (parseInt(hour.value) - 1 === '0') {
            hour.value = '00';
        }
        else {
            hour.value = parseInt(hour.value) - 1;
        }
    }
    if (hour.value === '00' && minute.value === '00' && (second.value === '00' || second.value === '0')) {
        alarm.play();
        stopCountDown();
    }
}

const startCountDown = function () {
    timer = setInterval(countDown, 1000)
}

const stopCountDown = function () {
    clearInterval(timer);
    reset();
    console.log('Countdown stopped.');
}

function restrictInput(event) {
    let maxvalue = 59;
    let input = event.target;
    let value = parseInt(input.value, 10);
    input.value = input.value.replace(/[^\d]/g, '');
    if (input.value.startsWith('0')) {
        input.value = input.value.slice(1);
    }
    if (isNaN(value) || value < 0) {
        input.value = ''
    }
    else if (value > maxvalue) {
        input.value = value.toString().slice(0, -1);
    }
    if (input.value === '') {
        input.value = '00';
    }
}

function restrictPaste(event) {
    let clipboardData = event.clipboardData || window.clipboardData;
    let pasteValue = clipboardData.getData('Text');

    if (!/^\d+$/.test('pasteValue') || parseInt(pasteValue) > 59) {
        event.preventDefault();
    }
}
