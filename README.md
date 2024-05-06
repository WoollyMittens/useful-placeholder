# placeholder.js: Placeholder input label

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

An alternative for the HTML5 input element placeholder attribute.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/placeholder.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="lib/positions.js"></script>
<script src="js/placeholder.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'lib/positions.js',
	'js/placeholder.js'
], function(positions, Placeholder) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {positions = require('lib/positions.js";
@import {Placeholder} from "js/placeholder.js";
```

## How to start the script

```javascript
var placeholders = new Placeholder({
	'elements' : document.querySelectorAll('.placeholder'),
	'offsetX' : 0,
	'offsetY' : 0
});
```

**placeholders : {array}** - Collection of instances of the script.

**offsetX : {integer}** - A fudge value in pixels to help precise horizontal positioning of the placeholder text.

**offsetY : {integer}** - A fudge value in pixels to help precise vertical positioning of the placeholder text.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).
