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

    page.maketimefromdate = function(x) {
        return Math.round(x.getTime()/1000);
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

    page.add_address = function(){
        var form_add_address = {
            id:"add_address_creation",
            view:"form",
            borderless:true,
            elements: [
                { id:"addressToObject_city", name:"addressToObject_city", view:"text", label:"Город:", labelPosition:"left", labelWidth:135 },
                { id:"addressToObject_street", view:"text", label:"Улица:", labelPosition:"left", labelWidth:135 },
                { id:"addressToObject_houseNumber", view:"text", label:"Дом:", labelPosition:"left", labelWidth:135 },
                { id:"addressToObject_houseSubNumber", view:"text", label:"Корпус:", labelPosition:"left", labelWidth:135 },
                { id:"addressToObject_building", view:"text", label:"Строение:", labelPosition:"left", labelWidth:135 },
                { id:"addressToObject_entrance", view:"text", label:"Подъезд:", labelPosition:"left", labelWidth:135 },
                { id:"addressToObject_apartment", view:"text", label:"Квартира:", labelPosition:"left", labelWidth:135 },
                { id:"addressToObject_datetime", view:"datepicker", timepicker:true, format:"%d.%m.%Y %H:%i", label:"Дата и время:", labelPosition:"left", labelWidth:135 },
                { id:"addressToObject_comment", view:"textarea", height:100, label:"Комментарий:", labelPosition:"left", labelWidth:135 },
                {
                    cols:[
                        {},
                        {
                            view:"button", value:"Добавить",
                            click:function(){
                                if($$("addressToObject_city").getParentView().validate()) {
                                    $$("roots_address").add({
                                        "roots_city":$$("addressToObject_city").getValue(),
                                        "roots_street":$$("addressToObject_street").getValue(),
                                        "roots_house_number":$$("addressToObject_houseNumber").getValue(),
                                        "roots_house_sub_number":$$("addressToObject_houseSubNumber").getValue(),
                                        "roots_building":$$("addressToObject_building").getValue(),
                                        "roots_entrance":$$("addressToObject_entrance").getValue(),
                                        "roots_apartment":$$("addressToObject_apartment").getValue(),
                                        "roots_datetime":$$("addressToObject_datetime").getValue(),
                                        // "roots_datetime_view":makenormaldatetime($$("addressToObject_datetime").getValue()),
                                        "roots_comment":$$("addressToObject_comment").getValue()
                                    });
                                    $$("addressToObject_city").getTopParentView().hide();
                                }
                                else webix.message({"type":"error", "text":"Введите город"});
                            }
                        },
                        { view:"button", value:"Отмена",
                            click:function(){
                                $$("addressToObject_city").getTopParentView().hide();
                            }
                        },
                        {}
                    ]
                }
            ],
            rules:{
                "addressToObject_city":webix.rules.isNotEmpty,
                //"profile_password":webix.rules.isNotEmpty
            },
            elementsConfig:{
                labelPosition:"top",
            }
        };

        webix.ui({
            view:"window",
            id:"win_add_address",
            width:410,
            position:"center",
            modal:true,
            head:"Добавить адрес",
            body:webix.copy(form_add_address)
        });

        function showForm_add_address(winId, node){
            $$(winId).getBody().clear();
            $$(winId).show(node);
            $$(winId).getBody().focus();
        };

        showForm_add_address("win_add_address") ;
    };

    page.edit_address = function(){
        var address = $$("roots_address").getSelectedItem();
        if(!$$("roots_address").getSelectedId()){
            webix.message({"type":"error", text:"Выберите адрес для редактирования!"});
        }
        else {
            var form_edit_address = {
                id:"edit_address_creation",
                view:"form",
                borderless:true,
                elements: [
                    { id:"addressToObject_city", view:"text", label:"Город:", labelPosition:"left", labelWidth:135, value:address.roots_city },
                    { id:"addressToObject_street", view:"text", label:"Улица:", labelPosition:"left", labelWidth:135, value:address.roots_street },
                    { id:"addressToObject_houseNumber", view:"text", label:"Дом:", labelPosition:"left", labelWidth:135, value:address.roots_house_number },
                    { id:"addressToObject_houseSubNumber", view:"text", label:"Корпус:", labelPosition:"left", labelWidth:135, value:address.roots_house_sub_number },
                    { id:"addressToObject_building", view:"text", label:"Строение:", labelPosition:"left", labelWidth:135, value:address.roots_building },
                    { id:"addressToObject_entrance", view:"text", label:"Подъезд:", labelPosition:"left", labelWidth:135, value:address.roots_entrance },
                    { id:"addressToObject_apartment", view:"text", label:"Квартира:", labelPosition:"left", labelWidth:135, value:address.roots_apartment },
                    { id:"addressToObject_datetime", view:"datepicker", timepicker:true, format:"%d.%m.%Y %H:%i", label:"Дата и время:", labelPosition:"left", labelWidth:135, value:address.roots_datetime },
                    { id:"addressToObject_comment", view:"textarea", height:100, label:"Комментарий:", labelPosition:"left", labelWidth:135, value:address.roots_comment },
                    {
                        cols:[
                            {},
                            {
                                view:"button", value:"Редактировать", width:125,
                                click:function(){
                                    $$("roots_address").updateItem($$("roots_address").getSelectedId(),{
                                        "roots_city":($$("addressToObject_city").getValue()=="" ? address.roots_city : $$("addressToObject_city").getValue()),
                                        "roots_street":$$("addressToObject_street").getValue(),
                                        "roots_house_number":$$("addressToObject_houseNumber").getValue(),
                                        "roots_house_sub_number":$$("addressToObject_houseSubNumber").getValue(),
                                        "roots_building":$$("addressToObject_building").getValue(),
                                        "roots_entrance":$$("addressToObject_entrance").getValue(),
                                        "roots_apartment":$$("addressToObject_apartment").getValue(),
                                        "roots_datetime":$$("addressToObject_datetime").getValue(),
                                        "roots_datetime_view":makenormaldatetime($$("addressToObject_datetime").getValue()),
                                        "roots_comment":$$("addressToObject_comment").getValue()
                                    });
                                    $$("addressToObject_city").getTopParentView().hide();
                                }
                            },
                            { view:"button", value:"Отмена",
                                click:function(){
                                    $$("addressToObject_city").getTopParentView().hide();
                                }
                            },
                            {}
                        ]
                    }
                ],
                rules:{
                    //"profile_login":webix.rules.isNotEmpty,
                    //"profile_password":webix.rules.isNotEmpty
                },
                elementsConfig:{
                    labelPosition:"top",
                }
            };

            webix.ui({
                view:"window",
                id:"win_edit_address",
                width:410,
                position:"center",
                modal:true,
                head:"Редактировать адрес",
                body:webix.copy(form_edit_address)
            });

            function showForm_edit_address(winId, node){
                $$(winId).getBody().clear();
                $$(winId).show(node);
                $$(winId).getBody().focus();
            };

            showForm_edit_address("win_edit_address") ;
        }
    };

    page.delete_address = function(){
        var address = $$("roots_address").getSelectedItem();
        if(!$$("roots_address").getSelectedId()){
            webix.message({"type":"error", text:"Выберите адрес для удаления!"});
        }
        else {
            var del_address;
            if(address.roots_city!="") del_address = "город "+address.roots_city;
            if(address.roots_city!="") del_address = del_address + ", улица "+address.roots_street;
            if(address.roots_city!="") del_address = del_address + ", дом "+address.roots_house_number;
            if(address.roots_city!="") del_address = del_address + ", корпус "+address.roots_house_sub_number;
            if(address.roots_city!="") del_address = del_address + ", строение "+address.roots_building;
            if(address.roots_city!="") del_address = del_address + ", подъезд "+address.roots_entrance;
            if(address.roots_city!="") del_address = del_address + ", квартира "+address.roots_apartment;
            webix.confirm({
                title:"Удалить выбранный адрес?",
                ok:"Удалить",
                cancel:"Отмена",
                text:del_address,
                type:"confirm-error",
                callback:function(result){ //setting callback
                    if(result==true) {
                        $$("roots_address").remove($$("roots_address").getSelectedId());
                        webix.message("Адрес успешно удален!");
                    }
                }
            });
        }
    };

    page.add_contact = function() {
        var form_add_contact = {
            id:"add_contact_creation",
            view:"form",
            borderless:true,
            elements: [
                { id:"roots_name", view:"text", label:"ФИО:", labelPosition:"left", labelAlign:"right", labelWidth:90 },
                { id:"roots_phone", name:"roots_phone", view:"text", label:"Телефон:", labelPosition:"left", labelAlign:"right", labelWidth:90 },
                {
                    cols:[
                        {},
                        {
                            view:"button", value:"Добавить", width:100,
                            click:function(){
                                if($$("roots_phone").getParentView().validate()) {
                                    $$("roots_contacts").add({
                                        "roots_name":$$("roots_name").getValue(),
                                        "roots_phone":$$("roots_phone").getValue()
                                    });
                                    $$("roots_phone").getTopParentView().hide();
                                }
                                else webix.message({"type":"error", "text":"Введите номер телефона"});
                            }
                        },
                        { view:"button", value:"Отмена", width:100,
                            click:function(){
                                $$("roots_phone").getTopParentView().hide();
                            }
                        },
                        {}
                    ]
                }
            ],
            rules:{
                "roots_phone":webix.rules.isNumber
            },
            elementsConfig:{
                labelPosition:"top",
            }
        };

        webix.ui({
            view:"window",
            id:"win_add_contact",
            width:320,
            position:"center",
            modal:true,
            head:"Добавить контакт",
            body:webix.copy(form_add_contact)
        });

        function showForm_add_contact(winId, node){
            $$(winId).getBody().clear();
            $$(winId).show(node);
            $$(winId).getBody().focus();
        };

        showForm_add_contact("win_add_contact") ;
    };

    page.edit_contact = function() {
        var contact = $$("roots_contacts").getSelectedItem();
        if(!$$("roots_contacts").getSelectedId()){
            webix.message({"type":"error", text:"Выберите контакт для редактирования!"});
        }
        else {
            var form_edit_contact = {
                id:"edit_contact_creation",
                view:"form",
                borderless:true,
                elements: [
                    { id:"roots_name", view:"text", label:"ФИО:", labelPosition:"left", labelAlign:"right", labelWidth:90, value:contact.roots_name },
                    { id:"roots_phone", view:"text", label:"Телефон:", labelPosition:"left", labelAlign:"right", labelWidth:90, value:contact.roots_phone },
                    {
                        cols:[
                            {},
                            {
                                view:"button", value:"Редактировать", width:125,
                                click:function(){
                                    $$("roots_contacts").updateItem($$("roots_contacts").getSelectedId(),{
                                        "roots_name":($$("roots_name").getValue()=="" ? contact.roots_name : $$("roots_name").getValue()),
                                        "roots_phone":($$("roots_phone").getValue()=="" ? contact.roots_phone : $$("roots_phone").getValue()),
                                    });
                                    $$("roots_phone").getTopParentView().hide();
                                }
                            },
                            { view:"button", value:"Отмена", width:100,
                                click:function(){
                                    $$("roots_phone").getTopParentView().hide();
                                }
                            },
                            {}
                        ]
                    }
                ],
                elementsConfig:{
                    labelPosition:"top",
                }
            };

            webix.ui({
                view:"window",
                id:"win_edit_contact",
                width:320,
                position:"center",
                modal:true,
                head:"Редактировать контакт",
                body:webix.copy(form_edit_contact)
            });

            function showForm_edit_contact(winId, node){
                $$(winId).getBody().clear();
                $$(winId).show(node);
                $$(winId).getBody().focus();
            };

            showForm_edit_contact("win_edit_contact") ;
        }
    };

    page.delete_contact = function(){
        var contact = $$("roots_contacts").getSelectedItem();
        if(!$$("roots_contacts").getSelectedId()){
            webix.message({"type":"error", text:"Выберите контакт для удаления!"});
        }
        else {
            var del_contact;
            if(contact.roots_name!="") del_contact = ""+contact.roots_name;
            if(contact.roots_phone!="") del_contact = del_contact+" "+contact.roots_phone;
            webix.confirm({
                title:"Удалить выбранный контакт?",
                ok:"Удалить",
                cancel:"Отмена",
                text:del_contact,
                type:"confirm-error",
                callback:function(result){ //setting callback
                    if(result==true) {
                        $$("roots_contacts").remove($$("roots_contacts").getSelectedId());
                        webix.message("Контакт успешно удален!");
                    }
                }
            });
        }
    };

    page.edit_options = function() {
    
        var form_edit_address = {
            id:"edit_address_creation",
            view:"form",
            borderless:true,
            elements: [
                {
                    cols:[
                        {
                            rows:[
                                { id:"addressToObject_city", view:"checkbox", labelRight:"<i class='fa fa-male' aria-hidden='true'></i>|<i class='fa fa-female' aria-hidden='true'></i> Туалет", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_street", view:"checkbox", labelRight:"<i class='fa fa-asterisk' aria-hidden='true'></i> Кондиционер", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_houseNumber", view:"checkbox", labelRight:"<i class='fa fa-microphone' aria-hidden='true'></i> Микрофон", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_houseSubNumber", view:"checkbox", labelRight:"<i class='fa fa-desktop' aria-hidden='true'></i> TV/DVD", inputPosition:"left", height:22, labelWidth:135 }
                            ]
                        },
                        {
                            rows:[
                                { id:"addressToObject_building", view:"checkbox", labelRight:"<i class='fa fa-wifi' aria-hidden='true'></i> Wi-Fi", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_entrance", view:"checkbox", labelRight:"<i class='fa fa-archive' aria-hidden='true'></i> Холодильник", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_apartment", view:"checkbox", labelRight:"<i class='fa fa-cutlery' aria-hidden='true'></i> Мини-кухня", inputPosition:"left", height:22, labelWidth:135 }
                            ]
                        }
                    ]
                },
                {
                    cols:[
                        {},
                        {
                            view:"button", value:"Сохранить", width:125,
                            click:function(){
                                $$("roots_address").updateItem($$("roots_address").getSelectedId(),{
                                    "roots_city":($$("addressToObject_city").getValue()=="" ? address.roots_city : $$("addressToObject_city").getValue()),
                                    "roots_street":$$("addressToObject_street").getValue(),
                                    "roots_house_number":$$("addressToObject_houseNumber").getValue(),
                                    "roots_house_sub_number":$$("addressToObject_houseSubNumber").getValue(),
                                    "roots_building":$$("addressToObject_building").getValue(),
                                    "roots_entrance":$$("addressToObject_entrance").getValue(),
                                    "roots_apartment":$$("addressToObject_apartment").getValue(),
                                    "roots_datetime":$$("addressToObject_datetime").getValue(),
                                    "roots_datetime_view":makenormaldatetime($$("addressToObject_datetime").getValue()),
                                    "roots_comment":$$("addressToObject_comment").getValue()
                                });
                                $$("addressToObject_city").getTopParentView().hide();
                            }
                        },
                        { view:"button", value:"Отмена",
                            click:function(){
                                $$("addressToObject_city").getTopParentView().hide();
                            }
                        },
                        {}
                    ]
                }
            ],
            rules:{
                //"profile_login":webix.rules.isNotEmpty,
                //"profile_password":webix.rules.isNotEmpty
            },
            elementsConfig:{
                labelPosition:"top",
            }
        };

        webix.ui({
            view:"window",
            id:"win_edit_address",
            width:410,
            position:"center",
            modal:true,
            head:"Дополнительные опции",
            body:webix.copy(form_edit_address)
        });

        function showForm_edit_address(winId, node){
            $$(winId).getBody().clear();
            $$(winId).show(node);
            $$(winId).getBody().focus();
        };

        showForm_edit_address("win_edit_address") ;
    };

    page.action_order_creation = function(){
        if ($$("order_creation_form").getParentView().validate() ) {
            var newOrder = {};
            // newOrder.id = 0;
            newOrder.token = webix.storage.cookie.get("token");
            // newOrder.datetime = maketimefromdate(new Date());
            newOrder.comment = $$("comment").getValue();
            // newOrder.serviceId = $$("town_order"+orderType["pending"]).getValue().toString();
            // newOrder.payType = $$("payType").getValue();         //нал - 1, безнал - 2
            newOrder.payType = "CASH";         //нал - 1, безнал - 2
            newOrder.orderType = "KLAUTO_BUS";
            newOrder.precalculatedPrice = 0.0;
            newOrder.carClass = 1;
            newOrder.busType = 2;
            // newOrder.timeFinish = maketimefromdate($$("timeFinish").getValue());
            newOrder.passengers = $$("passengers").getValue();
            // newOrder.childGroup = $$("childGroup").getValue();
            newOrder.childGroup = 1;
            newOrder.additionalOptions = "1;15";
            // newOrder.error = 0;
            // newOrder.message = '';

            /* Контакты начало */
            var i = -1;
            var contact = {};
            $$("roots_contacts").data.each(function(obj){
                i++;
                contact[i] = {};
                contact[i]['name'] = obj.roots_name;
                contact[i]['phone'] = obj.roots_phone;
                contact[i]['contactSequence'] = i+1;
            });
            var contact_arr = [contact[0]];
            for(var j=1; j<=i; j++) {
                contact_arr = contact_arr.concat([contact[j]]);
            };
            newOrder.contactList = (i<0 ? null : contact_arr);
            /* Контакты конец */
            /* Адреса начало */
            var i = -1;
            var address = {};
            $$("roots_address").data.each(function(obj){
                i++;
                address[i] = {};
                address[i]['city'] = obj.roots_city;
                address[i]['street'] = obj.roots_street;
                address[i]['houseNumber'] = obj.roots_house_number;
                address[i]['houseSubNumber'] = obj.roots_house_sub_number;
                address[i]['building'] = obj.roots_building;
                address[i]['entrance'] = obj.roots_entrance;
                address[i]['apartment'] = obj.roots_apartment;
                // address[i]['datetime'] = maketimefromdate(obj.roots_datetime);
                address[i]['comment'] = obj.roots_comment;
                address[i]['routeSequence'] = i+1;
            });
            var address_arr = [address[0]];
            for(var j=1; j<=i; j++) {
                address_arr = address_arr.concat([address[j]]);
            };
            newOrder.routeList = (i<0 ? null : address_arr);
            /* Адреса конец */

            var serviceId = 1;

            var example = {
                'token'              : webix.storage.cookie.get("token"),
                'routeList'          : [],
                'datetime'           : page.maketimefromdate( $$("timeStart").getValue() ),
                'comment'            : $$("comment").getValue(),
                'serviceId'          : serviceId,
                'payType'            : $$("payType").getValue(),
                'orderType'          : 'KLAUTO_BUS',
                'precalculatedPrice' : 0.0,
                'carClass'           : 1,
                'busType'            : 2,
                'timeFinish'         : page.maketimefromdate($$("timeFinish").getValue()),
                'passengers'         : $$("passengers").getValue(),
                'childGroup'         : $$("childGroup").getValue(),
                'additionalOptions'  : '1;15',
                'email'              : 'mail@mail.ru',
                "contactList"        : []
            }            

            var result = {};
            result.order = newOrder;
            // result.order = example;

            result = JSON.stringify(result);
            // console.log(result);

            webix.ajax().sync().post(
                url,
                result,
                {
                    error:function(text, data, XmlHttpRequest){
                        webix.message({"type":"error", "text":"Ошибка сервера - добавление заказа"});
                    },
                    success:function(text, data, XmlHttpRequest){

                        console.log(data);
                        text = JSON.parse(text);
                        console.log(text);
                        result = text.ordersList;
                        if(result!=null) show_orders_pending(1,0,1);
                        webix.message("Новый заказ добавлен!");
                        $$("order_creation_form").getTopParentView().hide();
                    }
                }
            );
        };
    };

    page.order_creation = function() {
        var form_order = {
            id:"order_creation",
            view:"form",
            borderless:true,
            elements: [
                {
                    id:"order_creation_form",
                    cols:[
                        {
                            view:"fieldset",
                            label:"<i class='fa fa-book' aria-hidden='true'></i> Общее",
                            body:{
                                rows:[
                                    {
                                        id:"busType", view:"richselect", label:"Тип автобуса:", labelPosition:"left", labelWidth:135,
                                        options:[
                                            { id:0, value:"Городской автобус" },
                                            { id:1, value:"Международный автобус" },
                                            { id:2, value:"Мидиавтобус" },
                                            { id:3, value:"Микроавтобус" },
                                            { id:4, value:"Школьный автобус" },
                                            { id:5, value:"Пригородный автобус" },
                                            { id:6, value:"Туристический автобус" }
                                        ]
                                    },
                                    {
                                        id:"payType", view:"richselect", label:"Тип платежа:", labelPosition:"left", labelWidth:135,
                                        options:[
                                            { id:1, value:"Наличный" },
                                            { id:2, value:"Кредитка" }
                                        ]
                                    },
                                    { id:"passengers", view:"counter", min:1, value:1, label:"Количество человек:", labelPosition:"left", labelWidth:155 },
                                    { id:"childGroup", view:"checkbox", label:"Детская группа:", labelPosition:"left", labelWidth:155, checkValue:"1", uncheckValue:"0" },
                                    {
                                        cols:[
                                            { id:"options", view:"button", type:"icon", icon:"plus", label:"Дополнительные опции", width:200, click:page.edit_options },
                                            { }
                                        ]
                                    }
                                ]
                            }
                        },
                        { width:15 },
                        {
                            id:"contacts", view:"fieldset", label:"<i class='fa fa-users' aria-hidden='true'></i> Контакты",
                            body:{
                                rows:[
                                    {
                                        id: "roots_contacts",
                                        view: "datatable",
                                        height:145,
                                        resizeColumn: true,
                                        resizeRow: true,
                                        select: true,
                                        hover: "myhover",
                                        navigation: true,
                                        tooltip: true,
                                        columns: [  //currency
                                            { id:"roots_name", header:[{text: "ФИО", height:30}], width:150 },
                                            { id:"roots_phone", header:"Телефон", width:150 }
                                        ],
                                        //type:{template:"{common.space()}"},
                                        data:[]
                                    },
                                    {
                                        height:40,
                                        cols:[
                                            {},
                                            { view: "button", type: "icon", icon:"plus", width:100, label:"Добавить", click:page.add_contact },
                                            { view: "button", type: "icon", icon:"pencil",  width:135, label:"Редактировать", click:page.edit_contact },
                                            { view: "button", type: "icon", icon:"trash",  width:90, label:"Удалить", click:page.delete_contact },
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    id:"roots", view:"fieldset", label:"<i class='fa fa-map-marker' aria-hidden='true'></i> Маршрут следования",
                    body:{
                        rows:[
                            {
                                id: "roots_address",
                                view: "datatable",
                                height:150,
                                resizeColumn: true,
                                resizeRow: true,
                                select: true,
                                hover: "myhover",
                                navigation: true,
                                tooltip: true,
                                columns: [  //currency
                                    { id:"roots_city", header:[{text: "Город", height:30}], width:150 },
                                    { id:"roots_street", header:"Улица", width:150 },
                                    { id:"roots_house_number", header:"Дом", width:80 },
                                    { id:"roots_house_sub_number", header:"Корпус", width:80 },
                                    { id:"roots_building", header:"Строение", width:80 },
                                    { id:"roots_entrance", header:"Подъезд", width:80 },
                                    { id:"roots_apartment", header:"Квартира", width:80 },
                                    { id:"roots_datetime_view", header:"Дата и время", width:150, },
                                    { id:"roots_comment", header:"Комментарий", width:400 }
                                ],
                                //type:{template:"{common.space()}"},
                                data:[]
                            },
                            {
                                height:40,
                                cols:[
                                    {},
                                    { view: "button", type: "icon", icon:"plus", width:100, label:"Добавить", click:page.add_address },
                                    { view: "button", type: "icon", icon:"pencil",  width:135, label:"Редактировать", click:page.edit_address },
                                    { view: "button", type: "icon", icon:"trash",  width:90, label:"Удалить", click:page.delete_address },
                                ]
                            }
                        ]
                    }
                },
                {
                    view:"fieldset", label:"<i class='fa fa-clock-o' aria-hidden='true'></i> Дата и время работы автобуса",
                    body:{
                        cols:[
                            { id:"timeStart", view:"datepicker", timepicker:true, format:"%d.%m.%Y %H:%i", label:"<i class='fa fa-home' aria-hidden='true'></i> Начало:", labelPosition:"left", labelWidth:85, width:265 },
                            { width:25 },
                            { id:"timeFinish", view:"datepicker", timepicker:true, format:"%d.%m.%Y %H:%i", label:"<i class='fa fa-flag-checkered' aria-hidden='true'></i> Окончание:", labelPosition:"left", labelWidth:110, width:290 },
                            { }
                        ]
                    }
                },
                {
                    view:"fieldset", label:"<i class='fa fa-comment' aria-hidden='true'></i> Написать комментарий водителю:",
                    body: { id:"comment",view:"textarea", height:100, labelPosition:"left", labelAlign:"center", placeholder:"Не обязательно" }
                },
                {
                    cols:[
                        {},
                        {},
                        { view:"button", value:"Принять и распределить", click:function(){ page.action_order_creation(); }
                        },
                        { view:"button", value:"Отмена",
                            click:function(){
                                $$("order_creation_form").getTopParentView().hide();
                            }
                        }
                    ]
                }
            ],
            rules:{
                //"profile_login":webix.rules.isNotEmpty,
                //"profile_password":webix.rules.isNotEmpty
            },
            elementsConfig:{
                labelPosition:"top",
            }
        };

        webix.ui({
            view:"window",
            id:"win_order",
            width:810,
            position:"center",
            modal:true,
            head:"Создание заказа",
            body:webix.copy(form_order)
        });

        function showForm_order(winId, node){
            $$(winId).getBody().clear();
            $$(winId).show(node);
            $$(winId).getBody().focus();
        };

        showForm_order("win_order") ;
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

    var result = JSON.stringify({ 'state': { 'token': webix.storage.cookie.get("token") }});
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
                            page.order_creation()
                            // $$('create_order').showBatch('map_order');
                        } 
                    },
                    {

                        height:30,
                        width:200,
                        view:"button",
                        value:"ORDERS LIST",
                        click:function() {
                            webix.ajax().sync().post(
                                url,
                                result,
                                {
                                    error:function(text, data, XmlHttpRequest){
                                        webix.message({"type":"error", "text":"Ошибка сервера - список заказов"});
                                    },
                                    success:function(text, data, XmlHttpRequest){

                                        console.log(data);
                                        text = JSON.parse(text);
                                        console.log(text);
                                        result = text.ordersList;
                                        if(result!=null) show_orders_pending(1,0,1);
                                        webix.message("Новый заказ добавлен!");
                                        $$("order_creation_form").getTopParentView().hide();
                                    }
                                }
                            );

                        } 
                    }
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