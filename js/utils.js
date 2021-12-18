function secToFormat(seconds, format) {
    return moment.duration(seconds, 'seconds').format(format, { trim: false });
}
var running = false;
var lootIntervalElement = document.getElementById("loot-interval");
var runTimerElement = document.getElementById('start');
var alertOneElement = document.getElementById('alert-1');
var alertTwoElement = document.getElementById('alert-2');


function start() {
    var x, alertOne, alertTwo;
    var total = 0;
    const TIMEOUT = 120
    minMax = [105, 120]
    running = !running;
    if (alertOneElement.value != null && alertTwoElement.value != null) {
        alertOne = parseInt(alertOneElement.value) / TIMEOUT;
        alertTwo = parseInt(alertTwoElement.value) / TIMEOUT;
        console.log(alertOne);
        console.log(alertTwo);
    }
    else {
        alertOne = 0.84;
        alertTwo = 0.91;
    }
    x = setInterval(function () {
        percentage = (total % TIMEOUT) / TIMEOUT;
        lootIntervalElement.style.width = percentage * 100 + "%";
        lootIntervalElement.innerText = (total % TIMEOUT);

    
        if (percentage < alertOne) {
            lootIntervalElement.style.backgroundColor = "green";

        }
        else if (percentage < alertTwo) {
            lootIntervalElement.style.backgroundColor = "orange";
        }
        else if (percentage > alertTwo) {
            lootIntervalElement.style.backgroundColor = "red";
        }
        
        

        var humanized = secToFormat(total, "DD.HH:mm:ss")
        if (running) {
            runTimerElement.innerText = humanized;
            runTimerElement.className = "btn btn-outline-danger btn-lg btn-block"
        } else {
            clearInterval(x);
            lootIntervalElement.style.width = "0%";
            runTimerElement.className = "btn btn-outline-success btn-lg btn-block"
            runTimerElement.innerText = "Start"

        }
        total++;
    }, 1000);
}
