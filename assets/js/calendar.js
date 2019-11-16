var timeArray = [9, 10, 11, 12, 1, 2, 3, 4, 5]
var todayDayName = new Date()
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const today = new Date().toLocaleDateString()

var mainCalendarArea = document.querySelector("#mainCalArea");

$(document).ready(function () {
    buildCalendar();
}
);

// Calendar Build pushing Html through JS, Date and time
function buildCalendar() {
    var output = [];

    let dayOfWeek = days[todayDayName.getDay()];

    output.push(
        `<div class="row">
<div class="col-2"></div>
<div class="col-8 border-0"> 
<table class="table table-bordered rounded">
    <tbody>
    <tr>
        <td class="td-mySetup"></td>
        <td class="td-calMiddle text-center font-weight-bold">
            ${dayOfWeek + "," + today}
        </td>
        <td class="td-mySetup"></td>
    </tr> `
    )

    // My Time Loop to build out JSON
    timeArray.forEach(hourNumber => {
        if (hourNumber < 12 && hourNumber > 5) {
            output.push(`
        <tr> 
            <td class="td-mySetup" rowspan="2">${hourNumber}<sup>am</sup></td>
            <td class="td-calMiddle text-center">
                <a class="btn btn-light"></a>
            </td>
            <td class="td-mySetup"></td>
        </tr>
        <tr>
            <td class="td-calMiddle text-center">
                <a class="btn btn-light"></a>
            </td>
            <td class="td-mySetup"></td>
        </tr>`
            );
        } else {
            output.push(`
    <tr>
        <td class="td-mySetup" rowspan="2">${hourNumber}<sup>pm</sup></td>
        <td class="td-calMiddle text-center">
            <a class="btn btn-light"></a>
        </td>
        <td class="td-mySetup"></td>
    </tr>
    <tr>
        <td class="td-calMiddle text-center">
            <a class="btn btn-light"></a>
        </td>
        <td class="td-mySetup"></td>
    </tr>`
            );
        }
    });

    output.push(
        `</tbody>
  </table>
  </div>
  <div class="col-2"></div>
  </div>
  </div>`
    );

    mainCalendarArea.innerHTML = output.join("");
}


/*  1   Get rid of images they dont work anyway.            X done.
    2   Change time & date to momentjs.com form
    3   change a tags to imput text
      3a. have text area change colors with past, present and future
    4   input save button to local storage
    5   get info from storage to keep in schedule */