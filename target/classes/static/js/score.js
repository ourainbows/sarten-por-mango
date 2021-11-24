// id score text
function obtainScore() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Score/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        console.log(answer);
        $("#messageScore").val("");
        $("#reservationScore").val("");
        $("#getScore").html("");
        $("#getScore").append(drawScore(answer));
      },
    });
}
//$("reservationScore").val(answer.reservation["farm"])
function drawScore(items) {
    let myTable = "<ul>"
    for (i = 0; i < items.length; i++) {
        myTable += "<li id=" + items[i].id + ">" + items[i].text + "</li>"
    }
    myTable += "</ul>"
    return myTable
}

function createScore() {
    let myData = {
        text: $("#messageScore").val(),
        score: $("input[type='radio'][name='point']:checked").val(),
    }
    console.log(myData)
    $.ajax({
      url: "http://150.230.86.64:81/api/Score/save",
      type: "POST",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      complete: function () {
        obtainScore();
      },
    });
}

function updateScore() {
    let myData = {
        id: $("idScore"),
        text: $("#messageScore").val(),
        score: $("input[type='radio'][name='point']:checked").val(),
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Score/update",
      type: "PUT",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      complete: function () {
        obtainScore();
      },
    });
}


function listReservation() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Reservation/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#reservationScore").html("");
        $("#reservationScore").append(drawReservation(answer));
      },
    });
}

function drawReservation(reservas) {
    let selectOptions = ""
    //selectOptions += "<option disabled selected value>Seleccionar Reservaciones</option>"
    for (i = 0; i < reservas.length; i++){
        selectOptions += "<option value=" + reservas[i].idReservation + ">"+reservas[i].idReservation+"</option>"
    }
    return selectOptions
}

$(document).on("click", "div ul li", function () {
    $("#getScore ul li").click(function () {
        $.ajax({
          url: "http://150.230.86.64:81/api/Score/" + $(this).attr("id"),
          type: "GET",
          dataType: "json",
          success: function (answer) {
            $("#idScore").val(answer.id);
            $("#messageScore").val(answer.text);
          },
        });
    })
})

listReservation()