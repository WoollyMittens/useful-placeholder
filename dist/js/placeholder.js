/*
	Source:
	van Creij, Maurice (2018). "placeholder.js: Input placeholder labels", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var Placeholder = function (config) {

		this.only = function (config) {
			// start an instance of the script
			return new this.Main(config, this);
		};

		this.each = function (config) {
			var _config, _context = this, instances = [];
			// for all element
			for (var a = 0, b = config.elements.length; a < b; a += 1) {
				// clone the configuration
				_config = Object.create(config);
				// insert the current element
				_config.element = config.elements[a];
				// start a new instance of the object
				instances[a] = new this.Main(_config, _context);
			}
			// return the instances
			return instances;
		};

		return (config.elements) ? this.each(config) : this.only(config);

};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return Placeholder });
if (typeof module != 'undefined') module.exports = Placeholder;

// extend the class
Placeholder.prototype.Main = function (config, context) {

	// PROPERTIES

	this.config = config;
	this.context = context;
	this.element = config.element;

	// METHODS

	this.init = function () {
		// if this input element has a placeholder
		var attribute = this.element.getAttribute('placeholder');
		if (attribute) {
			// build the placeholder
			this.create(this.element);
		}
		// remove well intended hacks
		if (this.element.value === this.element.getAttribute('placeholder')) {
			this.element.value = '';
		}
	};

	this.create = function (node) {
		// create a placeholder for the placeholder
		var overlay = document.createElement('div');
		overlay.className = 'placeholder';
		overlay.innerHTML = node.getAttribute('placeholder');
		overlay.style.position = 'absolute';
		overlay.style.visibility = 'hidden';
		overlay.style.zIndex = 10;
		document.body.appendChild(overlay);
		// set the event handlers
		var _this = this;
		node.setAttribute('placeholder', '');
		node.addEventListener('focus', function () { _this.hide(node, overlay); }, false);
		node.addEventListener('blur', function () { _this.show(node, overlay); }, false);
		overlay.addEventListener('mousedown', function () { _this.focus(node, overlay); }, false);
		// initial state
		this.show(node, overlay);
	};

	this.reposition = function (node, overlay) {
		var position = positions.object(node);
		// position the placeholder for the placeholder
		overlay.style.left = (this.config.offsetX + position.x) + 'px';
		overlay.style.top = (this.config.offsetY + position.y) + 'px';
		overlay.style.width = (node.offsetWidth - 20) + 'px';
	};

	this.show = function (node, overlay) {
		// reposition the overlay
		this.reposition(node, overlay);
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

	this.focus = function (node, overlay) {
		// hide the placeholder
		this.hide(node, overlay);
		// focus the input element
		setTimeout(function () {
			node.focus();
		}, 100);
	};

	this.init();
};
