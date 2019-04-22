(function () {
  //storing appointment details
  var appointments = {};

  //appointment input container
  var popup = document.querySelectorAll(".pop-up-container")[0];

  //warning container
  var warning_popup = document.querySelectorAll(".pop-up-container")[1];
  var warning_ok = document.querySelector('.ok');
  warning_ok.addEventListener('click', closeWarning, false);

  //appointment details input area
  var text = document.querySelector("textarea");

  //saving input from user
  var save = document.querySelector(".save");
  save.addEventListener("click", saveAppointment);

  //closing input pop-up
  var close = document.querySelector(".close");
  close.addEventListener("click", closePop);

  getCalenderDays();

  function getCalenderDays() {
    //current date
    var currentDate = new Date();


    //Title for calender
    document.querySelector('h3').textContent = getMonthYear(currentDate);

    //current Months dates
    var currentMonthArr = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());

    //adjustment for start of current month's day
    adjustingDay(currentMonthArr[0].getDay());

    //creating day-wise calender
    currentMonthArr.forEach(date => {
      createDaysDiv(date.getDate());
    });

    //adjustment for the trailing days of month (for css purpose)
    adjustingEndDay(currentMonthArr[currentMonthArr.length - 1].getDay());
  }

  function getDaysInMonth(month, year) {
    //start date of month
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      //adding days to get full month days
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  function createDaysDiv(text) {
    var container = document.getElementsByClassName("calender-container")[0];
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    div.value = text;
    div.dataset.date = text;
    div.title = "Click to add appointment";
    div.classList.add("days");
    container.append(div);
    if (text) {
      div.addEventListener("click", addAppointment, false);
    }
  }

  function adjustingDay(startingDay) {
    while (startingDay) {
      createDaysDiv("");
      startingDay--;
    }
  }

  function adjustingEndDay(endDay) {
    while (endDay !== 6) {
      createDaysDiv("");
      endDay++;
    }
  }

  function addAppointment(e) {
    if (e.target !== e.currentTarget) {
      return false;
    }
    var date = this.value;
    if (appointments[date]) {
      warningPopUp("Appointment already present. Please delete to book a new");
      return false;
    }
    openPop(date);
  }

  function openPop(date) {
    popup.style.display = "block";
    popup.dataset.date = date;
    if (appointments[date]) {
      text.value = appointments[date];
    }
  }

  function closePop() {
    popup.style.display = "none";
    text.value = "";
    popup.dataset.date = "";
  }

  function saveAppointment(e) {
    if (!text.value) {
      warningPopUp("Add appointment details");
      return false;
    }
    appointments[popup.dataset.date] = text.value;
    document.querySelector('.days[data-date="' + popup.dataset.date + '"]').dataset.filled = true;
    createEditDelete();

    closePop();
  }

  function createEditDelete() {
    createButton({
      title: "Click to edit appointment",
      value: popup.dataset.date,
      name: "Edit",
      class: "edit",
      eventHandler: (e) => {
        openPop(e.currentTarget.value);
      }
    });
    createButton({
      title: "Click to delete appointment",
      value: popup.dataset.date,
      name: "Delete",
      class: "del",
      eventHandler: (e) => {
        appointments[e.currentTarget.value] = "";
        document.querySelector('.days[data-date="' + e.currentTarget.value + '"]').dataset.filled = "";
        e.currentTarget.dataset.filled = "";
        var parent = e.currentTarget.parentNode;
        var edit = parent.children[0];
        var del = parent.children[1];
        parent.removeChild(edit);
        parent.removeChild(del);
      }
    });
  }

  function createButton(element) {
    var parent = document.querySelector('[data-date="' + popup.dataset.date + '"]')
    var button = document.createElement('button');
    button.title = element.title;
    button.value = element.value;
    button.textContent = element.name;
    button.classList.add(element.class);
    button.addEventListener('click', element.eventHandler, false);
    parent.appendChild(button);
  }

  function warningPopUp(text) {
    warning_popup.style.display = "block";
    warning_popup.children[0].children[0].textContent = text;
  }

  function closeWarning() {
    warning_popup.style.display = "none";
  }

  function getMonthYear(date) {
    var monthName = '';
    switch (date.getMonth() * 1) {
      case 0: monthName = "JANUARY"; break;
      case 1: monthName = "FEBRUARY"; break;
      case 2: monthName = "MARCH"; break;
      case 3: monthName = "APRIL"; break;
      case 4: monthName = "MAY"; break;
      case 5: monthName = "JUNE"; break;
      case 6: monthName = "JULY"; break;
      case 7: monthName = "AUGUST"; break;
      case 8: monthName = "SEPTEMBER"; break;
      case 9: monthName = "OCTOBER"; break;
      case 10: monthName = "NOVEMBER"; break;
      default: monthName = "DECEMBER"; break;
    }
    return monthName + date.getFullYear();
  }
})();
