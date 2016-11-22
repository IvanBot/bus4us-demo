define( function(require) {

    // subdivsion
    var order = require('./order/init');

    // data
    var data = require('modals/data');

    var main_area = {
        id:"main",
        visibleBatch:"create_order",
        height:"auto",
        rows: [{
            batch:"create_order",
            animate: false,
            body: order
        }]
        // {rows:[{animate: false,cells:[my_orders]}], batch:"my_orders"},
        // {rows:[{animate: false,cells:[my_history]}], batch:"my_history"},
        // {rows:[{animate: false,cells:[credit_card]}], batch:"credit_card"},
    };

    var toolbar = {
        
        css:"logo", view: "toolbar", id:"toolbar",
        cols:[
            {
                css:"logo", view:"icon", icon:"bars",
                click: function(){
                    if( $$("menu").config.hidden){
                        $$("menu").show();
                    }
                    else
                        $$("menu").hide();
                }
            },
            {
                rows:[
                    {},
                    { id:"header", css:"logo", height:25, template:"<center><span class='big_middle_text'>Создать заказ</span></center>" },
                ]
            },
            { css:"logo", width:105, template:"<img src='assets/img/logo.png'>" }
        ]
    };

    var main_view = {
        rows : [toolbar, main_area]
    }

    var sidemenu = {
        view: "sidemenu",
        id: "menu",
        width: 250,
        position: "left",
        state:function(state){
            var toolbarHeight = $$("toolbar").$height;
        },
        body:{
            rows:[
                {
                    height:130, css:"logo",
                    cols:[
                        { width:10, css:"logo" },
                        {
                            rows:[
                                { css:"logo", template:"<img src='assets/img/logo.png'>", width:100 },
                                { css:"logo", template:"<br><b>" + data.my_phone + "<br>" + data.my_id + "</br>" }
                            ]
                        },
                        { css:"logo", template:"<img src='assets/img/logo2.png'>" }
                    ]
                },
                { height:30, template:"<center><b><i class='fa fa-money' aria-hidden='true'></i> "+ data.my_balance + " ₽</b></center>" },
                {
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

                        // $$("main").showBatch(id);
                        // $$("header").define({template:"<center><span class='big_middle_text'>"+this.getItem(id).value+"</span></center>"});
                        // $$("header").refresh();
                        // $$("menu").hide();
                    }
                },
                {
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
            ]
        }
    }

    return {
        main_view: main_view,
        sidemenu: sidemenu
    }

});
