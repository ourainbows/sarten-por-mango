// id, name, address, extension, description
function obtainFarms() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Farm/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#idFarm").val("");
        $("#nameFarm").val("");
        $("#addressFarm").val("");
        $("#extensionFarm").val("");
        $("#descriptionFarm").val("");
        $("#categoryFarm").val("");
        $("#idClientFarm").val();
        $("#getFarm").html("");
        $("#getFarm").append(drawName(answer));
        listFarmReservation();
        listFarmsMessage();
      },
    });
}

function listCategories() {
    $.ajax({
      url: "http://150.230.86.64:81/api/Category/all",
      type: "GET",
      dataType: "json",
      success: function (answer) {
        $("#categoryFarm").html("");
        $("#categoryFarm").append(drawCategories(answer));
      },
    });
}
function drawCategories(categories) {
    let selectOptions = ""
    selectOptions += "<option disabled selected value>Seleccionar Categoria</option>"
    for (i = 0; i < categories.length; i++){
        selectOptions += "<option value=" + categories[i].id + ">" + categories[i].name + "</option>"
    }
    return selectOptions
}

function drawName(items) {
    let myTable = "<ul>"
    for (i = 0; i<items.length; i++){
        myTable += "<li id="+items[i].id+">" + items[i].name +"</li>"
        //myTable += "<li>"+'<a href="./infoFarm.html" id='+(i+1)+'>' + items[i].name + '</a>'+ "</li>" // 
    }
    myTable += "</ul>"
    return myTable
}

function createFarm() {
    let categoria = {
        id: $("#categoryFarm").val()
    }
    let myData = {
        //id: $("#idFarm").val(),
        name: $("#nameFarm").val(),
        address: $("#addressFarm").val(),
        extension: $("#extensionFarm").val(),
        description: $("#descriptionFarm").val(),
        category: categoria,
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Farm/save",
      type: "POST",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      complete: function () {
        obtainFarms();
      },
    });
}

function updateFarm() {
    let categoria = {
        id: $("#categoryFarm").val()
    }
    let myData = {
        id: $("#idFarm").val(),
        name: $("#nameFarm").val(),
        address: $("#addressFarm").val(),
        extension: $("#extensionFarm").val(),
        description: $("#descriptionFarm").val(),
        category: categoria,
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Farm/update",
      type: "PUT",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      complete: function () {
        obtainFarms();
      },
    });
}

function deleteFarm() {
    let myData = {
        id: $("#idFarm").val()
    }
    $.ajax({
      url: "http://150.230.86.64:81/api/Farm/" + $("#idFarm").val(),
      type: "DELETE",
      data: JSON.stringify(myData),
      contentType: "application/JSON",
      dataType: "json",
      success: function () {
        obtainFarms();
      },
    });
}

//----------Open Detail Info ---------
$(document).on("click", "div ul li", function () {
    // Get Details Farm By ID 
    $("#getFarm ul li").click(function () {
        $.ajax({
          url: "http://150.230.86.64:81/api/Farm/" + $(this).attr("id"),
          type: "GET",
          dataType: "json",
          success: function (answer) {
            $("#idFarm").val(answer.id);
            $("#nameFarm").val(answer.name);
            $("#addressFarm").val(answer.address);
            $("#extensionFarm").val(answer.extension);
            $("#descriptionFarm").val(answer.description);
            //$("#categoryFarm").val(answer.category["id"])
          },
        });
    })
})

listCategories()