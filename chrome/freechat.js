$(function() {


	var Freechat = function() {

		this.PREFIX = 'yichengliu-';
		this.TPL = {
			box: '\
				<div id="freechat" class="freechat">\
					<div id="freechat-content" class="freechat-content"></div>\
				</div>\
			',
			message: '<p class="freechat-message"></p>'
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
				PREFIX = _this.PREFIX,
				TPL = _this.TPL,
				$body = $('body'),
				$freechat = $(TPL.box);

			_this.addPrefix($freechat);

			_this.$freechat = $freechat;

			$body.prepend($freechat);

		},

		bind: function() {

			var _this = this,
				PREFIX = _this.PREFIX,
				$freechat = _this.$freechat;

		},

		sync: function() {

			var _this = this,
				PREFIX = _this.PREFIX,
				i,
				url,
				encodeUrl,
				$freechat = _this.$freechat,
				$freechatContent = $('#' + PREFIX + 'freechat-content');

			chrome.extension.sendRequest({ command: "selected-tab" }, function(tab) {
			    url = tab.url;
			    encodeUrl = encodeURIComponent(url);
			    $.getJSON('http://localhost/freechat?url=' + encodeUrl, function(json) {
			    	$.each(json, function(i, messageObj) {
			    		_this.renderMessage(messageObj);
			    	});
			    }).done(function() { console.log( "second success" ); })
				.fail(function() { console.log( "error" ); })
				.always(function() { console.log( "complete" ); });
			});

		},

		addPrefix: function($freechat) {

			var _this = this;
				PREFIX = _this.PREFIX;

			$freechat.attr('id', function(i, id) {
				return PREFIX + id;
			}).find('[id^="freechat"]').attr('id', function(i, id) {
				return PREFIX + id;
			}).end().attr('class', function(i, className) {
				return className.replace(/freechat/g, function(className) {
					return PREFIX + className;
				});
			}).find('[class*="freechat"]').attr('class', function(i, className) {
				return className.replace(/freechat/g, function(className) {
					return PREFIX + className;
				});
			});

		},

		renderMessage: function($messageObj) {

			var _this = this,
				TPL = _this.TPL,
				$freechat = _this.$freechat,
				$freechatContent = $('#' + PREFIX + 'freechat-content'),
				$freechatMessage = $(TPL.message);

			$freechatMessage.attr({
				'title': $messageObj.datetime,
			}).html($messageObj.message)
			.appendTo($freechatContent);

		}

	};


	var freechat = new Freechat();
	freechat.init();


});