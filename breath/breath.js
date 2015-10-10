/**
 * Created by gleb on 07.10.15.
 */


$(document).ready(function () {
    table.loadTable();
    $("#btnStart").click(timer.start);
});


var table = {
    defaultTime: 4,

    loadTable: function () {
        //
        var table = $("#bodyTable");
        var time = new Date(0);

        var newTime = 0;
        for (var cAction = 0; cAction < 10; cAction++) {
            newTime += this.defaultTime;
            time.setMinutes(0);
            time.setSeconds(newTime);
            table.append('<tr id="' + "action" + (cAction * 3) + '"><td class="text-center">' + (cAction + 1) + "</td><td>" + getTimeFormat(time) + '</td><td>Вдох</td><td class="showAction"></td></tr>');
            newTime += this.defaultTime * 4;
            time.setMinutes(0);
            time.setSeconds(newTime);
            table.append('<tr id="' + "action" + (cAction * 3 + 1) + '"><td></td><td>' + getTimeFormat(time) + '</td><td>Держим</td><td class="showAction"></td></tr>');
            newTime += this.defaultTime * 2;
            time.setMinutes(0);
            time.setSeconds(newTime);
            table.append('<tr id="' + "action" + (cAction * 3 + 2) + '"><td></td><td>' + getTimeFormat(time) + '</td><td>Выдох</td><td class="showAction"></td></tr>');
        }
    }
};

var getTimeFormat = function (time) {
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var textTime = "";
    if (minutes < 10) {
        textTime += "0";
    }
    textTime += minutes;
    textTime += ":";
    if (seconds < 10) {
        textTime += "0";
    }
    textTime += seconds;
    return textTime;
};

var timer = {
    currentTime: 0,
    currentDate: new Date(0),
    defaultTime: 4,

    currentStep: 0,
    currentAction: 0,
    oldAction: -1,
    nextTime: 4,
    action: ["Вдох", "Держим", "Выдох"],

    makeStep: function () {
        timer.currentTime++;

        if (timer.nextTime === timer.currentTime) {

            if (timer.currentAction + 1 === 3) {
                timer.currentStep++;
                timer.currentAction = 0;
            } else {
                timer.currentAction++;
            }
            if (timer.currentAction === 0) {
                timer.nextTime += timer.defaultTime;
            } else if (timer.currentAction === 1) {
                timer.nextTime += timer.defaultTime * 4;
            } else if (timer.currentAction === 2) {
                timer.nextTime += timer.defaultTime * 2;
            }
        }


        if (timer.currentStep > 9) {
            $("#btnText").html("Stop");
            $("#timerTable").html("");
            $(".showAction").html("");
            $("#currentAction").html("Закончили");
            clearTimeout(timer.time);
        } else {
            timer.setActionInForm();
        }
    },

    setActionInForm: function () {
        timer.currentDate.setMinutes(0);
        timer.currentDate.setSeconds(timer.currentTime);
        var textTime = getTimeFormat(timer.currentDate);
        $("#btnText").html(textTime);
        $("#timerTable").html(timer.nextTime - timer.currentTime);
        $("#currentAction").html(timer.action[timer.currentAction] + ' (-' + (timer.nextTime - timer.currentTime) + ')');


        if (timer.oldAction != timer.currentAction) {
            var selectRow = "#action" + (timer.currentStep * 3 + timer.currentAction);
            $(selectRow).addClass("active").siblings().removeClass("active");
            timer.oldAction = timer.currentAction;
            $(".showAction").html("");
            $(selectRow + " .showAction").html('<span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span><span id="timerTable">' + (timer.nextTime - timer.currentTime) + '</span>')
        }

    },


    start: function () {
        $("#btnGlyph").removeAttr("class").addClass("glyphicon glyphicon-time");
        $("#btnStart").unbind();
        timer.setActionInForm();
        timer.time = setInterval(timer.makeStep, 1000);
    }
}