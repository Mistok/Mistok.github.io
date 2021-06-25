// var app = (function () {
//
// 	var reUrl = /^([A-Z]+)\s+(.*)$/;
// 	function ajaxOptions(url) {
// 		if (typeof (url) !== "string") {
// 			return url;
// 		}
//
// 		var ar = url.match(reUrl);
// 		if (ar) {
// 			return {
// 				method: ar[1],
// 				url: ar[2]
// 			};
// 		}
// 		else {
// 			return {
// 				method: "GET",
// 				url: url
// 			};
// 		}
// 	}
//
// 	function handleAjaxError(xhr, error, message) {
// 		if (xhr.status === 0) {
// 			return;
// 		}
// 		alert(xhr.status + " " + message);
// 	}
//
// 	function ajax(url) {
// 		var options = ajaxOptions(url);
// 		return $.ajax(options).fail(handleAjaxError);
// 	}
//
// 	function api(url, data) {
// 		var options = ajaxOptions(url);
// 		options.url = "api/" + options.url;
// 		if (data) {
// 			options.data = (options.method === "GET") ? data : JSON.stringify(data);
// 		}
// 		return new Promise(function (resolve, reject) {
// 			options.error = function (xhr, error, message) {
// 				if (xhr.status === 401) {
// 					app.showLogin()
// 						.then(function () {
// 							$.ajax(options);
// 						})
// 						.catch(function () {
// 							reject(xhr);
// 						});
// 				}
// 				else {
// 					handleAjaxError(xhr, error, message);
// 					reject(xhr);
// 				}
// 			};
// 			options.success = function (result) {
// 				resolve(result);
// 			};
// 			$.ajax(options);
// 		});
// 	}
//
// 	function data(url) {
// 		var options = ajaxOptions(url);
// 		if (document.location.protocol === "file:") {
// 			var html = $("#data\\/" + options.url.replace(/\//g, "\\/")).html();
// 			var ret = new $.Deferred();
// 			ret.resolve(html);
// 			return ret.promise();
// 		}
// 		else {
// 			var sep = (options.url.indexOf("?") >= 0) ? "&" : "?";
// 			options.url = "data/" + options.url + sep + "ver=1";
// 		}
// 		return ajax(options);
// 	}
//
// 	var reSub = /\{(\w+)\}/g;
// 	function sub(s, data) {
// 		return (s || "").replace(reSub, function (match, prop) {
// 			return data[prop] || match;
// 		});
// 	}
//
// 	var query = {};
// 	$.each(document.location.search.substr(1).split('&'), function (i, part) {
// 		var ar = part.match(/^(.+)=(.*)$/);
// 		if (!ar) {
// 			return;
// 		}
// 		var key = decodeURIComponent(ar[1]),
// 			value = decodeURIComponent(ar[2]);
// 		query[key] = value;
// 	});
//
// 	var settings = {
// 		get: function (key, defaultValue) {
// 			try {
// 				var ret = window.localStorage.getItem(key);
// 				return (ret == null) ? defaultValue : JSON.parse(ret);
// 			}
// 			catch (e) {
// 				return defaultValue;
// 			}
// 		},
// 		set: function (key, value) {
// 			try {
// 				window.localStorage.setItem(key, JSON.stringify(value));
// 			}
// 			catch (e) {
// 			}
// 		}
// 	};
//
// 	return {
// 		ajax: ajax,
// 		api: api,
// 		data: data,
// 		sub: sub,
// 		query: query,
// 		settings: settings
// 	};
// })();
//
//
// $.fn.render = function (params) {
// 	return this.each(function () {
// 		params = $.extend(params || {}, { el: this });
// 		var view = new Vue(params);
// 	});
// };
//
// $.fn.mount = function (vue) {
// 	if (vue.$el) {
// 		return this;
// 	}
// 	return this.each(function () {
// 		vue.$mount();
// 		this.appendChild(vue.$el);
// 		return false;
// 	});
// };
//
// app.createComponent = function (name, props) {
// 	var content = new (Vue.component(name))({
// 		propsData: props || {}
// 	});
// 	return content;
// };
//
// app.createDialogComponent = function (name, props, events) {
// 	return {
// 		data: function () {
// 			return {
// 				props: props || {},
// 				events: events || {}
// 			};
// 		},
// 		template: '<' + name + ' v-bind="props" v-on:close="$emit(\'close\')" v-on="events"></' + name + '>'
// 	};
// };
//
// Object.defineProperty(
// 	app,
// 	"isMobile",
// 	{
// 		get: function () {
// 			return $("#mobile-test").is(":visible");
// 		}
// 	});
//
// (function () {
// 	var hasTouch = false;
// 	window.addEventListener('touchstart', function onFirstTouch() {
// 		hasTouch = true;
// 		document.body.classList.add('has-touch');
// 		window.removeEventListener('touchstart', onFirstTouch, false);
// 	}, false);
// 	Object.defineProperty(
// 		app,
// 		"useNativeScroll",
// 		{
// 			get: function () {
// 				return hasTouch;
// 			}
// 		});
// })();
