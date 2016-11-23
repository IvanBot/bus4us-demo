define( function(require) {

    var form = require('./list_form');

    var order_creation = function() {

        webix.ui({
            view:"window",
            id:"win_order_list",
            width:400,
            position:"center",
            modal:true,
            head:"Список заказов",
            body: form
        });

        function showForm_order(winId, node){
            $$(winId).getBody().clear();
            $$(winId).show(node);
            $$(winId).getBody().focus();
        };

        showForm_order("win_order_list") ;
    };

    return order_creation;
	
});