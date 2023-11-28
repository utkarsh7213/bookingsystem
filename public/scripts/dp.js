$(document).ready(function () {
    $("#profileForm").submit(function (event) {
      event.preventDefault();
  
      const formData = new FormData(this);
  
      $.ajax({
        type: "POST",
        url: "/upload_dp",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          if (response) {
            // $("#message").text("Image uploaded successfully: " + response);
            alert(response)
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          console.error("Error:", textStatus, errorThrown);
        //   $("#message").text("Error: " + errorThrown);
        },
      });
    });
  });