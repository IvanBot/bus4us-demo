define( ['domReady','webix'], function(dom_ready) {



    var config = {
        init         : false,
        dependencies : { webix : false }
    };

    var response = function () {
        console.log(config.dependencies.webix);
        if (config.dependencies.webix) {
            config.init = true;
        }
    }

    var ready = function (dependence) {
        if (dependence === "webix") {
            config.dependencies.webix = true;
            response();

        }
    }

    // ready("webix");
    dom_ready(function () {
        ready("webix");
    })


    return {
        init: config.init
    };
});