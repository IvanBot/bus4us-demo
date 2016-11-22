define( function(require) {

	var data = require('./data');

    var maketimefromdate = function(x) {
        return Math.round(x.getTime()/1000);
    };
	    
    var action = function(){
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
                data.url,
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

    return action;

});