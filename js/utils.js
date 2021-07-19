function secToFormat(seconds, format) {
    return moment.duration(seconds, 'seconds').format(format, { trim: false });
}
var running = false;
var lootIntervalElement = document.getElementById("loot-interval");
var runTimerElement = document.getElementById('start');


function start() {
    var x;
    var total = 0;
    const TIMEOUT = 120
    minMax = [105, 120]
    running = !running;
    x = setInterval(function () {
        percentage = (total % TIMEOUT) / TIMEOUT;
        lootIntervalElement.style.width = percentage * 100 + "%";
        lootIntervalElement.innerText = (total % TIMEOUT);
        if (percentage < 0.85) {
            lootIntervalElement.style.backgroundColor = "green";

        }
        else if (percentage < 0.91) {
            lootIntervalElement.style.backgroundColor = "orange";
        }
        else if (percentage < 0.94) {
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
