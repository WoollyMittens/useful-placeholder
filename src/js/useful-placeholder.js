/*
	Source:
	van Creij, Maurice (2012). "useful.placeholder.js: Input placeholder labels", version 20130510, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

(function (useful) {

	// invoke strict mode
	"use strict";

	// private functions
	useful.Placeholder = function (obj, cfg) {
		this.obj = obj;
		this.cfg = cfg;
		this.start = function () {
			var context = this;
			// if this browser doesn't support HTML5 placeholders
			if (!context.cfg.support) {
				// if this input element has a placeholder
				var attribute = context.obj.getAttribute('placeholder');
				if (attribute) {
					// build the placeholder
					context.create(context.obj, context);
				}
			} else {
				// remove well intended hacks
				if (context.obj.value === context.obj.getAttribute('placeholder')) {
					context.obj.value = '';
				}
			}
			// disable the start function so it can't be started twice
			this.start = function () {};
		};
		this.create = function (node, context) {
			// create a placeholder for the placeholder
			var overlay = document.createElement('div');
			overlay.className = 'placeholder';
			overlay.innerHTML = node.getAttribute('placeholder');
			overlay.style.position = 'absolute';
			overlay.style.font = context.cfg.font;
			overlay.style.color = context.cfg.color;
			overlay.style.visibility = 'hidden';
			overlay.style.zIndex = 10;
			document.body.appendChild(overlay);
			// set the event handlers
			node.addEventListener('focus', function () { context.hide(node, overlay, context); }, false);
			node.addEventListener('blur', function () { context.show(node, overlay, context); }, false);
			overlay.addEventListener('mousedown', function () { context.focus(node, overlay, context); }, false);
			// initial state
			context.show(node, overlay, context);
		};
		this.reposition = function (node, overlay, context) {
			var positions = useful.positions.object(node);
			// position the placeholder for the placeholder
			overlay.style.left = (context.cfg.offsetX + positions.x) + 'px';
			overlay.style.top = (context.cfg.offsetY + positions.y) + 'px';
			overlay.style.width = (node.offsetWidth - 20) + 'px';
		};
		this.show = function (node, overlay, context) {
			// reposition the overlay
			context.reposition(node, overlay, context);
			// if the field is empty and visible
			if (node.value === '' && node.offsetWidth !== 0) {
				// show the overlay
				overlay.style.visibility = 'visible';
			} else {
				// hide the overlay
				overlay.style.visibility = 'hidden';
			}
		};
		this.hide = function (node, overlay) {
			// hide the overlay
			overlay.style.visibility = 'hidden';
		};
		this.focus = function (node, overlay, context) {
			// hide the placeholder
			context.hide(node, overlay, context);
			// focus the input element
			setTimeout(function () {
				node.focus();
			}, 100);
		};
		// go
		this.start();
	};

}(window.useful = window.useful || {}));
