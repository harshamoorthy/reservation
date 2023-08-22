
"use strict";

$( () => {
    
    //move the focus to the “Pickup Date” text box
    $("#pickup_date").focus();	

    // event handler for the submit event of the form
    $("#reservation_form").submit( event => {

        $("span").text(""); // clear any previous error messages
        
        let isValid = true;

        //validate pickup date 
        const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
        const pickup_date = $("#pickup_date").val().trim();
        if (pickup_date == "") {
            $("#pickup_date").next().text("This field is required.");
            isValid = false;
        } else if (!dateFormat.test(pickup_date)) {
            $("#pickup_date").next().text("Must be in dd/mm/yyyy format.");
            isValid = false;
        } else {
            const dateArray = pickup_date.split("/"); //splits string into array of substrings based on '/' delimiter. Day, Month and Year becomes separate component in array.
            const day = parseInt(dateArray[0], 10); // second argument uses base 10 for everyday number
            const month = parseInt(dateArray[1], 10);
            const year = parseInt(dateArray[2], 10);
            const dateObj = new Date(year, month - 1, day); //Date object starts with index zero for the month component, so we subtract 1 from the month variable
            if (
                dateObj.getFullYear() !== year ||
                dateObj.getMonth() + 1 !== month ||
                dateObj.getDate() !== day
            ) {
                $("#pickup_date").next().text("Enter a valid date.");
                isValid = false;
            } else {
                $("#pickup_date").next().text("");
            }
        }
        
        $("#pickup_date").val(pickup_date);

        //validate no. days #days 
        const days = $("#days").val().trim();
        if (days == "") {
            $("#days").next().text("This field is required.");
            isValid = false;
        } else if(isNaN(days)){
            $("#days").next().text("Must be numeric.");
        }else {
            $("#days").next().text("");
        }
        $("#days").val(days);

        //validate name 
        const name = $("#name").val().trim();
        if (name == "") {
            $("#name").next().text("This field is required.");
            isValid = false;
        } else {
            $("#name").next().text("");
        }
        $("#name").val(name);

        //validate email  
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
        const email = $("#email").val().trim();
        if (email == "") { 
            $("#email").next().text("This field is required.");
            isValid = false;
        } else if ( !emailPattern.test(email) ) {
            $("#email").next().text("Must be a valid email address.");
            isValid = false;
        } else {
            $("#email").next().text("");
        }
        $("#email").val(email);

        //validate phone 
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        const phone = $("#phone").val().trim();
        if (phone == "") { 
            $("#phone").next().text("This field is required.");
            isValid = false; 
        } else if ( !phonePattern.test(phone) ) {
            $("#phone").next().text("Use 999-999-9999 format.");
            isValid = false;
        } else {
            $("#phone").next().text("");
        }
        $("#phone").val(phone);  

        // prevent the submission of the form if any entries are invalid 
        if (isValid == false) {
            event.preventDefault();                
        }

    });
}); 