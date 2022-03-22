const $ = require('jquery');
const fs = require('fs');

window.onload = () => {

    var inputs = [];

    $("#inputForm").on('keypress', function (event) {

        if (event.keyCode === 13) {
            //Preventing from reloading page on submit
            event.preventDefault();
            event.isDefaultPrevented();

            //Gets the input from the form and updates the input array
            switch ($("#inputElement").attr('placeholder')) {
                case 'Name your bot...':
                    inputs.push(getInputed());

                    $('#inputElement').attr('placeholder', 'Add your bot token...');
                    $("#inputElement").val("");
                    break;
                case 'Add your bot token...':
                    inputs.push(getInputed());

                    $('#inputElement').attr('placeholder', 'Enter your bot prefix...');
                    $("#inputElement").val("");
                    break;
                case 'Enter your bot prefix...':
                    inputs.push(getInputed());

                    closeInput();
                    break;
            }

        }
    });
}

function closeInput() {
    $(".inputContainer").hide();
}

function getInputed() {
    return $("#inputElement").val();
}