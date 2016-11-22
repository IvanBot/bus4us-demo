
require.config({
	paths: {
		webix: 'libs/webix/webix',
		domReady: 'libs/requirejs/domReady'
 	}
});

define(['domReady','webix'], function () {
	require(['views/main']);
})
