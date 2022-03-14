
$("#itemSaveOrUpdate").attr('disabled', true);

function loadAllItem() {
    $("#itemTable").empty();
    for (let i in itemDb) {
        let row = `<tr><td>${itemDb[i].getCode()}</td><td>${itemDb[i].getName()}</td><td>${itemDb[i].getUnitPrice()}</td><td>${itemDb[i].getQty()}</td></tr>`;
        $("#itemTable").append(row);

    }

}


$("#itemSaveOrUpdate").click(function () {

    $("#itemTable>tr").off();


    let itemId = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let itemAddress = $("#itemQty").val();
    let itemSalary = $("#itemPrice").val();

    console.log(itemId, itemName, itemAddress, itemSalary);


/*

    let itemObj = {
        id: itemId,
        ItemName: itemName,
        itemAddress: itemAddress,
        itemSalary: itemSalary,
    };
*/
    alert("Do you want ad record...")

    var item = new ItemDTO(itemId, itemName, itemAddress, itemSalary);
    itemDb.push(item);
    loadAllItem();

    $("#ItemSearch").click(function () {

        $("#itemSaveOrUpdate").attr('disabled', true);


        let searchId = $("#srcItemID").val();
        let testSearchItem =  searchItem(searchId);

        if (testSearchItem) {

            $("#itemCode").val(testSearchItem.id);
            $("#itemName").val(testSearchItem.ItemName);
            $("#itemQty").val(testSearchItem.itemAddress);
            $("#itemPrice").val(testSearchItem.itemSalary);
            // clearAlItem();

        } else {

            clearAlItem();
            alert("No record Found");

        }

    });


    function searchItem(id) {
        for (let i = 0; i < itemDb.length; i++) {
            if (itemDb[i].id == id) {
                return itemDb[i];
            }
        }
    }

});



$("#itemDelete").click(function () {
    if (itemDb.length >0) {
        for (let i = 0; i < itemDb.length; i++) {


            itemIds = $("#srcItemID").val();

            if (itemIds == itemDb[i].id) {
                alert("ARE YOU REALLY WANT DELETE RECORDS")
                itemDb.pop(itemIds);
                loadAllItem();

            } else {
                alert("No record found")
            }
        }
    }else {
        alert("No record found")

    }
});







/*
    item validation
*/



/*   validation*/


const regExItemId = /^(I00)[0-9]{1,4}$/;
const regExItemName = /^[A-z ]{3,20}$/;
const regExQty = /^[0-9]{0,}[.]?[0-9]{1,2}$/;
const  regExPrice = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#itemCode,#itemName,#itemQty,#itemPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});


$("#itemCode").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        $("#itemName").focus();
    }
});


$("#itemName").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        $("#itemQty").focus();
    }
});


$("#itemQty").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        $("#itemPrice").focus();
    }
});


$("#itemCode").keyup(function () {

    let testItemId = $("#itemCode").val();

    if (regExItemId.test(testItemId)) {

        $("#itemCode").css('border', '3px solid yellow');
        $("#itemCodeError").text("");
        $("#itemSaveOrUpdate").attr('disabled', false);



    } else {

        $("#itemCode").css('border', '3px solid red');
        $("#itemCodeError").text("Item ID is a required field : Pattern I00");
        $("#itemSaveOrUpdate").attr('disabled', true);

    }

});



$("#itemName").keyup(function () {

    let testItemName = $("#itemName").val();

    if (regExItemName.test(testItemName)) {

        $("#itemName").css('border', '3px solid yellow');
        $("#itemNameError").text("");
        $("#itemSaveOrUpdate").attr('disabled', false);


    } else {

        $("#itemName").css('border', '2px solid red');
        $("#itemNameError").text("Item Name is a required");
        $("#itemSaveOrUpdate").attr('disabled', true);

    }
});


$("#itemQty").keyup(function () {

    let testItemQty = $("#itemQty").val();

    if (regExQty.test(testItemQty)) {

        $("#itemQty").css('border', '3px solid yellow');
        $("#itemQtyError").text("");
        $("#itemSaveOrUpdate").attr('disabled', false);


    } else {

        $("#itemQty").css('border', '2px solid red');
        $("#itemQtyError").text("Item Qty is a required");
        $("#itemSaveOrUpdate").attr('disabled', true);

    }
});


$("#itemPrice").keyup(function () {

    let testItemPrice = $("#itemPrice").val();

    if (regExPrice.test(testItemPrice)) {

        $("#itemPrice").css('border', '3px solid yellow');
        $("#itemPriceError").text("");
        $("#itemSaveOrUpdate").attr('disabled', false);


    } else {

        $("#itemPrice").css('border', '2px solid red');
        $("#itemPriceError").text("Item Price is a required");
        $("#itemSaveOrUpdate").attr('disabled', true);

    }
});


function clearAlItem() {
    $('#itemCode,#itemName,#itemQty,#itemPrice').val("");
    $('#itemCode,#itemName,#itemQty,#itemPrice').css('border', '2px solid #ced4da');
    $("#itemSaveOrUpdate").attr('disabled', true);
    $("#itemCodeError,#itemQtyError,#itemPriceError,#itemNameError").text("");
    $('#itemCode').focus();
    $('#srcItemID').val("");

}


$("#itemClear").click(function () {

    clearAlItem();
    alert("Are you want to clear all")

});


$("#itemSaveOrUpdate").click(function () {

    clearAlItem();

});
