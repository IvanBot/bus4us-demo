define([], function() {

	var url = "http://84.16.157.58:8085/bus4usclientservlet";    

    var credit_card = { template:"credit card" };
    var myBalance = "-";
    var myPhone = "-";
    var myId = "-";
    var menu_id = webix.uid();

	var header = {
	    height: 130,
	    css:"logo",
	    cols: [
	        { width:10, css:"logo" },
	        {
	            rows:[
	                { css:"logo", template:"<img src='img/logo.png'>", width:100 },
	                { css:"logo", template:"<br><b>"+myPhone+"<br>"+myId+"</br>" }
	            ]
	        },
	        { css:"logo", template:"<img src='img/logo2.png'>" }
	    ]
	};

	var balance = { 
		height: 30,
		template: "<center><b><i class='fa fa-money' aria-hidden='true'></i> " + myBalance + " ₽</b></center>" 
	};

	var menu = {
	    id:"main_menu", view:"menu", layout:"y", borderless:true, scroll: false, height:160, template: "<span class='webix_icon fa-#icon#'></span> #value#",
	    
	    data:[
	        { $template:"Separator" },
	        {id:"create_order", value:"Создать заказ", icon:"bus"},
	        {id:"my_orders", value:"Мои заказы", icon:"bus"},
	        {id:"my_history", value:"История", icon:"history"},
	        {id:"credit_card", value:"Привязать кредитную карту", icon:"credit-card"},
	    ],

	    select:true,
	    type:{
	        height:35
	    },
	    click:function(id){
	        if(id=="my_orders") get_orders();
	        if(id=="my_history") get_history();
	        
	        $$("main").showBatch(id);
	        $$("header").define({template:"<center><span class='big_middle_text'>"+this.getItem(id).value+"</span></center>"});
	        $$("header").refresh();
	        $$("menu").hide();
	    }
	}

	var sub_menu = {
        view:"menu", layout:"y", borderless:true, scroll: false, height:160,
        data:[
            { $template:"Separator" },
            {id: 5, value: "Техническая поддержка"},
            {id: 6, value: "Обратная связь"},
            {id: 7, value: "Настройки"},
            {id: 8, value: "Сменить пользователя"},
        ],
        type:{
            height:35
        },
        click:function(id){
            alert(this.getItem(id).value);
            if(id==8){
                webix.storage.cookie.clear();
                location.href = '../index.html';
            };
        }
    }

	var ui = {
		view: "sidemenu",
	    id: "menu",
	    width: 250,
	    position: "left",
	    // state:function(state){
	    //     var toolbarHeight = $$("toolbar").$height;
	    // },
	    body: {
	        rows:[ header, balance, menu, sub_menu ]
	    }
	}

	return {
		$ui: ui,
		show_panel: function() {
			$$("menu").show();
		}
	} 

});