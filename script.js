function addTimeInput() {
    var days = document.getElementById("days").value;
    var timeInputs = document.getElementById("time-inputs");

    timeInputs.innerHTML = ""; // Очищаем поля ввода времени перед добавлением новых

    for (var i = 1; i <= days; i++) {
        var dayLabel = document.createElement("label");
        dayLabel.textContent = "День " + i + ": ";
        timeInputs.appendChild(dayLabel);

        var startTimeInput = document.createElement("input");
        startTimeInput.type = "time";
        startTimeInput.className = "time-input";
        timeInputs.appendChild(startTimeInput);

        var endTimeInput = document.createElement("input");
        endTimeInput.type = "time";
        endTimeInput.className = "time-input";
        timeInputs.appendChild(endTimeInput);

        timeInputs.appendChild(document.createElement("br"));
    }
}

function calculateHours() {
    var timeInputs = document.getElementsByClassName("time-input");
    var totalHours = 0;
    var totalMinutes = 0;

    for (var i = 0; i < timeInputs.length; i += 2) {
        var startTime = timeInputs[i].value;
        var endTime = timeInputs[i + 1].value;

        var startHour = parseInt(startTime.substring(0, 2));
        var startMinute = parseInt(startTime.substring(3, 5));
        var endHour = parseInt(endTime.substring(0, 2));
        var endMinute = parseInt(endTime.substring(3, 5));

        // Рассчитываем время для одного дня
        var hours = 0;
        var minutes = 0;

        if (endHour < startHour || (endHour === startHour && endMinute < startMinute)) {
            hours = 24 - startHour + endHour;
            minutes = endMinute - startMinute;
        } else {
            hours = endHour - startHour;
            minutes = endMinute - startMinute;
        }

        if (minutes < 0) {
            hours -= 1;
            minutes += 60;
        }

        totalHours += hours;
        totalMinutes += minutes;
    }

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;

    document.getElementById("result").innerHTML = "Общее количество отработанных часов: " + totalHours + " часов " + totalMinutes + " минут.";
}

window.onload = function() {
    addTimeInput(); // При загрузке страницы создаем поля ввода времени для одного дня
};
