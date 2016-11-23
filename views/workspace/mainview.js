define( function(require) {

    // subdivsion
    var order = require('./order/init');

    var toolbar_layout = [{
        css: "logo",
        view: "icon",
        icon: "bars",
        click: function () {
            if ( $$("menu").config.hidden) {
                $$("menu").show();
            }
            else
                $$("menu").hide();
            }
    },{
        id: "header",
        css: "logo",
        height: 25,
        template: "<div class='title_center big_middle_text'>Создать заказ</div>"
    },{
        css: "logo",
        width: 105,
        template: "<img src='assets/img/logo.png'>"
    }];

    var toolbar = {
        css: "logo",
        view: "toolbar",
        id: "toolbar",
        cols: toolbar_layout
    };

    var main_area = {
        id: "main",
        visibleBatch: "create_order",
        height: "auto",
        rows: [{
            batch: "create_order",
            animate: false,
            body: order
        }]
        // {rows:[{animate: false,cells:[my_orders]}], batch:"my_orders"},
        // {rows:[{animate: false,cells:[my_history]}], batch:"my_history"},
        // {rows:[{animate: false,cells:[credit_card]}], batch:"credit_card"},
    };

    var main_view = {
        rows : [toolbar, main_area]
    }

    return main_view;

});
