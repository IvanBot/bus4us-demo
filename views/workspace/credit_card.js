define(function() {

    var add_card = function() {
        var form = {
            id:"credit_card",
            view:"form",
            borderless:true,
            rows: [
                {
                    template: '<p>Номер карты</p>'
                },
                {
                    cols: [
                    	{ view:"text"},
                    	{ view:"text"},
                    	{ view:"text"}
                    ]
                },
                {
                    template: 'Имя держателя'
                },
                {
                	view:"text"
                },
                {
                	template: 'Срок действия'
                },
                {
                	cols: [
                    	{ view:"text"},
                    	// { template: "/"},
                    	{ view:"text"},
                    	{ view:"text"}
                    ]
                }
            ],
            // rules:{
            //     //"profile_login":webix.rules.isNotEmpty,
            //     //"profile_password":webix.rules.isNotEmpty
            // },
            // elementsConfig:{
            //     labelPosition:"top",
            // }
        };

        webix.ui({
        	scroll:false,
            view:"window",
            id:"win_credit_card",
            width:500,
            position:"center",
            modal:true,
            head:"Кредитная карта",
            body:form
        });

        function showForm_edit_address(winId, node){
            $$(winId).getBody().clear();
            $$(winId).show(node);
            $$(winId).getBody().focus();
        };

        showForm_edit_address("win_credit_card") ;
    };

    return add_card;

});