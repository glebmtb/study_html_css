/**
 * Created by Gleb on 27.09.15.
 */



$(document).ready(function () {
    $('#list_birthday tbody').append('<tr><td>1</td><td>Лариса</td><td>23 мая 1986г.</td><td>300</td></tr>');
    $('#list_birthday tbody').append('<tr class="alert"><td>2</td><td>Лариса</td><td>23 мая 1986г.</td><td>300</td></tr>');
    $('#list_birthday tbody').append('<tr><td>3</td><td>Лариса</td><td>23 мая 1986г.</td><td>300</td></tr>');

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

var item = {
    id: 0,
    date: "",
    name: "",
    leftDay: 0

}

var model = {
    addNewItem: function (item) {

    },

    loadList: function () {

    },
    deleteItem: function (id) {

    },
    changeItem: function(item){

    }
}

var view = {}

var control = {}
