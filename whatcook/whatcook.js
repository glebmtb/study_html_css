var soup = ["Солянка", "Гороховый", "Щи", "С рисом", "Лапша", "Борщ"];
var garnish = ["Рис", "Гречка", "Пюре", "Макароны", "Спагетти", "Картофель жареный", "Картофель вареный", "Рагу овощное"];
var meat = ["Котлеты", "Гуляш", "Курица в белом соусе", "Сосиски", "Фарш", "Печень", "Запеченная курица", "Рыба жареная", "Рыба тушенная"];

function getRandom(count) {
    return Math.floor(Math.random() * count);
}

$(window).load(function() {
    $("button").click(function() {
        $("#soup").html(soup[getRandom(soup.length)]);
        $("#garnish").html(garnish[getRandom(garnish.length)]);
        $("#meat").html(meat[getRandom(meat.length)]);
    });
});