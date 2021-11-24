// id name email password
function obtainAdmins() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Admin/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#idAdmin").val("");
        $("#nameAdmin").val("");
        $("#emailAdmin").val("");
        $("#passwordAdmin").val("");
        $("#getAdmin").html("");
        $("#getAdmin").append(drawNameAdmin(answer));
      },
    });
}

function drawNameAdmin(items) {
    let myTable = "<ul>"
    for (i = 0; i<items.length; i++){
        myTable += "<li id="+items[i].id+">" + items[i].name +"</li>"
        //myTable += "<li>"+'<a href="./infoFarm.html" id='+(i+1)+'>' + items[i].name + '</a>'+ "</li>" // 
    }
    myTable += "</ul>"
    return myTable
}

function createAdmin() {
    let myData = {
        name: $("#nameAdmin").val(),
        email: $("#emailAdmin").val(),
        password: $("#passwordAdmin").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Admin/save",
      type: "POST",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      complete: function () {
        obtainAdmins();
      },
    });
}

function updateAdmin() {
    let myData = {
        id: $("#idAdmin").val(),
        name: $("#nameAdmin").val(),
        email: $("#emailAdmin").val(),
        age: $("#ageAdmin").val(),
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Admin/update",
      type: "PUT",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      complete: function () {
        obtainAdmins();
      },
    });
}

function deleteAdmin() {
    let myData = {
        id: $("#idAdmin").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Admin/" + $("#idAdmin").val(),
      type: "DELETE",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      success: function () {
        obtainAdmins();
      },
    });
}




$(document).on("click", "div ul li", function () {
    $("#getAdmin ul li").click(function () {
        $.ajax({
          url: "http://150.230.86.64:81/api/Admin/" + $(this).attr("id"),
          type: "GET",
          dataType: "json",
          success: function (answer) {
            $("#idAdmin").val(answer.id);
            $("#nameAdmin").val(answer.name);
            $("#emailAdmin").val(answer.email);
          },
        });
    })
})