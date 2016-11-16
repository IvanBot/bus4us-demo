/*
	App configuration
*/

define([
	"libs/webix-jet/core"
], function(core){

	//configuration
	var app = core.create({
		id:			"bus4us",
		name:		"bus4us",
		version:	"0.1.0",
		debug:		true,
		start:		"start"
	});

	return app;
});