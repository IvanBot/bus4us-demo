define( function(require) {

    var edit_options = function() {
        var form_edit_address = {
            id:"edit_address_creation",
            view:"form",
            borderless:true,
            elements: [
                {
                    cols:[
                        {
                            rows:[
                                { id:"addressToObject_city", view:"checkbox", labelRight:"<i class='fa fa-male' aria-hidden='true'></i>|<i class='fa fa-female' aria-hidden='true'></i> Туалет", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_street", view:"checkbox", labelRight:"<i class='fa fa-asterisk' aria-hidden='true'></i> Кондиционер", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_houseNumber", view:"checkbox", labelRight:"<i class='fa fa-microphone' aria-hidden='true'></i> Микрофон", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_houseSubNumber", view:"checkbox", labelRight:"<i class='fa fa-desktop' aria-hidden='true'></i> TV/DVD", inputPosition:"left", height:22, labelWidth:135 }
                            ]
                        },
                        {
                            rows:[
                                { id:"addressToObject_building", view:"checkbox", labelRight:"<i class='fa fa-wifi' aria-hidden='true'></i> Wi-Fi", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_entrance", view:"checkbox", labelRight:"<i class='fa fa-archive' aria-hidden='true'></i> Холодильник", inputPosition:"left", height:22, labelWidth:135 },
                                { id:"addressToObject_apartment", view:"checkbox", labelRight:"<i class='fa fa-cutlery' aria-hidden='true'></i> Мини-кухня", inputPosition:"left", height:22, labelWidth:135 }
                            ]
                        }
                    ]
                },
                {
                    cols:[
                        {},
                        {
                            view:"button", value:"Сохранить", width:125,
                            click:function(){
                                $$("roots_address").updateItem($$("roots_address").getSelectedId(),{
                                    "roots_city":($$("addressToObject_city").getValue()=="" ? address.roots_city : $$("addressToObject_city").getValue()),
                                    "roots_street":$$("addressToObject_street").getValue(),
                                    "roots_house_number":$$("addressToObject_houseNumber").getValue(),
                                    "roots_house_sub_number":$$("addressToObject_houseSubNumber").getValue(),
                                    "roots_building":$$("addressToObject_building").getValue(),
                                    "roots_entrance":$$("addressToObject_entrance").getValue(),
                                    "roots_apartment":$$("addressToObject_apartment").getValue(),
                                    "roots_datetime":$$("addressToObject_datetime").getValue(),
                                    "roots_datetime_view":makenormaldatetime($$("addressToObject_datetime").getValue()),
                                    "roots_comment":$$("addressToObject_comment").getValue()
                                });
                                $$("addressToObject_city").getTopParentView().hide();
                            }
                        },
                        { view:"button", value:"Отмена",
                            click:function(){
                                $$("addressToObject_city").getTopParentView().hide();
                            }
                        },
                        {}
                    ]
                }
            ],
            rules:{
                //"profile_login":webix.rules.isNotEmpty,
                //"profile_password":webix.rules.isNotEmpty
            },
            elementsConfig:{
                labelPosition:"top",
            }
        };

        webix.ui({
            view:"window",
            id:"win_edit_address",
            width:410,
            position:"center",
            modal:true,
            head:"Дополнительные опции",
            body:webix.copy(form_edit_address)
        });

        function showForm_edit_address(winId, node){
            $$(winId).getBody().clear();
            $$(winId).show(node);
            $$(winId).getBody().focus();
        };

        showForm_edit_address("win_edit_address") ;
    };

    return edit_options;

});