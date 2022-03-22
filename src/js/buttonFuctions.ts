const $ = require('jquery');

window.onload = () => {

  //Shows the input form
  $("#newBot").click(() => {
    $('#inputElement').attr('placeholder', 'Name your bot...');

    $(".inputContainer").show();
  });

}