function get_orders(){
    var getOrders = {};
    getOrders.token = webix.storage.cookie.get('token');
    var array = {};
    array['getOrders'] = getOrders;
    var arr_result = JSON.stringify(array);
    var xhr = webix.ajax().sync().post(url, arr_result);
    var txt = JSON.parse(xhr.responseText);
    if(txt.error==0) {
        console.log(txt.ordersList);
        $$("my_orders").define({data:[{},{},{},{},{}]});
        $$("my_orders").refresh();
    }
    else webix.message({"type":"error", "text":"Ошибка сервера - запрос списка моих заказов"});
};

var my_orders = {
    id:"my_orders",
    view:"datatable",
    resizeColumn:true, resizeRow:true,
    select:true,
    hover:"myhover",
    header:false,
    footer:true,
    navigation:true,
    tooltip:true,
    multiselect:true,
    css:"my_style",
    columns:[	//currency,org,phone,poezdok,'' as summa,friend_id,canbeznal,isVIP,regdate,regby,sex,
        { id:"num",             header:"",  width:70, css:{"text-align":"right"} },
        { id:"sumo_lrt",        header:"Дата",  width:140 },
        { id:"brigada",         header:"Бригада",  width:140},
        { id:"pozivn",          header:"Позывной",  width:140},
        { id:"fio",             header:"Ф.И.О.",   width:130},
        { id:"car_model",       header:"Машина", width:180},
        { id:"nBalans",         header:"Баланс",  width:140 },
        // { id:"poezdok",         header:"Тариф", width:255 },
        { id:"phones",          header:"Телефон",  width:140},
        { id:"mobile_phone",    header:"Номер для смс",  width:130 },
        { id:"comment",         header:"Комментарий",  width:130 }
    ],
    //type:{template:"{common.space()}"},
    data:[],
    ready:function(){
        webix.extend(this, webix.ProgressBar);
    }
};
