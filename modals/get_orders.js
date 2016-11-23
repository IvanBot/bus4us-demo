define( function(require) {

	var data = require('./data');

	var result = JSON.stringify({
		"getOrders":
    	{
        	"token": webix.storage.cookie.get('token')
    	}
	});

	



	var request = function() {

		// var xhr = new XMLHttpRequest();
		// xhr.open('POST', data.url, false);
		// xhr.send(result);

		// if (xhr.status != 200) {
		// 	console.log( xhr );
		// } else {
		// // вывести результат
		// 	console.log( xhr.responseText ); // responseText -- текст ответа.
		// }


	    webix.ajax().sync().post(data.url, result);
	    
	    
	};

	return request;
});