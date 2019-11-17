//our variables for time array and the document object of the main calender div
var timeArray = [9, 10, 11, 12, 1, 2, 3, 4, 5]
var mainCalendarArea = document.querySelector("#mainCalArea");

$(document).ready(function () {

    //grab the day of the week and today's date for display
    let dayOfWeek = moment().format("dddd");
    let today = moment().format("MMMM Do YYYY");

    //calling my build calendar function to populate the DOM
    buildCalendar(dayOfWeek, today);
});

// Calendar Build pushing Html through JS, Date and time
function buildCalendar(dayName, todayDate) {
    var output = [];

    //setup the bootstrap grid and talbe definition
    output.push(
        `<div class="row">
            <div class="col-2"></div>
            <div class="col-8 border-0"> 
                <table class="table table-bordered rounded">
                <tbody>
                    <tr>
                        <td class="td-mySetup"></td>
                        <td class="td-calMiddle text-center font-weight-bold">
                            <h5>${dayName + "," + todayDate}</h5>
                        </td>
                        <td class="td-mySetup"></td>
                    </tr>`
    )

    // This is the loop that will construct the bulk of the calendar table for display
    timeArray.forEach(hourNumber => {
        if (hourNumber < 12 && hourNumber > 5) {
            output.push(
        `<tr> 
            <td class="td-mySetup">${hourNumber}<sup>am</sup></td>
            <td class="td-calMiddle text-center">
                ${setColorFromHour(hourNumber, "am")}
            </td>
            <td class="td-mySetup">
                <a class="btn btn-success" href="#" onclick="btnSave(document.getElementById('hour${hourNumber}'))">Save</a>
            </td>
        </tr>`
            );
        } else {
            output.push(
                `<tr>
                    <td class="td-mySetup">${hourNumber}<sup>pm</sup></td>
                    <td class="td-calMiddle text-center">
                        ${setColorFromHour(hourNumber, "pm")}
                    </td>
                    <td class="td-mySetup">
                        <a class="btn btn-success" href="#" onclick="btnSave(document.getElementById(" hour${hourNumber}"))">Save</a> 
                    </td>
                </tr>`
            );
        }
    });

    //add in the closing elements to the output array
    output.push(
        `</tbody>
        </table>
        </div>
           <div class="col-2"></div>
        </div>
        </div>`
    );

    //set our main calendar area in the HTML to the joined output array
    mainCalendarArea.innerHTML = output.join("");
}

// Using moment to Keep Time and Date; change text colors to fit time of day.
function setColorFromHour(hourNumber, todIndicator) {

    //set our moments to the correct format so we can use the .isSame, .isBefore, and .isAfter functions in moment.js
    var momentHour = moment().format("MM-DD-YYYY " + hourNumber + ":00 ");
    var momentNow = moment().format("MM-DD-YYYY h:00 a");

    //add on the time of day indicated that was passed in to complete the moment format
    momentHour += todIndicator;

    if (moment(momentHour).isSame(momentNow)) {
        return `<input class="myTextArea" type="text" name="hour${hourNumber}" id="hour${hourNumber}" style="background-color: skyblue" value="${eventGet("hour" + hourNumber)}">`
    }

    if (moment(momentHour).isBefore(momentNow)) {
        return `<input class="myTextArea" type="text" name="hour${hourNumber}" id="hour${hourNumber}" style="background-color: lightgrey" value="${eventGet("hour" + hourNumber)}">`
    }

    if (moment(momentHour).isAfter(momentNow)) {
        return `<input class="myTextArea" type="text" name="hour${hourNumber}" id="hour${hourNumber}" style="background-color: bisque" value="${eventGet("hour" + hourNumber)}">`
    }

}

//  Function to save to Storage and Retrieve information   
function btnSave(inputElement) {

    //pull the value and id of the passed in element to set in local storage
    var userCalEvent = inputElement.value;
    var userCalHour = inputElement.id;

    localStorage.setItem(userCalHour, userCalEvent);
}

function eventGet(eventID) {

    //using the ID passed in, retrieve the data from local storage
    var eventData = localStorage.getItem(eventID);

    //check to see if the data is null, if so, just return an empty string
    if (eventData != null) {
        return eventData;
    } else {
        return "";
    }
}