$(function() {


	var Freechat = function() {

		this.PREFIX = 'yichengliu-';
		this.TPL = {
			box: '\
				<div id="' + this.PREFIX + 'freechat" class="' + this.PREFIX + 'freechat">\
					<div id="' + this.PREFIX + 'freechat-content" class="' + this.PREFIX + 'freechat-content"></div>\
				</div>\
			',
			message: '\
				<div class="' + this.PREFIX + 'freechat-message cf">\
					<p></p>\
				</div>\
			'
		};
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
				$freechat = $(TPL.box);

			_this.$freechat = $freechat;

			$body.prepend($freechat);

		},

		bind: function() {

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
			    $.getJSON('http://localhost/freechat?url=' + encodeUrl, function(json) {
			    	$.each(json, function(i, messageObj) {
			    		_this.renderMessage(messageObj);
			    	});
			    }).done(function() { console.log( "second success" ); })
				.fail(function() { console.log( "error" ); })
				.always(function() { console.log( "complete" ); });
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

			$freechatMessageP.attr({
				'title': $messageObj.datetime,
			}).html($messageObj.message);

			$freechatMessage.appendTo($freechatContent);

		}

	};


	var freechat = new Freechat();
	freechat.init();


});