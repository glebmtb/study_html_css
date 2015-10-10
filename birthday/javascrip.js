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

    disabledBtnEdit: function (isDisabled) {
        var btnChange = view.getBtnChange();
        if (isDisabled) {
            btnChange.addClass("disabled");
            btnChange.removeAttr("data-target");
        } else {
            btnChange.removeClass("disabled");
            btnChange.attr("data-target", "#formChangeItem");
        }
    },
    disabledBtnRemove: function (isDisabled) {
        var btnRemove = view.getBtnRemove();
        if (isDisabled) {
            btnRemove.addClass("disabled");
            btnRemove.off();
        } else {
            btnRemove.removeClass("disabled");
            btnRemove.click(control.deleteItem);
        }
    },
    getBtnChange: function () {
        return $("#btnChange");
    },
    getBtnRemove: function () {
        return $("#btnRemove");
    },
    getBtnRefresh: function () {
        return $("#btnRefresh");
    }
}

var control = {
    deleteItem: function () {
        var id = view.getSelectId();
        view.disabledBtnEdit(true);
        view.disabledBtnRemove(true);
        model.deleteItem(id);
    },
    saveItem: function () {
    },
    doubleClickOnRow: function () {
        $(this).addClass("active").siblings().removeClass("active");
        $('#formChangeItem').modal();
    },
    oneClickOnRow: function () {
        if ($(this).is('[class*="active"]')) {
            $(this).removeClass("active");
            view.disabledBtnEdit(true);
            view.disabledBtnRemove(true);
        } else {
            $(this).addClass("active").siblings().removeClass("active");
            view.disabledBtnEdit(false);
            view.disabledBtnRemove(false);
        }
    },
    loadModalAddAndChange: function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('whatever'); // Extract info from data-* attributes

        var modal = $(this);
        if ('add' === recipient) {
            modal.find('.modal-title').text('Добавление нового друга');
            modal.find('#inputName').val("");
            modal.find('#inputDate').val("");
            control.selectItem = null;
        } else if ('cng' === recipient || true) {
            modal.find('.modal-title').text('Изминение данных друга');
            var id = view.getSelectId();
            var item = model.getById(id);
            modal.find('#inputName').val(item.name);
            modal.find('#inputDate').val(item.date);
            control.selectItem = item;
        }
    },

    refreshGrid: function () {
        var items = model.loadList();
        var bodyTable = $('#list_birthday tbody');
        bodyTable.empty();
        for (var it in items) {
            bodyTable.append('<tr id="' + items[it].id + '"><td>' + (1 + Number(it)) + '</td><td>' + items[it].name + '</td><td>' + items[it].date + '</td><td>' + items[it].leftDay + '</td></tr>');
        }

        var rows = $("#list_birthday tbody tr");
        rows.click(control.oneClickOnRow);
        rows.dblclick(control.doubleClickOnRow);
    }
};

$(document).ready(function () {
    control.refreshGrid();
    $('#formChangeItem').on('show.bs.modal', control.loadModalAddAndChange);
    view.getBtnRefresh().click(control.refreshGrid);
})