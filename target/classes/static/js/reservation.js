// idReservation startDate devolutionDate status
function obtainReservation() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Reservation/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#farmReserv").val("");
        $("#clientReserv").val("");
        $("#startReserv").val("");
        $("#endReserv").val("");
        $("#getReservation").html("");
        $("#getReservation").append(drawReservation(answer));
        listReservation();
      },
    });
}
function drawReservation(reservation) {
    let myTable = "<ul>"
    for (i = 0; i < reservation.length; i++) {
    myTable += "<li id=" + reservation[i].idReservation + ">" + reservation[i].idReservation + "</li>"
    }
    myTable += "</ul>"
    return myTable
}

function createReservation() {
    let cliente = {
        idClient: $("#clientReserv").val()
    }
    let finca = {
        id: $("#farmReserv").val()
    }
    let myData = {
        startDate: $("#startReserv").val(),
        devolutionDate: $("#endReserv").val(),
        client: cliente,
        farm: finca,
        score: $("input[type='radio'][name='point']:checked").val(),
    }
    console.log(myData)
    $.ajax({
      url: "http://150.230.86.64:81/api/Reservation/save",
      type: "POST",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      complete: function () {
        obtainReservation();
      },
    });
}

function updateReservation() {
    let cliente = {
    idClient: $("#clientReserv").val()
    }
    let finca = {
        id: $("#farmReserv").val()
    }
    let myData = {
        id: $("idReservation").val(),
        startDate: $("#startReserv").val(),
        devolutionDate: $("#endReserv").val(),
        client: cliente,
        farm: finca,
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Reservation/update",
      type: "PUT",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      complete: function () {
        obtainReservation();
      },
    });
}

function deleteReservation() {
    let myData = {
        id: $("#idFarm").val()
    }
    $.ajax({
        url: "http://150.230.86.64:81/api/Reservation/" + $("#idReservation").val(),
        type:"DELETE",
        data: JSON.stringify(myData),
        contentType:"application/JSON",
        dataType:'json',
        success:function(){
            obtainReservation()
        }
    })
}

function listFarmReservation() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Farm/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#farmReserv").html("");
        $("#farmReserv").append(drawFarmReserv(answer));
      },
    });
}

function drawFarmReserv(farm) {
    let selectOptions = ""
    selectOptions += "<option disabled selected value>Seleccionar Finca</option>"
    for (i = 0; i < farm.length; i++) {
        selectOptions += "<option value=" + farm[i].id + ">" + farm[i].name + "</option>"
    }
    return selectOptions
}

function listClient() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Client/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#clientReserv").html("");
        $("#clientReserv").append(drawClient(answer));
      },
    });
}

function drawClient(cliente) {
    let selectOptions = ""
    selectOptions += "<option disabled selected value>Seleccionar Cliente</option>"
    for (i = 0; i < cliente.length; i++){
        selectOptions += "<option value=" + cliente[i].idClient + ">"+ cliente[i].name+"</option>"
    }
    return selectOptions
}

$(document).on("click", "div ul li", function () {
    $("#getReservation ul li").click(function () {
        $.ajax({
          url: "http://150.230.86.64:81/api/Reservation/" + $(this).attr("id"),
          type: "GET",
          dataType: "json",
          success: function (answer) {
            $("#idReservation").val(answer.id);
          },
        });
    })
})

listFarmReservation()
listClient()