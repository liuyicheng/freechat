$(function() {


	var Freechat = function() {

		var PREFIX = 'yichengliu-';

		this.TPL = {
			box: '\
				<div id="' + PREFIX + 'freechat" class="' + PREFIX + 'freechat">\
					<div id="' + PREFIX + 'freechat-content" class="' + PREFIX + 'freechat-content"></div>\
				</div>\
			',
			message: '\
				<div class="' + PREFIX + 'freechat-message cf">\
					<p></p>\
				</div>\
			',
			form: '\
				<div class="' + PREFIX + 'freechat-form">\
					<input id="' + PREFIX + 'freechat-text" class="' + PREFIX + 'freechat-text" type="text" />\
					<input id="' + PREFIX + 'freechat-submit" class="' + PREFIX + 'freechat-submit" type="button" value="submit" />\
				</div>\
			'
		};
		this.PREFIX = PREFIX;
		this.msgid = 0;
		this.$freechat;
		this.url;
		this.encodeUrl;

	};


	Freechat.prototype = {

		constructor: Freechat,

		init : function() {

			var _this = this;

			_this.render();
			_this.bind();
			_this.sync();

		},

		render: function() {

			var _this = this,
				TPL = _this.TPL,
				$body = $('body'),
				$freechat = $(TPL.box),
				$freechatForm = $(TPL.form);

			_this.$freechat = $freechat;

			$freechat.append($freechatForm);
			$body.prepend($freechat);

		},

		bind: function() {

			var _this = this,
				PREFIX = _this.PREFIX,
				$freechat = _this.$freechat,
				$freechatText = $('#' + PREFIX + 'freechat-text'),
				$freechatSubmit = $('#' + PREFIX + 'freechat-submit'),
				message;

			$freechatSubmit.on('click' ,function() {

				message = $freechatText.val();
				if (message) {
					_this.setMessage(message);
				} else {
					alert('say something');
				}

			});

		},

		sync: function() {

			var _this = this,
				PREFIX = _this.PREFIX,
				$freechat = _this.$freechat,
				$freechatContent = $('#' + PREFIX + 'freechat-content'),
				url,
				encodeUrl;

			chrome.extension.sendRequest({ command: "selected-tab" }, function(tab) {
			    _this.url = url = tab.url;
			    _this.encodeUrl = encodeUrl = encodeURIComponent(url);
		    	_this.getMessage();
			});

		},

		renderMessage: function($messageObj) {

			var _this = this,
				PREFIX = _this.PREFIX,
				TPL = _this.TPL,
				$freechat = _this.$freechat,
				$freechatContent = $('#' + PREFIX + 'freechat-content'),
				$freechatMessage = $(TPL.message),
				$freechatMessageP = $freechatMessage.find('p');

			_this.msgid = $messageObj.msgid;
			$freechatMessageP.attr({
				'title': $messageObj.datetime,
			}).html($messageObj.message);

			$freechatMessage.appendTo($freechatContent);
			$freechatMessage.addClass('yichengliu-freechat-message-end');

		},

	    getMessage: function() {

	    	var _this = this,
	    		encodeUrl = _this.encodeUrl,
	    		msgid = _this.msgid;

		    $.getJSON('http://localhost/freechat/webpage/?url=' + encodeUrl + '&msgid=' + msgid, function(json) {
		    	$.each(json, function(i, messageObj) {
		    		_this.renderMessage(messageObj);
		    	});
	    		_this.getMessage();
		    });

		},

		setMessage: function(message) {

			var _this = this,
				encodeUrl = _this.encodeUrl;

			$.getJSON('http://localhost/freechat/webpage/?url=' + encodeUrl + '&message=' + message, function(json) {
				console.log(json);
			});

		}

	};


	var freechat = new Freechat();
	freechat.init();


});