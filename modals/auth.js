define(function() {

    var url = "http://84.16.157.58:8085/bus4usclientservlet",
        credit_card = { template:"credit card" },
        myBalance = "-",
        myPhone = "-",
        myId = "-";

    var send_number = function () {
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

    var send_code = function () {
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

    var check_token = function () {

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

    var get_car_classes = function () {
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

    return {
        send_number, send_code, check_token, get_car_classes
    }

});
