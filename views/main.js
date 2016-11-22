define( function (require) {

    var auth       = require('modals/auth');
    var google_map = require('modals/googlemap');
    
    var intro      = require('views/intro');
    var start      = require('views/workspace/start');

    webix.protoUI(google_map, webix.ui.view);

    // workspace
    if (auth.check_token()) {

        webix.ui(start.main_view);
        webix.ui(start.sidemenu);

        $$("main_menu").select("create_order");
        auth.get_car_classes();
    }

    // authorization
    else if (webix.storage.cookie.get('phoneNumber')) {
        webix.ui(intro.code_view);
    }

    else {
        webix.ui(intro.phone_view);
    }

});
