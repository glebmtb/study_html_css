/**
 * Created by Gleb on 27.09.15.
 */

//var items = [item1, item2, item3];

var itemsJSON = '[{"id": 1, "date": "23 мая 1986г.", "name": "Лариса", "leftDay": 300},{"id": 2, "date": "23 мая 1986г.", "name": "Петя", "leftDay": 300},{"id": 3, "date": "23 мая 1986г.", "name": "Сережа", "leftDay": 300}]';
var items = JSON.parse(itemsJSON);

var model = {
    addNewItem: function (item) {

    },

    loadList: function () {

    },
    deleteItem: function (id) {

    },
    changeItem: function (item) {

    }
}

var view = {}

var control = {}

$(document).ready(function () {
    for (var it in items) {

        $('#list_birthday tbody').append('<tr><td>' + items[it].id + '</td><td>' + items[it].name + '</td><td>' + items[it].date + '</td><td>' + items[it].leftDay + '</td></tr>');
    }

    $("tr").click(function () {
        if ($(this).is('[class*="active"]')) {
            $(this).removeClass("active");
            $("#btnChange").addClass("disabled");
            $("#btnRemove").addClass("disabled");
        } else {
            $(this).addClass("active").siblings().removeClass("active");
            $("#btnChange").removeClass("disabled");
            $("#btnRemove").removeClass("disabled");
        }
    });
})