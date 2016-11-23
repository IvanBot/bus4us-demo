define( function (require) {

    var auth       = require('modals/auth');
    var google_map = require('modals/googlemap');
    
    var intro      = require('views/intro');
    var sidemenu   = require('views/workspace/sidemenu');
    var main_view  = require('views/workspace/mainview');

    webix.protoUI(google_map, webix.ui.view);

    // workspace
    if (auth.check_token()) {

        
        webix.ui(main_view);
        webix.ui(sidemenu);

        auth.get_car_classes();
        $$("main_menu").select("create_order");
    }

    // authorization
    else if (webix.storage.cookie.get('phoneNumber')) {
        // Форма для кода из SMS
        webix.ui(intro.code_view);
    }

    else {
        // Форма для телефона
        webix.ui(intro.phone_view);
    }

});
