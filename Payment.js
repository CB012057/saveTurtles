slAdultCount = localStorage.getItem("slAdultCount");
slChildCount = localStorage.getItem("slChildCount");
slInfantCount = localStorage.getItem("slInfantCount");
foreignAdultCount = localStorage.getItem("foreignAdultCount");
foreignChildCount = localStorage.getItem("foreignChildCount");
foreignInfantCount = localStorage.getItem("foreignInfantCount");
timeDuration = localStorage.getItem("timeDuration");
visitDate = localStorage.getItem("visitDate");

// document.getElementById("visitDate").innerText = visitDate;
document.getElementById("slAdultPrice").innerText = slAdultCount;
document.getElementById("slChildPrice").innerText = slChildCount;
document.getElementById("foreignAdultPrice").innerText = foreignAdultCount;
document.getElementById("foreignChildPrice").innerText = foreignChildCount;
document.getElementById("duration").innerText = timeDuration;

const form = document.querySelector("#FormPay");










//card number divider
const cardnumber = document.querySelector("#cardnumber");






cardnumber.addEventListener("keyup", function(e) {
    let value = e.target.value;
    value = value.replace(/\s/g, "");
    let finalValue = "";
    for (let i = 0; i < value.length; i++) {
        if (i % 4 == 0 && i > 0) {
            finalValue = finalValue.concat(" ");
        }
        finalValue = finalValue.concat(value[i]);
    }
    e.target.value = finalValue;
});


//expiry date slash

const expiryInput = document.getElementById("expirydate");


expiryInput.addEventListener('input', (event) => {
    const inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    let formattedValue = '';

    if (inputValue.length > 0) {
        formattedValue = inputValue.slice(0, 2);

        if (inputValue.length > 2) {
            formattedValue += '/' + inputValue.slice(2);
        }
    }

    event.target.value = formattedValue;
});


//table values





















//Display total in the pay button
const total = localStorage.getItem("total");


var totalbutton = document.querySelector("#totalbutton");



if (total != 0) {
    totalbutton.innerHTML = "Pay " + total + "";
} else {
    totalbutton.innerHTML = "Pay $" + 0 + "";
}


const date = localStorage.getItem("date");
document.getElementById("date").innerHTML = date;

const time = localStorage.getItem("time");
document.getElementById("time").innerHTML = time;


const duration = localStorage.getItem("duration");
document.getElementById("duration").innerHTML = duration;


const slAdultno = localStorage.getItem("slAdultno");
document.getElementById("slAdultno").innerHTML = slAdultno;

const slAdultprice = localStorage.getItem("slAdultprice");
document.getElementById("slAdultprice").innerHTML = slAdultprice;


const slChildno = localStorage.getItem("slChildno");
document.getElementById("slChildno").innerHTML = slChildno;

const slChildprice = localStorage.getItem("slChildprice");
document.getElementById("slChildprice").innerHTML = slChildprice;

const fAdultno = localStorage.getItem("fAdultno");
document.getElementById("fAdultno").innerHTML = fAdultno;

const fAdultprice = localStorage.getItem("fAdultprice");
document.getElementById("fAdultprice").innerHTML = fAdultprice;

const fChildno = localStorage.getItem("fChildno");
document.getElementById("fChildno").innerHTML = fChildno;


const fChildprice = localStorage.getItem("fChildprice");
document.getElementById("fChildprice").innerHTML = fChildprice;


const infantno = localStorage.getItem("infantno");
document.getElementById("infantno").innerHTML = infantno;


const infantprice = localStorage.getItem("infantprice");

document.getElementById("infantprice").innerHTML = infantprice;


document.getElementById("total").innerHTML = total;


function updateTableWithData() {
    const dateVal = localStorage.getItem("selectedDate");
    const timeVal = localStorage.getItem("selectedSlots");
    const duration = localStorage.getItem("duration");
    const timeval=localStorage.getItem("timeval");
    const slAdultPrice = localStorage.getItem("slAdultPrice");
    const slChildPrice = localStorage.getItem("slChildPrice");
    const foreignAdultPrice = localStorage.getItem("foreignAdultPrice");
    const foreignChildPrice = localStorage.getItem("foreignChildPrice");
    const TotalPrice=localStorage.getItem("TotalPrice");
    // Update table elements with retrieved data
    document.getElementById("dateVal").innerText = dateVal;
    document.getElementById("timeVal").innerText = timeVal;
    document.getElementById("duration").innerText = duration;
    document.getElementById("slAdultPrice").innerText = slAdultPrice;
    document.getElementById("slChildPrice").innerText = slChildPrice;
    document.getElementById("foreignAdultPrice").innerText = foreignAdultPrice;
    document.getElementById("foreignChildPrice").innerText = foreignChildPrice;
    document.getElementById("TotalPrice").innerText = TotalPrice;
    
}
updateTableWithData();