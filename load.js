
require.config({
	paths: {
		webix: 'libs/webix/webix',
		domReady: 'libs/requirejs/domReady'
 	}
});

require(['views/main'], function (main) {
    console.log(main.init);
});

console.log('lorem ipsum');
