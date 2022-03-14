function loadItemId() {
    $("#cmbSelectCustomerId").empty();
    $("#selectItemCode").empty();



    customerDb.forEach(function (e) {

        $("#cmbSelectCustomerId").append($("<option></option>").attr("value", e).text(e.getId()));

        $("#orderCustomerName").val(e.getName());
        $("#orderCustomerAddress").val(e.getAddress());
        $("#orderCustomerSalary").val(e.getSalary());


    });


    itemDb.forEach(function (e) {
        $("#selectItemCode").append($("<option></option>").attr("value", e).text(e.getCode()));

        $("#txtItemDescription").val(e.getName());
        $("#txtItemPrice").val(e.getUnitPrice());
        $("#txtQTYOnHand").val(e.getQty());


    });



}


function generateOId() {
    if (orderDB.length == 0) {
        $("#txtOrderID").val("O-0001");
    } else if (orderDB.length > 0) {
        var orderId = orderDB[orderDB.length - 1].getOrderId().split("-")[1];
        var tempId = parseInt(orderId);
        tempId = tempId + 1;
        if (tempId <= 9) {
            $("#txtOrderID").val("O-000" + tempId);
        } else if (tempId <= 99) {
            $("#txtOrderId").val("O-00" + tempId);
        } else if (tempId <= 999) {
            $("#txtOrderID").val("O-0" + tempId);
        } else if (tempId <= 9999) {
            $("#txtOrderId").val("O-" + tempId);
        }
    }
}



$("#btnSubmitOrder").click(function () {
    let orderId = $("#txtOrderId").val();
    let orderDate = $("#txtDate").val();
    let customerId = $("#cmbSelectCustomerId").find('option:selected').text();
    let total = $("#txtTotal").val().split("/")[0];

    var order = new OrderDTO(orderId, orderDate, customerId, total);
    orderDB.push(order);
});


