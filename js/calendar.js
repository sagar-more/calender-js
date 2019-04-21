(function () {
    var currentDate = new Date();
    var currentMonthArr = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    adjustingDay(currentMonthArr[0].getDay());
    currentMonthArr.forEach((date) => {
        createDaysDiv(date.toLocaleDateString());
        console.log(date.getDay(), date.getDate(), date.toDateString());
    });
    adjustingDay(currentMonthArr[currentMonthArr.length - 1].getDay());

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    function createDaysDiv(text) {
        var container = document.getElementsByClassName('calender-container')[0];
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        div.classList.add('days');
        container.append(div);
    }

    function adjustingDay(startingDay) {
        while (startingDay) {
            createDaysDiv('');
            startingDay--;
        }
    }
})();