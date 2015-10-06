/**
 * Created by Gleb on 27.09.15.
 */

//var items = [item1, item2, item3];


var model = {
    itemsJSON: '[{"id": 1, "date": "1986-05-23", "name": "Лариса", "leftDay": 300},{"id": 2, "date": "1986-05-23", "name": "Петя", "leftDay": 300},{"id": 3, "date": "1986-05-23", "name": "Сережа", "leftDay": 300}]',

    addNewItem: function (item) {

    },

    loadList: function () {
        this.items = JSON.parse(this.itemsJSON);
        return this.items;
    },

    deleteItem: function (id) {

    },

    updateItem: function (item) {

    },

    getById: function (id) {
        for (var it in this.items) {
            if(id == this.items[it].id){
                return this.items[it];
            }
        }
    }
}

var view = {
    getSelectId: function() {
        return $("#list_birthday tbody tr[class=active]").attr("id");
    }
}

var control = {}

$(document).ready(function () {
    var items = model.loadList();
    for (var it in items) {
        $('#list_birthday tbody').append('<tr id="' + items[it].id + '"><td>' + (1 + Number(it)) + '</td><td>' + items[it].name + '</td><td>' + items[it].date + '</td><td>' + items[it].leftDay + '</td></tr>');
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

    $('#formChangeItem').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('whatever'); // Extract info from data-* attributes

        var modal = $(this);
        if ('add' === recipient) {
            modal.find('.modal-title').text('Добавление нового друга');
            modal.find('#inputName').val("");
            modal.find('#inputDate').val("");
        } else if ('cng' === recipient) {
            modal.find('.modal-title').text('Изминение данных друга');
            var id = view.getSelectId();
            var item = model.getById(id);
            modal.find('#inputName').val(item.name);
            modal.find('#inputDate').val(item.date);
        }
    })
})