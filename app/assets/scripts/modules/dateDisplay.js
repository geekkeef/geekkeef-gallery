import $ from 'jquery';

class DateDisplay {
    constructor() {
        this.date = new Date();
        this.dateDisplay = $('#dateDisplay');
        this.setDate();
    }

    setDate(){
        this.dateDisplay.html(this.date.toLocaleString());
    }
}

export default DateDisplay;

// var date = new Date();
// document.getElementById("dateDisplay").innerHTML = date.toLocaleString();