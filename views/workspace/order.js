define( function(require) {

    var map_order = {
        id:"map_order",
        view:"menu",
        layout:"y",
        borderless:true,
        scroll: true,
        css: 'mycls',
        template: "<div class='order_map'><span class='webix_icon fa-#icon# menu_icon'></span><div class='menu_text'><h1>#value#</h1><p>#description#</p></div></div>",

        data:[
            { $template:"Separator" },
            { id:"create_order_cls", value:"Класс автобуса", icon:"bus", description: "Выберите класс автобуса" },
            { id:"create_order_date", value:"Укажите дату и время отправления", icon:"bus", description: "и окончания поездки" },
            { id:"create_order_passengers", value:"Количество пассажиров", icon:"bus", description: "Укажите количество пассажиров" },
            { id:"create_order_childer", value:"Детская группа", icon:"bus", description: "Нет" },
            { id:"create_order_addition", value:"Дополнительные опции", icon:"bus", description: "Наличие кондиционера, телевизора, туалета" },
            { id:"create_order_route", value:"Маршрут", icon:"bus", description: "Укажите маршрут" },
            { id:"create_order_contact", value:"Контактное лицо", icon:"bus", description: "Укажите контактное лицо" },
            { id:"create_order_comment", value:"Комментарий водителю", icon:"bus", description: "(Не обязательно)" },
        ],

        on: {
            'onItemClick': function(id) {
                $$('main').showBatch(id);
                // webix.message('Выберан пункт меню: ' + this.getItem(id).value)
                //show sub_dir
            }
        }
    }

    var map = {
        rows: [

            { borderless:true, view:"google-map", id:"map", zoom:10, center:[55.76, 37.64], key: 'AIzaSyA1AaJZPT_7yzHEQl7PTdVV7quEiwe9aE8' },
            {
                borderless:true, cols:[
                    {},
                    {
                        height:30,
                        width:200,
                        view:"button",
                        value:"Создать заказ",
                        click:function() {
                            $$('create_order').showBatch('map_order');
                        }
                    },
                    {}
                ]
            },
            { borderless:true, height:40, template:"Москва" }
        ]
    }

    var create = {
        rows:[
            {
                view:"scrollview", height:100, scroll:"x",
                body:{
                    id:"car_classes", view:"dataview", select:true, xCount:7,
                    template:"<div class='bus_classes'><center>#imgsrc#<br><br>#name#</center></div>",
                    data:[],
                    type: {
                        height:100,
                        width:140
                    },
                    click:function(id){
                        console.log(id);

                        webix.ui({
                            view:"popup",
                            id:"my_pop",
                            head:"Submenu",
                            width:300,
                            body:{
                                view:"list",
                                data:[ {id:"1", name:"Zoo", location: "New York"},
                                    {id:"2", name:"Coffeebar", location:"Salt Lake City"},
                                    {id:"3", name:"Teeparty", location:"Alabama"}
                                ],
                                datatype:"json",

                                template:"#name# - #location#",
                                autoheight:true,
                                select:true
                            }
                        });
                    }
                }
            },

            // map & order

            {
                id: 'create_order',
                visibleBatch:"map",
                rows: [
                    {rows:[{animate: false, cells:[map]}], batch:"map"},
                    // {rows:[{animate: false, cells:[map_order]}], batch:"map_order"}
                ]
            }
        ]
    };

    return {
        create: create
    }

});
