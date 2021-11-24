// id name description
function obtainCategories() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Category/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#idCategory").val("");
        $("#nameCategory").val("");
        $("#descriptionCategory").val("");
        $("#getCategory").html("");
        $("#getCategory").append(drawName(answer));
        listCategories();
      },
    });
}

function createCategory() {
    let myData = {
        name: $("#nameCategory").val(),
        description: $("#descriptionCategory").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Category/save",
      type: "POST",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      complete: function () {
        obtainCategories();
      },
    });
}

function updateCategory() {
    let myData = {
        id: $("#idCategory").val(),
        name: $("#nameCategory").val(),
        description: $("#descriptionCategory").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Category/update",
      type: "PUT",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      complete: function () {
        obtainCategories();
      },
    });
}

function deleteCategory() {
    let myData = {
        id: $("#idCategory").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Category/" + $("#idCategory").val(),
      type: "DELETE",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      success: function () {
        obtainCategories();
      },
    });
}

//----------Open Detail Info ---------
$(document).on("click", "div ul li", function () {
    // Get Details Farm By ID 
    $("#getCategory ul li").click(function () {
        $.ajax({
          url: "http://150.230.86.64:81/api/Category/" + $(this).attr("id"),
          type: "GET",
          dataType: "json",
          success: function (answer) {
            $("#idCategory").val(answer.id);
            $("#nameCategory").val(answer.name);
            $("#descriptionCategory").val(answer.description);
          },
        });
    })
})
