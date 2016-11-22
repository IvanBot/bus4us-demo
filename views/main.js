define( function (require) {

    var auth = require('modals/auth');
    var intro = require('views/intro');

    // workspace
    if ( auth.check_token() ) {

        console.log('sucssess');
        webix.ui({
            rows:[
                {
                    css:"logo", view: "toolbar", id:"toolbar",
                    elements:[
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
                        { css:"logo", width:105, template:"<img src='img/logo.png'>" }
                    ]
                },
                {
                    id:"main",
                    visibleBatch:"create_order",
                    height:"auto",
                    rows:[
                        {rows:[{animate: false,cells:[create_order]}], batch:"create_order"},
                        {rows:[{animate: false,cells:[my_orders]}], batch:"my_orders"},
                        {rows:[{animate: false,cells:[my_history]}], batch:"my_history"},
                        {rows:[{animate: false,cells:[credit_card]}], batch:"credit_card"},

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
            ]
        });

        // sidemenu
        webix.ui({
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
                                    { css:"logo", template:"<img src='img/logo.png'>", width:100 },
                                    { css:"logo", template:"<br><b>"+myPhone+"<br>"+myId+"</br>" }
                                ]
                            },
                            { css:"logo", template:"<img src='img/logo2.png'>" }
                        ]
                    },
                    { height:30, template:"<center><b><i class='fa fa-money' aria-hidden='true'></i> "+myBalance+" ₽</b></center>" },
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

                            $$("main").showBatch(id);
                            $$("header").define({template:"<center><span class='big_middle_text'>"+this.getItem(id).value+"</span></center>"});
                            $$("header").refresh();
                            $$("menu").hide();
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
        });

        $$("main_menu").select("create_order");
        this.get_car_classes();
    }

    // authorization
    else if (webix.storage.cookie.get('phoneNumber')) {
        webix.ui(intro.code_view);
    }

    else {
        console.log(intro.phone_view);
        webix.ui(intro.phone_view);
    }

});
