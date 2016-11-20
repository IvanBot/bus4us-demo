/*
	App configuration
*/

// requirejs.config({
// 	baseUrl: 'libs'
// });

require.config({
  paths: {
    webix: 'libs/webix/webix'
    // underscore: 'libs/underscore/underscore',
    // backbone: 'libs/backbone/backbone'
  }

});

require(['views/main'], function (main) {
    
    console.log(main.init);
});

// require([
//     "webix"
// ], function(webix) {
//     webix.ready(function() {
//         console.log("webix ready event");
//     });
// })    


// define([
// 	"libs/webix-jet/core"
// ], function(core){

// 	//configuration
// 	var app = core.create({
// 		id:			"bus4us",
// 		name:		"bus4us",
// 		version:	"0.1.5",
// 		debug:		true,
// 		start:		"/start/menu"
// 	});


// 	return app;
// });