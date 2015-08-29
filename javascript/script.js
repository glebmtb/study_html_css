var scores = [60, 50, 60, 58, 54, 54,
    58, 50, 52, 54, 48, 69,
    34, 55, 51, 52, 44, 51,
    69, 64, 66, 55, 52, 61,
    46, 31, 57, 52, 44, 18,
    41, 53, 55, 61, 51, 44
];

var costs = [.25, .27, .25, .25, .25, .25,
    .33, .31, .25, .29, .27, .22,
    .31, .25, .25, .33, .21, .25,
    .25, .25, .28, .25, .24, .22,
    .20, .25, .30, .25, .24, .25,
    .25, .25, .27, .25, .26, .29
];

var highResult = 0;
var bestSolutions = [];
var cheapSolutionIndex;



for (var index = 0; index < scores.length; index++) {
    var log = "Мыльные пузырь решение #" + index + " количество шаров: " + scores[index];
    document.write(log + "<br>");
    if (highResult < scores[index]) {
        highResult = scores[index];
    }
}

for (var index = 0; index < scores.length; index++) {
    if (highResult == scores[index]) {
        bestSolutions.push(index);
    }
}

document.write("<br>");
document.write("Мульных пузырей протестировано: " + scores.length + "<br>");
document.write("Самый большое количество пузырей: " + highResult + "<br>");
document.write("Решения с большим количество шаров: " + bestSolutions + "<br>");

cheapSolutionIndex = bestSolutions[0];
for (var index = 0; index < bestSolutions.length; index++) {
    if (costs[bestSolutions[index]] < costs[cheapSolutionIndex]) {
        cheapSolutionIndex = bestSolutions[index];
    }
}
document.write("Самый дешевый из них: " + cheapSolutionIndex + " по цене: " + costs[cheapSolutionIndex])