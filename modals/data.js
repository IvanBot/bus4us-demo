define(function() {
    
    var collection = {
        url         : "http://84.16.157.58:8085/bus4usclientservlet",
        my_balance  : "-",
        my_phone    : "-",
        my_id       : "-",
        credit_card : {
            template : "credit card"
        }
    }

    return collection;

    // var store = {
    //     id: 'store',
    //     view: 'dataview',
    //     data: [{
    //         id: 'url',
    //         url: "http://84.16.157.58:8085/bus4usclientservlet"
    //     },{
    //         id: 'my_balance',
    //         value: "-"
    //     },{
    //         id: 'my_phone',
    //         my_phone: "-"
    //     },{
    //         id: 'my_id',
    //         my_id: "-"
    //     },{
    //         id: 'credit_card',
    //         credit_card: {
    //             template : "credit card"
    //         }
    //     }]
    // }

    // return store;

});
