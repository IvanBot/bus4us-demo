define( function (require) {

	// Модуль для отправки кода и номера на сервер
	var auth = require('modals/auth');
	
	var code_layout = [{ 
		css: "logo",
		borderless: true
	},{
		css: "logo",
		borderless: true,
		height: 150,
		template: "<center><img id='main_logo2' src='assets/img/logo2.png'></center>"
	},{
		css: "logo",
		borderless: true,
		height: 50,
		template: "<center><img id='main_logo' src='assets/img/logo.png'></center>"
	},{ 
		css: "logo",
		borderless: true,
		height: 45,
		template: "<center><span class='middle_text'>Код активации<br>отправлен Вам по SMS</span></center>"
	},{ 
		css: "logo",
		borderless: true,
		height: 25,
		template: "<center><span class='small_text'>Введите его в поле и нажмите продолжить</span></center>"
	},{
		css:"logo",
		borderless: true,
		id: "verifyCode",
		view: "text",
		inputAlign: "center",
		placeholder: "Введите код"
	},{
		css: "logo",
		borderless: true,
		view: "button",
		value: "Подтвердить",
		click: auth.send_code
	},{
		css: "logo",
		borderless: true,
		height: 50,
		template: "<center><span class='small_text'>Мы перезвоним Вам через 90 секунд и продиктуем код, на случай, если по каким-то причинам SMS Вам не пришло</span></center>"
	},{
		css: "logo",
		borderless: true
	}];

	var code_view = {
		cols: [{
			css: "logo",
			borderless: true
		},{
			width: 250,
			rows: code_layout 
		},{
			css: "logo",
			borderless: true 
		}]
	}

	var phone_layout = [{
		css: "logo",
		borderless: true
	},{
		css: "logo",
		borderless: true,
		height: 150,
		template: "<center><img id='main_logo2' src='assets/img/logo2.png'></center>"
	},{
		css: "logo",
		borderless: true,
		height: 50,
		template: "<center><img id='main_logo' src='assets/img/logo.png'></center>"
	},{
		css: "logo",
		borderless: true,
		height: 40,
		template: "<center><span class='big_text'>Добро пожаловать</span></center>"
	},{
		css: "logo",
		borderless: true,
		height: 25,
		template: "<center><span class='small_text'>Пожалуйста, введите Ваш номер телефона</span></center>"
	},{
		css: "logo",
		borderless: true,
		id: "phoneNumber",
		view: "text",
		inputAlign: "center",
		placeholder: "Введите телефон"
	},{
		css: "logo",
		borderless: true,
		view: "button",
		value: "Получить код для входа",
		click: auth.send_number
	},{
		css: "logo",
		borderless: true,
		height: 50,
		template: "<center><span class='small_text'>Соглашение об использовании</span></center>"
	},{ 
		css: "logo",
		borderless: true
	}];

	var phone_view = {
		cols: [{
			css: "logo",
			borderless: true
		},{
			width: 250,
			rows: phone_layout
		},{ 
			css: "logo",
			borderless: true
		}]
	}

	return {
		code_view: code_view,
		phone_view: phone_view
	}
});
