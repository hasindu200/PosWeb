
/* Customer page java script*/

//1. save customer
$("#btnSaveOrUpdate").attr('disabled', true);

function loadAllCustomer() {
    $("#customerTable").empty();
    for (let i in customerDb) {
        let row = `<tr><td>${customerDb[i].getId()}</td><td>${customerDb[i].getName()}</td><td>${customerDb[i].getAddress()}</td><td>${customerDb[i].getSalary()}</td></tr>`;
        $("#customerTable").append(row);

    }

}



$("#btnSaveOrUpdate").click(function () {

    /* remove event*/
    $("#customerTable>tr").off();


    let cusId = $("#cusID").val();
    let cusName = $("#cusName").val();
    let cusAddress = $("#cusAddress").val();
    let cusSalary = $("#cusSalary").val();

    console.log(cusId, cusName, cusAddress, cusSalary);

    var customer = new CustomerDTO(cusId, cusName, cusAddress, cusSalary);
    customerDb.push(customer);
    loadAllCustomer();



    //  2. search Customer

    $("#btnSearchCus").click(function () {


        let searchId = $("#srcCusID").val();
        let testSearch = searchCustomer(searchId);

        if (testSearch) {

            $("#cusID").val(testSearch.id);
            $("#cusName").val(testSearch.cusName);
            $("#cusAddress").val(testSearch.cusAddress);
            $("#cusSalary").val(testSearch.cusSalary);

        } else {

            clearAll();
            alert("No record Found");

        }

    });


    function searchCustomer(id) {
        for (let i = 0; i < customerDb.length; i++) {
            if (customerDb[i].id == id) {
                return customerDb[i];
            }
        }
    }


});

$("#btnDelete").click(function () {
    if (customerDb.length > 0) {
        for (let i = 0; i < customerDb.length; i++) {
            cusId = $("#srcCusID").val();

            if (cusId == customerDb[i].id) {
                alert("ARE YOU REALLY WANT DELETE RECORDS");

                customerDb.pop(cusId);
                loadAllCustomer();
                clearAll();

            } else {
                alert("No record found")
            }
        }
    }else {
        alert("No record found")

    }
});

//delete Customer


/*   validation*/


const regExCusId = /^(c00)[0-9]{1,4}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{3,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#cusID,#cusName,#cusAddress,#cusSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});


$("#cusID").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        $("#cusName").focus();
    }
});


$("#cusName").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        $("#cusAddress").focus();
    }
});


$("#cusAddress").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        $("#cusSalary").focus();
    }
});


$("#cusID").keyup(function () {

    let testCusId = $("#cusID").val();

    if (regExCusId.test(testCusId)) {

        $("#cusID").css('border', '3px solid yellow');
        $("#error").text("");


    } else {

        $("#cusID").css('border', '3px solid red');
        $("#error").text("Cus ID is a required field : Pattern C00");

    }

});


/*    cusNameValidation  */


$("#cusName").keyup(function () {

    let testCusName = $("#cusName").val();

    if (cusNameRegEx.test(testCusName)) {

        $("#cusName").css('border', '3px solid yellow');
        $("#errorName").text("");
        $("#btnSaveOrUpdate").attr('disabled', false);


    } else {

        $("#cusName").css('border', '2px solid red');
        $("#errorName").text("Cus Name is a required field : Minimum 4");
        $("#btnSaveOrUpdate").attr('disabled', true);

    }
});

$("#cusAddress").keyup(function () {
    let testAddress = $("#cusAddress").val();

    if (cusAddressRegEx.test(testAddress)) {

        $("#cusAddress").css('border', '3px solid yellow');
        $("#errorAddress").text("");


    } else {
        $("#cusAddress").css('border', '2px solid red');
        $("#errorAddress").text("Cus Salary is a required field : Minimum 7");
        $("#cusAddress").focus();

    }
})


$("#cusSalary").keyup(function () {
    let testSalary = $("#cusSalary").val();

    if (cusSalaryRegEx.test(testSalary)) {

        $("#cusSalary").css('border', '3px solid yellow');
        $("#errorSalary").text("");

    } else {
        $("#cusSalary").css('border', '2px solid red');
        $("#errorSalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
    }
})

function clearAll() {
    $('#cusID,#cusName,#cusAddress,#cusSalary').val("");
    $('#cusID,#cusName,#cusAddress,#cusSalary').css('border', '2px solid #ced4da');
    $("#btnSaveOrUpdate").attr('disabled', true);
    $("#error,#errorName,#errorSalary,#errorAddress").text("");
    $('#cusID').focus();
    $('#srcCusID').val("");


}


$("#clearAll").click(function () {

    clearAll();

});

$("#btnSaveOrUpdate").click(function () {

    clearAll();

});