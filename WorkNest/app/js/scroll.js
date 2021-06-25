// (function () {
// 	/*
// 		var $log = $('<div style="position:fixed;top:0;left:0;padding:2px;background-color:white">').appendTo(document.body);
// 		var messages = [];
// 		function log(message) {
// 			messages.push(message);
// 			if (messages.length > 6) {
// 				messages.shift();
// 			}
// 			$log.html(messages.join("<br>"));
// 		}
// 		function descr(elem) {
// 			if (!elem) {
// 				return "null";
// 			}
// 			elem = $(elem)[0];
// 			var ret = elem.tagName.toLowerCase();
// 			if (elem.id) {
// 				ret += "#" + elem.id;
// 			}
// 			var c = Array.prototype.join.call(elem.classList, ".");
// 			if (c) {
// 				ret += "." + c;
// 			}
// 			var s = elem.innerText;
// 			ret += " <" + $.trim(s.substr(0, 20)) + "...>";
// 			return ret;
// 		}
//
// 		function logEvent(e, message) {
// 			//log("[" + e.type + " @ " + descr(e.target) + "]" + (message ? ": " + message : ""));
// 		}
//
// 		log("screen size: " + window.innerWidth + "x" + window.innerHeight);
// 	*/
// 	let app  = { isMobile: false, useNativeScroll: false }
// 	var rePixels = /^(\d+)px$/,
// 		rePercent = /^(\d+(\.\d+))?%$/;
//
// 	function getSize(cssProp, parentHeight) {
// 		if (cssProp == null) {
// 			return null;
// 		}
// 		var ar = cssProp.match(rePixels);
// 		if (ar) {
// 			return parseInt(ar[1]);
// 		}
// 		else if ((ar = cssProp.match(rePercent)) != null) {
// 			return parseFloat(ar[1]) * parentHeight / 100;
// 		}
// 		else {
// 			return null;
// 		}
// 	}
//
// 	var touchTarget;
// 	var isTouchDragging;
// 	var callbackId = 1;
//
// 	function init(elem, $scrollContainer, debug) {
// 		if ($scrollContainer.children(".scroll-track").length) {
// 			// Already initialized
// 			updateHandlePos();
// 			return;
// 		}
//
// 		var scrollHeight,
// 			handleTravel = 0,
// 			handlePos = 0,
// 			handleOffset = { left: 0, top: 0 },
// 			isDragging = false,
// 			isUpdating = false,
// 			prevY,
// 			prevTime,
// 			dragSpeed,
// 			$scrollTrack = $('<div class="scroll-track">').appendTo($scrollContainer),
// 			$scrollHandle = $('<div class="scroll-handle">').appendTo($scrollTrack);
//
// 		function calcHandleHeight() {
// 			if (!$scrollTrack) {
// 				// console.log('scrollable: $scrollTrack is null - Not initialized yet?');
// 				return;
// 			}
// 			if (debug) {
// 				console.log("scrollHeight=" + elem.scrollHeight + ",clientHeight=" + elem.clientHeight);
// 			}
// 			scrollHeight = elem.scrollHeight - elem.clientHeight;
// 			if (scrollHeight <= 1) {		// yes, it's sometimes 1 in IE (!)
// 				$scrollTrack.hide();
// 				$(elem).removeClass("drag-events");
// 				return;
// 			}
// 			$scrollTrack.show();
// 			var trackHeight = $scrollTrack.height(),
// 				minHandleHeight = getSize($scrollHandle.css("min-height"), trackHeight) || 15,
// 				handleHeight = Math.max(trackHeight - scrollHeight, minHandleHeight);
// 			$scrollHandle.height(handleHeight);
// 			handleTravel = trackHeight - handleHeight;
// 			$(elem).addClass("drag-events");
// 		}
//
// 		function setHandlePos(pos) {
// 			if (!$scrollHandle) {
// 				// console.log('scrollable: $scrollHandle is null - Not initialized yet?');
// 				return;
// 			}
// 			pos = Math.min(pos, handleTravel);
// 			pos = Math.max(pos, 0);
// 			if (pos !== handlePos) {
// 				$scrollHandle.css("transform", "translateY(" + pos + "px)");
// 				handleOffset = $scrollHandle.offset();
// 				handleOffset.top += pos;
// 				handlePos = pos;
// 			}
// 		}
//
// 		function updateHandlePos() {
// 			if (!isUpdating) {
// 				isUpdating = true;
// 				requestAnimationFrame(function () {
// 					calcHandleHeight();
// 					setHandlePos(elem.scrollTop / scrollHeight * handleTravel);
// 					isUpdating = false;
// 				});
// 			}
// 		}
//
// 		function updateElementPos(delta) {
// 			var prevTop = elem.scrollTop;
// 			var target = prevTop + delta;
// 			target = Math.max(Math.min(target, scrollHeight), 0);
// 			if (target !== prevTop) {
// 				//$(elem).animate({ scrollTop: target });
// 				elem.scrollTop = target;
// 				//updateHandlePos();
// 				return true;
// 			}
// 		}
//
// 		$(elem).on("scroll", updateHandlePos);
//
// 		$(elem).on("wheel", function (e) {
// 			if (scrollHeight === 0) {
// 				return;
// 			}
// 			var ev = e.originalEvent;
// 			// deltaMode=0 - pixels (Chrome)
// 			// deltaMode=1 - lines (Firefox)
// 			var delta = ev.deltaY * ((ev.deltaMode === 1) ? 33 : 1);
// 			updateElementPos(delta);
// 			e.stopPropagation();
// 			e.preventDefault();
// 		});
//
// 		function xpos(e) {
// 			return e.clientX || e.touches[0].pageX;
// 		}
//
// 		function ypos(e) {
// 			return e.clientY || e.touches[0].pageY;
// 		}
//
// 		function startDragging(e) {
// 			prevY = ypos(e);
// 			prevTime = e.timeStamp;
// 			dragSpeed = null;
// 			isDragging = true;
// 			$(document.body).addClass("scroll-dragging");
// 		}
//
// 		function stopDragging() {
// 			isDragging = false;
// 			$(document.body).removeClass("scroll-dragging");
// 		}
//
// 		function decelerate() {
// 			if (!dragSpeed) {
// 				return;
// 			}
// 			prevTime = Date.now();
// 			requestAnimationFrame(function () {
// 				var curTime = Date.now();
// 				var dt = curTime - prevTime;
// 				if (dt === 0 || dt > 1000) {
// 					// filter bogus timestamps on iOS
// 					decelerate();
// 					return;
// 				}
// 				//log("dt = " + dt);
// 				var delta = dragSpeed * dt;
// 				if (Math.abs(delta) < 0.5) {
// 					dragSpeed = null;
// 					return;
// 				}
// 				if (!updateElementPos(-delta)) {
// 					return;
// 				}
// 				dragSpeed *= Math.exp(-dt / 400);
// 				decelerate();
// 			});
// 		}
//
// 		$scrollHandle
// 			.on("mousedown", function (e) {
// 				e.stopPropagation();
// 				startDragging(e);
// 				touchTarget = null;
// 				isHandleDrag = true;
// 			});
//
// 		/*
// 		$scrollTrack
// 			.on("touchstart", function (e) {
// 				touchTarget = elem;
// 				isHandleDrag = true;
// 				startDragging(e);
// 				e.stopPropagation();
// 			});
//
// 		$(elem)
// 			.on("touchstart", function (e) {
// 				if (!$(e.target).closest(".drag-events").is(elem)) {
// 					return;
// 				}
// 				startDragging(e);
// 				touchTarget = elem;
// 				isHandleDrag = false;
// 			});
// 		*/
//
// 		$(document)
// 			.on("mousemove" /* "touchmove" */, function (e) {
// 				alert('ssсв')
// 				if (!isDragging) {
// 					return;
// 				}
// 				if (touchTarget && touchTarget !== elem) {
// 					return;
// 				}
// 				var y = ypos(e);
// 				var delta = y - prevY;
// 				if (isHandleDrag) {
// 					setHandlePos(handlePos + delta);
// 					elem.scrollTop = scrollHeight * (handlePos / handleTravel);
// 				}
// 				else if (!app.useNativeScroll) {
// 					var curTime = e.timeStamp;
// 					var dt = (curTime - prevTime);
// 					if (dt > 0) {
// 						dragSpeed = delta / dt;
// 						updateElementPos(-delta);
// 					}
// 					prevTime = curTime;
// 				}
// 				prevY = y;
// 				//e.preventDefault();
// 			}).on("mouseup" /* "touchend touchcancel"*/, function (e) {
// 			stopDragging();
// 			if (touchTarget !== elem || isHandleDrag || app.useNativeScroll) {
// 				return;
// 			}
// 			decelerate();
// 		});
//
// 		$(elem).on("update", updateHandlePos);
// 		$(window).resize(updateHandlePos);
// 		calcHandleHeight();
// 		if (app.useNativeScroll) {
// 			$(elem).css("overflow", "auto");
// 		}
// 	}
//
// 	$.fn.makeScrollable = function (options) {
// 		this.each(function () {
// 			options = options || {};
// 			var scrollContainer = options.scrollContainer || this.parentElement;
// 			init(this, $(scrollContainer), options.debug);
// 		});
// 		return this;
// 	};
// })();