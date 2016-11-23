define( function(require) {

	var data = require('./data');

	var request = JSON.stringify({
		"getOrders":
    	{
        	"token": webix.storage.cookie.get('token')
    	}
	});

	



	var get_orders = function() {

	    webix.ajax().sync().post(
	    	data.url,
	    	request,
	    	 {
                error: function (text, data, XmlHttpRequest) {
                    webix.message({
                        "type": "error",
                        "text": "Ошибка сервера - запрос списка заказов: ответа нет"
                    });
                },
                success: function (text, data, XmlHttpRequest) {
                    text = JSON.parse(text);
                    if (text.error == 0) {
                    	
                    	// Array with orders
                    	console.log(text.ordersList);
                    	var _dev_data = text.ordersList;
                    	


                    }
                    else webix.message({
                        "type": "error",
                        "text": "Ошибка сервера - запроссписка заказов: ответ получен"
                    });
                }
            }
	    );
	    
	};

	return get_orders;
});