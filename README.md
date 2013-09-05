# useful.placeholder.js: Placeholder input label

An alternative for the HTML5 input element placeholder attribute.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=useful-placeholder">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/placeholder.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/placeholder.min.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*. To provide an alternative for *document.querySelectorAll* and CSS3 animations in Internet Explorer 8 and lower, include *jQuery*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<![endif]-->
```

## How to start the script

This is the safest way of starting the script, but allows for only one target element at a time.

```javascript
var placeholder = new useful.Placeholder( document.getElementById('id'), {
	'color' : '#999',
	'support' : navigator.userAgent.match(/webkit|firefox|opera|msie 10/gi),
	'offsetX' : 0,
	'offsetY' : 0
});
placeholder.start();
```

**color : {string}** - A colour in hex format for the placeholder text.

**support : {boolean}** - A test to determine which browsers have native support for the placeholder feature.

**offsetX : {integer}** - A fudge value in pixels to help precise horizontal positioning of the placeholder text.

**offsetY : {integer}** - A fudge value in pixels to help precise vertical positioning of the placeholder text.

### Using document.querySelectorAll

This method allows CSS Rules to be used to apply the script to one or more nodes at the same time.

```javascript
var placeholder = new useful.Instances(
	document.querySelectorAll('input'),
	useful.Placeholder,
	{
		'color' : '#999',
		'support' : navigator.userAgent.match(/webkit|firefox|opera|msie 10/gi),
		'offsetX' : 0,
		'offsetY' : 0
	}
);
placeholder.wait();
```

The "Instances" function clones the settings for each element in the CSS rule.

### Using jQuery

This method is similar to the previous one, but uses jQuery for processing the CSS rule and cloning the settings.

```javascript
var placeholders = [];
$('input').each(function (index, element) {
	placeholders[index] = new useful.Placeholder( element, {
		'color' : '#999',
		'support' : navigator.userAgent.match(/webkit|firefox|opera|msie 10/gi),
		'offsetX' : 0,
		'offsetY' : 0
	});
	placeholders[index].start();
});
```

## Prerequisites

To concatenate and minify the script yourself, the following prerequisites are required:
+ https://github.com/WoollyMittens/useful-positions
+ https://github.com/WoollyMittens/useful-interactions
+ https://github.com/WoollyMittens/useful-polyfills

## License
This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
