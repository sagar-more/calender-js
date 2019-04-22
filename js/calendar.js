(function() {
  var appointments = {};
  var popup = document.querySelector(".pop-up-container");
  var save = document.querySelector(".save");
  var close = document.querySelector(".close");
  var text = document.querySelector(".details");
  save.addEventListener("click", saveAppointment);
  close.addEventListener("click", closePop);

  var currentDate = new Date();
  var currentMonthArr = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  adjustingDay(currentMonthArr[0].getDay());
  currentMonthArr.forEach(date => {
    createDaysDiv(date.toLocaleDateString());
  });
  adjustingEndDay(currentMonthArr[currentMonthArr.length - 1].getDay());

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
      alert("Appointment already present. Please delete to book a new");
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

  function saveAppointment() {
    if (!text.value) {
      alert("Add appointment details");
      return false;
    }
    appointments[popup.dataset.date] = text.value;
    var edit = document.createElement("button");
    var del = document.createElement("button");
    edit.value = popup.dataset.date;
    del.value = popup.dataset.date;
    edit.title = "Click to edit appointment";
    del.title = "Click to delete appointment";
    edit.classList.add("edit");
    del.classList.add("del");
    edit.textContent = "Edit";
    del.textContent = "Delete";
    var parent = document.querySelector(
      '[data-date="' + popup.dataset.date + '"]'
    );
    parent.appendChild(edit);
    parent.appendChild(del);
    del.addEventListener(
      "click",
      () => {
        appointments[edit.value] = "";
        edit.parentNode.removeChild(edit);
        del.parentNode.removeChild(del);
      },
      false
    );

    edit.addEventListener(
      "click",
      () => {
        openPop(edit.value);
      },
      false
    );
    closePop();
  }
})();
