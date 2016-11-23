define( function (require) {

    // Модуль с данными пользователя
    var data_user = require('./data');

    var send_number = function () {

        var request = JSON.stringify({
            "requestCode": {
                "phoneNumber": $$("phoneNumber").getValue(),
                "requestCodeAgain": false
            }
        });

        webix.ajax().post(
            data_user.url,
            request,
            {
                error: function (text, data, XmlHttpRequest) {
                    webix.message({
                        "type": "error",
                        "text": "Ошибка сервера - запрос кода по телефону: ответа нет"
                    });
                },
                success: function (text, data, XmlHttpRequest) {
                    text = JSON.parse(text);
                    if (text.error == 0) {
                        webix.storage.cookie.put('phoneNumber', $$("phoneNumber").getValue());
                        location.href = '../index.html';
                    }
                    else webix.message({
                        "type": "error",
                        "text": "Ошибка сервера - запрос кода по телефону: ответ получен"
                    });
                }
            }
        );
    };

    var send_code = function () {

        var request = JSON.stringify({
            "verifyCode": {
                "code": $$("verifyCode").getValue(),
                "phoneNumber": webix.storage.cookie.get('phoneNumber')
            }
        });

        webix.ajax().post(
            data_user.url,
            request,
            {
                error: function (text, data, XmlHttpRequest) {
                    webix.message({
                        "type": "error", 
                        "text": "Ошибка сервера - запрос токена по телефону и коду: ответа нет"
                    });
                },
                success: function (text, data, XmlHttpRequest) {
                    text = JSON.parse(text);
                    if (text.error == 0) {
                        webix.storage.cookie.put('token',text.token);
                        location.href = '../index.html';
                    }
                    else webix.message({
                        "type": "error",
                        "text": "Ошибка сервера - запрос токена по телефону и коду: ответ получен"
                    });
                }
            }
        );
    };

    var check_token = function () {

        if (!webix.storage.cookie.get('token')) return false;

        var request = JSON.stringify({
            "authenticate": {
                "token": webix.storage.cookie.get('token')
            }
        });

        webix.ajax().sync().post(
            data_user.url,
            request,
            {
                error: function (text, data, XmlHttpRequest) {
                    webix.message({
                        "type": "error",
                        "text": "Ошибка сервера - запрос токена: ответа нет"
                    });
                },
                success: function (text, data, XmlHttpRequest) {
                    text = JSON.parse(text);
                    if (text.error == 0) {
                        
                        data_user.my_balance = text.client.balance;
                        data_user.my_phone   = text.client.name;
                        data_user.my_id      = text.client.id;
                        
                        result = true;
                    }
                    else webix.message({
                        "type": "error",
                        "text": "Ошибка сервера - запрос токена: ответ получен"
                    });
                }

            }
        );                       

        return result;
    };

    var get_car_classes = function () {

        var request = JSON.stringify({
            "getCarClassesMethod": {
                "token": webix.storage.cookie.get('token')
            }
        });
        
        webix.ajax().sync().post(
            data_user.url,
            request,
            {
                error: function (text, data, XmlHttpRequest) {
                    webix.message({
                        "type": "error",
                        "text": "Ошибка сервера - запрос классов автобусов: ответа нет"
                    });
                },
                success: function (text, data, XmlHttpRequest) {
                    text = JSON.parse(text);

                    // Response Text
                    // {"carClasses":[{"carClass":"Все равно","id":0},{"carClass":"Стандарт","id":1},{"carClass":"Эконом","id":2},{"carClass":"Комфорт","id":3},{"carClass":"Джип","id":4},{"carClass":"Бизнес","id":5}],"error":0,"message":"ok"}

                    if (text.error == 0) {
                        var data_bus_classes = [{
                            id: 1,
                            name: "Городской<br>автобус",
                            imgsrc: "<img src='assets/img/urbanbus.png'>",
                            popup:"my_pop"
                        },{
                            id: 2,
                            name: "Международный<br>автобус",
                            imgsrc: "<img src='assets/img/internationalbus_disabled.png'>"
                        },{
                            id: 3,
                            name: "Мидиавтобус",
                            imgsrc: "<img src='assets/img/midibus.png'>"
                        },{
                            id: 4,
                            name: "Микроавтобус",
                            imgsrc: "<img src='assets/img/microbus_disabled.png'>"
                        },{
                            id: 5,
                            name: "Школьный<br>автобус",
                            imgsrc: "<img src='assets/img/schoolbus.png'>"
                        },{
                            id: 6,
                            name: "Пригородный<br>автобус",
                            imgsrc: "<img src='assets/img/surbanbus_disabled.png'>"
                        },{
                            id: 7,
                            name: "Туристический<br>автобус",
                            imgsrc: "<img src='assets/img/turistbus.png'>"
                        }];

                        $$("car_classes").define({
                            data: data_bus_classes
                        });

                        $$("car_classes").refresh();
                    }
                    else webix.message({
                        "type": "error",
                        "text": "Ошибка сервера - запрос классов автобусов: ответ получен"
                    });
                }
            }
        );
    };

    return {
        send_number: send_number,
        send_code: send_code,
        check_token: check_token,
        get_car_classes: get_car_classes
    }

});
