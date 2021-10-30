const testArea = document.querySelector('#test-area')
const theTimer = document.querySelector('.timer')
const resetButton = document.querySelector('#reset')
const templateText = document.querySelector('#origin-text p')

var myTikTok;

const control = {
    templateText: templateText.innerText,
    isRunningTiming: false,
    deltaMilliSeg: 0,
}

const zeroPad = (num, places) => String(num).padStart(places, '0');

const parseClockTime = (millis) => {
    const clock = {
        minutes: Math.floor(millis / 60000),
        seconds: ((millis % 60000) / 1000).toFixed(0),
        milliseconds: (((millis % 60000) % 1000) / 10).toFixed(0)
    }

    theTimer.innerHTML = `${zeroPad(clock.minutes, 2)}:${zeroPad(clock.seconds, 2)}:${clock.milliseconds}`
}

const updateClockTime = (delta) => {
    control.deltaMilliSeg += delta
    parseClockTime(control.deltaMilliSeg)
}

const startTime = () => {
    console.log('X_keypress');
    if (control.isRunningTiming === false) {
        control.isRunningTiming = true;

        myTikTok = setInterval(function() {
            updateClockTime(100);
        }, 100);
    }

}

const checkTyping = () => {
    if (control.isRunningTiming === true) {
        console.log(testArea.value)

        if (control.templateText === testArea.value) {
            control.isRunningTiming = false;
            clearInterval(myTikTok);
        }
    }
}

const restart = () => {
    control.isRunningTiming = false;
    control.deltaMilliSeg = 0;
    clearInterval(myTikTok);
    theTimer.innerHTML = `00:00:00`;
    testArea.value = '';

}

testArea.addEventListener("keypress", startTime);
testArea.addEventListener("keyup", checkTyping);
resetButton.addEventListener('click', restart)