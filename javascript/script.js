var interval = setInterval(timerHandler, 2000);
setTimeout(clearInt, 6000, interval);

function timerHandler() {
    alert("Я тут.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nТвой Таймер.");
}

function clearInt(inter) {
    clearInterval(inter);
}