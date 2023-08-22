// Selecting form and input elements
const form = document.querySelector("form");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");
// Function to display error messages
const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}
// Function to handle form submission
const handleFormData = (e) => {
    e.preventDefault();
    // Retrieving input elements
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const dateInput = document.getElementById("date");
    const genderInput = document.getElementById("gender");
    // Getting trimmed values from input fields
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const date = dateInput.value;
    const gender = genderInput.value;
    // Regular expression pattern for email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());
    // Performing validation checks
    if (fullname === "") {
        showError(fullnameInput, "Enter your full name");
    }
    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address");
    }
    if (password === "") {
        showError(passwordInput, "Enter your password");
    }
    if (date === "") {
        showError(dateInput, "Select your date of birth");
    }
    if (gender === "") {
        showError(genderInput, "Select your gender");
    }
    // Checking for any remaining errors before form submission
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;
    // Submitting the form
    form.submit();
}
// Toggling password visibility
passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});
// Handling form submission event
form.addEventListener("submit", handleFormData);


function TicketDetails(frame){
    const coverFrame = document.querySelector(frame);

    // // collect all data
    const IdList = ["SL-Adult","SL-Child","SL-Infant","Foreign-Adult","Foreign-Child","Foreign-Infant"];
    const costPer = {
        'Local Adult':{ normal: 4, peak: 6, count : 0 },
        'Local Child':{ normal: 2, peak: 3, count : 0 },
        'Foreign Adult':{ normal: 10, peak: 13, count : 0 },
        'Foreign Child':{ normal: 5, peak: 8, count : 0 },
        'Infant':{ normal: 0, peak: 0, count : 0 },
    };
    
    let totalCost = 0;

    const getDate = document.getElementById("Visit-Date");
    
    getDate.addEventListener('input', function() {
        visitDate = getDate.value; 
        updateDetails();
    });

    // Session Times
    const timeSess = document.getElementById("sess-block");
    const checkTimSess = timeSess.querySelectorAll('input[type="checkbox"]');
    let timeDuration = "" , spendTime = "" ,visitDate = "";;
    let peakSess = 0 ,defSess = 0 ;
    checkTimSess.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const choosenSess = [];
            choosenSess.length = 0;
            peakSess = 0, defSess = 0;

            checkTimSess.forEach(cb => {
            if(cb.checked){
                choosenSess.push(parseInt(cb.getAttribute('data-time')));
            }
        });

        checkTimSess.forEach(cb => {
            const sessTime = parseInt(cb.getAttribute('data-time'));
            if  (choosenSess.length > 1 && 
                sessTime > Math.min(...choosenSess) && 
                sessTime < Math.max(...choosenSess)){
                    cb.checked = true;
            }
        });

        checkTimSess.forEach(cb => {
            if(cb.checked){
                if (cb.getAttribute('data-time') === '10' || cb.getAttribute('data-time') === '17') {
                    peakSess++;
                }  
            }
        });

            const countSelects = timeSess.querySelectorAll('input[type="checkbox"]:checked').length;
            defSess = countSelects - peakSess;
            timeDuration = countSelects + 'hrs ( ' + defSess + ' Normal : ' + peakSess + ' Peak )';
            let startTime = choosenSess[0], endTime = (startTime + countSelects);

            // Adjust for 12-hour clock format
            if (startTime >= 12) {
                if (startTime === 12) {
                    startTime = 12 + "PM";
                }else{
                    startTime = (startTime % 12) + " PM";
                }
            }else{
                startTime = startTime + " AM";
            }
            if (endTime >= 12) {
                if (endTime === 12) {
                    endTime = 12 + "PM";
                }else{
                    endTime = (endTime % 12) + " PM";
                }
            }else{
                endTime = endTime + " AM";
            }

            spendTime = startTime + " to " + endTime;

            console.log(timeDuration);
            console.log(spendTime);
            updateDetails();

        });
    });

    // Attach event listeners to input elements
    for (let j = 0; j < IdList.length; j++) {
        const inputElement = document.getElementById(IdList[j]);

        inputElement.addEventListener('input', function() {
            updateDetails();
        });
    }
    
    function Structure(){
        const ticketDetails = document.createElement("div");

        let topTable = `
            <table>
                <tr>
                    <td>Date</td>
                    <td>${visitDate}</td>
                </tr>
                <tr>
                    <td>Time</td>
                    <td>${spendTime}</td>
                </tr>
                <tr>
                    <td>Duration</td>
                    <td>${timeDuration}</td>
                </tr>
            </table>
        `;
        ticketDetails.innerHTML += topTable;

        let bottomTable = `
            <table>
                <thead>
                    <tr>
                        <th>Tickets</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
        `;

        totalCost = 0;

        for (const ticketType in costPer) {
            if (costPer.hasOwnProperty(ticketType)) {
                const cost = (costPer[ticketType].normal * defSess * costPer[ticketType].count) + (costPer[ticketType].peak * peakSess * costPer[ticketType].count);

                console.log(ticketType + ' Normal Cost: ' + (costPer[ticketType].normal * defSess * costPer[ticketType].count));
                console.log(ticketType + ' Peak Cost: ' + (costPer[ticketType].peak * peakSess * costPer[ticketType].count));

                totalCost += cost;

                bottomTable += `
                    <tr>
                        <td>${ticketType}</td>
                        <td>${cost}</td>
                    </tr>
                `;
            }
        }

        // After the loop, you can add the total cost to the bottomTable as well
        bottomTable += `
            <tr>
                <td>Total</td>
                <td>${totalCost}</td>
            </tr>
        `;

        ticketDetails.innerHTML += bottomTable;

        return ticketDetails;
    }

    function updateDetails(){
        Structure();

        // Update input values
        slAdultCount = parseInt(document.getElementById("SL-Adult").value);
        slChildCount = parseInt(document.getElementById("SL-Child").value);
        slInfantCount = parseInt(document.getElementById("SL-Infant").value);
        foreignAdultCount = parseInt(document.getElementById("Foreign-Adult").value);
        foreignChildCount = parseInt(document.getElementById("Foreign-Child").value);
        foreignInfantCount = parseInt(document.getElementById("Foreign-Infant").value);

        // Update ticket counts in the costPer object
        costPer['Local Adult'].count = slAdultCount;
        costPer['Local Child'].count = slChildCount;
        costPer['Foreign Adult'].count = foreignAdultCount;
        costPer['Foreign Child'].count = foreignChildCount;
        costPer['Infant'].count = slInfantCount + foreignInfantCount;
        
        // Update the HTML structure with the new values
        const ticketStructure = Structure();
        coverFrame.innerHTML = ""; // Clear previous content
        coverFrame.appendChild(ticketStructure);

        
    }

    updateDetails();

}


TicketDetails("#displayer");




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

