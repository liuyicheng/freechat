$(function() {


	var Freechat = function() {

		this.PREFIX = 'yichengliu-';
		this.TPL = '\
			<div id="freechat" class="freechat">\
				<div id="freechat-header" class="freechat-header">\
					<h1 class="freechat-h1">FreeChat</h1>\
				</div>\
				<iframe id="freechat-content" class="freechat-content"></iframe>\
			</div>\
		';
		this.$freechat = $('');
		this.url = '';
		this.encodeUrl = '';

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
				$freechat = $(TPL);

			_this.addPrefix($freechat);

			_this.$freechat = $freechat;

			$body.prepend($freechat);

		},

		bind: function() {

			var _this = this,
				PREFIX = _this.PREFIX,
				$freechat = _this.$freechat;

			$freechat.draggable({
				addClasses: false,
				cursor: 'move',
				scroll: false,
				start: start,
				stop: stop
			});
			$freechat.resizable({
				handles: 'all',
				minHeight: 200,
				minWidth: 200,
				start: start,
				stop: stop
			});
			function start(event, ui) {
				console.log(event);
				console.log(ui);
				$freechat.addClass(PREFIX + 'freechat-hide');
			}
			function stop() {
				$freechat.removeClass(PREFIX + 'freechat-hide');
			}

		},

		sync: function() {

			var _this = this,
				PREFIX = _this.PREFIX,
				url,
				encodeUrl,
				$freechat = _this.$freechat,
				$freechatContent = $('#' + PREFIX + 'freechat-content');

			chrome.extension.sendRequest({ command: "selected-tab" }, function(tab) {
			    url = tab.url;
			    encodeUrl = encodeURIComponent(url);
				$freechatContent.attr('src', 'http://freechat.yichengliu.com/?url=' + encodeUrl);
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

		}

	};


	var freechat = new Freechat();
	freechat.init();


});