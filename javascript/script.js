var randomLoc = Math.floor(Math.random() * 5);

var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;

var guess;
var hits = 0;
var guesses = 0;
var isSink = false;

while (isSink == false) {
    guess = prompt("Готовся, целься, зажигай! (введите число 0-6):");
    if (guess < 0 || guess > 6) {
        alert("ВВедите коректные данные!");
    } else {
        guesses = guesses + 1;
        var isHits = false;
        if (location1 == guess) {
            isHits = true;
            location1 = -1;
        } else if (location2 == guess) {
            isHits = true;
            location2 = -1;
        } else
        if (location3 == guess) {
            isHits = true;
            location3 = -1;
        } else {
            alert("промох");
        }
        if (isHits) {
            alert("попал");
            hits = hits + 1;
            if (hits == 3) {
                isSink = true;
                alert("Ты потопил мой кораболь!");
            }
        }
    }
}


var stats = "Ты сделал " + guesses + " выстрелов что бы потопить караболь, " + "что озночает что твоя точность " + (3 / guesses);
alert(stats);