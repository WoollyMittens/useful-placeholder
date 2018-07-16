/*
Source:
van Creij, Maurice (2018). "positions.js: A library of useful functions to ease working with screen positions.", http://www.woollymittens.nl/.

License:
This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var positions = {

	// find the dimensions of the window
	window: function (parent) {
		// define a position object
		var dimensions = {x: 0, y: 0};
		// if an alternative was given to use as a window
		if (parent && parent !== window && parent !== document) {
			// find the current dimensions of surrogate window
			dimensions.x = parent.offsetWidth;
			dimensions.y = parent.offsetHeight;
		} else {
			// find the current dimensions of the window
			dimensions.x = window.innerWidth || document.body.clientWidth;
			dimensions.y = window.innerHeight || document.body.clientHeight;
		}
		// return the object
		return dimensions;
	},

	// find the scroll position of an element
	document: function (parent) {
		// define a position object
		var position = {x: 0, y: 0};
		// find the current position in the document
		if (parent && parent !== window && parent !== document) {
			position.x = parent.scrollLeft;
			position.y = parent.scrollTop;
		} else {
			position.x = (window.pageXOffset) ?
			window.pageXOffset :
			(document.documentElement) ?
			document.documentElement.scrollLeft :
			document.body.scrollLeft;
			position.y = (window.pageYOffset) ?
			window.pageYOffset :
			(document.documentElement) ?
			document.documentElement.scrollTop :
			document.body.scrollTop;
		}
		// return the object
		return position;
	},

	// finds the position of the element, relative to the document
	object: function (node) {
		// define a position object
		var position = {x: 0, y: 0};
		// if offsetparent exists
		if (node.offsetParent) {
			// add every parent's offset
			while (node.offsetParent) {
				position.x += node.offsetLeft;
				position.y += node.offsetTop;
				node = node.offsetParent;
			}
		}
		// return the object
		return position;
	},

	// find the position of the mouse cursor relative to an element
	cursor: function (evt, parent) {
		// define a position object
		var position = {x: 0, y: 0};
		// find the current position on the document
		if (evt.touches && evt.touches[0]) {
			position.x = evt.touches[0].pageX;
			position.y = evt.touches[0].pageY;
		} else if (evt.pageX !== undefined) {
			position.x = evt.pageX;
			position.y = evt.pageY;
		} else {
			position.x = evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
			position.y = evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
		}
		// if a parent was given
		if (parent) {
			// retrieve the position of the parent
			var offsets = this.object(parent);
			// adjust the coordinates to fit the parent
			position.x -= offsets.x;
			position.y -= offsets.y;
		}
		// return the object
		return position;
	}

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = positions;
}

/*
	Source:
	van Creij, Maurice (2018). "placeholder.js: Input placeholder labels", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var Placeholder.prototype.init = function (config) {

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
if (typeof module !== 'undefined') {
	exports = module.exports = Placeholder;
}

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
		var positions = positions.object(node);
		// position the placeholder for the placeholder
		overlay.style.left = (this.config.offsetX + positions.x) + 'px';
		overlay.style.top = (this.config.offsetY + positions.y) + 'px';
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
