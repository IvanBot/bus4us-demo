module [main]

```js
// main/out_module_2

define ( ["out_module", ...], function(module) {
	var component_abc = { some_value : module };
	...

	var ui = { cols : [
		component_abc,
		$subview : true, // for use out_module_2
		...

		// show modules by [id]
		on : {
			onAfterSelect: function (id) {
				module.show("/top/"+id);
			}
		}
	]}

	return {
		$ui: ui
	};
});
```

Data store

```js
define([
	"models/records"
],function(records){

	var ui = {
		view:"datatable", autoConfig:true, editable:true
	};

	return {
		$ui: ui,
		$oninit:function(view){
			view.parse(records.data);
		}
	};

});

// models/records

define([],function(){

 var collection = new webix.DataCollection({
	 data:[
		 { id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1},
		 ...
	 ]
 });

 var get_collection = new webix.DataCollection({

		url:"rest->server/records.php", // defines the URL of the data loading script
    save:"rest->server/records.php" // defines the URL of the data saving script
	});

 return {
	 data: collection
 };
});
```
