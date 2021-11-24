// idClient email password name age
function obtainClients() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Client/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#idClient").val("");
        $("#nameClient").val("");
        $("#emailClient").val("");
        $("#ageClient").val("");
        $("#passwordClient").val("");
        $("#getClient").html("");
        $("#getClient").append(drawNameClient(answer));
        listClient();
      },
    });
}

function drawNameClient(items) {
    let myTable = "<ul>"
    for (i = 0; i<items.length; i++){
        myTable += "<li id="+items[i].idClient+">" + items[i].name +"</li>"
        //myTable += "<li>"+'<a href="./infoFarm.html" id='+(i+1)+'>' + items[i].name + '</a>'+ "</li>" // 
    }
    myTable += "</ul>"
    return myTable
}

function createClient() {
    let myData = {
        name: $("#nameClient").val(),
        email: $("#emailClient").val(),
        age: $("#ageClient").val(),        
        password: $("#passwordClient").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Client/save",
      type: "POST",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      complete: function () {
        obtainClients();
      },
    });
}

function updateClient() {
    let myData = {
        idClient: $("#idClient").val(),
        name: $("#nameClient").val(),
        email: $("#emailClient").val(),
        age: $("#ageClient").val(),
        password: $("#passwordClient").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Client/update",
      type: "PUT",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      complete: function () {
        obtainClients();
      },
    });
}

function deleteClient() {
    let myData = {
        idClient: $("#idClient").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Client/" + $("#idClient").val(),
      type: "DELETE",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      success: function () {
        obtainClients();
      },
    });
}




$(document).on("click", "div ul li", function () {
    $("#getClient ul li").click(function () {
        $.ajax({
          url: "http://150.230.86.64:81/api/Client/" + $(this).attr("id"),
          type: "GET",
          dataType: "json",
          success: function (answer) {
            $("#idClient").val(answer.idClient);
            $("#nameClient").val(answer.name);
            $("#emailClient").val(answer.email);
            $("#ageClient").val(answer.age);
          },
        });
    })
})