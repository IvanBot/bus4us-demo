define( function(require) {

    // data
    var data       = require('modals/data');
    var get_orders = require('modals/get_orders');

	var sidemenu_logo = [{
        width:10,
        css:"logo"
    },{
        rows: [{
            css: "logo",
            template: "<img src='assets/img/logo.png'>",
            width: 100
        },{ 
            css: "logo",
            template: "<br><b>" + data.my_phone + "<br>" + data.my_id + "</br>"
        }]
    },{
        css:"logo",
        template:"<img src='assets/img/logo2.png'>"
    }];

    var sidemenu_list = [{
        $template:"Separator"
    },{
        id:"create_order",
        value:"Создать заказ",
        icon:"bus"
    },{
        id:"my_orders",
        value:"Мои заказы",
        icon:"bus"
    },{
        id:"my_history",
        value:"История",
        icon:"history"
    },{
        id:"credit_card",
        value:"Привязать кредитную карту",
        icon:"credit-card"
    }];

    var sidemenu_sublist = [{
        $template: "Separator"
    },{
        id: 5,
        value: "Техническая поддержка"
    },{
        id: 6,
        value: "Обратная связь"
    },{
        id: 7,
        value: "Настройки"
    },{
        id: 8,
        value: "Сменить пользователя"
    }];

    var sidemenu_layout = [{
        height: 130,
        css: "logo",
        cols: sidemenu_logo
    },{ 
        height:30,
        template:"<center><b><i class='fa fa-money' aria-hidden='true'></i> "+ data.my_balance + " ₽</b></center>"
    },{
        id:"main_menu",
        view:"menu",
        layout:"y",
        borderless:true,
        scroll: false,
        height:160,
        template: "<span class='webix_icon fa-#icon#'></span> #value#",
        data: sidemenu_list,
        select:true,
        type:{
            height:35
        },
        click:function(id){
            if(id=="my_orders") get_orders();
            if(id=="my_history") get_history();

            // $$("main").showBatch(id);
            // $$("header").define({template:"<center><span class='big_middle_text'>"+this.getItem(id).value+"</span></center>"});
            // $$("header").refresh();
            // $$("menu").hide();
        }
    },{
        view:"menu",
        layout:"y",
        borderless:true,
        scroll: false,
        height:160,
        data: sidemenu_sublist,
        type: {
            height:35
        },
        click: function(id) {
            alert(this.getItem(id).value);
            if (id==8) {
                webix.storage.cookie.clear();
                location.href = '../index.html';
            };
        }
    }];

    var sidemenu = {
        view: "sidemenu",
        id: "menu",
        width: 250,
        position: "left",
        state: function(state) {
            var toolbarHeight = $$("toolbar").$height;
        },
        body: {
            rows: sidemenu_layout
        }
    }

    return sidemenu

});