define( function(require) {

	var form = require('./form');

    var order_creation = function() {

        webix.ui({
            view:"window",
            id:"win_order",
            width:810,
            position:"center",
            modal:true,
            head:"Создание заказа",
            body:form
        });

        function showForm_order(winId, node){
            $$(winId).getBody().clear();
            $$(winId).show(node);
            $$(winId).getBody().focus();
        };

        showForm_order("win_order") ;
    };

    return order_creation;

});