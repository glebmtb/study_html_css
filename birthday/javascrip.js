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
        var item = $("#" + id);
        item.remove();
    },

    updateItem: function (item) {

    },

    getById: function (id) {
        for (var it in this.items) {
            if (id == this.items[it].id) {
                return this.items[it];
            }
        }
    }
}

var view = {
    getSelectId: function () {
        return $("#list_birthday tbody tr[class=active]").attr("id");
    },

    disabledBtnEditAndRemove: function(isDisabled){
        if(isDisabled){
            $("#btnChange").addClass("disabled");
            $("#btnChange").removeAttr("data-target");
            $("#btnRemove").addClass("disabled");
            $("#btnRemove").off();
        }else{
            $("#btnChange").removeClass("disabled");
            $("#btnChange").attr("data-target", "#formChangeItem");
            $("#btnRemove").removeClass("disabled");
            $("#btnRemove").click(control.deleteItem);
        }
    }
}

var control = {
    deleteItem: function(){
        var id = view.getSelectId();
        view.disabledBtnEditAndRemove(true);
        model.deleteItem(id);
    }
};

$(document).ready(function () {
    var items = model.loadList();
    for (var it in items) {
        $('#list_birthday tbody').append('<tr id="' + items[it].id + '"><td>' + (1 + Number(it)) + '</td><td>' + items[it].name + '</td><td>' + items[it].date + '</td><td>' + items[it].leftDay + '</td></tr>');
    }

    $("tr").click(function () {
        if ($(this).is('[class*="active"]')) {
            $(this).removeClass("active");
            view.disabledBtnEditAndRemove(true);
        } else {
            $(this).addClass("active").siblings().removeClass("active");
            view.disabledBtnEditAndRemove(false);
        }
    });

    $("tr").dblclick(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $('#formChangeItem').modal();
    });

    $('#formChangeItem').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('whatever'); // Extract info from data-* attributes

        var modal = $(this);
        if ('add' === recipient) {
            modal.find('.modal-title').text('Добавление нового друга');
            modal.find('#inputName').val("");
            modal.find('#inputDate').val("");
        } else if ('cng' === recipient || true) {
            modal.find('.modal-title').text('Изминение данных друга');
            var id = view.getSelectId();
            var item = model.getById(id);
            modal.find('#inputName').val(item.name);
            modal.find('#inputDate').val(item.date);
        }
    })
})