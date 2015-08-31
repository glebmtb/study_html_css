var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },

    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
    disabledControl: function() {
        document.getElementById("fireButton").setAttribute("disabled", "disabled");
        document.getElementById("guessInput").setAttribute("disabled", "disabled");
        var tables = document.getElementsByTagName("td");
        for (var i = 0; i < tables.length; i++) {
            tables[i].onclick = null;
        }
    }
};

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [{
        locations: [0, 0, 0],
        hits: ["", "", ""]
    }, {
        locations: [0, 0, 0],
        hits: ["", "", ""]
    }, {
        locations: [0, 0, 0],
        hits: ["", "", ""]
    }],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("ПОПАЛ!");
                if (this.isSunk(ship)) {
                    view.displayMessage("ТЫ ПОТОПИЛ МОЙ КОРАБЛЬ!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("ТЫ ПРОМАХНУЛСЯ!");
        return false;
    },
    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    generateShipLocations: function() {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },
    generateShip: function() {
        var direction = Math.floor(Math.random() * 2);
        var row, col;
        var newShipLocations = [];
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },
    collision: function(locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
};

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board."); //TODO подсветить окно
    } else {
        var row = alphabet.indexOf(guess.charAt(0));
        var column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
    }
    return null;
}

var controller = {
    guesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("Вы потопили все мои коробли в " + this.guesses + " попыток");
                view.disabledControl();
            }
        }
    }
}

window.onload = function() {
    document.getElementById("formControl").onsubmit = handleFireForm;
    document.getElementById("guessInput").setAttribute("pattern", "[A-Ga-g][0-6]");
    model.generateShipLocations();
    var tables = document.getElementsByTagName("td");
    for (var i = 0; i < tables.length; i++) {
        tables[i].onclick = hadleFireTable;
    }
}

function handleFireForm() {
    var value = document.getElementById("guessInput").value;
    controller.processGuess(value.trim().toUpperCase());
    document.getElementById("guessInput").value = "";
    return false;
}

function hadleFireTable() {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    var call = alphabet[this.id.charAt(0)] + this.id.charAt(1);
    controller.processGuess(call);
}