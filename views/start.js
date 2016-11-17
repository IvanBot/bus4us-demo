define ([
	"app",
	// "views/auth.js"
	"views/menu.js"
], function (app, menu) {

	var nav = {
		css:"logo",
		view:"icon",
		icon:"bars",
        click: function() {
            

            // 1. get id [menu] from module menu.js
            // 2. show/hide menu
            // if ( $$("menu").config.hidden ) {
            	// menu.show_panel();
                console.log( menu );
                console.log( $$("menu") );
            // }
            // else {
            //      $$("menu").hide();	
            // }
        }
    }

    var title = {
        id: "header",
        css: "logo",
        height: 25,
        template: "<center><span class='big_middle_text'>Создать заказ</span></center>"
    }

    var logo = {
    	css: "logo",
    	width: 105,
    	template: "<img src='img/logo.png'>" 
    }

	var toolbar = {
	    css: "logo",
	    view: "toolbar",
	    id:"toolbar",
	    elements: [ nav, title, logo ]
	}

	var main = {
	    id:"main",
	    visibleBatch:"create_order",
	    height:"auto",
	    rows: [
	        // {rows:[{animate: false,cells:[create_order]}], batch:"create_order"},
	        // {rows:[{animate: false,cells:[my_orders]}], batch:"my_orders"},
	        // {rows:[{animate: false,cells:[my_history]}], batch:"my_history"},
	        // {rows:[{animate: false,cells:[credit_card]}], batch:"credit_card"},

	        // Оформление заказа
	        {template: 'ДАТА',  batch:"create_order_date"},
	        {template: 'ПАССАЖИРЫ', batch:"create_order_passengers"},
	        {template: 'ДЕТИ', batch:"create_order_childer"},
	        {template: 'ДОПОЛНИТЕЛЬНО', batch:"create_order_addition"},
	        {template: 'МАРШРУТ', batch:"create_order_route"},
	        {template: 'КОНТАКТЫ', batch:"create_order_contact"},
	        {template: 'КОММЕНТАРИЙ', batch:"create_order_comment"}
	    ]
	}




	var ui = {
        	id: "ui", 
	        rows: [ toolbar, main ]
    };

        // $$("main_menu").select("create_order");
        // auth.get_car_classes();

    // }
            
    // else if (webix.storage.cookie.get('phoneNumber')) {

    //     ui = { template: 'number' };
        
    // }

    // else {

    //     ui = { template: 'default' }

    // }

	return {
		$ui: ui
	};

});
