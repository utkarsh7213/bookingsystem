$(document).ready(function() {
    let selectedDate = null;

    // Initialize the datepicker
    $("#datepicker_input").datepicker({
      minDate: 0, // Disable past dates
      onSelect: function(dateText, inst) {
        selectedDate = $("#datepicker_input").datepicker("getDate");
        $(".cancel-button, .apply-button").css("display", "inline-block");
        $(".datepicker-popup").css("display", "none");

      }
    });

    // Show the datepicker popup when the input is clicked
    $("#datepicker_input").click(function() {
      $(".datepicker-popup").css("display", "block");
    });

    // Hide the datepicker popup when the cancel button is clicked
    $(".cancel-button").click(function() {
      $("#datepicker_input").val('');
      selectedDate = null;
      $(".cancel-button, .apply-button").css("display", "none");
      $(".datepicker-popup").css("display", "none");

    });

    // Apply the selected date when the apply button is clicked
    $(".apply-button").click(function() {
      if (selectedDate) {
        $("#datepicker_input").val($.datepicker.formatDate("dd MM yy", selectedDate));
        $(".cancel-button, .apply-button").css("display", "none");
        $(".datepicker-popup").css("display", "none");
      }
    });
  });
