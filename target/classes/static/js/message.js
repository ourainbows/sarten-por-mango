// idMessage messageText
function obtainMessages() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Message/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#idMessage").val("");
        $("#textMessage").val("");
        $("#farmMessage").val("");
        $("#getMessage").html("");
        $("#getMessage").append(drawMessage(answer));
      },
    });
}
function drawMessage(items) {
    let myTable = "<ul>"
    for (i = 0; i<items.length; i++){
        myTable += "<li id="+items[i].idMessage+">"+ "M: "+ items[i].messageText +"</li>"
    }
    myTable += "</ul>"
    return myTable
}

function listFarmsMessage() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Farm/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#farmMessage").html("");
        $("#farmMessage").append(drawFarm(answer));
      },
    });
}

function drawFarm(farms) {
    let selectOptions = ""
    selectOptions += "<option disabled selected value>Seleccionar Finca</option>"
    for (i = 0; i < farms.length; i++){
        selectOptions += "<option value=" + farms[i].id + ">" + farms[i].name + "</option>"
    }
    return selectOptions
}

function createMessage() {
    let finca = {
        id: $("#farmMessage").val()
    }
    let myData = {
        messageText: $("#textMessage").val(),
        farm: finca,
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Message/save",
      type: "POST",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      complete: function () {
        obtainMessages();
      },
    });
}

function updateMessage() {
    let finca = {
        id: $("#farmMessage").val()
    }
    let myData = {
        idMessage: $("#idMessage").val(),
        messageText: $("#textMessage").val(),
        farm: finca,
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Message/update",
      type: "PUT",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      complete: function () {
        obtainMessages();
      },
    });
}
function deleteMessage() {
    let myData = {
        idMessage: $("#idMessage").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Message/" + $("#idMessage").val(),
      type: "DELETE",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      success: function () {
        obtainMessages();
      },
    });
}



$(document).on("click", "div ul li", function () {
    $("#getMessage ul li").click(function () {
        $.ajax({
          url: "http://150.230.86.64:81/api/Message/" + $(this).attr("id"),
          type: "GET",
          dataType: "json",
          success: function (answer) {
            $("#idMessage").val(answer.idMessage);
            $("#textMessage").val(answer.messageText);
          },
        });
    })
})

listFarmsMessage()