/**
  * email:   maxx.zueff@gmail.com
  * API_KEY: AIzaSyA1AaJZPT_7yzHEQl7PTdVV7quEiwe9aE8
  * {"authenticate":{"token":"104bdf688b77412dd7b7f5fe2125ac3e"}}
  */

'use strict';

(function() {
    var page = {
        ready: {
            webix: false
        }
    }

    // var url = "http://84.16.157.58:8085/app";
    // var url = "http://192.168.137.101:8888/bus4usclientservlet";
    // var url = "test-server.php";

    var url = "http://84.16.157.58:8085/bus4usclientservlet";    

    var credit_card = { template:"credit card" };
    var myBalance = "-";
    var myPhone = "-";
    var myId = "-";

    page.ready = function (framework) {
        if (framework === "webix") {
            page.ready.webix = true;
        }

        if (page.ready.webix) {
            page.on_ready();
        }
    };

    webix.ready(function () {
        page.ready("webix");
    });

    page.send_number = function () {
        var requestCode = {};
        requestCode.phoneNumber = "";
        requestCode.requestCodeAgain = false;
        if(!webix.isUndefined($$("phoneNumber")) && $$("phoneNumber").getValue()!="") requestCode.phoneNumber = $$("phoneNumber").getValue();
        var array = {};
        array['requestCode'] = requestCode;
        var result = JSON.stringify(array);
        webix.ajax().post(
            url,
            result,
            {
                error:function(text, data, XmlHttpRequest){
                    webix.message({"type":"error", "text":"Ошибка сервера - запрос кода по телефону: ответа нет"});
                },
                success:function(text, data, XmlHttpRequest) {
                    
                    text = JSON.parse(text);
                    if(text.error==0){
                        webix.storage.cookie.put('phoneNumber',$$("phoneNumber").getValue());
                        location.href = '../index.html';
                    }
                    else webix.message({"type":"error", "text":"Ошибка сервера - запрос кода по телефону: ответ получен"});
                }
            }
        );
    };

    page.send_code = function () {
        var verifyCode = {};
        verifyCode.phoneNumber = webix.storage.cookie.get('phoneNumber');
        verifyCode.code = "";
        if(!webix.isUndefined($$("verifyCode")) && $$("verifyCode").getValue()!="") verifyCode.code = $$("verifyCode").getValue();
        var array = {};
        array['verifyCode'] = verifyCode;
        var result = JSON.stringify(array);
        webix.ajax().post(
            url,
            result,
            {
                error:function(text, data, XmlHttpRequest){
                    webix.message({"type":"error", "text":"Ошибка сервера - запрос токена по телефону и коду"});
                },
                success:function(text, data, XmlHttpRequest){
                    text = JSON.parse(text);
                    if(text.error==0){
                        webix.storage.cookie.put('token',text.token);
                        location.href = '../index.html';
                    }
                    else webix.message({"type":"error", "text":"Ошибка сервера - запрос токена по телефону и коду 2"});
                }
            }
        );
    };

    
    page.check_token = function () {

        if (!webix.storage.cookie.get('token')) return false;

        var result = false;
        var authenticate = {};
        authenticate.token = webix.storage.cookie.get('token');
        var array = {};
        array['authenticate'] = authenticate;
        var arr_result = JSON.stringify(array);

        console.log(arr_result);

        webix.ajax().sync().post(
            url, 
            arr_result, 
            {
                error: function (text, data, XmlHttpRequest) {
                    webix.message({"type":"error", "text":"Ошибка сервера - запрос токена"});
                },
                success:function (text, data, XmlHttpRequest) {
                    text = JSON.parse(text);
                    if (text.error==0) {
                        myBalance = text.client.balance;
                        myPhone = text.client.name;
                        myId = text.client.id;
                        result = true;
                    }
                    else webix.message({"type":"error", "text":"Ошибка сервера - запрос токена 2"});
                }

            }
        );
        
        return result;
    };

    page.get_car_classes = function () {
        var getCarClassesMethod = {};
        getCarClassesMethod.token = webix.storage.cookie.get('token');
        var array = {};
        array['getCarClassesMethod'] = getCarClassesMethod;
        var arr_result = JSON.stringify(array);
        var xhr = webix.ajax().sync().post(url, arr_result);
        var txt = JSON.parse(xhr.responseText);
        if(txt.error==0) {
            //console.log(txt.carClasses);
            var data_bus_classes = [
                {id:1, name:"Городской<br>автобус", imgsrc:"<img src='img/urbanbus.png'>", popup:"my_pop"},
                {id:2, name:"Международный<br>автобус", imgsrc:"<img src='img/internationalbus_disabled.png'>"},
                {id:3, name:"Мидиавтобус", imgsrc:"<img src='img/midibus.png'>"},
                {id:4, name:"Микроавтобус", imgsrc:"<img src='img/microbus_disabled.png'>"},
                {id:5, name:"Школьный<br>автобус", imgsrc:"<img src='img/schoolbus.png'>"},
                {id:6, name:"Пригородный<br>автобус", imgsrc:"<img src='img/surbanbus_disabled.png'>"},
                {id:7, name:"Туристический<br>автобус", imgsrc:"<img src='img/turistbus.png'>"}
            ];
            $$("car_classes").define({data:data_bus_classes});
            $$("car_classes").refresh();
        }
        else webix.message({"type":"error", "text":"Ошибка сервера - запрос классов автобусов"});
    };

    var map_order = {
        id:"map_order",
        view:"menu",
        layout:"y",
        borderless:true,
        scroll: true,
        css: 'mycls',
        template: "<div class='order_map'><span class='webix_icon fa-#icon# menu_icon'></span><div class='menu_text'><h1>#value#</h1><p>#description#</p></div></div>",
        
        data:[
            { $template:"Separator" },
            { id:"create_order_cls", value:"Класс автобуса", icon:"bus", description: "Выберите класс автобуса" },
            { id:"create_order_date", value:"Укажите дату и время отправления", icon:"bus", description: "и окончания поездки" },
            { id:"create_order_passengers", value:"Количество пассажиров", icon:"bus", description: "Укажите количество пассажиров" },
            { id:"create_order_childer", value:"Детская группа", icon:"bus", description: "Нет" },
            { id:"create_order_addition", value:"Дополнительные опции", icon:"bus", description: "Наличие кондиционера, телевизора, туалета" },
            { id:"create_order_route", value:"Маршрут", icon:"bus", description: "Укажите маршрут" },
            { id:"create_order_contact", value:"Контактное лицо", icon:"bus", description: "Укажите контактное лицо" },
            { id:"create_order_comment", value:"Комментарий водителю", icon:"bus", description: "(Не обязательно)" },
        ],

        on: {
            'onItemClick': function(id) {
                $$('main').showBatch(id);
                // webix.message('Выберан пункт меню: ' + this.getItem(id).value)
                //show sub_dir
            }
        }
    }

    var map = {
        rows: [

            { borderless:true, view:"google-map", id:"map", zoom:10, center:[55.76, 37.64], key: 'AIzaSyA1AaJZPT_7yzHEQl7PTdVV7quEiwe9aE8' },
            {
                borderless:true, cols:[
                    {},
                    { 
                        height:30,
                        width:200,
                        view:"button",
                        value:"Создать заказ",
                        click:function() {
                            $$('create_order').showBatch('map_order');
                        } 
                    },
                    {}
                ]
            },
            { borderless:true, height:40, template:"Москва" }
        ]
    }



    var create_order = {
         
        rows:[
            {
                view:"scrollview", height:100, scroll:"x",
                body:{
                    id:"car_classes", view:"dataview", select:true, xCount:7,
                    template:"<div class='bus_classes'><center>#imgsrc#<br><br>#name#</center></div>",
                    data:[],
                    type: {
                        height:100,
                        width:140
                    },
                    click:function(id){
                        console.log(id);

                        webix.ui({
                            view:"popup",
                            id:"my_pop",
                            head:"Submenu",
                            width:300,
                            body:{
                                view:"list",
                                data:[ {id:"1", name:"Zoo", location: "New York"},
                                    {id:"2", name:"Coffeebar", location:"Salt Lake City"},
                                    {id:"3", name:"Teeparty", location:"Alabama"}
                                ],
                                datatype:"json",

                                template:"#name# - #location#",
                                autoheight:true,
                                select:true
                            }
                        });
                    }
                }
            },

            // map & order

            {
                id: 'create_order',
                visibleBatch:"map",
                rows: [
                    {rows:[{animate: false, cells:[map]}], batch:"map"},
                    {rows:[{animate: false, cells:[map_order]}], batch:"map_order"}
                ]
            }
        ]
    };


    
    page.on_ready = function () {

        if (this.check_token()) {

            console.log('token');
            
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
            
        else if (webix.storage.cookie.get('phoneNumber')) {

            console.log('number');

            webix.ui({
                cols:[
                    { css:"logo", borderless:true },
                    {
                        width:250, rows:[
                        { css:"logo", borderless:true },
                        { css:"logo", borderless:true, height:150, template:"<center><img id='main_logo2' src='img/logo2.png'></center>" },
                        { css:"logo", borderless:true, height:50, template:"<center><img id='main_logo' src='img/logo.png'></center>" },
                        { css:"logo", borderless:true, height:45, template:"<center><span class='middle_text'>Код активации<br>отправлен Вам по SMS</span></center>" },
                        { css:"logo", borderless:true, height:25, template:"<center><span class='small_text'>Введите его в поле и нажмите продолжить</span></center>" },
                        { css:"logo", borderless:true, id:"verifyCode", view:"text", inputAlign:"center", placeholder:"Введите код" },
                        { css:"logo", borderless:true, view:"button", value:"Подтвердить", click: this.send_code },
                        { css:"logo", borderless:true, height:50, template:"<center><span class='small_text'>Мы перезвоним Вам через 90 секунд и продиктуем код, на случай, если по каким-то причинам SMS Вам не пришло</span></center>" },
                        { css:"logo", borderless:true }
                    ]
                    },
                    { css:"logo", borderless:true }
                ]
            });
            
        }

        else {

            console.log('default');
            webix.ui({
                cols:[
                    { css:"logo", borderless:true },
                    {
                        width:250, rows:[
                            { css:"logo", borderless:true },
                            { css:"logo", borderless:true, height:150, template:"<center><img id='main_logo2' src='img/logo2.png'></center>" },
                            { css:"logo", borderless:true, height:50, template:"<center><img id='main_logo' src='img/logo.png'></center>" },
                            { css:"logo", borderless:true, height:40, template:"<center><span class='big_text'>Добро пожаловать</span></center>" },
                            { css:"logo", borderless:true, height:25, template:"<center><span class='small_text'>Пожалуйста, введите Ваш номер телефона</span></center>" },
                            { css:"logo", borderless:true, id:"phoneNumber", view:"text", inputAlign:"center", placeholder:"Введите телефон" },
                            { css:"logo", borderless:true, view:"button", value:"Получить код для входа", click: this.send_number },
                            { css:"logo", borderless:true, height:50, template:"<center><span class='small_text'>Соглашение об использовании</span></center>" },
                            { css:"logo", borderless:true }
                        ]
                    },
                    { css:"logo", borderless:true }
                ]
            });

        }
        
    };
    
})();