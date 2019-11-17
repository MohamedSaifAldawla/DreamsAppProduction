// Get the container element
var btnContainer = document.getElementById("myDIV");

// Get all buttons with class="btn" inside the container
var bt = btnContainer.getElementsByClassName("bt");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < bt.length; i++) {
  bt[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

$(document).ready(function() {
  var text_max = 99;
  $('#textarea_feedback').html(text_max + ' characters remaining');

  $('#textarea').keyup(function() {
      var text_length = $('#textarea').val().length;
      var text_remaining = text_max - text_length;

      $('#textarea_feedback').html(text_remaining + ' characters remaining');
  });
});
