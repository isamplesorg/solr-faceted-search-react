(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SolrFacetedSearch = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(_dereq_,module,exports){
(function (global){(function (){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(_dereq_,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  if (!fn) {
    return false
  }
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],4:[function(_dereq_,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],5:[function(_dereq_,module,exports){
var trim = function(string) {
  return string.replace(/^\s+|\s+$/g, '');
}
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  var headersArr = trim(headers).split('\n')

  for (var i = 0; i < headersArr.length; i++) {
    var row = headersArr[i]
    var index = row.indexOf(':')
    , key = trim(row.slice(0, index)).toLowerCase()
    , value = trim(row.slice(index + 1))

    if (typeof(result[key]) === 'undefined') {
      result[key] = value
    } else if (isArray(result[key])) {
      result[key].push(value)
    } else {
      result[key] = [ result[key], value ]
    }
  }

  return result
}

},{}],6:[function(_dereq_,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],7:[function(_dereq_,module,exports){
(function (process){(function (){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = _dereq_('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
  var has = _dereq_('./lib/has');

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;

}).call(this)}).call(this,_dereq_('_process'))
},{"./lib/ReactPropTypesSecret":11,"./lib/has":12,"_process":6}],8:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = _dereq_('./lib/ReactPropTypesSecret');

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":11}],9:[function(_dereq_,module,exports){
(function (process){(function (){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactIs = _dereq_('react-is');
var assign = _dereq_('object-assign');

var ReactPropTypesSecret = _dereq_('./lib/ReactPropTypesSecret');
var has = _dereq_('./lib/has');
var checkPropTypes = _dereq_('./checkPropTypes');

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this)}).call(this,_dereq_('_process'))
},{"./checkPropTypes":7,"./lib/ReactPropTypesSecret":11,"./lib/has":12,"_process":6,"object-assign":4,"react-is":15}],10:[function(_dereq_,module,exports){
(function (process){(function (){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = _dereq_('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = _dereq_('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = _dereq_('./factoryWithThrowingShims')();
}

}).call(this)}).call(this,_dereq_('_process'))
},{"./factoryWithThrowingShims":8,"./factoryWithTypeCheckers":9,"_process":6,"react-is":15}],11:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],12:[function(_dereq_,module,exports){
module.exports = Function.call.bind(Object.prototype.hasOwnProperty);

},{}],13:[function(_dereq_,module,exports){
(function (process){(function (){
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}

}).call(this)}).call(this,_dereq_('_process'))
},{"_process":6}],14:[function(_dereq_,module,exports){
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;

},{}],15:[function(_dereq_,module,exports){
(function (process){(function (){
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = _dereq_('./cjs/react-is.production.min.js');
} else {
  module.exports = _dereq_('./cjs/react-is.development.js');
}

}).call(this)}).call(this,_dereq_('_process'))
},{"./cjs/react-is.development.js":13,"./cjs/react-is.production.min.js":14,"_process":6}],16:[function(_dereq_,module,exports){
"use strict";
var window = _dereq_("global/window")
var isFunction = _dereq_("is-function")
var parseHeaders = _dereq_("parse-headers")
var xtend = _dereq_("xtend")

module.exports = createXHR
// Allow use of default import syntax in TypeScript
module.exports.default = createXHR;
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    // xhr.responseXML will throw Exception "InvalidStateError" or "DOMException"
    // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML.
    try {
        if (xhr.responseType === "document") {
            return xhr.responseXML
        }
        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
            return xhr.responseXML
        }
    } catch (e) {}

    return null
}

function noop() {}

},{"global/window":2,"is-function":3,"parse-headers":5,"xtend":17}],17:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],18:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xhr = _interopRequireDefault(_dereq_("xhr"));

var _solrQuery = _interopRequireWildcard(_dereq_("./solr-query"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MAX_INT = 2147483647;
var server = {}; // Determine the necessary options for the XHR request based on settings.

var getXHROptions = function getXHROptions(query, queryString) {
  // When using the proxy to query solr, make a GET request
  // and append the query in the QS.
  var options = {
    url: "".concat(query.url, "?").concat(queryString),
    method: "GET"
  }; // When querying solr directly, make a POST request
  // with the query as form data.

  if (query.proxyIsDisabled) {
    options = {
      url: query.url,
      data: queryString,
      method: "POST",
      headers: _objectSpread({
        "Content-type": "application/x-www-form-urlencoded"
      }, query.userpass ? {
        "Authorization": "Basic " + query.userpass
      } : {})
    };
  }

  return options;
};

server.performXhr = function (options, accept) {
  var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    console.warn("Undefined reject callback! ");
    (console.trace || function () {})();
  };
  (0, _xhr["default"])(options, accept, reject);
};

server.submitQuery = function (query, callback) {
  callback({
    type: "SET_RESULTS_PENDING"
  });
  var queryString = (0, _solrQuery["default"])(query);
  var options = getXHROptions(query, queryString);
  server.performXhr(options, function (err, resp) {
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      callback({
        type: "SET_RESULTS",
        data: JSON.parse(resp.body)
      });
    } else {
      console.log("Server error: ", resp.statusCode);
    }
  });
};

server.submitSuggestQuery = function (suggestQuery, callback) {
  callback({
    type: "SET_SUGGESTIONS_PENDING"
  });
  var queryString = (0, _solrQuery.solrSuggestQuery)(suggestQuery);
  var options = getXHROptions(suggestQuery, queryString);
  server.performXhr(options, function (err, resp) {
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      callback({
        type: "SET_SUGGESTIONS",
        data: JSON.parse(resp.body)
      });
    } else {
      console.log("Server error: ", resp.statusCode);
    }
  });
};

server.fetchCsv = function (query, callback) {
  server.performXhr({
    url: query.url,
    data: (0, _solrQuery["default"])(_objectSpread(_objectSpread({}, query), {}, {
      rows: MAX_INT
    }), {
      wt: "csv",
      "csv.mv.separator": "|",
      "csv.separator": ";"
    }),
    method: "POST",
    headers: _objectSpread({
      "Content-type": "application/x-www-form-urlencoded"
    }, query.userpass ? {
      "Authorization": "Basic " + query.userpass
    } : {})
  }, function (err, resp) {
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      callback(resp.body);
    } else {
      console.log("Server error: ", resp.statusCode);
    }
  });
};

var _default = server;
exports["default"] = _default;

},{"./solr-query":20,"xhr":16}],19:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SolrClient = void 0;

var _query = _interopRequireDefault(_dereq_("../reducers/query"));

var _results = _interopRequireDefault(_dereq_("../reducers/results"));

var _suggestions = _interopRequireDefault(_dereq_("../reducers/suggestions"));

var _suggestQuery = _interopRequireDefault(_dereq_("../reducers/suggestQuery"));

var _server = _interopRequireDefault(_dereq_("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SolrClient = /*#__PURE__*/function () {
  function SolrClient(settings) {
    _classCallCheck(this, SolrClient);

    var onChange = settings.onChange;
    this.onChange = onChange;
    delete settings.onChange;
    this.state = {
      query: settings,
      results: {
        facets: [],
        docs: [],
        highlighting: [],
        numFound: 0
      }
    };
    this.settings = _objectSpread({}, settings);

    if (!this.state.query.pageStrategy) {
      this.state.query.pageStrategy = "paginate";
    }

    if (!this.state.query.rows) {
      this.state.query.rows = 20;
    }

    if (this.state.query.pageStrategy === "cursor" && !this.state.query.idField) {
      throw new Error("Pagination strategy 'cursor' requires a unique 'idField' to be passed.");
    }
  }

  _createClass(SolrClient, [{
    key: "setInitialQuery",
    value: function setInitialQuery(queryToMerge) {
      var searchFieldsToMerge = queryToMerge.searchFields || [];
      var sortFieldsToMerge = queryToMerge.sortFields || [];
      this.state.query.searchFields = this.state.query.searchFields.map(function (sf) {
        return searchFieldsToMerge.map(function (sfm) {
          return sfm.field;
        }).indexOf(sf.field) > -1 ? _objectSpread(_objectSpread({}, sf), {}, {
          value: searchFieldsToMerge.find(function (sfm) {
            return sfm.field === sf.field;
          }).value
        }) : sf;
      });
      this.state.query.sortFields = this.state.query.sortFields.map(function (sf) {
        return sortFieldsToMerge.map(function (sfm) {
          return sfm.field;
        }).indexOf(sf.field) > -1 ? _objectSpread(_objectSpread({}, sf), {}, {
          value: sortFieldsToMerge.find(function (sfm) {
            return sfm.field === sf.field;
          }).value
        }) : sf;
      });
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var query = this.state.query;
      var pageStrategy = query.pageStrategy;

      var payload = _objectSpread(_objectSpread({
        type: "SET_QUERY_FIELDS"
      }, query), {}, {
        start: pageStrategy === "paginate" ? 0 : null
      });

      this.sendQuery((0, _query["default"])(this.state.query, payload));
      return this;
    }
  }, {
    key: "resetSearchFields",
    value: function resetSearchFields() {
      var query = this.state.query;
      var pageStrategy = query.pageStrategy;

      var payload = _objectSpread(_objectSpread({
        type: "SET_QUERY_FIELDS"
      }, this.settings), {}, {
        start: pageStrategy === "paginate" ? 0 : null
      });

      this.sendQuery((0, _query["default"])(this.state.query, payload));
    }
  }, {
    key: "sendQuery",
    value: function sendQuery() {
      var _this = this;

      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.query;
      delete query.cursorMark;
      this.state.query = query;

      _server["default"].submitQuery(query, function (action) {
        _this.state.results = (0, _results["default"])(_this.state.results, action);
        _this.state.query = (0, _query["default"])(_this.state.query, action);

        _this.onChange(_this.state, _this.getHandlers());
      });
    }
  }, {
    key: "setSuggestQuery",
    value: function setSuggestQuery(query, autocomplete, value) {
      var searchFields = query.searchFields; // Add the current text field value to the searchFields array.

      var newFields = searchFields.map(function (searchField) {
        return searchField.field === query.mainQueryField ? _objectSpread(_objectSpread({}, searchField), {}, {
          value: value
        }) : searchField;
      });
      var payload = {
        type: "SET_SUGGEST_QUERY",
        suggestQuery: {
          isD7: query.isD7,
          searchFields: newFields,
          sortFields: query.sortFields,
          filters: query.filters,
          userpass: autocomplete.userpass || "",
          mainQueryField: query.mainQueryField,
          start: 0,
          proxyIsDisabled: autocomplete.proxyIsDisabled,
          url: autocomplete.url,
          mode: autocomplete.mode,
          rows: autocomplete.suggestionRows || 5,
          appendWildcard: autocomplete.appendWildcard || false,
          value: value
        }
      };
      this.sendSuggestQuery((0, _suggestQuery["default"])(this.state.suggestQuery, payload));
    }
  }, {
    key: "sendSuggestQuery",
    value: function sendSuggestQuery() {
      var _this2 = this;

      var suggestQuery = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.suggestQuery;
      this.state.suggestQuery = suggestQuery;

      _server["default"].submitSuggestQuery(suggestQuery, function (action) {
        _this2.state.suggestions = (0, _suggestions["default"])(_this2.state.suggestions, action);
        _this2.state.suggestQuery = (0, _suggestQuery["default"])(_this2.state.suggestQuery, action);

        _this2.onChange(_this2.state, _this2.getHandlers());
      });
    }
  }, {
    key: "sendNextCursorQuery",
    value: function sendNextCursorQuery() {
      var _this3 = this;

      _server["default"].submitQuery(this.state.query, function (action) {
        _this3.state.results = (0, _results["default"])(_this3.state.results, _objectSpread(_objectSpread({}, action), {}, {
          type: action.type === "SET_RESULTS" ? "SET_NEXT_RESULTS" : action.type
        }));
        _this3.state.query = (0, _query["default"])(_this3.state.query, action);

        _this3.onChange(_this3.state, _this3.getHandlers());
      });
    }
  }, {
    key: "fetchCsv",
    value: function fetchCsv() {
      _server["default"].fetchCsv(this.state.query, function (data) {
        var element = document.createElement("a");
        element.setAttribute("href", "data:application/csv;charset=utf-8," + encodeURIComponent(data));
        element.setAttribute("download", "export.csv");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      });
    }
  }, {
    key: "setCurrentPage",
    value: function setCurrentPage(page) {
      var query = this.state.query;
      var rows = query.rows;
      var payload = {
        type: "SET_START",
        newStart: page * rows
      };
      this.sendQuery((0, _query["default"])(this.state.query, payload));
    }
  }, {
    key: "setGroup",
    value: function setGroup(group) {
      var payload = {
        type: "SET_GROUP",
        group: group
      };
      this.sendQuery((0, _query["default"])(this.state.query, payload));
    }
  }, {
    key: "setSearchFieldValue",
    value: function setSearchFieldValue(field, value) {
      var query = this.state.query;
      var searchFields = query.searchFields;
      var newFields = searchFields.map(function (searchField) {
        return searchField.field === field ? _objectSpread(_objectSpread({}, searchField), {}, {
          value: value
        }) : searchField;
      });
      var payload = {
        type: "SET_SEARCH_FIELDS",
        newFields: newFields
      };
      this.sendQuery((0, _query["default"])(this.state.query, payload)); // Enable the the autosuggest input to be cleared cleared
      // but only if autocomplete has been configured.

      if (Object.hasOwnProperty.call(this.state, "suggestQuery")) {
        this.state.suggestQuery = (0, _suggestQuery["default"])(this.state.suggestQuery, payload);
      }
    }
  }, {
    key: "setFacetSort",
    value: function setFacetSort(field, value) {
      var query = this.state.query;
      var searchFields = query.searchFields;
      var newFields = searchFields.map(function (searchField) {
        return searchField.field === field ? _objectSpread(_objectSpread({}, searchField), {}, {
          facetSort: value
        }) : searchField;
      });
      var payload = {
        type: "SET_SEARCH_FIELDS",
        newFields: newFields
      };
      this.sendQuery((0, _query["default"])(this.state.query, payload));
    }
  }, {
    key: "setSortFieldValue",
    value: function setSortFieldValue(field, value) {
      var query = this.state.query;
      var sortFields = query.sortFields;
      var newSortFields = sortFields.map(function (sortField) {
        return sortField.field === field ? _objectSpread(_objectSpread({}, sortField), {}, {
          value: value
        }) : _objectSpread(_objectSpread({}, sortField), {}, {
          value: null
        });
      });
      var payload = {
        type: "SET_SORT_FIELDS",
        newSortFields: newSortFields
      };
      this.sendQuery((0, _query["default"])(this.state.query, payload));
    }
  }, {
    key: "setFilters",
    value: function setFilters(filters) {
      var payload = {
        type: "SET_FILTERS",
        newFilters: filters
      };
      this.sendQuery((0, _query["default"])(this.state.query, payload));
    }
  }, {
    key: "setCollapse",
    value: function setCollapse(field, value) {
      var query = this.state.query;
      var searchFields = query.searchFields;
      var newFields = searchFields.map(function (searchField) {
        return searchField.field === field ? _objectSpread(_objectSpread({}, searchField), {}, {
          collapse: value
        }) : searchField;
      });
      var payload = {
        type: "SET_SEARCH_FIELDS",
        newFields: newFields
      };
      this.state.query = (0, _query["default"])(this.state.query, payload);
      this.onChange(this.state, this.getHandlers());
    }
  }, {
    key: "getHandlers",
    value: function getHandlers() {
      return {
        onTextInputChange: this.setSuggestQuery.bind(this),
        onSortFieldChange: this.setSortFieldValue.bind(this),
        onSearchFieldChange: this.setSearchFieldValue.bind(this),
        onFacetSortChange: this.setFacetSort.bind(this),
        onPageChange: this.setCurrentPage.bind(this),
        onNextCursorQuery: this.sendNextCursorQuery.bind(this),
        onSetCollapse: this.setCollapse.bind(this),
        onNewSearch: this.resetSearchFields.bind(this),
        onCsvExport: this.fetchCsv.bind(this),
        onGroupChange: this.setGroup.bind(this)
      };
    }
  }]);

  return SolrClient;
}();

exports.SolrClient = SolrClient;

},{"../reducers/query":43,"../reducers/results":44,"../reducers/suggestQuery":45,"../reducers/suggestions":46,"./server":18}],20:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textFieldToQueryFilter = exports.solrSuggestQuery = exports.solrQuery = exports.rangeFacetToQueryFilter = exports.periodRangeFacetToQueryFilter = exports.listFacetFieldToQueryFilter = exports.fieldToQueryFilter = exports.facetSorts = exports.facetFields = exports["default"] = exports.buildSuggestQuery = exports.buildSort = exports.buildQuery = exports.buildMainQuery = exports.buildHighlight = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var rangeFacetToQueryFilter = function rangeFacetToQueryFilter(field) {
  var filters = field.value || [];

  if (filters.length < 2) {
    return null;
  }

  return encodeURIComponent("".concat(field.field, ":[").concat(filters[0], " TO ").concat(filters[1], "]"));
};

exports.rangeFacetToQueryFilter = rangeFacetToQueryFilter;

var periodRangeFacetToQueryFilter = function periodRangeFacetToQueryFilter(field) {
  var filters = field.value || [];

  if (filters.length < 2) {
    return null;
  }

  return encodeURIComponent("".concat(field.lowerBound, ":[").concat(filters[0], " TO ").concat(filters[1], "] OR ") + "".concat(field.upperBound, ":[").concat(filters[0], " TO ").concat(filters[1], "] OR ") + "(".concat(field.lowerBound, ":[* TO ").concat(filters[0], "] AND ").concat(field.upperBound, ":[").concat(filters[1], " TO *])"));
};

exports.periodRangeFacetToQueryFilter = periodRangeFacetToQueryFilter;

var listFacetFieldToQueryFilter = function listFacetFieldToQueryFilter(field) {
  var filters = field.value || [];

  if (filters.length === 0) {
    return null;
  }

  var filterQ = filters.map(function (f) {
    return "\"".concat(f, "\"");
  }).join(" OR ");
  return encodeURIComponent("".concat(field.field, ":(").concat(filterQ, ")"));
};

exports.listFacetFieldToQueryFilter = listFacetFieldToQueryFilter;

var textFieldToQueryFilter = function textFieldToQueryFilter(field) {
  if (!field.value || field.value.length === 0) {
    return null;
  }

  return encodeURIComponent(field.field === "*" ? field.value : "".concat(field.field, ":").concat(field.value));
};

exports.textFieldToQueryFilter = textFieldToQueryFilter;

var fieldToQueryFilter = function fieldToQueryFilter(field) {
  if (field.type === "text") {
    return textFieldToQueryFilter(field);
  } else if (field.type === "list-facet") {
    return listFacetFieldToQueryFilter(field);
  } else if (field.type === "range-facet" || field.type === "range") {
    return rangeFacetToQueryFilter(field);
  } else if (field.type === "period-range-facet" || field.type === "period-range") {
    return periodRangeFacetToQueryFilter(field);
  }

  return null;
};

exports.fieldToQueryFilter = fieldToQueryFilter;

var buildQuery = function buildQuery(fields, mainQueryField) {
  return fields // Do not include main query field in filter field query param.
  .filter(function (searchField) {
    return !Object.hasOwnProperty.call(searchField, "field") || Object.hasOwnProperty.call(searchField, "field") && searchField.field !== mainQueryField;
  }).map(fieldToQueryFilter).filter(function (queryFilter) {
    return queryFilter !== null;
  }).map(function (queryFilter) {
    return "fq=".concat(queryFilter);
  }).join("&");
};

exports.buildQuery = buildQuery;

var facetFields = function facetFields(fields) {
  return fields.filter(function (field) {
    return field.type === "list-facet" || field.type === "range-facet";
  }).map(function (field) {
    return "facet.field=".concat(encodeURIComponent(field.field));
  }).concat(fields.filter(function (field) {
    return field.type === "period-range-facet";
  }).map(function (field) {
    return "facet.field=".concat(encodeURIComponent(field.lowerBound), "&facet.field=").concat(encodeURIComponent(field.upperBound));
  })).join("&");
};

exports.facetFields = facetFields;

var facetSorts = function facetSorts(fields) {
  return fields.filter(function (field) {
    return field.facetSort;
  }).map(function (field) {
    return "f.".concat(encodeURIComponent(field.field), ".facet.sort=").concat(field.facetSort);
  }).join("&");
};

exports.facetSorts = facetSorts;

var buildSort = function buildSort(sortFields) {
  return sortFields.filter(function (sortField) {
    return sortField.value;
  }).map(function (sortField) {
    return encodeURIComponent("".concat(sortField.field, " ").concat(sortField.value));
  }).join(",");
};

exports.buildSort = buildSort;

var buildFormat = function buildFormat(format) {
  return Object.keys(format).map(function (key) {
    return "".concat(key, "=").concat(encodeURIComponent(format[key]));
  }).join("&");
};

var buildMainQuery = function buildMainQuery(fields, mainQueryField, isD7, proxyIsDisabled) {
  // Use "search" as the main param for D7 proxy implementations.
  var mainParam = isD7 && !proxyIsDisabled ? "search" : "q";
  var params = fields.filter(function (searchField) {
    return searchField.field === mainQueryField;
  }).map(function (searchField) {
    return searchField.value;
  }); // Add value of the mainQueryField to the q param, if there is one.

  if (params[0]) {
    return "".concat(mainParam, "=").concat(params[0]);
  } // If query field exists but is null/empty/undefined send the wildcard query.


  return "".concat(mainParam, "=*:*");
};

exports.buildMainQuery = buildMainQuery;

var buildHighlight = function buildHighlight(highlight) {
  var hlQs = ""; // If highlight is set, then populate params from keys/values.

  if (highlight !== null && _typeof(highlight) === "object") {
    var hlParams = "hl=on";

    for (var _i = 0, _Object$keys = Object.keys(highlight); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];

      // Support nested objects like hl.simple.tags
      if (_typeof(highlight[key]) === "object") {
        for (var _i2 = 0, _Object$keys2 = Object.keys(highlight[key]); _i2 < _Object$keys2.length; _i2++) {
          var nestedKey = _Object$keys2[_i2];
          hlParams += "&hl.".concat(key, ".").concat(nestedKey, "=").concat(encodeURIComponent(highlight[key][nestedKey]));
        }
      } // Support flat key/values like hl.fl=my_field_name
      else {
        hlParams += "&hl.".concat(key, "=").concat(encodeURIComponent(highlight[key]));
      }
    }

    hlQs = hlParams;
  }

  return hlQs;
};

exports.buildHighlight = buildHighlight;

var solrQuery = function solrQuery(query) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    wt: "json"
  };
  var searchFields = query.searchFields,
      sortFields = query.sortFields,
      rows = query.rows,
      start = query.start,
      facetLimit = query.facetLimit,
      facetSort = query.facetSort,
      pageStrategy = query.pageStrategy,
      cursorMark = query.cursorMark,
      idField = query.idField,
      group = query.group,
      hl = query.hl,
      isD7 = query.isD7,
      proxyIsDisabled = query.proxyIsDisabled;
  var mainQueryField = Object.hasOwnProperty.call(query, "mainQueryField") ? query.mainQueryField : null;
  var filters = (query.filters || []).map(function (filter) {
    return _objectSpread(_objectSpread({}, filter), {}, {
      type: filter.type || "text"
    });
  });
  var mainQuery = buildMainQuery(searchFields.concat(filters), mainQueryField, isD7, proxyIsDisabled);
  var queryParams = buildQuery(searchFields.concat(filters), mainQueryField);
  var facetFieldParam = facetFields(searchFields);
  var facetSortParams = facetSorts(searchFields);
  var facetLimitParam = "facet.limit=".concat(facetLimit || -1);
  var facetSortParam = "facet.sort=".concat(facetSort || "index");
  var cursorMarkParam = pageStrategy === "cursor" ? "cursorMark=".concat(encodeURIComponent(cursorMark || "*")) : "";
  var idSort = pageStrategy === "cursor" ? [{
    field: idField,
    value: "asc"
  }] : [];
  var sortParam = buildSort(sortFields.concat(idSort));
  var groupParam = group && group.field ? "group=on&group.field=".concat(encodeURIComponent(group.field)) : "";
  var highlightParam = buildHighlight(hl);
  return mainQuery + "".concat(queryParams.length > 0 ? "&".concat(queryParams) : "") + "".concat(sortParam.length > 0 ? "&sort=".concat(sortParam) : "") + "".concat(facetFieldParam.length > 0 ? "&".concat(facetFieldParam) : "") + "".concat(facetSortParams.length > 0 ? "&".concat(facetSortParams) : "") + "".concat(groupParam.length > 0 ? "&".concat(groupParam) : "") + "&rows=".concat(rows) + "&".concat(facetLimitParam) + "&".concat(facetSortParam) + "&".concat(cursorMarkParam) + (start === null ? "" : "&start=".concat(start)) + "&facet=on" + (highlightParam === "" ? "" : "&".concat(highlightParam)) + "&".concat(buildFormat(format));
};

exports.solrQuery = solrQuery;
var _default = solrQuery;
exports["default"] = _default;

var buildSuggestQuery = function buildSuggestQuery(fields, mainQueryField, appendWildcard, isProxyDisabled, isD7) {
  // Use "search" as the main param for D7 proxy implementations.
  var qs = isD7 && !isProxyDisabled ? "search=" : "q=";
  var params = fields.filter(function (searchField) {
    return searchField.field === mainQueryField;
  }).map(function (searchField) {
    // Remove spaces on either end of the value.
    var trimmed = searchField.value.trim(); // One method of supporting search-as-you-type is to append a wildcard '*'
    //   to match zero or more additional characters at the end of the users search term.
    // @see: https://lucene.apache.org/solr/guide/6_6/the-standard-query-parser.html#TheStandardQueryParser-WildcardSearches
    // @see: https://opensourceconnections.com/blog/2013/06/07/search-as-you-type-with-solr/

    if (appendWildcard && trimmed.length > 0) {
      if (isProxyDisabled) {
        // Split into word chunks.
        var words = trimmed.split(" "); // If there are multiple chunks, join them with "+", repeat the last word + append "*".

        if (words.length > 1) {
          return "".concat(words.join("+"), "+").concat(words.pop(), "*");
        } // If there is only 1 word, repeat it an append "*".


        return "".concat(words, "+").concat(words, "*");
      } else {
        return "".concat(trimmed, "*");
      }
    } // If we are not supposed to append a wildcard, just return the value.
    // ngram tokens/filters should be set up in solr config for
    // the autocomplete endpoint request handler.


    return trimmed;
  });

  if (params[0]) {
    qs += params[0];
  }

  return qs;
};

exports.buildSuggestQuery = buildSuggestQuery;

var solrSuggestQuery = function solrSuggestQuery(suggestQuery) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    wt: "json"
  };
  var rows = suggestQuery.rows,
      searchFields = suggestQuery.searchFields,
      filters = suggestQuery.filters,
      appendWildcard = suggestQuery.appendWildcard,
      proxyIsDisabled = suggestQuery.proxyIsDisabled,
      isD7 = suggestQuery.isD7;
  var mainQueryField = Object.hasOwnProperty.call(suggestQuery, "mainQueryField") ? suggestQuery.mainQueryField : null;
  var queryFilters = (filters || []).map(function (filter) {
    return _objectSpread(_objectSpread({}, filter), {}, {
      type: filter.type || "text"
    });
  });
  var mainQuery = buildSuggestQuery(searchFields.concat(queryFilters), mainQueryField, appendWildcard, proxyIsDisabled, isD7);
  var queryParams = buildQuery(searchFields.concat(queryFilters), mainQueryField);
  var facetFieldParam = facetFields(searchFields);
  return mainQuery + "".concat(queryParams.length > 0 ? "&".concat(queryParams) : "") + "".concat(facetFieldParam.length > 0 ? "&".concat(facetFieldParam) : "") + "&rows=".concat(rows) + "&".concat(buildFormat(format));
};

exports.solrSuggestQuery = solrSuggestQuery;

},{}],21:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _result = _interopRequireDefault(_dereq_("./results/result"));

var _textSearch = _interopRequireDefault(_dereq_("./text-search"));

var _listFacet = _interopRequireDefault(_dereq_("./list-facet"));

var _header = _interopRequireDefault(_dereq_("./results/header"));

var _list = _interopRequireDefault(_dereq_("./results/list"));

var _pending = _interopRequireDefault(_dereq_("./results/pending"));

var _container = _interopRequireDefault(_dereq_("./results/container"));

var _pagination = _interopRequireDefault(_dereq_("./results/pagination"));

var _preloadIndicator = _interopRequireDefault(_dereq_("./results/preload-indicator"));

var _csvExport = _interopRequireDefault(_dereq_("./results/csv-export"));

var _searchFieldContainer = _interopRequireDefault(_dereq_("./search-field-container"));

var _rangeFacet = _interopRequireDefault(_dereq_("./range-facet"));

var _countLabel = _interopRequireDefault(_dereq_("./results/count-label"));

var _sortMenu = _interopRequireDefault(_dereq_("./sort-menu"));

var _currentQuery = _interopRequireDefault(_dereq_("./current-query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  searchFields: {
    text: _textSearch["default"],
    "list-facet": _listFacet["default"],
    "range-facet": _rangeFacet["default"],
    "period-range-facet": _rangeFacet["default"],
    container: _searchFieldContainer["default"],
    currentQuery: _currentQuery["default"]
  },
  results: {
    result: _result["default"],
    resultCount: _countLabel["default"],
    header: _header["default"],
    list: _list["default"],
    container: _container["default"],
    pending: _pending["default"],
    preloadIndicator: _preloadIndicator["default"],
    csvExport: _csvExport["default"],
    paginate: _pagination["default"]
  },
  sortFields: {
    menu: _sortMenu["default"]
  }
};
exports["default"] = _default;

},{"./current-query":22,"./list-facet":26,"./range-facet":27,"./results/container":29,"./results/count-label":30,"./results/csv-export":31,"./results/header":32,"./results/list":33,"./results/pagination":34,"./results/pending":35,"./results/preload-indicator":36,"./results/result":37,"./search-field-container":38,"./sort-menu":40,"./text-search":41}],22:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CurrentQuery = /*#__PURE__*/function (_React$Component) {
  _inherits(CurrentQuery, _React$Component);

  var _super = _createSuper(CurrentQuery);

  function CurrentQuery() {
    _classCallCheck(this, CurrentQuery);

    return _super.apply(this, arguments);
  }

  _createClass(CurrentQuery, [{
    key: "removeListFacetValue",
    value: function removeListFacetValue(field, values, value) {
      var foundIdx = values.indexOf(value);

      if (foundIdx > -1) {
        this.props.onChange(field, values.filter(function (v, i) {
          return i !== foundIdx;
        }));
      }
    }
  }, {
    key: "removeRangeFacetValue",
    value: function removeRangeFacetValue(field) {
      this.props.onChange(field, []);
    }
  }, {
    key: "removeTextValue",
    value: function removeTextValue(field) {
      this.props.onChange(field, "");
    }
  }, {
    key: "renderFieldValues",
    value: function renderFieldValues(searchField) {
      var _this = this;

      var bootstrapCss = this.props.bootstrapCss;

      switch (searchField.type) {
        case "list-facet":
          return searchField.value.map(function (val, i) {
            return /*#__PURE__*/_react["default"].createElement("span", {
              className: (0, _classnames["default"])({
                "label": bootstrapCss,
                "label-default": bootstrapCss
              }),
              key: i,
              onClick: function onClick() {
                return _this.removeListFacetValue(searchField.field, searchField.value, val);
              }
            }, val, /*#__PURE__*/_react["default"].createElement("a", null, bootstrapCss ? /*#__PURE__*/_react["default"].createElement("span", {
              className: "glyphicon glyphicon-remove-sign"
            }) : "❌"));
          });

        case "range-facet":
          return /*#__PURE__*/_react["default"].createElement("span", {
            className: (0, _classnames["default"])({
              "label": bootstrapCss,
              "label-default": bootstrapCss
            }),
            onClick: function onClick() {
              return _this.removeRangeFacetValue(searchField.field);
            }
          }, searchField.value[0], " - ", searchField.value[1], /*#__PURE__*/_react["default"].createElement("a", null, bootstrapCss ? /*#__PURE__*/_react["default"].createElement("span", {
            className: "glyphicon glyphicon-remove-sign"
          }) : "❌"));

        case "text":
          return /*#__PURE__*/_react["default"].createElement("span", {
            className: (0, _classnames["default"])({
              "label": bootstrapCss,
              "label-default": bootstrapCss
            }),
            onClick: function onClick() {
              return _this.removeTextValue(searchField.field);
            }
          }, searchField.value, /*#__PURE__*/_react["default"].createElement("a", null, bootstrapCss ? /*#__PURE__*/_react["default"].createElement("span", {
            className: "glyphicon glyphicon-remove-sign"
          }) : "❌"));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          bootstrapCss = _this$props.bootstrapCss,
          query = _this$props.query;
      var splitFields = query.searchFields.filter(function (searchField) {
        return searchField.value && searchField.value.length > 0;
      }).map(function (searchField, i) {
        return i % 2 === 0 ? {
          type: "odds",
          searchField: searchField
        } : {
          type: "evens",
          searchField: searchField
        };
      });
      var odds = splitFields.filter(function (sf) {
        return sf.type === "evens";
      }).map(function (sf) {
        return sf.searchField;
      });
      var evens = splitFields.filter(function (sf) {
        return sf.type === "odds";
      }).map(function (sf) {
        return sf.searchField;
      });

      if (odds.length === 0 && evens.length === 0) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])("current-query", {
          "panel-body": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "row": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _classnames["default"])({
          "col-md-6": bootstrapCss
        })
      }, evens.map(function (searchField, i) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: (0, _classnames["default"])({
            "list-group-item": bootstrapCss
          }),
          key: i
        }, /*#__PURE__*/_react["default"].createElement("label", null, searchField.label), _this2.renderFieldValues(searchField));
      })), /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _classnames["default"])({
          "col-md-6": bootstrapCss
        })
      }, odds.map(function (searchField, i) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: (0, _classnames["default"])({
            "list-group-item": bootstrapCss
          }),
          key: i
        }, /*#__PURE__*/_react["default"].createElement("label", null, searchField.label), _this2.renderFieldValues(searchField));
      }))));
    }
  }]);

  return CurrentQuery;
}(_react["default"].Component);

CurrentQuery.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  query: _propTypes["default"].object
};
var _default = CurrentQuery;
exports["default"] = _default;

},{"classnames":1,"prop-types":10,"react":"react"}],23:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CheckedIcon = /*#__PURE__*/function (_React$Component) {
  _inherits(CheckedIcon, _React$Component);

  var _super = _createSuper(CheckedIcon);

  function CheckedIcon() {
    _classCallCheck(this, CheckedIcon);

    return _super.apply(this, arguments);
  }

  _createClass(CheckedIcon, [{
    key: "render",
    value: function render() {
      var title = this.props.title != null ? /*#__PURE__*/_react["default"].createElement("title", null, this.props.title) : null;
      return /*#__PURE__*/_react["default"].createElement("svg", {
        className: "checkbox-icon checked",
        viewBox: "0 0 489 402",
        width: "10"
      }, title, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M 377.87,24.128 C 361.786,8.044 342.417,0.002 319.769,0.002 H 82.227 C 59.579,0.002 40.211,8.044 24.125,24.128 8.044,40.214 0.002,59.578 0.002,82.23 v 237.543 c 0,22.647 8.042,42.014 24.123,58.101 16.086,16.085 35.454,24.127 58.102,24.127 h 237.542 c 22.648,0 42.011,-8.042 58.102,-24.127 16.085,-16.087 24.126,-35.453 24.126,-58.101 V 82.23 C 401.993,59.582 393.951,40.214 377.87,24.128 z m -12.422,295.645 c 0,12.559 -4.47,23.314 -13.415,32.264 -8.945,8.945 -19.698,13.411 -32.265,13.411 H 82.227 c -12.563,0 -23.317,-4.466 -32.264,-13.411 -8.945,-8.949 -13.418,-19.705 -13.418,-32.264 V 82.23 c 0,-12.562 4.473,-23.316 13.418,-32.264 C 58.91,41.02 69.664,36.548 82.227,36.548 h 237.542 c 12.566,0 23.319,4.473 32.265,13.418 8.945,8.947 13.415,19.701 13.415,32.264 v 237.543 l -0.001,0 z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M 480.59183,75.709029 442.06274,38.831006 c -5.28301,-5.060423 -11.70817,-7.591583 -19.26056,-7.591583 -7.55937,0 -13.98453,2.53116 -19.26753,7.591583 L 217.6825,216.98773 134.38968,136.99258 c -5.28896,-5.06231 -11.71015,-7.59062 -19.26256,-7.59062 -7.55736,0 -13.97854,2.52831 -19.267516,7.59062 l -38.529082,36.87898 c -5.28897,5.06136 -7.932461,11.20929 -7.932461,18.44186 0,7.22686 2.643491,13.38049 7.932461,18.4409 l 102.555358,98.15873 38.53207,36.87803 c 5.28598,5.06421 11.70916,7.59253 19.26455,7.59253 7.5524,0 13.97558,-2.53496 19.26454,-7.59253 l 38.53107,-36.87803 205.11372,-196.32314 c 5.284,-5.06232 7.93246,-11.20929 7.93246,-18.441873 0.005,-7.228765 -2.64846,-13.376685 -7.93246,-18.439008 z"
      }));
    }
  }]);

  return CheckedIcon;
}(_react["default"].Component);

CheckedIcon.defaultProps = {};
CheckedIcon.propTypes = {
  title: _propTypes["default"].string
};
var _default = CheckedIcon;
exports["default"] = _default;

},{"prop-types":10,"react":"react"}],24:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(_dereq_("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Search = /*#__PURE__*/function (_React$Component) {
  _inherits(Search, _React$Component);

  var _super = _createSuper(Search);

  function Search() {
    _classCallCheck(this, Search);

    return _super.apply(this, arguments);
  }

  _createClass(Search, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("svg", {
        className: "search-icon",
        viewBox: "0 0 250.313 250.313",
        width: "10"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76 c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911 c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38 c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146 c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236 C170.146,140.044,140.043,170.146,102.911,170.146z"
      }));
    }
  }]);

  return Search;
}(_react["default"].Component);

var _default = Search;
exports["default"] = _default;

},{"react":"react"}],25:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var UncheckedIcon = /*#__PURE__*/function (_React$Component) {
  _inherits(UncheckedIcon, _React$Component);

  var _super = _createSuper(UncheckedIcon);

  function UncheckedIcon() {
    _classCallCheck(this, UncheckedIcon);

    return _super.apply(this, arguments);
  }

  _createClass(UncheckedIcon, [{
    key: "render",
    value: function render() {
      var title = this.props.title != null ? /*#__PURE__*/_react["default"].createElement("title", null, this.props.title) : null;
      return /*#__PURE__*/_react["default"].createElement("svg", {
        className: "checkbox-icon unchecked",
        viewBox: "0 0 401.998 401.998",
        width: "10"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M377.87,24.126C361.786,8.042,342.417,0,319.769,0H82.227C59.579,0,40.211,8.042,24.125,24.126 C8.044,40.212,0.002,59.576,0.002,82.228v237.543c0,22.647,8.042,42.014,24.123,58.101c16.086,16.085,35.454,24.127,58.102,24.127 h237.542c22.648,0,42.011-8.042,58.102-24.127c16.085-16.087,24.126-35.453,24.126-58.101V82.228 C401.993,59.58,393.951,40.212,377.87,24.126z M365.448,319.771c0,12.559-4.47,23.314-13.415,32.264 c-8.945,8.945-19.698,13.411-32.265,13.411H82.227c-12.563,0-23.317-4.466-32.264-13.411c-8.945-8.949-13.418-19.705-13.418-32.264 V82.228c0-12.562,4.473-23.316,13.418-32.264c8.947-8.946,19.701-13.418,32.264-13.418h237.542 c12.566,0,23.319,4.473,32.265,13.418c8.945,8.947,13.415,19.701,13.415,32.264V319.771L365.448,319.771z"
      }));
    }
  }]);

  return UncheckedIcon;
}(_react["default"].Component);

UncheckedIcon.defaultProps = {};
UncheckedIcon.propTypes = {
  title: _propTypes["default"].string
};
var _default = UncheckedIcon;
exports["default"] = _default;

},{"prop-types":10,"react":"react"}],26:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

var _checked = _interopRequireDefault(_dereq_("../icons/checked"));

var _unchecked = _interopRequireDefault(_dereq_("../icons/unchecked"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ListFacet = /*#__PURE__*/function (_React$Component) {
  _inherits(ListFacet, _React$Component);

  var _super = _createSuper(ListFacet);

  function ListFacet(props) {
    var _this;

    _classCallCheck(this, ListFacet);

    _this = _super.call(this, props);
    _this.state = {
      filter: "",
      truncateFacetListsAt: props.truncateFacetListsAt
    };
    return _this;
  }

  _createClass(ListFacet, [{
    key: "handleClick",
    value: function handleClick(value) {
      var foundIdx = this.props.value.indexOf(value);

      if (foundIdx < 0) {
        this.props.onChange(this.props.field, this.props.value.concat(value));
      } else {
        this.props.onChange(this.props.field, this.props.value.filter(function (v, i) {
          return i !== foundIdx;
        }));
      }
    }
  }, {
    key: "toggleExpand",
    value: function toggleExpand() {
      this.props.onSetCollapse(this.props.field, !(this.props.collapse || false));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          query = _this$props.query,
          label = _this$props.label,
          facets = _this$props.facets,
          field = _this$props.field,
          value = _this$props.value,
          bootstrapCss = _this$props.bootstrapCss,
          facetSort = _this$props.facetSort,
          collapse = _this$props.collapse;
      var truncateFacetListsAt = this.state.truncateFacetListsAt;
      var facetCounts = facets.filter(function (facet, i) {
        return i % 2 === 1;
      });
      var facetValues = facets.filter(function (facet, i) {
        return i % 2 === 0;
      });
      var facetSortValue = facetSort ? facetSort : query.facetSort ? query.facetSort : query.facetLimit && query.facetLimit > -1 ? "count" : "index";
      var expanded = !(collapse || false);
      var showMoreLink = truncateFacetListsAt > -1 && truncateFacetListsAt < facetValues.length ? /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])({
          "list-group-item": bootstrapCss
        }),
        onClick: function onClick() {
          return _this2.setState({
            truncateFacetListsAt: -1
          });
        }
      }, "Show all (", facetValues.length, ")") : null;
      return /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])("list-facet", {
          "list-group-item": bootstrapCss
        }),
        id: "solr-list-facet-".concat(field)
      }, /*#__PURE__*/_react["default"].createElement("header", {
        onClick: this.toggleExpand.bind(this)
      }, /*#__PURE__*/_react["default"].createElement("h5", null, bootstrapCss ? /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])("glyphicon", {
          "glyphicon-collapse-down": expanded,
          "glyphicon-collapse-up": !expanded
        })
      }), " ") : null, label)), expanded ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _classnames["default"])({
          "list-group": bootstrapCss
        })
      }, facetValues.filter(function (facetValue, i) {
        return truncateFacetListsAt < 0 || i < truncateFacetListsAt;
      }).map(function (facetValue, i) {
        return _this2.state.filter.length === 0 || facetValue.toLowerCase().indexOf(_this2.state.filter.toLowerCase()) > -1 ? /*#__PURE__*/_react["default"].createElement("li", {
          className: (0, _classnames["default"])("facet-item-type-".concat(field), {
            "list-group-item": bootstrapCss
          }),
          key: "".concat(facetValue, "_").concat(facetCounts[i]),
          onClick: function onClick() {
            return _this2.handleClick(facetValue);
          }
        }, value.indexOf(facetValue) > -1 ? /*#__PURE__*/_react["default"].createElement(_checked["default"], null) : /*#__PURE__*/_react["default"].createElement(_unchecked["default"], null), " ", facetValue, /*#__PURE__*/_react["default"].createElement("span", {
          className: "facet-item-amount"
        }, facetCounts[i])) : null;
      }), showMoreLink), facetValues.length > 4 ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
        onChange: function onChange(ev) {
          return _this2.setState({
            filter: ev.target.value
          });
        },
        placeholder: "Filter... ",
        type: "text",
        value: this.state.filter
      }), "\xA0", /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])({
          "btn-group": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: (0, _classnames["default"])({
          "btn": bootstrapCss,
          "btn-default": bootstrapCss,
          "btn-xs": bootstrapCss,
          active: facetSortValue === "index"
        }),
        onClick: function onClick() {
          return _this2.props.onFacetSortChange(field, "index");
        }
      }, "a-z"), /*#__PURE__*/_react["default"].createElement("button", {
        className: (0, _classnames["default"])({
          "btn": bootstrapCss,
          "btn-default": bootstrapCss,
          "btn-xs": bootstrapCss,
          active: facetSortValue === "count"
        }),
        onClick: function onClick() {
          return _this2.props.onFacetSortChange(field, "count");
        }
      }, "0-9")), /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])({
          "btn-group": bootstrapCss,
          "pull-right": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: (0, _classnames["default"])({
          "btn": bootstrapCss,
          "btn-default": bootstrapCss,
          "btn-xs": bootstrapCss
        }),
        onClick: function onClick() {
          return _this2.props.onChange(field, []);
        }
      }, "clear"))) : null) : null);
    }
  }]);

  return ListFacet;
}(_react["default"].Component);

ListFacet.defaultProps = {
  value: []
};
ListFacet.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  children: _propTypes["default"].array,
  collapse: _propTypes["default"].bool,
  facetSort: _propTypes["default"].string,
  facets: _propTypes["default"].array.isRequired,
  field: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  onFacetSortChange: _propTypes["default"].func,
  onSetCollapse: _propTypes["default"].func,
  query: _propTypes["default"].object,
  truncateFacetListsAt: _propTypes["default"].number,
  value: _propTypes["default"].array
};
var _default = ListFacet;
exports["default"] = _default;

},{"../icons/checked":23,"../icons/unchecked":25,"classnames":1,"prop-types":10,"react":"react"}],27:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

var _rangeSlider = _interopRequireDefault(_dereq_("./range-slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RangeFacet = /*#__PURE__*/function (_React$Component) {
  _inherits(RangeFacet, _React$Component);

  var _super = _createSuper(RangeFacet);

  function RangeFacet(props) {
    var _this;

    _classCallCheck(this, RangeFacet);

    _this = _super.call(this, props);
    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(RangeFacet, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }, {
    key: "facetsToRange",
    value: function facetsToRange() {
      var facets = this.props.facets;
      return facets.filter(function (facet, i) {
        return i % 2 === 0;
      }).map(function (v) {
        return parseInt(v);
      }).sort(function (a, b) {
        return a > b ? 1 : -1;
      }).filter(function (a, i, me) {
        return i === 0 || i === me.length - 1;
      });
    }
  }, {
    key: "onRangeChange",
    value: function onRangeChange(range) {
      var bounds = this.facetsToRange();
      var lowerBound = bounds[0];
      var upperBound = bounds[1];
      var realRange = upperBound - lowerBound;
      var newState = {
        value: [Math.floor(range.lowerLimit * realRange) + lowerBound, Math.ceil(range.upperLimit * realRange) + lowerBound]
      };

      if (range.refresh) {
        this.props.onChange(this.props.field, newState.value);
      } else {
        this.setState(newState);
      }
    }
  }, {
    key: "getPercentage",
    value: function getPercentage(range, value) {
      var lowerBound = range[0];
      var upperBound = range[1];
      var realRange = upperBound - lowerBound;
      var atRange = value - lowerBound;
      return atRange / realRange;
    }
  }, {
    key: "toggleExpand",
    value: function toggleExpand(ev) {
      if (ev.target.className.indexOf("clear-button") < 0) {
        this.props.onSetCollapse(this.props.field, !(this.props.collapse || false));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          label = _this$props.label,
          field = _this$props.field,
          bootstrapCss = _this$props.bootstrapCss,
          collapse = _this$props.collapse;
      var value = this.state.value;
      var range = this.facetsToRange();
      var filterRange = value.length > 0 ? value : range;
      return /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])("range-facet", {
          "list-group-item": bootstrapCss
        }),
        id: "solr-range-facet-".concat(field)
      }, /*#__PURE__*/_react["default"].createElement("header", {
        onClick: this.toggleExpand.bind(this)
      }, /*#__PURE__*/_react["default"].createElement("button", {
        style: {
          display: this.state.expanded ? "block" : "none"
        },
        className: (0, _classnames["default"])("clear-button", {
          "btn": bootstrapCss,
          "btn-default": bootstrapCss,
          "btn-xs": bootstrapCss,
          "pull-right": bootstrapCss
        }),
        onClick: function onClick() {
          return _this2.props.onChange(field, []);
        }
      }, "clear"), /*#__PURE__*/_react["default"].createElement("h5", null, bootstrapCss ? /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])("glyphicon", {
          "glyphicon-collapse-down": !collapse,
          "glyphicon-collapse-up": collapse
        })
      }), " ") : null, label)), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: collapse ? "none" : "block"
        }
      }, /*#__PURE__*/_react["default"].createElement(_rangeSlider["default"], {
        lowerLimit: this.getPercentage(range, filterRange[0]),
        onChange: this.onRangeChange.bind(this),
        upperLimit: this.getPercentage(range, filterRange[1])
      }), /*#__PURE__*/_react["default"].createElement("label", null, filterRange[0]), /*#__PURE__*/_react["default"].createElement("label", {
        className: (0, _classnames["default"])({
          "pull-right": bootstrapCss
        })
      }, filterRange[1])));
    }
  }]);

  return RangeFacet;
}(_react["default"].Component);

RangeFacet.defaultProps = {
  value: []
};
RangeFacet.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  collapse: _propTypes["default"].bool,
  facets: _propTypes["default"].array.isRequired,
  field: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  onSetCollapse: _propTypes["default"].func,
  value: _propTypes["default"].array
};
var _default = RangeFacet;
exports["default"] = _default;

},{"./range-slider":28,"classnames":1,"prop-types":10,"react":"react"}],28:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _reactDom = _interopRequireDefault(_dereq_("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MOUSE_DOWN = 0;
var MOUSE_UP = 1;
var styles = {
  slider: {
    "MozUserSelect": "none",
    "WebkitUserSelect": "none",
    "MsUserSelect": "none",
    "UserSelect": "none",
    "WebkitUserDrag": "none",
    "userDrag": "none",
    "cursor": "pointer",
    width: "100%",
    stroke: "#f1ebe6",
    fill: "#f1ebe6"
  }
};

var RangeSlider = /*#__PURE__*/function (_React$Component) {
  _inherits(RangeSlider, _React$Component);

  var _super = _createSuper(RangeSlider);

  function RangeSlider(props) {
    var _this;

    _classCallCheck(this, RangeSlider);

    _this = _super.call(this, props);
    _this.mouseState = MOUSE_UP;
    _this.mouseUpListener = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.mouseMoveListener = _this.onMouseMove.bind(_assertThisInitialized(_this));
    _this.touchMoveListener = _this.onTouchMove.bind(_assertThisInitialized(_this));
    _this.state = _objectSpread(_objectSpread({}, _this.propsToState(_this.props)), {
      hoverState: null
    });
    return _this;
  }

  _createClass(RangeSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("mouseup", this.mouseUpListener);
      window.addEventListener("mousemove", this.mouseMoveListener);
      window.addEventListener("touchend", this.mouseUpListener);
      window.addEventListener("touchmove", this.touchMoveListener);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.propsToState(nextProps));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("mouseup", this.mouseUpListener);
      window.removeEventListener("mousemove", this.mouseMoveListener);
      window.removeEventListener("touchend", this.mouseUpListener);
      window.removeEventListener("touchmove", this.touchMoveListener);
    }
  }, {
    key: "propsToState",
    value: function propsToState(props) {
      var lowerLimit = props.lowerLimit || 0;
      var upperLimit = props.upperLimit || 1;
      return {
        lowerLimit: lowerLimit,
        upperLimit: upperLimit
      };
    }
  }, {
    key: "getPositionForLimit",
    value: function getPositionForLimit(pageX) {
      var rect = _reactDom["default"].findDOMNode(this).getBoundingClientRect();

      if (rect.width > 0) {
        var percentage = (pageX - rect.left) / rect.width;

        if (percentage > 1) {
          percentage = 1;
        } else if (percentage < 0) {
          percentage = 0;
        }

        var center = (this.state.upperLimit + this.state.lowerLimit) / 2;

        if (this.state.hoverState === "bar") {
          var lowerLimit = percentage + this.state.lowerLimit - center;
          var upperLimit = percentage - (center - this.state.upperLimit);

          if (upperLimit >= 1) {
            upperLimit = 1;
          }

          if (lowerLimit <= 0) {
            lowerLimit = 0;
          }

          return {
            lowerLimit: lowerLimit,
            upperLimit: upperLimit
          };
        } else if (this.state.hoverState === "lowerLimit") {
          if (percentage >= this.state.upperLimit) {
            percentage = this.state.upperLimit;
          }

          return {
            lowerLimit: percentage
          };
        } else if (this.state.hoverState === "upperLimit") {
          if (percentage <= this.state.lowerLimit) {
            percentage = this.state.lowerLimit;
          }

          return {
            upperLimit: percentage
          };
        }
      }

      return null;
    }
  }, {
    key: "setRange",
    value: function setRange(pageX) {
      var posForLim = this.getPositionForLimit(pageX);

      if (posForLim !== null) {
        this.setState(posForLim);
        this.props.onChange(_objectSpread(_objectSpread({}, this.state), {}, {
          refresh: false
        }));
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(target, ev) {
      this.mouseState = MOUSE_DOWN;
      this.setState({
        hoverState: target
      });
      return ev.preventDefault();
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(ev) {
      if (this.mouseState === MOUSE_DOWN) {
        this.setRange(ev.pageX);
        return ev.preventDefault();
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(ev) {
      if (this.mouseState === MOUSE_DOWN) {
        this.setRange(ev.touches[0].pageX);
        return ev.preventDefault();
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      if (this.mouseState === MOUSE_DOWN) {
        this.props.onChange(_objectSpread(_objectSpread({}, this.state), {}, {
          refresh: true
        }));
      }

      this.setState({
        hoverState: null
      });
      this.mouseState = MOUSE_UP;
    }
  }, {
    key: "getRangePath",
    value: function getRangePath() {
      return "M" + (8 + Math.floor(this.state.lowerLimit * 400)) + " 13 L " + (Math.ceil(this.state.upperLimit * 400) - 8) + " 13 Z";
    }
  }, {
    key: "getRangeCircle",
    value: function getRangeCircle(key) {
      var percentage = this.state[key];
      return /*#__PURE__*/_react["default"].createElement("circle", {
        className: this.state.hoverState === key ? "hovering" : "",
        cx: percentage * 400,
        cy: "13",
        onMouseDown: this.onMouseDown.bind(this, key),
        onTouchStart: this.onMouseDown.bind(this, key),
        r: "13"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var keys = this.state.hoverState === "lowerLimit" ? ["upperLimit", "lowerLimit"] : ["lowerLimit", "upperLimit"];
      return /*#__PURE__*/_react["default"].createElement("svg", {
        className: "facet-range-slider",
        viewBox: "0 0 400 26"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0 L 0 26 Z",
        fill: "transparent"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M400 0 L 400 26 Z",
        fill: "transparent"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 13 L 400 13 Z",
        fill: "transparent"
      }), /*#__PURE__*/_react["default"].createElement("g", {
        className: "range-line"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        className: this.state.hoverState === "bar" ? "hovering" : "",
        d: this.getRangePath(),
        onMouseDown: this.onMouseDown.bind(this, "bar"),
        onTouchStart: this.onMouseDown.bind(this, "bar")
      }), this.getRangeCircle(keys[0]), this.getRangeCircle(keys[1])));
    }
  }]);

  return RangeSlider;
}(_react["default"].Component);

RangeSlider.propTypes = {
  lowerLimit: _propTypes["default"].number,
  onChange: _propTypes["default"].func.isRequired,
  upperLimit: _propTypes["default"].number
};
var _default = RangeSlider;
exports["default"] = _default;

},{"prop-types":10,"react":"react","react-dom":"react-dom"}],29:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ResultContainer = /*#__PURE__*/function (_React$Component) {
  _inherits(ResultContainer, _React$Component);

  var _super = _createSuper(ResultContainer);

  function ResultContainer() {
    _classCallCheck(this, ResultContainer);

    return _super.apply(this, arguments);
  }

  _createClass(ResultContainer, [{
    key: "render",
    value: function render() {
      var bootstrapCss = this.props.bootstrapCss;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])("solr-search-results", {
          "col-md-9": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "panel": bootstrapCss,
          "panel-default": bootstrapCss
        })
      }, this.props.children));
    }
  }]);

  return ResultContainer;
}(_react["default"].Component);

ResultContainer.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  children: _propTypes["default"].array
};
var _default = ResultContainer;
exports["default"] = _default;

},{"classnames":1,"prop-types":10,"react":"react"}],30:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var resultCountLabels = {
  pl: "Found % results",
  sg: "Found % result",
  none: "No results"
};

var Result = /*#__PURE__*/function (_React$Component) {
  _inherits(Result, _React$Component);

  var _super = _createSuper(Result);

  function Result() {
    _classCallCheck(this, Result);

    return _super.apply(this, arguments);
  }

  _createClass(Result, [{
    key: "render",
    value: function render() {
      var numFound = this.props.numFound;
      var resultLabel = numFound > 1 ? resultCountLabels.pl : numFound === 1 ? resultCountLabels.sg : resultCountLabels.none;
      return /*#__PURE__*/_react["default"].createElement("label", null, resultLabel.replace("%", numFound));
    }
  }]);

  return Result;
}(_react["default"].Component);

Result.propTypes = {
  numFound: _propTypes["default"].number.isRequired
};
var _default = Result;
exports["default"] = _default;

},{"prop-types":10,"react":"react"}],31:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(props) {
  var bootstrapCss = props.bootstrapCss,
      onClick = props.onClick;
  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClick,
    className: (0, _classnames["default"])({
      btn: bootstrapCss,
      "btn-default": bootstrapCss,
      "pull-right": bootstrapCss,
      "btn-xs": bootstrapCss
    })
  }, "Export excel");
}

},{"classnames":1,"react":"react"}],32:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ResultHeader = /*#__PURE__*/function (_React$Component) {
  _inherits(ResultHeader, _React$Component);

  var _super = _createSuper(ResultHeader);

  function ResultHeader() {
    _classCallCheck(this, ResultHeader);

    return _super.apply(this, arguments);
  }

  _createClass(ResultHeader, [{
    key: "render",
    value: function render() {
      var bootstrapCss = this.props.bootstrapCss;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "panel-heading": bootstrapCss
        })
      }, this.props.children);
    }
  }]);

  return ResultHeader;
}(_react["default"].Component);

ResultHeader.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  children: _propTypes["default"].array
};
var _default = ResultHeader;
exports["default"] = _default;

},{"classnames":1,"prop-types":10,"react":"react"}],33:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ResultList = /*#__PURE__*/function (_React$Component) {
  _inherits(ResultList, _React$Component);

  var _super = _createSuper(ResultList);

  function ResultList() {
    _classCallCheck(this, ResultList);

    return _super.apply(this, arguments);
  }

  _createClass(ResultList, [{
    key: "render",
    value: function render() {
      var bootstrapCss = this.props.bootstrapCss;
      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _classnames["default"])({
          "list-group": bootstrapCss
        })
      }, this.props.children);
    }
  }]);

  return ResultList;
}(_react["default"].Component);

ResultList.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  children: _propTypes["default"].array
};
var _default = ResultList;
exports["default"] = _default;

},{"classnames":1,"prop-types":10,"react":"react"}],34:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Pagination = /*#__PURE__*/function (_React$Component) {
  _inherits(Pagination, _React$Component);

  var _super = _createSuper(Pagination);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _super.apply(this, arguments);
  }

  _createClass(Pagination, [{
    key: "onPageChange",
    value: function onPageChange(page, pageAmt) {
      if (page >= pageAmt || page < 0) {
        return;
      }

      this.props.onChange(page);
    }
  }, {
    key: "renderPage",
    value: function renderPage(page, currentPage, key) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])({
          "active": page === currentPage
        }),
        key: key
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.onPageChange.bind(this, page)
      }, page + 1));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          bootstrapCss = _this$props.bootstrapCss,
          query = _this$props.query,
          results = _this$props.results;
      var start = query.start,
          rows = query.rows;
      var numFound = results.numFound;
      var pageAmt = Math.ceil(numFound / rows);
      var currentPage = start / rows;
      var rangeStart = currentPage - 2 < 0 ? 0 : currentPage - 2;
      var rangeEnd = rangeStart + 5 > pageAmt ? pageAmt : rangeStart + 5;

      if (rangeEnd - rangeStart < 5 && rangeStart > 0) {
        rangeStart = rangeEnd - 5;

        if (rangeStart < 0) {
          rangeStart = 0;
        }
      }

      var pages = [];

      for (var page = rangeStart; page < rangeEnd; page++) {
        if (pages.indexOf(page) < 0) {
          pages.push(page);
        }
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "panel-body": bootstrapCss,
          "text-center": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _classnames["default"])("pagination", {
          "pagination-sm": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])({
          "disabled": currentPage === 0
        }),
        key: "start"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.onPageChange.bind(this, 0)
      }, "<<")), /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])({
          "disabled": currentPage - 1 < 0
        }),
        key: "prev"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.onPageChange.bind(this, currentPage - 1)
      }, "<")), pages.map(function (page, idx) {
        return _this.renderPage(page, currentPage, idx);
      }), /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])({
          "disabled": currentPage + 1 >= pageAmt
        }),
        key: "next"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.onPageChange.bind(this, currentPage + 1, pageAmt)
      }, ">")), /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])({
          "disabled": currentPage === pageAmt - 1
        }),
        key: "end"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.onPageChange.bind(this, pageAmt - 1)
      }, ">>"))));
    }
  }]);

  return Pagination;
}(_react["default"].Component);

Pagination.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  query: _propTypes["default"].object,
  results: _propTypes["default"].object
};
var _default = Pagination;
exports["default"] = _default;

},{"classnames":1,"prop-types":10,"react":"react"}],35:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Pending = /*#__PURE__*/function (_React$Component) {
  _inherits(Pending, _React$Component);

  var _super = _createSuper(Pending);

  function Pending() {
    _classCallCheck(this, Pending);

    return _super.apply(this, arguments);
  }

  _createClass(Pending, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("span", null, "Waiting for results");
    }
  }]);

  return Pending;
}(_react["default"].Component);

Pending.propTypes = {
  bootstrapCss: _propTypes["default"].bool
};
var _default = Pending;
exports["default"] = _default;

},{"prop-types":10,"react":"react"}],36:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _reactDom = _interopRequireDefault(_dereq_("react-dom"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PreloadIndicator = /*#__PURE__*/function (_React$Component) {
  _inherits(PreloadIndicator, _React$Component);

  var _super = _createSuper(PreloadIndicator);

  function PreloadIndicator(props) {
    var _this;

    _classCallCheck(this, PreloadIndicator);

    _this = _super.call(this, props);
    _this.scrollListener = _this.onWindowScroll.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PreloadIndicator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("scroll", this.scrollListener);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("scroll", this.scrollListener);
    }
  }, {
    key: "onWindowScroll",
    value: function onWindowScroll() {
      var pageStrategy = this.props.query.pageStrategy;
      var pending = this.props.results.pending;

      if (pageStrategy !== "cursor" || pending) {
        return;
      }

      var domNode = _reactDom["default"].findDOMNode(this);

      if (!domNode) {
        return;
      }

      var _domNode$getBoundingC = domNode.getBoundingClientRect(),
          top = _domNode$getBoundingC.top;

      if (top < window.innerHeight) {
        this.props.onNextCursorQuery();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var bootstrapCss = this.props.bootstrapCss;
      return /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])("fetch-by-cursor", {
          "list-group-item": bootstrapCss
        })
      }, "Loading more...");
    }
  }]);

  return PreloadIndicator;
}(_react["default"].Component);

PreloadIndicator.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  onNextCursorQuery: _propTypes["default"].func,
  query: _propTypes["default"].object,
  results: _propTypes["default"].object
};
var _default = PreloadIndicator;
exports["default"] = _default;

},{"classnames":1,"prop-types":10,"react":"react","react-dom":"react-dom"}],37:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Result = /*#__PURE__*/function (_React$Component) {
  _inherits(Result, _React$Component);

  var _super = _createSuper(Result);

  function Result() {
    _classCallCheck(this, Result);

    return _super.apply(this, arguments);
  }

  _createClass(Result, [{
    key: "renderValue",
    value: function renderValue(field, doc) {
      var value = [].concat(doc[field] || null).filter(function (v) {
        return v !== null;
      });
      return value.join(", ");
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          bootstrapCss = _this$props.bootstrapCss,
          doc = _this$props.doc,
          fields = _this$props.fields;
      return /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])({
          "list-group-item": bootstrapCss
        }),
        onClick: function onClick() {
          return _this.props.onSelect(doc);
        }
      }, /*#__PURE__*/_react["default"].createElement("ul", null, fields.filter(function (field) {
        return field.field !== "*";
      }).map(function (field, i) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: i
        }, /*#__PURE__*/_react["default"].createElement("label", null, field.label || field.field), _this.renderValue(field.field, doc));
      })));
    }
  }]);

  return Result;
}(_react["default"].Component);

Result.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  doc: _propTypes["default"].object,
  fields: _propTypes["default"].array,
  onSelect: _propTypes["default"].func.isRequired
};
var _default = Result;
exports["default"] = _default;

},{"classnames":1,"prop-types":10,"react":"react"}],38:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SearchFieldContainer = /*#__PURE__*/function (_React$Component) {
  _inherits(SearchFieldContainer, _React$Component);

  var _super = _createSuper(SearchFieldContainer);

  function SearchFieldContainer() {
    _classCallCheck(this, SearchFieldContainer);

    return _super.apply(this, arguments);
  }

  _createClass(SearchFieldContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          bootstrapCss = _this$props.bootstrapCss,
          onNewSearch = _this$props.onNewSearch;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "col-md-3": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          "panel": bootstrapCss,
          "panel-default": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("header", {
        className: (0, _classnames["default"])({
          "panel-heading": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: (0, _classnames["default"])({
          "btn": bootstrapCss,
          "btn-default": bootstrapCss,
          "btn-xs": bootstrapCss,
          "pull-right": bootstrapCss
        }),
        onClick: onNewSearch
      }, "New search"), /*#__PURE__*/_react["default"].createElement("label", null, "Search")), /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _classnames["default"])("solr-search-fields", {
          "list-group": bootstrapCss
        })
      }, this.props.children)));
    }
  }]);

  return SearchFieldContainer;
}(_react["default"].Component);

SearchFieldContainer.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  children: _propTypes["default"].array,
  onNewSearch: _propTypes["default"].func
};
var _default = SearchFieldContainer;
exports["default"] = _default;

},{"classnames":1,"prop-types":10,"react":"react"}],39:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

var _componentPack = _interopRequireDefault(_dereq_("./component-pack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var getFacetValues = function getFacetValues(type, results, field, lowerBound, upperBound) {
  return type === "period-range-facet" ? (results.facets[lowerBound] || []).concat(results.facets[upperBound] || []) : type === "list-facet" || type === "range-facet" ? results.facets[field] || [] : null;
};

var SolrFacetedSearch = /*#__PURE__*/function (_React$Component) {
  _inherits(SolrFacetedSearch, _React$Component);

  var _super = _createSuper(SolrFacetedSearch);

  function SolrFacetedSearch() {
    _classCallCheck(this, SolrFacetedSearch);

    return _super.apply(this, arguments);
  }

  _createClass(SolrFacetedSearch, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          customComponents = _this$props.customComponents,
          bootstrapCss = _this$props.bootstrapCss,
          query = _this$props.query,
          results = _this$props.results,
          truncateFacetListsAt = _this$props.truncateFacetListsAt;
      var _this$props2 = this.props,
          onSearchFieldChange = _this$props2.onSearchFieldChange,
          onSortFieldChange = _this$props2.onSortFieldChange,
          onPageChange = _this$props2.onPageChange,
          onCsvExport = _this$props2.onCsvExport;
      var searchFields = query.searchFields,
          sortFields = query.sortFields,
          start = query.start,
          rows = query.rows;
      var SearchFieldContainerComponent = customComponents.searchFields.container;
      var ResultContainerComponent = customComponents.results.container;
      var ResultComponent = customComponents.results.result;
      var ResultCount = customComponents.results.resultCount;
      var ResultHeaderComponent = customComponents.results.header;
      var ResultListComponent = customComponents.results.list;
      var ResultPendingComponent = customComponents.results.pending;
      var PaginateComponent = customComponents.results.paginate;
      var PreloadComponent = customComponents.results.preloadIndicator;
      var CsvExportComponent = customComponents.results.csvExport;
      var CurrentQueryComponent = customComponents.searchFields.currentQuery;
      var SortComponent = customComponents.sortFields.menu;
      var resultPending = results.pending ? /*#__PURE__*/_react["default"].createElement(ResultPendingComponent, {
        bootstrapCss: bootstrapCss
      }) : null;
      var pagination = query.pageStrategy === "paginate" ? /*#__PURE__*/_react["default"].createElement(PaginateComponent, _extends({}, this.props, {
        bootstrapCss: bootstrapCss,
        onChange: onPageChange
      })) : null;
      var preloadListItem = query.pageStrategy === "cursor" && results.docs.length < results.numFound ? /*#__PURE__*/_react["default"].createElement(PreloadComponent, this.props) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])("solr-faceted-search", {
          "container": bootstrapCss,
          "col-md-12": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement(SearchFieldContainerComponent, {
        bootstrapCss: bootstrapCss,
        onNewSearch: this.props.onNewSearch
      }, searchFields.map(function (searchField, i) {
        var type = searchField.type,
            field = searchField.field,
            lowerBound = searchField.lowerBound,
            upperBound = searchField.upperBound;
        var SearchComponent = customComponents.searchFields[type];
        var facets = getFacetValues(type, results, field, lowerBound, upperBound);
        return /*#__PURE__*/_react["default"].createElement(SearchComponent, _extends({
          key: i
        }, _this.props, searchField, {
          bootstrapCss: bootstrapCss,
          facets: facets,
          truncateFacetListsAt: truncateFacetListsAt,
          onChange: onSearchFieldChange
        }));
      })), /*#__PURE__*/_react["default"].createElement(ResultContainerComponent, {
        bootstrapCss: bootstrapCss
      }, /*#__PURE__*/_react["default"].createElement(ResultHeaderComponent, {
        bootstrapCss: bootstrapCss
      }, /*#__PURE__*/_react["default"].createElement(ResultCount, {
        bootstrapCss: bootstrapCss,
        numFound: results.numFound
      }), resultPending, /*#__PURE__*/_react["default"].createElement(SortComponent, {
        bootstrapCss: bootstrapCss,
        onChange: onSortFieldChange,
        sortFields: sortFields
      }), this.props.showCsvExport ? /*#__PURE__*/_react["default"].createElement(CsvExportComponent, {
        bootstrapCss: bootstrapCss,
        onClick: onCsvExport
      }) : null), /*#__PURE__*/_react["default"].createElement(CurrentQueryComponent, _extends({}, this.props, {
        onChange: onSearchFieldChange
      })), pagination, /*#__PURE__*/_react["default"].createElement(ResultListComponent, {
        bootstrapCss: bootstrapCss
      }, results.docs.map(function (doc, i) {
        return /*#__PURE__*/_react["default"].createElement(ResultComponent, {
          bootstrapCss: bootstrapCss,
          doc: doc,
          fields: searchFields,
          key: doc.id || i,
          onSelect: _this.props.onSelectDoc,
          resultIndex: i,
          rows: rows,
          start: start
        });
      }), preloadListItem), pagination));
    }
  }]);

  return SolrFacetedSearch;
}(_react["default"].Component);

SolrFacetedSearch.defaultProps = {
  bootstrapCss: true,
  customComponents: _componentPack["default"],
  pageStrategy: "paginate",
  rows: 20,
  searchFields: [{
    type: "text",
    field: "*"
  }],
  sortFields: [],
  truncateFacetListsAt: -1,
  showCsvExport: false
};
SolrFacetedSearch.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  customComponents: _propTypes["default"].object,
  onCsvExport: _propTypes["default"].func,
  onNewSearch: _propTypes["default"].func,
  onPageChange: _propTypes["default"].func,
  onSearchFieldChange: _propTypes["default"].func.isRequired,
  onSelectDoc: _propTypes["default"].func,
  onSortFieldChange: _propTypes["default"].func.isRequired,
  query: _propTypes["default"].object,
  results: _propTypes["default"].object,
  showCsvExport: _propTypes["default"].bool,
  truncateFacetListsAt: _propTypes["default"].number
};
var _default = SolrFacetedSearch;
exports["default"] = _default;

},{"./component-pack":21,"classnames":1,"prop-types":10,"react":"react"}],40:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _reactDom = _interopRequireDefault(_dereq_("react-dom"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SortMenu = /*#__PURE__*/function (_React$Component) {
  _inherits(SortMenu, _React$Component);

  var _super = _createSuper(SortMenu);

  function SortMenu(props) {
    var _this;

    _classCallCheck(this, SortMenu);

    _this = _super.call(this, props);
    _this.state = {
      isOpen: false
    };
    _this.documentClickListener = _this.handleDocumentClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SortMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("click", this.documentClickListener, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("click", this.documentClickListener, false);
    }
  }, {
    key: "toggleSelect",
    value: function toggleSelect() {
      if (this.state.isOpen) {
        this.setState({
          isOpen: false
        });
      } else {
        this.setState({
          isOpen: true
        });
      }
    }
  }, {
    key: "onSelect",
    value: function onSelect(sortField) {
      var foundIdx = this.props.sortFields.indexOf(sortField);

      if (foundIdx < 0) {
        this.props.onChange(sortField, "asc");
      } else {
        this.props.onChange(sortField, null);
      }
    }
  }, {
    key: "handleDocumentClick",
    value: function handleDocumentClick(ev) {
      var isOpen = this.state.isOpen;

      if (isOpen && !_reactDom["default"].findDOMNode(this).contains(ev.target)) {
        this.setState({
          isOpen: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          bootstrapCss = _this$props.bootstrapCss,
          sortFields = _this$props.sortFields;

      if (sortFields.length === 0) {
        return null;
      }

      var value = sortFields.find(function (sf) {
        return sf.value;
      });
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])({
          "pull-right": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])({
          "dropdown": bootstrapCss,
          "open": this.state.isOpen
        })
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: (0, _classnames["default"])({
          "btn": bootstrapCss,
          "btn-default": bootstrapCss,
          "btn-xs": bootstrapCss,
          "dropdown-toggle": bootstrapCss
        }),
        onClick: this.toggleSelect.bind(this)
      }, value ? value.label : "- select sort -", " ", /*#__PURE__*/_react["default"].createElement("span", {
        className: "caret"
      })), /*#__PURE__*/_react["default"].createElement("ul", {
        className: "dropdown-menu"
      }, sortFields.map(function (sortField, i) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: i
        }, /*#__PURE__*/_react["default"].createElement("a", {
          onClick: function onClick() {
            _this2.onSelect(sortField.field);

            _this2.toggleSelect();
          }
        }, sortField.label));
      }), value ? /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: function onClick() {
          _this2.props.onChange(value.field, null);

          _this2.toggleSelect();
        }
      }, "- clear -")) : null)), value ? /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])({
          "btn-group": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: (0, _classnames["default"])({
          "btn": bootstrapCss,
          "btn-default": bootstrapCss,
          "btn-xs": bootstrapCss,
          active: value.value === "asc"
        }),
        onClick: function onClick() {
          return _this2.props.onChange(value.field, "asc");
        }
      }, "asc"), /*#__PURE__*/_react["default"].createElement("button", {
        className: (0, _classnames["default"])({
          "btn": bootstrapCss,
          "btn-default": bootstrapCss,
          "btn-xs": bootstrapCss,
          active: value.value === "desc"
        }),
        onClick: function onClick() {
          return _this2.props.onChange(value.field, "desc");
        }
      }, "desc")) : null);
    }
  }]);

  return SortMenu;
}(_react["default"].Component);

SortMenu.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  sortFields: _propTypes["default"].array
};
var _default = SortMenu;
exports["default"] = _default;

},{"classnames":1,"prop-types":10,"react":"react","react-dom":"react-dom"}],41:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(_dereq_("prop-types"));

var _react = _interopRequireDefault(_dereq_("react"));

var _classnames = _interopRequireDefault(_dereq_("classnames"));

var _search = _interopRequireDefault(_dereq_("../icons/search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TextSearch = /*#__PURE__*/function (_React$Component) {
  _inherits(TextSearch, _React$Component);

  var _super = _createSuper(TextSearch);

  function TextSearch(props) {
    var _this;

    _classCallCheck(this, TextSearch);

    _this = _super.call(this, props);
    _this.state = {
      value: ""
    };
    return _this;
  }

  _createClass(TextSearch, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(ev) {
      this.setState({
        value: ev.target.value
      });
    }
  }, {
    key: "handleInputKeyDown",
    value: function handleInputKeyDown(ev) {
      if (ev.keyCode === 13) {
        this.handleSubmit();
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      this.props.onChange(this.props.field, this.state.value);
    }
  }, {
    key: "toggleExpand",
    value: function toggleExpand() {
      this.props.onSetCollapse(this.props.field, !(this.props.collapse || false));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          bootstrapCss = _this$props.bootstrapCss,
          collapse = _this$props.collapse;
      return /*#__PURE__*/_react["default"].createElement("li", {
        className: (0, _classnames["default"])({
          "list-group-item": bootstrapCss
        })
      }, /*#__PURE__*/_react["default"].createElement("header", {
        onClick: this.toggleExpand.bind(this)
      }, /*#__PURE__*/_react["default"].createElement("h5", null, bootstrapCss ? /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])("glyphicon", {
          "glyphicon-collapse-down": !collapse,
          "glyphicon-collapse-up": collapse
        })
      }), " ") : null, label)), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: collapse ? "none" : "block"
        }
      }, /*#__PURE__*/_react["default"].createElement("input", {
        onChange: this.handleInputChange.bind(this),
        onKeyDown: this.handleInputKeyDown.bind(this),
        value: this.state.value || ""
      }), "\xA0", /*#__PURE__*/_react["default"].createElement("button", {
        className: (0, _classnames["default"])({
          "btn": bootstrapCss,
          "btn-default": bootstrapCss,
          "btn-sm": bootstrapCss
        }),
        onClick: this.handleSubmit.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_search["default"], null))));
    }
  }]);

  return TextSearch;
}(_react["default"].Component);

TextSearch.defaultProps = {
  field: null
};
TextSearch.propTypes = {
  bootstrapCss: _propTypes["default"].bool,
  collapse: _propTypes["default"].bool,
  field: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  onSetCollapse: _propTypes["default"].func
};
var _default = TextSearch;
exports["default"] = _default;

},{"../icons/search":24,"classnames":1,"prop-types":10,"react":"react"}],42:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SolrClient", {
  enumerable: true,
  get: function get() {
    return _solrClient.SolrClient;
  }
});
Object.defineProperty(exports, "SolrFacetedSearch", {
  enumerable: true,
  get: function get() {
    return _solrFacetedSearch["default"];
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "defaultComponentPack", {
  enumerable: true,
  get: function get() {
    return _componentPack["default"];
  }
});

var _solrFacetedSearch = _interopRequireDefault(_dereq_("./components/solr-faceted-search"));

var _componentPack = _interopRequireDefault(_dereq_("./components/component-pack"));

var _solrClient = _dereq_("./api/solr-client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _solrFacetedSearch["default"];
exports["default"] = _default;

},{"./api/solr-client":19,"./components/component-pack":21,"./components/solr-faceted-search":39}],43:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  searchFields: [],
  sortFields: [],
  rows: 0,
  url: null,
  pageStrategy: null,
  start: null,
  group: null,
  hl: null
};

var setQueryFields = function setQueryFields(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    searchFields: action.searchFields,
    sortFields: action.sortFields,
    url: action.url,
    rows: action.rows,
    pageStrategy: action.pageStrategy,
    start: action.start,
    group: action.group,
    hl: action.hl
  });
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "SET_QUERY_FIELDS":
      return setQueryFields(state, action);

    case "SET_SEARCH_FIELDS":
      return _objectSpread(_objectSpread({}, state), {}, {
        searchFields: action.newFields,
        start: state.pageStrategy === "paginate" ? 0 : null
      });

    case "SET_SORT_FIELDS":
      return _objectSpread(_objectSpread({}, state), {}, {
        sortFields: action.newSortFields,
        start: state.pageStrategy === "paginate" ? 0 : null
      });

    case "SET_FILTERS":
      return _objectSpread(_objectSpread({}, state), {}, {
        filters: action.newFilters,
        start: state.pageStrategy === "paginate" ? 0 : null
      });

    case "SET_START":
      return _objectSpread(_objectSpread({}, state), {}, {
        start: action.newStart
      });

    case "SET_RESULTS":
      return action.data.nextCursorMark ? _objectSpread(_objectSpread({}, state), {}, {
        cursorMark: action.data.nextCursorMark
      }) : state;

    case "SET_GROUP":
      return _objectSpread(_objectSpread({}, state), {}, {
        group: action.group
      });
  }

  return state;
}

},{}],44:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  facets: {},
  docs: [],
  numFound: 0,
  pending: false,
  highlighting: []
};

var tryGroupedResultCount = function tryGroupedResultCount(data) {
  if (data.grouped) {
    for (var key in data.grouped) {
      if (data.grouped[key].matches) {
        return data.grouped[key].matches;
      }
    }
  }

  return 0;
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "SET_RESULTS":
      return _objectSpread(_objectSpread({}, state), {}, {
        docs: action.data.response ? action.data.response.docs : [],
        grouped: action.data.grouped || {},
        numFound: action.data.response ? action.data.response.numFound : tryGroupedResultCount(action.data),
        facets: action.data.facet_counts.facet_fields,
        highlighting: action.data.highlighting ? action.data.highlighting : [],
        pending: false
      });

    case "SET_NEXT_RESULTS":
      return _objectSpread(_objectSpread({}, state), {}, {
        docs: state.docs.concat(action.data.response.docs),
        pending: false
      });

    case "SET_RESULTS_PENDING":
      return _objectSpread(_objectSpread({}, state), {}, {
        pending: true
      });
  }

  return state;
}

},{}],45:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {};

var setSuggestQuery = function setSuggestQuery(state, action) {
  return _objectSpread({}, action.suggestQuery);
};

var setSuggestQueryField = function setSuggestQueryField(state, action) {
  // Clear the suggestQueryField data only if the search field has been cleared.
  if (action.newFields.filter(function (field) {
    return field.field === "tm_rendered_item" && field.value === "";
  }).length) {
    return _extends.apply(void 0, [{}].concat(_toConsumableArray(state), [{
      suggestQuery: {
        value: ""
      }
    }]));
  }

  return _objectSpread({}, state);
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "SET_SUGGEST_QUERY":
      return setSuggestQuery(state, action);

    case "SET_SEARCH_FIELDS":
      return setSuggestQueryField(state, action);
  }

  return state;
}

},{}],46:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  suggestionsPending: false,
  docs: []
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "SET_SUGGESTIONS":
      return _objectSpread(_objectSpread({}, state), {}, {
        docs: action.data.response ? action.data.response.docs : [],
        suggestionsPending: false
      });

    case "SET_SUGGESTIONS_PENDING":
      return _objectSpread(_objectSpread({}, state), {}, {
        suggestionsPending: true
      });
  }

  return state;
}

},{}]},{},[42])(42)
});
