define( function(require) {

    var maketimefromdate = function(x) {
        return Math.round(x.getTime()/1000);
    };

    var add_address = function(){
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

    var edit_address = function(){
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

    var delete_address = function(){
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

    var add_contact = function() {
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

    var edit_contact = function() {
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

    var delete_contact = function(){
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

    var edit_options = function() {
    
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

    var action_order_creation = function(){
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
                'datetime'           : maketimefromdate( $$("timeStart").getValue() ),
                'comment'            : $$("comment").getValue(),
                'serviceId'          : serviceId,
                'payType'            : $$("payType").getValue(),
                'orderType'          : 'KLAUTO_BUS',
                'precalculatedPrice' : 0.0,
                'carClass'           : 1,
                'busType'            : 2,
                'timeFinish'         : maketimefromdate($$("timeFinish").getValue()),
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

    var order_creation = function() {
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
                                            { id:"options", view:"button", type:"icon", icon:"plus", label:"Дополнительные опции", width:200, click:edit_options },
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
                                            { view: "button", type: "icon", icon:"plus", width:100, label:"Добавить", click:add_contact },
                                            { view: "button", type: "icon", icon:"pencil",  width:135, label:"Редактировать", click:edit_contact },
                                            { view: "button", type: "icon", icon:"trash",  width:90, label:"Удалить", click:delete_contact },
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
                                    { view: "button", type: "icon", icon:"plus", width:100, label:"Добавить", click:add_address },
                                    { view: "button", type: "icon", icon:"pencil",  width:135, label:"Редактировать", click:edit_address },
                                    { view: "button", type: "icon", icon:"trash",  width:90, label:"Удалить", click:delete_address },
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
                        { view:"button", value:"Принять и распределить", click:function(){ action_order_creation(); }
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

    return order_creation;

});