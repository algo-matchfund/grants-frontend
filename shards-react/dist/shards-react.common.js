/*
* Shards React v1.1.4 (https://designrevision.com/downloads/shards-react/)
* Based on: Bootstrap ^4.5.3 (https://getbootstrap.com)
* Based on: Shards ^3.0.0 (https://designrevision.com/downloads/shards/)
* Copyright 2017-2022 DesignRevision (https://designrevision.com)
* Copyright 2017-2022 Catalin Vasile (http://catalin.me)
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var classNames = _interopDefault(require('classnames'));
var ReactDOM = _interopDefault(require('react-dom'));
var omit = _interopDefault(require('lodash.omit'));
var pick = _interopDefault(require('lodash.pick'));
var ReactDatePicker = _interopDefault(require('react-datepicker'));
var reactPopper = require('react-popper');
var nanoid = require('nanoid');
var reactTransitionGroup = require('react-transition-group');
var nouislider = _interopDefault(require('nouislider'));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117,
    x = b ? Symbol.for("react.responder") : 60118,
    y = b ? Symbol.for("react.scope") : 60119;

function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;

              default:
                return u;
            }

        }

      case d:
        return u;
    }
  }
}

function A(a) {
  return z(a) === m;
}

var AsyncMode = l;
var ConcurrentMode = m;
var ContextConsumer = k;
var ContextProvider = h;
var Element$1 = c;
var ForwardRef = n;
var Fragment = e;
var Lazy = t;
var Memo = r;
var Portal = d;
var Profiler = g;
var StrictMode = f;
var Suspense = p;

var isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};

var isConcurrentMode = A;

var isContextConsumer = function (a) {
  return z(a) === k;
};

var isContextProvider = function (a) {
  return z(a) === h;
};

var isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};

var isForwardRef = function (a) {
  return z(a) === n;
};

var isFragment = function (a) {
  return z(a) === e;
};

var isLazy = function (a) {
  return z(a) === t;
};

var isMemo = function (a) {
  return z(a) === r;
};

var isPortal = function (a) {
  return z(a) === d;
};

var isProfiler = function (a) {
  return z(a) === g;
};

var isStrictMode = function (a) {
  return z(a) === f;
};

var isSuspense = function (a) {
  return z(a) === p;
};

var isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};

var typeOf = z;
var reactIs_production_min = {
  AsyncMode: AsyncMode,
  ConcurrentMode: ConcurrentMode,
  ContextConsumer: ContextConsumer,
  ContextProvider: ContextProvider,
  Element: Element$1,
  ForwardRef: ForwardRef,
  Fragment: Fragment,
  Lazy: Lazy,
  Memo: Memo,
  Portal: Portal,
  Profiler: Profiler,
  StrictMode: StrictMode,
  Suspense: Suspense,
  isAsyncMode: isAsyncMode,
  isConcurrentMode: isConcurrentMode,
  isContextConsumer: isContextConsumer,
  isContextProvider: isContextProvider,
  isElement: isElement,
  isForwardRef: isForwardRef,
  isFragment: isFragment,
  isLazy: isLazy,
  isMemo: isMemo,
  isPortal: isPortal,
  isProfiler: isProfiler,
  isStrictMode: isStrictMode,
  isSuspense: isSuspense,
  isValidElementType: isValidElementType,
  typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {

  if (process.env.NODE_ENV !== "production") {
    (function () {
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
});
var reactIs_development_1 = reactIs_development.AsyncMode;
var reactIs_development_2 = reactIs_development.ConcurrentMode;
var reactIs_development_3 = reactIs_development.ContextConsumer;
var reactIs_development_4 = reactIs_development.ContextProvider;
var reactIs_development_5 = reactIs_development.Element;
var reactIs_development_6 = reactIs_development.ForwardRef;
var reactIs_development_7 = reactIs_development.Fragment;
var reactIs_development_8 = reactIs_development.Lazy;
var reactIs_development_9 = reactIs_development.Memo;
var reactIs_development_10 = reactIs_development.Portal;
var reactIs_development_11 = reactIs_development.Profiler;
var reactIs_development_12 = reactIs_development.StrictMode;
var reactIs_development_13 = reactIs_development.Suspense;
var reactIs_development_14 = reactIs_development.isAsyncMode;
var reactIs_development_15 = reactIs_development.isConcurrentMode;
var reactIs_development_16 = reactIs_development.isContextConsumer;
var reactIs_development_17 = reactIs_development.isContextProvider;
var reactIs_development_18 = reactIs_development.isElement;
var reactIs_development_19 = reactIs_development.isForwardRef;
var reactIs_development_20 = reactIs_development.isFragment;
var reactIs_development_21 = reactIs_development.isLazy;
var reactIs_development_22 = reactIs_development.isMemo;
var reactIs_development_23 = reactIs_development.isPortal;
var reactIs_development_24 = reactIs_development.isProfiler;
var reactIs_development_25 = reactIs_development.isStrictMode;
var reactIs_development_26 = reactIs_development.isSuspense;
var reactIs_development_27 = reactIs_development.isValidElementType;
var reactIs_development_28 = reactIs_development.typeOf;

var reactIs = createCommonjsModule(function (module) {

  if (process.env.NODE_ENV === 'production') {
    module.exports = reactIs_production_min;
  } else {
    module.exports = reactIs_development;
  }
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
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
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
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

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function () {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function (text) {
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
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
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


checkPropTypes.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning$1 = function () {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function (text) {
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

var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
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


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
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
    exact: createStrictShapeTypeChecker
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


  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning$1('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
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
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
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
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);

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

      if (!reactIs.isValidElementType(propValue)) {
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
          printWarning$1('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
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
        if (has$1(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

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
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning$1('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
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

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (!checker) {
          continue;
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

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
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = objectAssign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

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
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


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
  } // This handles more types than `getPropType`. Only used for error messages.
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
  } // Returns a string that is postfixed to a warning about an invalid type.
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
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
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

var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  if (process.env.NODE_ENV !== 'production') {
    var ReactIs = reactIs; // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod

    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  } else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = factoryWithThrowingShims();
  }
});

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf$1(o, p);
}

function _inheritsLoose$1(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf$1(subClass, superClass);
}

var config = {
  disabled: false
};

var timeoutsShape = process.env.NODE_ENV !== 'production' ? propTypes.oneOfType([propTypes.number, propTypes.shape({
  enter: propTypes.number,
  exit: propTypes.number,
  appear: propTypes.number
}).isRequired]) : null;
var classNamesShape = process.env.NODE_ENV !== 'production' ? propTypes.oneOfType([propTypes.string, propTypes.shape({
  enter: propTypes.string,
  exit: propTypes.string,
  active: propTypes.string
}), propTypes.shape({
  enter: propTypes.string,
  enterDone: propTypes.string,
  enterActive: propTypes.string,
  exit: propTypes.string,
  exitDone: propTypes.string,
  exitActive: propTypes.string
})]) : null;

var TransitionGroupContext = /*#__PURE__*/React.createContext(null);

var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$1(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : ReactDOM.findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children,
        _in = _this$props.in,
        _mountOnEnter = _this$props.mountOnEnter,
        _unmountOnExit = _this$props.unmountOnExit,
        _appear = _this$props.appear,
        _enter = _this$props.enter,
        _exit = _this$props.exit,
        _timeout = _this$props.timeout,
        _addEndListener = _this$props.addEndListener,
        _onEnter = _this$props.onEnter,
        _onEntering = _this$props.onEntering,
        _onEntered = _this$props.onEntered,
        _onExit = _this$props.onExit,
        _onExiting = _this$props.onExiting,
        _onExited = _this$props.onExited,
        _nodeRef = _this$props.nodeRef,
        childProps = _objectWithoutPropertiesLoose$1(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      React.createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : /*#__PURE__*/React.cloneElement(React.Children.only(children), childProps))
    );
  };

  return Transition;
}(React.Component);

Transition.contextType = TransitionGroupContext;
Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: propTypes.shape({
    current: typeof Element === 'undefined' ? propTypes.any : function (propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return propTypes.instanceOf(value && 'ownerDocument' in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),

  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: propTypes.oneOfType([propTypes.func.isRequired, propTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: propTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: propTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: propTypes.bool,

  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: propTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: propTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: propTypes.bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: propTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: propTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: propTypes.func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: propTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: propTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: propTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: propTypes.func
} : {}; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;

const TIMEOUT = {
  FADE: 150,
  COLLAPSE: 350,
  SHOW: 0,
  HIDE: 0
};
const EVENTS = {
  CLICK: ["click", "touchstart", "keyup"],
  MOUSE: ["mouseenter", "mouseleave"],
  FOCUS: ["focusin", "focusout"]
};
const KEYCODES = {
  ESC: 27,
  SPACE: 32,
  ENTER: 13,
  TAB: 9,
  UP: 38,
  DOWN: 40
};
const TRANSITION_KEYS = ["in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"];
const TRANSITION_STATUS = {
  ENTERING: "entering",
  ENTERED: "entered",
  EXITING: "exiting",
  EXITED: "exited"
};
const TRANSITION_CLASS_MAP = {
  [TRANSITION_STATUS.ENTERING]: "collapsing",
  [TRANSITION_STATUS.ENTERED]: "collapse show",
  [TRANSITION_STATUS.EXITING]: "collapsing",
  [TRANSITION_STATUS.EXITED]: "collapse"
};
const POPPER_PLACEMENTS = ["top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start", "auto-start", "auto", "auto-end"];
const DROPDOWN_POSITION_MAP = {
  UP: "top",
  LEFT: "left",
  RIGHT: "right",
  DOWN: "bottom"
};
const BREAKPOINTS = ["xs", "sm", "md", "lg", "xl"];
/**
 * FORMS
 */

const INPUT_TYPES = ["text", "password", "email", "number", "tel", "url", "search", "range", "color", "date", "time", "datetime", "datetime-local", "month", "week", "file"];
const INPUT_GROUP_ADDON_TYPES = ["prepend", "append"];

var _excluded = ["tag", "baseClass", "baseClassActive", "className", "children", "innerRef"];
/**
 * The `Fade` component allows you to easily fade in and out content and is powered by [react-transition-group](https://github.com/reactjs/react-transition-group).
 */

var Fade = function Fade(props) {
  var Tag = props.tag,
      baseClass = props.baseClass,
      baseClassActive = props.baseClassActive,
      className = props.className,
      children = props.children,
      innerRef = props.innerRef,
      attrs = _objectWithoutProperties(props, _excluded);

  var transitionProps = pick(attrs, TRANSITION_KEYS);
  var childProps = omit(attrs, TRANSITION_KEYS);
  return /*#__PURE__*/React.createElement(Transition, transitionProps, function (status) {
    var isActive = status === "entered";
    var classes = classNames(className, baseClass, isActive && baseClassActive);
    return /*#__PURE__*/React.createElement(Tag, _extends({
      className: classes
    }, childProps, {
      ref: innerRef
    }), children);
  });
};

Fade.propTypes = _objectSpread2(_objectSpread2({}, Transition.propTypes), {}, {
  tag: propTypes.oneOfType([propTypes.string, propTypes.func]),
  baseClass: propTypes.string,
  baseClassActive: propTypes.string,
  className: propTypes.string,
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.string, propTypes.func]),
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node])
});
Fade.defaultProps = _objectSpread2(_objectSpread2({}, Transition.defaultProps), {}, {
  tag: "div",
  baseClass: "fade",
  baseClassActive: "show",
  timeout: TIMEOUT.FADE,
  appear: true,
  enter: true,
  exit: true,
  in: true
});

var _excluded$1 = ["className", "closeClassName", "closeAriaLabel", "tag", "theme", "open", "dismissible", "children", "transition", "fade"];
/**
 * The alert component can be used to display contextual user messages.
 */

var Alert = function Alert(props) {
  var className = props.className,
      closeClassName = props.closeClassName,
      closeAriaLabel = props.closeAriaLabel,
      Tag = props.tag,
      theme = props.theme,
      open = props.open,
      dismissible = props.dismissible,
      children = props.children,
      transition = props.transition,
      fade = props.fade,
      attrs = _objectWithoutProperties(props, _excluded$1);

  var classes = classNames(className, "alert", "alert-".concat(theme), dismissible && "alert-dismissible");
  var closeClasses = classNames("close", closeClassName);

  var alertTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), transition), {}, {
    baseClass: fade ? transition.baseClass : "",
    timeout: fade ? transition.timeout : 0
  });

  return /*#__PURE__*/React.createElement(Fade, _extends({}, attrs, alertTransition, {
    tag: Tag,
    className: classes,
    in: open,
    role: "alert"
  }), dismissible ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: closeClasses,
    "aria-label": closeAriaLabel,
    onClick: dismissible
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7")) : null, children);
};

Alert.propTypes = {
  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The close button's class name.
   */
  closeClassName: propTypes.string,

  /**
   * The close button's aria label.
   */
  closeAriaLabel: propTypes.string,

  /**
   * The theme color.
   */
  theme: propTypes.string,

  /**
   * Whether it should fade, or not.
   */
  fade: propTypes.bool,

  /**
   * Whether is open, or not.
   */
  open: propTypes.bool,

  /**
   * Whether is dismissible, or not.
   */
  dismissible: propTypes.func,

  /**
   * The transition config. See `Fade` component for more details.
   */
  transition: propTypes.shape(Fade.propTypes),

  /**
   * The component tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
Alert.defaultProps = {
  theme: "primary",
  open: true,
  tag: "div",
  closeAriaLabel: "Close",
  fade: true,
  transition: _objectSpread2(_objectSpread2({}, Fade.defaultProps), {}, {
    unmountOnExit: true
  })
};

var _excluded$2 = ["tag", "className", "theme", "pill", "outline"];
/**
 * Badges are really great for labels and count values.
 */

var Badge = function Badge(props) {
  var Tag = props.tag,
      className = props.className,
      theme = props.theme,
      pill = props.pill,
      outline = props.outline,
      attrs = _objectWithoutProperties(props, _excluded$2);

  var classes = classNames(className, "badge", theme && !outline && "badge-".concat(theme), outline && "badge-outline-".concat(theme), pill && "badge-pill");
  Tag = attrs.href && Tag === "span" ? "a" : Tag;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

Badge.propTypes = {
  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The theme color.
   */
  theme: propTypes.string,

  /**
   * Whether it should be outlined, or not.
   */
  outline: propTypes.bool,

  /**
   * Whether it should be a pill, or not.
   */
  pill: propTypes.bool,

  /**
   * The component tag.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
Badge.defaultProps = {
  theme: "primary",
  pill: false,
  outline: false,
  tag: "span"
};

var _excluded$3 = ["className", "listClassName", "children", "tag", "listTag", "aria-label"];
/**
 * The breadcrumb component is great for indicating the current page's location within a navigational hierarchy.
 */

var Breadcrumb = function Breadcrumb(props) {
  var className = props.className,
      listClassName = props.listClassName,
      children = props.children,
      Tag = props.tag,
      ListTag = props.listTag,
      label = props["aria-label"],
      attrs = _objectWithoutProperties(props, _excluded$3);

  var classes = classNames(className);
  var listClasses = classNames("breadcrumb", listClassName);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes,
    "aria-label": label
  }), /*#__PURE__*/React.createElement(ListTag, {
    className: listClasses
  }, children));
};

Breadcrumb.propTypes = {
  /**
   * The breadcrumb list class name.
   */
  listClassName: propTypes.string,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The aria label value.
   */
  "aria-label": propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The component tag name.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  /**
   * The breadcrumb list tag.
   */
  listTag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
Breadcrumb.defaultProps = {
  "aria-label": "breadcrumb",
  tag: "nav",
  listTag: "ol"
};

var _excluded$4 = ["className", "active", "tag"];

var BreadcrumbItem = function BreadcrumbItem(props) {
  var className = props.className,
      active = props.active,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$4);

  var classes = classNames(className, active && "active", "breadcrumb-item");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes,
    "aria-current": active ? "page" : undefined
  }));
};

BreadcrumbItem.propTypes = {
  /**
   * Whether it is active, or not.
   */
  active: propTypes.bool,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component tag.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
BreadcrumbItem.defaultProps = {
  tag: "li"
};

var _excluded$5 = ["className", "theme", "size", "pill", "outline", "squared", "active", "disabled", "innerRef", "tag", "block"];
/**
 * Buttons are Bootstrap's core component for triggering various actions. In Shards, they're very flxible, support multiple sizes, styles, states and many more.
 */

var Button = /*#__PURE__*/function (_React$Component) {
  _inherits(Button, _React$Component);

  var _super = _createSuper(Button);

  function Button(props) {
    var _this;

    _classCallCheck(this, Button);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Button, [{
    key: "onClick",
    value: function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          theme = _this$props.theme,
          size = _this$props.size,
          pill = _this$props.pill,
          outline = _this$props.outline,
          squared = _this$props.squared,
          active = _this$props.active,
          disabled = _this$props.disabled,
          innerRef = _this$props.innerRef,
          Tag = _this$props.tag,
          block = _this$props.block,
          attrs = _objectWithoutProperties(_this$props, _excluded$5);

      var classes = classNames(className, "btn", theme && "btn-".concat(outline ? "outline-" : "").concat(theme), size && "btn-".concat(size), pill && "btn-pill", squared && "btn-squared", block && "btn-block", active && "active");
      Tag = attrs.href && Tag === "button" ? "a" : Tag;
      var tagType = Tag === "button" && attrs.onClick ? "button" : undefined;
      return /*#__PURE__*/React.createElement(Tag, _extends({
        ref: innerRef,
        type: tagType
      }, attrs, {
        className: classes,
        disabled: disabled,
        onClick: this.onClick
      }));
    }
  }]);

  return Button;
}(React.Component);

Button.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The theme color.
   */
  theme: propTypes.string,

  /**
   * The size.
   */
  size: propTypes.string,

  /**
   * Whether it is outline, or not.
   */
  outline: propTypes.bool,

  /**
   * Whether it is pill, or not.
   */
  pill: propTypes.bool,

  /**
   * Whether it is squared, or not.
   */
  squared: propTypes.bool,

  /**
   * Whether it is active, or not.
   */
  active: propTypes.bool,

  /**
   * Whether it should be displayed as a block (full-width), or not.
   */
  block: propTypes.bool,

  /**
   * Whether it is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * The component tag.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  /**
   * The inner ref.
   * @type {[type]}
   */
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string])
};
Button.defaultProps = {
  theme: "primary",
  tag: "button"
};

var _excluded$6 = ["className", "vertical", "size"];
/**
 * Button groups allow you to group buttons together on a single line.
 */

var ButtonGroup = function ButtonGroup(props) {
  var className = props.className,
      vertical = props.vertical,
      size = props.size,
      attrs = _objectWithoutProperties(props, _excluded$6);

  var classes = classNames(className, size && "btn-group-".concat(size), vertical ? "btn-group-vertical" : "btn-group");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, attrs));
};

ButtonGroup.propTypes = {
  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The size.
   */
  size: propTypes.string,

  /**
   * Whether it is vertical, or not.
   */
  vertical: propTypes.bool
};

var _excluded$7 = ["className"];
/**
 * Button toolbars allow you to group a series of button or input groups on a single line.
 */

var ButtonToolbar = function ButtonToolbar(props) {
  var className = props.className,
      attrs = _objectWithoutProperties(props, _excluded$7);

  var classes = classNames(className, "btn-toolbar");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, attrs));
};

ButtonToolbar.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node])
};

var _excluded$8 = ["className", "innerRef", "tag", "theme", "outline", "small"];
/**
 * Cards provide a flexible content container that you can use to display a variety of content using contextual background colors, headers and footers.
 */

var Card = function Card(props) {
  var className = props.className,
      innerRef = props.innerRef,
      Tag = props.tag,
      theme = props.theme,
      outline = props.outline,
      small = props.small,
      attrs = _objectWithoutProperties(props, _excluded$8);

  var classes = classNames(className, "card", small && "card-small", theme && "".concat(outline ? "border" : "bg", "-").concat(theme));
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes,
    ref: innerRef
  }));
};

Card.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The theme color.
   */
  theme: propTypes.string,

  /**
   * Whether it is outline, or not.
   */
  outline: propTypes.bool,

  /**
   * The component tag.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  /**
   * Whether the card is small, or not.
   */
  small: propTypes.bool,

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.string, propTypes.object, propTypes.func])
};
Card.defaultProps = {
  tag: "div"
};

var _excluded$9 = ["className", "tag", "children"];

var CardBody = function CardBody(props) {
  var className = props.className,
      Tag = props.tag,
      children = props.children,
      attrs = _objectWithoutProperties(props, _excluded$9);

  var classes = classNames(className, "card-body");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }), children);
};

CardBody.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]),

  /**
   * The component tag.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
CardBody.defaultProps = {
  tag: "div"
};

var _excluded$a = ["className", "tag"];

var CardColumns = function CardColumns(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$a);

  var classes = classNames(className, "card-columns");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

CardColumns.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
CardColumns.defaultProps = {
  tag: "div"
};

var _excluded$b = ["className", "tag"];

var CardFooter = function CardFooter(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$b);

  var classes = classNames(className, "card-footer");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

CardFooter.propTypes = {
  /**
   * The component tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  /**
   * The class name.
   */
  className: propTypes.string
};
CardFooter.defaultProps = {
  tag: "div"
};

var _excluded$c = ["className", "tag"];

var CardGroup = function CardGroup(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$c);

  var classes = classNames(className, "card-group");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

CardGroup.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
CardGroup.defaultProps = {
  tag: "div"
};

var _excluded$d = ["className", "tag"];

var CardDeck = function CardDeck(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$d);

  var classes = classNames(className, "card-deck");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

CardDeck.propTypes = {
  /**
   * The component tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  /**
   * The class name.
   */
  className: propTypes.string
};
CardDeck.defaultProps = {
  tag: "div"
};

var _excluded$e = ["className", "tag"];

var CardHeader = function CardHeader(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$e);

  var classes = classNames(className, "card-header");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

CardHeader.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
CardHeader.defaultProps = {
  tag: "div"
};

var _excluded$f = ["className", "top", "bottom", "tag"];

var CardImg = function CardImg(props) {
  var className = props.className,
      top = props.top,
      bottom = props.bottom,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$f);

  var cardImgClass = "";

  if (top) {
    cardImgClass = "card-img-top";
  }

  if (bottom) {
    cardImgClass = "card-img-bottom";
  }

  cardImgClass = classNames(className, cardImgClass);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: cardImgClass
  }));
};

CardImg.propTypes = {
  /**
   * Whether the image is positioned at the top of the card, or not.
   */
  top: propTypes.bool,

  /**
   * Whether the image is positioned at the bottom of the card, or not.
   */
  bottom: propTypes.bool,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
CardImg.defaultProps = {
  tag: "img"
};

var _excluded$g = ["className", "tag"];

var CardImgOverlay = function CardImgOverlay(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$g);

  var classes = classNames(className, "card-img-overlay");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

CardImgOverlay.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
CardImgOverlay.defaultProps = {
  tag: "div"
};

var _excluded$h = ["className", "tag", "innerRef"];

var CardLink = function CardLink(props) {
  var className = props.className,
      Tag = props.tag,
      innerRef = props.innerRef,
      attrs = _objectWithoutProperties(props, _excluded$h);

  var classes = classNames(className, "card-link");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    ref: innerRef,
    className: classes
  }));
};

CardLink.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string])
};
CardLink.defaultProps = {
  tag: "a"
};

var _excluded$i = ["className", "tag"];

var CardSubtitle = function CardSubtitle(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$i);

  var classes = classNames(className, "card-subtitle", "text-muted");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

CardSubtitle.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
CardSubtitle.defaultProps = {
  tag: "h6"
};

var _excluded$j = ["className", "tag"];

var CardText = function CardText(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$j);

  var classes = classNames(className, "card-text");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

CardText.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
CardText.defaultProps = {
  tag: "p"
};

var _excluded$k = ["className", "tag"];

var CardTitle = function CardTitle(props) {
  var className = props.className,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, _excluded$k);

  var classes = classNames(className, "card-title");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardTitle.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
CardTitle.defaultProps = {
  tag: "h5"
};

const reflow = node => {
  void node.offsetHeight;
};
const getNodeHeight = node => {
  return node.scrollHeight;
};
const isBrowser = !!(typeof window !== "undefined" && window.document);
const isRef = target => {
  if (target && typeof target === "object") {
    return "current" in target;
  }

  return false;
};
const getDOMElements = target => {
  if (typeof target === 'function') {
    return target();
  }

  if (isRef(target)) {
    return target.current;
  }

  if (!isBrowser && typeof target !== "string") {
    return target;
  }

  const results = document.querySelectorAll(target);

  if (!results.length) {
    throw new Error(`No DOM elements were found for ${target}.`);
  }

  return results;
};
const getTarget = target => {
  const results = getDOMElements(target);
  return results.length ? results[0] : results;
};
const CustomPropTypes = {
  target: propTypes.oneOfType([propTypes.string, propTypes.func, propTypes.element, propTypes.shape({
    current: propTypes.any
  })]),
  column: propTypes.oneOfType([propTypes.bool, propTypes.number, propTypes.string, propTypes.shape({
    offset: propTypes.oneOfType([propTypes.number, propTypes.string]),
    size: propTypes.oneOfType([propTypes.bool, propTypes.number, propTypes.string]),
    order: propTypes.oneOfType([propTypes.number, propTypes.string])
  })])
};

var _excluded$l = ["tag", "open", "className", "navbar", "children", "innerRef"];
/**
 * The `Collapse` component allows you to easily toggle the visibility of your content.
 */

var Collapse = /*#__PURE__*/function (_React$Component) {
  _inherits(Collapse, _React$Component);

  var _super = _createSuper(Collapse);

  function Collapse(props) {
    var _this;

    _classCallCheck(this, Collapse);

    _this = _super.call(this, props);
    _this.state = {
      height: null
    };
    return _this;
  }

  _createClass(Collapse, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Tag = _this$props.tag,
          open = _this$props.open,
          className = _this$props.className,
          navbar = _this$props.navbar,
          children = _this$props.children,
          innerRef = _this$props.innerRef,
          attrs = _objectWithoutProperties(_this$props, _excluded$l);

      var height = this.state.height;
      var transitionProps = pick(attrs, TRANSITION_KEYS);
      var childProps = omit(attrs, TRANSITION_KEYS);
      return /*#__PURE__*/React.createElement(Transition, _extends({}, transitionProps, {
        in: open,
        onEntering: this.onEntering.bind(this),
        onEntered: this.onEntered.bind(this),
        onExit: this.onExit.bind(this),
        onExiting: this.onExiting.bind(this),
        onExited: this.onExited.bind(this)
      }), function (status) {
        var style = {
          height: height || null,
          display: status !== "exited" && "block"
        };
        var classes = classNames(className, TRANSITION_CLASS_MAP[status] || "collapse", navbar && "navbar-collapse");
        return /*#__PURE__*/React.createElement(Tag, _extends({}, childProps, {
          style: _objectSpread2(_objectSpread2({}, childProps.style), style),
          className: classes,
          ref: innerRef
        }), children);
      });
    }
  }, {
    key: "onEntering",
    value: function onEntering(node, isAppearing) {
      this.setState({
        height: getNodeHeight(node)
      });
      this.props.onEntering(node, isAppearing);
    }
  }, {
    key: "onEntered",
    value: function onEntered(node, isAppearing) {
      this.setState({
        height: null
      });
      this.props.onEntered(node, isAppearing);
    }
  }, {
    key: "onExit",
    value: function onExit(node) {
      this.setState({
        height: getNodeHeight(node)
      });
      this.props.onExit(node);
    }
  }, {
    key: "onExiting",
    value: function onExiting(node) {
      reflow(node);
      this.setState({
        height: 0
      });
      this.props.onExiting(node);
    }
  }, {
    key: "onExited",
    value: function onExited(node) {
      this.setState({
        height: null
      });
      this.props.onExited(node);
    }
  }]);

  return Collapse;
}(React.Component);

Collapse.propTypes = _objectSpread2(_objectSpread2({}, Transition.propTypes), {}, {
  /**
   * Whether it is open, or not.
   */
  open: propTypes.bool,

  /**
   * The children components.
   */
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]),

  /**
   * The element tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  /**
   * The class name.
   */
  className: propTypes.node,

  /**
   * Whether it is located inside a navbar, or not.
   */
  navbar: propTypes.bool,

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.func, propTypes.string, propTypes.object])
});
Collapse.defaultProps = _objectSpread2(_objectSpread2({}, Transition.defaultProps), {}, {
  open: false,
  appear: false,
  enter: true,
  exit: true,
  tag: "div",
  timeout: TIMEOUT.COLLAPSE
});

var _excluded$m = ["className", "fluid", "tag"];
/**
 * Shards React provides support for all native Bootstrap 4 layout elements including **containers**, **rows**, **columns** and **form rows** so you can use its full power while building your project's responsive layout powered by flexbox.
 */

var Container = function Container(props) {
  var className = props.className,
      fluid = props.fluid,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$m);

  var classes = classNames(className, fluid ? "container-fluid" : "container");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

Container.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether it is fluid, or not.
   */
  fluid: propTypes.bool,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
Container.defaultProps = {
  tag: "div"
};

var _excluded$n = ["noGutters", "form", "className", "tag"];

var Row = function Row(props) {
  var noGutters = props.noGutters,
      form = props.form,
      className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$n);

  var classes = classNames(className, noGutters ? 'no-gutters' : null, form ? 'form-row' : 'row');
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

Row.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether it has gutters, or not.
   */
  noGutters: propTypes.bool,

  /**
   * Whether it is located inside a form, or not.
   */
  form: propTypes.bool,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
Row.defaultProps = {
  tag: 'div'
};

var _excluded$o = ["className", "breakpoints", "tag"];

var makeColumnClass = function makeColumnClass(isXs, breakpoint, colSize) {
  if (colSize === true || colSize === "") {
    return isXs ? "col" : "col-".concat(breakpoint);
  } else if (colSize === "auto") {
    return isXs ? "col-auto" : "col-".concat(breakpoint, "-auto");
  }

  return isXs ? "col-".concat(colSize) : "col-".concat(breakpoint, "-").concat(colSize);
};

var Col = function Col(props) {
  var className = props.className,
      breakpoints = props.breakpoints,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$o);

  var columnClasses = [];
  breakpoints.forEach(function (breakpoint, idx) {
    var _classNames;

    var columnProp = props[breakpoint];
    delete attrs[breakpoint];

    if (!columnProp && columnProp !== "") {
      return;
    }

    var isXs = idx === 0;

    if (_typeof(columnProp) !== "object") {
      var _colClass = makeColumnClass(isXs, breakpoint, columnProp);

      columnClasses.push(_colClass);
      return;
    }

    var colSizeInterfix = isXs ? "-" : "-".concat(breakpoint, "-");
    var colClass = makeColumnClass(isXs, breakpoint, columnProp.size);
    columnClasses.push(classNames((_classNames = {}, _defineProperty(_classNames, colClass, columnProp.size || columnProp.size === ""), _defineProperty(_classNames, "order".concat(colSizeInterfix).concat(columnProp.order), columnProp.order || columnProp.order === 0), _defineProperty(_classNames, "offset".concat(colSizeInterfix).concat(columnProp.offset), columnProp.offset || columnProp.offset === 0), _classNames)));
  });

  if (!columnClasses.length) {
    columnClasses.push("col");
  }

  var classes = classNames(className, columnClasses);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

Col.propTypes = {
  /**
   * Col number or config object for xs viewports.
   */
  xs: CustomPropTypes.column,

  /**
   * Col number or config object for sm viewports.
   */
  sm: CustomPropTypes.column,

  /**
   * Col number or config object for md viewports.
   */
  md: CustomPropTypes.column,

  /**
   * Col number or config object for lg viewports.
   */
  lg: CustomPropTypes.column,

  /**
   * Col number or config object for xl viewports.
   */
  xl: CustomPropTypes.column,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The available breakpoints.
   */
  breakpoints: propTypes.array,

  /**
   * The component tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
Col.defaultProps = {
  tag: "div",
  breakpoints: BREAKPOINTS
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "@charset \"UTF-8\";\n.react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-year-read-view--down-arrow, .react-datepicker__navigation-icon::before {\n  border-color: #ccc;\n  border-style: solid;\n  border-width: 3px 3px 0 0;\n  content: \"\";\n  display: block;\n  height: 9px;\n  position: absolute;\n  top: 6px;\n  width: 9px;\n}\n.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle {\n  margin-left: -4px;\n  position: absolute;\n  width: 0;\n}\n.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::after, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after {\n  box-sizing: content-box;\n  position: absolute;\n  border: 8px solid transparent;\n  height: 0;\n  width: 1px;\n  content: \"\";\n  z-index: -1;\n  border-width: 8px;\n  left: -8px;\n}\n.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before {\n  border-bottom-color: #aeaeae;\n}\n\n.react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle {\n  top: 0;\n  margin-top: -8px;\n}\n.react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after {\n  border-top: none;\n  border-bottom-color: #f0f0f0;\n}\n.react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after {\n  top: 0;\n}\n.react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before {\n  top: -1px;\n  border-bottom-color: #aeaeae;\n}\n\n.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle {\n  bottom: 0;\n  margin-bottom: -8px;\n}\n.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::after {\n  border-bottom: none;\n  border-top-color: #fff;\n}\n.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::after {\n  bottom: 0;\n}\n.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::before {\n  bottom: -1px;\n  border-top-color: #aeaeae;\n}\n\n.react-datepicker-wrapper {\n  display: inline-block;\n  padding: 0;\n  border: 0;\n  width: 100%;\n}\n\n.react-datepicker {\n  font-family: \"Helvetica Neue\", helvetica, arial, sans-serif;\n  font-size: 0.8rem;\n  background-color: #fff;\n  color: #000;\n  border: 1px solid #aeaeae;\n  border-radius: 0.3rem;\n  display: inline-block;\n  position: relative;\n}\n\n.react-datepicker--time-only .react-datepicker__triangle {\n  left: 35px;\n}\n.react-datepicker--time-only .react-datepicker__time-container {\n  border-left: 0;\n}\n.react-datepicker--time-only .react-datepicker__time,\n.react-datepicker--time-only .react-datepicker__time-box {\n  border-bottom-left-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem;\n}\n\n.react-datepicker__triangle {\n  position: absolute;\n  left: 50px;\n}\n\n.react-datepicker-popper {\n  z-index: 1;\n}\n.react-datepicker-popper[data-placement^=bottom] {\n  padding-top: 10px;\n}\n.react-datepicker-popper[data-placement=bottom-end] .react-datepicker__triangle, .react-datepicker-popper[data-placement=top-end] .react-datepicker__triangle {\n  left: auto;\n  right: 50px;\n}\n.react-datepicker-popper[data-placement^=top] {\n  padding-bottom: 10px;\n}\n.react-datepicker-popper[data-placement^=right] {\n  padding-left: 8px;\n}\n.react-datepicker-popper[data-placement^=right] .react-datepicker__triangle {\n  left: auto;\n  right: 42px;\n}\n.react-datepicker-popper[data-placement^=left] {\n  padding-right: 8px;\n}\n.react-datepicker-popper[data-placement^=left] .react-datepicker__triangle {\n  left: 42px;\n  right: auto;\n}\n\n.react-datepicker__header {\n  text-align: center;\n  background-color: #f0f0f0;\n  border-bottom: 1px solid #aeaeae;\n  border-top-left-radius: 0.3rem;\n  padding: 8px 0;\n  position: relative;\n}\n.react-datepicker__header--time {\n  padding-bottom: 8px;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n.react-datepicker__header--time:not(.react-datepicker__header--time--only) {\n  border-top-left-radius: 0;\n}\n.react-datepicker__header:not(.react-datepicker__header--has-time-select) {\n  border-top-right-radius: 0.3rem;\n}\n\n.react-datepicker__year-dropdown-container--select,\n.react-datepicker__month-dropdown-container--select,\n.react-datepicker__month-year-dropdown-container--select,\n.react-datepicker__year-dropdown-container--scroll,\n.react-datepicker__month-dropdown-container--scroll,\n.react-datepicker__month-year-dropdown-container--scroll {\n  display: inline-block;\n  margin: 0 2px;\n}\n\n.react-datepicker__current-month,\n.react-datepicker-time__header,\n.react-datepicker-year-header {\n  margin-top: 0;\n  color: #000;\n  font-weight: bold;\n  font-size: 0.944rem;\n}\n\n.react-datepicker-time__header {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.react-datepicker__navigation {\n  align-items: center;\n  background: none;\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  cursor: pointer;\n  position: absolute;\n  top: 2px;\n  padding: 0;\n  border: none;\n  z-index: 1;\n  height: 32px;\n  width: 32px;\n  text-indent: -999em;\n  overflow: hidden;\n}\n.react-datepicker__navigation--previous {\n  left: 2px;\n}\n.react-datepicker__navigation--next {\n  right: 2px;\n}\n.react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {\n  right: 85px;\n}\n.react-datepicker__navigation--years {\n  position: relative;\n  top: 0;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.react-datepicker__navigation--years-previous {\n  top: 4px;\n}\n.react-datepicker__navigation--years-upcoming {\n  top: -4px;\n}\n.react-datepicker__navigation:hover *::before {\n  border-color: #a6a6a6;\n}\n\n.react-datepicker__navigation-icon {\n  position: relative;\n  top: -1px;\n  font-size: 20px;\n  width: 0;\n}\n.react-datepicker__navigation-icon--next {\n  left: -2px;\n}\n.react-datepicker__navigation-icon--next::before {\n  transform: rotate(45deg);\n  left: -7px;\n}\n.react-datepicker__navigation-icon--previous {\n  right: -2px;\n}\n.react-datepicker__navigation-icon--previous::before {\n  transform: rotate(225deg);\n  right: -7px;\n}\n\n.react-datepicker__month-container {\n  float: left;\n}\n\n.react-datepicker__year {\n  margin: 0.4rem;\n  text-align: center;\n}\n.react-datepicker__year-wrapper {\n  display: flex;\n  flex-wrap: wrap;\n  max-width: 180px;\n}\n.react-datepicker__year .react-datepicker__year-text {\n  display: inline-block;\n  width: 4rem;\n  margin: 2px;\n}\n\n.react-datepicker__month {\n  margin: 0.4rem;\n  text-align: center;\n}\n.react-datepicker__month .react-datepicker__month-text,\n.react-datepicker__month .react-datepicker__quarter-text {\n  display: inline-block;\n  width: 4rem;\n  margin: 2px;\n}\n\n.react-datepicker__input-time-container {\n  clear: both;\n  width: 100%;\n  float: left;\n  margin: 5px 0 10px 15px;\n  text-align: left;\n}\n.react-datepicker__input-time-container .react-datepicker-time__caption {\n  display: inline-block;\n}\n.react-datepicker__input-time-container .react-datepicker-time__input-container {\n  display: inline-block;\n}\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input {\n  display: inline-block;\n  margin-left: 10px;\n}\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input {\n  width: auto;\n}\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input[type=time]::-webkit-inner-spin-button,\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input[type=time]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input[type=time] {\n  -moz-appearance: textfield;\n}\n.react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__delimiter {\n  margin-left: 5px;\n  display: inline-block;\n}\n\n.react-datepicker__time-container {\n  float: right;\n  border-left: 1px solid #aeaeae;\n  width: 85px;\n}\n.react-datepicker__time-container--with-today-button {\n  display: inline;\n  border: 1px solid #aeaeae;\n  border-radius: 0.3rem;\n  position: absolute;\n  right: -72px;\n  top: 0;\n}\n.react-datepicker__time-container .react-datepicker__time {\n  position: relative;\n  background: white;\n  border-bottom-right-radius: 0.3rem;\n}\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {\n  width: 85px;\n  overflow-x: hidden;\n  margin: 0 auto;\n  text-align: center;\n  border-bottom-right-radius: 0.3rem;\n}\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {\n  list-style: none;\n  margin: 0;\n  height: calc(195px + (1.7rem / 2));\n  overflow-y: scroll;\n  padding-right: 0;\n  padding-left: 0;\n  width: 100%;\n  box-sizing: content-box;\n}\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {\n  height: 30px;\n  padding: 5px 10px;\n  white-space: nowrap;\n}\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover {\n  cursor: pointer;\n  background-color: #f0f0f0;\n}\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {\n  background-color: #216ba5;\n  color: white;\n  font-weight: bold;\n}\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected:hover {\n  background-color: #216ba5;\n}\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--disabled {\n  color: #ccc;\n}\n.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--disabled:hover {\n  cursor: default;\n  background-color: transparent;\n}\n\n.react-datepicker__week-number {\n  color: #ccc;\n  display: inline-block;\n  width: 1.7rem;\n  line-height: 1.7rem;\n  text-align: center;\n  margin: 0.166rem;\n}\n.react-datepicker__week-number.react-datepicker__week-number--clickable {\n  cursor: pointer;\n}\n.react-datepicker__week-number.react-datepicker__week-number--clickable:hover {\n  border-radius: 0.3rem;\n  background-color: #f0f0f0;\n}\n\n.react-datepicker__day-names,\n.react-datepicker__week {\n  white-space: nowrap;\n}\n\n.react-datepicker__day-names {\n  margin-bottom: -8px;\n}\n\n.react-datepicker__day-name,\n.react-datepicker__day,\n.react-datepicker__time-name {\n  color: #000;\n  display: inline-block;\n  width: 1.7rem;\n  line-height: 1.7rem;\n  text-align: center;\n  margin: 0.166rem;\n}\n\n.react-datepicker__month--selected, .react-datepicker__month--in-selecting-range, .react-datepicker__month--in-range,\n.react-datepicker__quarter--selected,\n.react-datepicker__quarter--in-selecting-range,\n.react-datepicker__quarter--in-range {\n  border-radius: 0.3rem;\n  background-color: #216ba5;\n  color: #fff;\n}\n.react-datepicker__month--selected:hover, .react-datepicker__month--in-selecting-range:hover, .react-datepicker__month--in-range:hover,\n.react-datepicker__quarter--selected:hover,\n.react-datepicker__quarter--in-selecting-range:hover,\n.react-datepicker__quarter--in-range:hover {\n  background-color: #1d5d90;\n}\n.react-datepicker__month--disabled,\n.react-datepicker__quarter--disabled {\n  color: #ccc;\n  pointer-events: none;\n}\n.react-datepicker__month--disabled:hover,\n.react-datepicker__quarter--disabled:hover {\n  cursor: default;\n  background-color: transparent;\n}\n\n.react-datepicker__day,\n.react-datepicker__month-text,\n.react-datepicker__quarter-text,\n.react-datepicker__year-text {\n  cursor: pointer;\n}\n.react-datepicker__day:hover,\n.react-datepicker__month-text:hover,\n.react-datepicker__quarter-text:hover,\n.react-datepicker__year-text:hover {\n  border-radius: 0.3rem;\n  background-color: #f0f0f0;\n}\n.react-datepicker__day--today,\n.react-datepicker__month-text--today,\n.react-datepicker__quarter-text--today,\n.react-datepicker__year-text--today {\n  font-weight: bold;\n}\n.react-datepicker__day--highlighted,\n.react-datepicker__month-text--highlighted,\n.react-datepicker__quarter-text--highlighted,\n.react-datepicker__year-text--highlighted {\n  border-radius: 0.3rem;\n  background-color: #3dcc4a;\n  color: #fff;\n}\n.react-datepicker__day--highlighted:hover,\n.react-datepicker__month-text--highlighted:hover,\n.react-datepicker__quarter-text--highlighted:hover,\n.react-datepicker__year-text--highlighted:hover {\n  background-color: #32be3f;\n}\n.react-datepicker__day--highlighted-custom-1,\n.react-datepicker__month-text--highlighted-custom-1,\n.react-datepicker__quarter-text--highlighted-custom-1,\n.react-datepicker__year-text--highlighted-custom-1 {\n  color: magenta;\n}\n.react-datepicker__day--highlighted-custom-2,\n.react-datepicker__month-text--highlighted-custom-2,\n.react-datepicker__quarter-text--highlighted-custom-2,\n.react-datepicker__year-text--highlighted-custom-2 {\n  color: green;\n}\n.react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range,\n.react-datepicker__month-text--selected,\n.react-datepicker__month-text--in-selecting-range,\n.react-datepicker__month-text--in-range,\n.react-datepicker__quarter-text--selected,\n.react-datepicker__quarter-text--in-selecting-range,\n.react-datepicker__quarter-text--in-range,\n.react-datepicker__year-text--selected,\n.react-datepicker__year-text--in-selecting-range,\n.react-datepicker__year-text--in-range {\n  border-radius: 0.3rem;\n  background-color: #216ba5;\n  color: #fff;\n}\n.react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover,\n.react-datepicker__month-text--selected:hover,\n.react-datepicker__month-text--in-selecting-range:hover,\n.react-datepicker__month-text--in-range:hover,\n.react-datepicker__quarter-text--selected:hover,\n.react-datepicker__quarter-text--in-selecting-range:hover,\n.react-datepicker__quarter-text--in-range:hover,\n.react-datepicker__year-text--selected:hover,\n.react-datepicker__year-text--in-selecting-range:hover,\n.react-datepicker__year-text--in-range:hover {\n  background-color: #1d5d90;\n}\n.react-datepicker__day--keyboard-selected,\n.react-datepicker__month-text--keyboard-selected,\n.react-datepicker__quarter-text--keyboard-selected,\n.react-datepicker__year-text--keyboard-selected {\n  border-radius: 0.3rem;\n  background-color: #2a87d0;\n  color: #fff;\n}\n.react-datepicker__day--keyboard-selected:hover,\n.react-datepicker__month-text--keyboard-selected:hover,\n.react-datepicker__quarter-text--keyboard-selected:hover,\n.react-datepicker__year-text--keyboard-selected:hover {\n  background-color: #1d5d90;\n}\n.react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range,\n.react-datepicker__month-text--in-range,\n.react-datepicker__quarter-text--in-range,\n.react-datepicker__year-text--in-range),\n.react-datepicker__month-text--in-selecting-range:not(.react-datepicker__day--in-range,\n.react-datepicker__month-text--in-range,\n.react-datepicker__quarter-text--in-range,\n.react-datepicker__year-text--in-range),\n.react-datepicker__quarter-text--in-selecting-range:not(.react-datepicker__day--in-range,\n.react-datepicker__month-text--in-range,\n.react-datepicker__quarter-text--in-range,\n.react-datepicker__year-text--in-range),\n.react-datepicker__year-text--in-selecting-range:not(.react-datepicker__day--in-range,\n.react-datepicker__month-text--in-range,\n.react-datepicker__quarter-text--in-range,\n.react-datepicker__year-text--in-range) {\n  background-color: rgba(33, 107, 165, 0.5);\n}\n.react-datepicker__month--selecting-range .react-datepicker__day--in-range:not(.react-datepicker__day--in-selecting-range,\n.react-datepicker__month-text--in-selecting-range,\n.react-datepicker__quarter-text--in-selecting-range,\n.react-datepicker__year-text--in-selecting-range),\n.react-datepicker__month--selecting-range .react-datepicker__month-text--in-range:not(.react-datepicker__day--in-selecting-range,\n.react-datepicker__month-text--in-selecting-range,\n.react-datepicker__quarter-text--in-selecting-range,\n.react-datepicker__year-text--in-selecting-range),\n.react-datepicker__month--selecting-range .react-datepicker__quarter-text--in-range:not(.react-datepicker__day--in-selecting-range,\n.react-datepicker__month-text--in-selecting-range,\n.react-datepicker__quarter-text--in-selecting-range,\n.react-datepicker__year-text--in-selecting-range),\n.react-datepicker__month--selecting-range .react-datepicker__year-text--in-range:not(.react-datepicker__day--in-selecting-range,\n.react-datepicker__month-text--in-selecting-range,\n.react-datepicker__quarter-text--in-selecting-range,\n.react-datepicker__year-text--in-selecting-range) {\n  background-color: #f0f0f0;\n  color: #000;\n}\n.react-datepicker__day--disabled,\n.react-datepicker__month-text--disabled,\n.react-datepicker__quarter-text--disabled,\n.react-datepicker__year-text--disabled {\n  cursor: default;\n  color: #ccc;\n}\n.react-datepicker__day--disabled:hover,\n.react-datepicker__month-text--disabled:hover,\n.react-datepicker__quarter-text--disabled:hover,\n.react-datepicker__year-text--disabled:hover {\n  background-color: transparent;\n}\n\n.react-datepicker__month-text.react-datepicker__month--selected:hover, .react-datepicker__month-text.react-datepicker__month--in-range:hover, .react-datepicker__month-text.react-datepicker__quarter--selected:hover, .react-datepicker__month-text.react-datepicker__quarter--in-range:hover,\n.react-datepicker__quarter-text.react-datepicker__month--selected:hover,\n.react-datepicker__quarter-text.react-datepicker__month--in-range:hover,\n.react-datepicker__quarter-text.react-datepicker__quarter--selected:hover,\n.react-datepicker__quarter-text.react-datepicker__quarter--in-range:hover {\n  background-color: #216ba5;\n}\n.react-datepicker__month-text:hover,\n.react-datepicker__quarter-text:hover {\n  background-color: #f0f0f0;\n}\n\n.react-datepicker__input-container {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n}\n\n.react-datepicker__year-read-view,\n.react-datepicker__month-read-view,\n.react-datepicker__month-year-read-view {\n  border: 1px solid transparent;\n  border-radius: 0.3rem;\n  position: relative;\n}\n.react-datepicker__year-read-view:hover,\n.react-datepicker__month-read-view:hover,\n.react-datepicker__month-year-read-view:hover {\n  cursor: pointer;\n}\n.react-datepicker__year-read-view:hover .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__year-read-view:hover .react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-read-view:hover .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-read-view:hover .react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-year-read-view:hover .react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-year-read-view:hover .react-datepicker__month-read-view--down-arrow {\n  border-top-color: #b3b3b3;\n}\n.react-datepicker__year-read-view--down-arrow,\n.react-datepicker__month-read-view--down-arrow,\n.react-datepicker__month-year-read-view--down-arrow {\n  transform: rotate(135deg);\n  right: -16px;\n  top: 0;\n}\n\n.react-datepicker__year-dropdown,\n.react-datepicker__month-dropdown,\n.react-datepicker__month-year-dropdown {\n  background-color: #f0f0f0;\n  position: absolute;\n  width: 50%;\n  left: 25%;\n  top: 30px;\n  z-index: 1;\n  text-align: center;\n  border-radius: 0.3rem;\n  border: 1px solid #aeaeae;\n}\n.react-datepicker__year-dropdown:hover,\n.react-datepicker__month-dropdown:hover,\n.react-datepicker__month-year-dropdown:hover {\n  cursor: pointer;\n}\n.react-datepicker__year-dropdown--scrollable,\n.react-datepicker__month-dropdown--scrollable,\n.react-datepicker__month-year-dropdown--scrollable {\n  height: 150px;\n  overflow-y: scroll;\n}\n\n.react-datepicker__year-option,\n.react-datepicker__month-option,\n.react-datepicker__month-year-option {\n  line-height: 20px;\n  width: 100%;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.react-datepicker__year-option:first-of-type,\n.react-datepicker__month-option:first-of-type,\n.react-datepicker__month-year-option:first-of-type {\n  border-top-left-radius: 0.3rem;\n  border-top-right-radius: 0.3rem;\n}\n.react-datepicker__year-option:last-of-type,\n.react-datepicker__month-option:last-of-type,\n.react-datepicker__month-year-option:last-of-type {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border-bottom-left-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem;\n}\n.react-datepicker__year-option:hover,\n.react-datepicker__month-option:hover,\n.react-datepicker__month-year-option:hover {\n  background-color: #ccc;\n}\n.react-datepicker__year-option:hover .react-datepicker__navigation--years-upcoming,\n.react-datepicker__month-option:hover .react-datepicker__navigation--years-upcoming,\n.react-datepicker__month-year-option:hover .react-datepicker__navigation--years-upcoming {\n  border-bottom-color: #b3b3b3;\n}\n.react-datepicker__year-option:hover .react-datepicker__navigation--years-previous,\n.react-datepicker__month-option:hover .react-datepicker__navigation--years-previous,\n.react-datepicker__month-year-option:hover .react-datepicker__navigation--years-previous {\n  border-top-color: #b3b3b3;\n}\n.react-datepicker__year-option--selected,\n.react-datepicker__month-option--selected,\n.react-datepicker__month-year-option--selected {\n  position: absolute;\n  left: 15px;\n}\n\n.react-datepicker__close-icon {\n  cursor: pointer;\n  background-color: transparent;\n  border: 0;\n  outline: 0;\n  padding: 0 6px 0 0;\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 100%;\n  display: table-cell;\n  vertical-align: middle;\n}\n.react-datepicker__close-icon::after {\n  cursor: pointer;\n  background-color: #216ba5;\n  color: #fff;\n  border-radius: 50%;\n  height: 16px;\n  width: 16px;\n  padding: 2px;\n  font-size: 12px;\n  line-height: 1;\n  text-align: center;\n  display: table-cell;\n  vertical-align: middle;\n  content: \"×\";\n}\n\n.react-datepicker__today-button {\n  background: #f0f0f0;\n  border-top: 1px solid #aeaeae;\n  cursor: pointer;\n  text-align: center;\n  font-weight: bold;\n  padding: 5px 0;\n  clear: left;\n}\n\n.react-datepicker__portal {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8);\n  left: 0;\n  top: 0;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  z-index: 2147483647;\n}\n.react-datepicker__portal .react-datepicker__day-name,\n.react-datepicker__portal .react-datepicker__day,\n.react-datepicker__portal .react-datepicker__time-name {\n  width: 3rem;\n  line-height: 3rem;\n}\n@media (max-width: 400px), (max-height: 550px) {\n  .react-datepicker__portal .react-datepicker__day-name,\n.react-datepicker__portal .react-datepicker__day,\n.react-datepicker__portal .react-datepicker__time-name {\n    width: 2rem;\n    line-height: 2rem;\n  }\n}\n.react-datepicker__portal .react-datepicker__current-month,\n.react-datepicker__portal .react-datepicker-time__header {\n  font-size: 1.44rem;\n}\n";
styleInject(css_248z);

var css_248z$1 = "/**\n * Datepicker Styles\n */\n\n.react-datepicker {\n  border: none;\n}\n\n.react-datepicker-popper,\n.react-datepicker {\n  z-index: 1000;\n}\n\n.react-datepicker__month-container {\n  border: none;\n  box-shadow: 0 0.5rem 4rem rgba(0, 0, 0, 0.11), 0 10px 20px rgba(0, 0, 0, 0.05),\n    0 2px 3px rgba(0, 0, 0, 0.06);\n}\n\n.react-datepicker__header {\n  border: none;\n  background: #fff;\n  padding-top: 20px;\n}\n\n.react-datepicker__day-name,\n.react-datepicker__day,\n.react-datepicker__time-name,\n.react-datepicker__current-month {\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,\n    Helvetica Neue, Arial, sans-serif;\n  color: #5a6169;\n}\n\n.react-datepicker__day--disabled {\n  color: #ddd;\n}\n\n.react-datepicker__day--disabled:hover {\n  background: transparent !important;\n}\n\n.react-datepicker__day {\n  transition: all 0.25s cubic-bezier(0.27, 0.01, 0.38, 1.06);\n}\n\n.react-datepicker__day:hover {\n  background-color: #eceeef;\n}\n\n.react-datepicker__current-month {\n  font-weight: 600;\n}\n\n.react-datepicker__day,\n.react-datepicker__day:hover,\n.react-datepicker__day--keyboard-selected {\n  border-radius: 50%;\n}\n\n.react-datepicker__day--highlighted {\n  background: #e6f2ff;\n}\n\n.react-datepicker__day--keyboard-selected,\n.react-datepicker__day--selected {\n  color: #fff;\n  background: #007bff;\n}\n\n.react-datepicker__day--keyboard-selected:hover,\n.react-datepicker__day--selected:hover {\n  background: #006fe6;\n}\n\n.react-datepicker__header,\n.react-datepicker__month-container {\n  border-bottom-left-radius: 0.375rem;\n  border-bottom-right-radius: 0.375rem;\n}\n\n.react-datepicker__header {\n  border-top-left-radius: 0.375rem;\n  border-top-right-radius: 0.375rem;\n}\n\n.react-datepicker {\n  border-radius: 0.375rem;\n}\n\n.react-datepicker__navigation {\n  top: 25px;\n}\n\n.react-datepicker__triangle:before {\n  border-bottom-color: #e3e3e3 !important;\n}\n\n.react-datepicker__month {\n  padding: 10px 15px;\n}\n\n/* Datepicker & Input Groups */\n\n.input-group > .react-datepicker-wrapper .form-control {\n  position: relative;\n}\n\n.input-group > .react-datepicker-wrapper:not(:first-child) .form-control {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.input-group > .react-datepicker-wrapper:not(:last-child) .form-control {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.input-group > .react-datepicker-wrapper ~ .react-datepicker-wrapper input {\n  margin-left: -1px;\n}\n\n.input-group\n  > .react-datepicker-wrapper\n  ~ .react-datepicker-wrapper\n  ~ .input-group-append {\n  margin-left: -2px;\n}\n\n.input-group > .react-datepicker-wrapper .form-control:focus {\n  z-index: 3;\n}\n";
styleInject(css_248z$1);

var _excluded$p = ["className", "size"];
/**
 * The `DatePicker` component is a wrapper for the [react-datepicker](https://github.com/Hacker0x01/react-datepicker) component.
 *
 * > **Note:** Make sure to check out its official documentation for the complete list of available props.
 */

var DatePicker = function DatePicker(props) {
  var className = props.className,
      size = props.size,
      attrs = _objectWithoutProperties(props, _excluded$p);

  var classes = classNames(className, "form-control", size && "form-control-".concat(size));

  if (!attrs.dropdownMode) {
    attrs.dropdownMode = "select";
  }

  return /*#__PURE__*/React.createElement(ReactDatePicker, _extends({}, props, {
    className: classes
  }));
};

DatePicker.propTypes = _objectSpread2(_objectSpread2({}, ReactDatePicker.propTypes), {
  size: propTypes.string
});

const DropdownContext = /*#__PURE__*/React.createContext({
  toggle: function () {},
  open: false,
  direction: "down",
  nav: false
});

var _excluded$q = ["className", "children", "dropup", "open", "group", "size", "nav", "setActiveFromChild", "active", "addonType"];
/**
 * You can use dropdowns to display accessible contextual overlays for displaying lists of links and more.
 */

var Dropdown = /*#__PURE__*/function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  var _super = _createSuper(Dropdown);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _super.call(this, props);
    _this.handleListeners = _this.handleListeners.bind(_assertThisInitialized(_this));
    _this.addListeners = _this.addListeners.bind(_assertThisInitialized(_this));
    _this.removeListeners = _this.removeListeners.bind(_assertThisInitialized(_this));
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_assertThisInitialized(_this));
    _this.getContainer = _this.getContainer.bind(_assertThisInitialized(_this));
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this.ref = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleListeners();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.open !== prevProps.open) {
        this.handleListeners();
      }
    }
  }, {
    key: "handleListeners",
    value: function handleListeners() {
      if (this.props.open) {
        this.addListeners();
        return;
      }

      this.removeListeners();
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this2 = this;

      EVENTS.CLICK.forEach(function (e) {
        return document.addEventListener(e, _this2.handleDocumentClick, true);
      });
    }
  }, {
    key: "removeListeners",
    value: function removeListeners() {
      var _this3 = this;

      EVENTS.CLICK.forEach(function (e) {
        return document.removeEventListener(e, _this3.handleDocumentClick, true);
      });
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.ref.current;
    }
  }, {
    key: "handleDocumentClick",
    value: function handleDocumentClick(e) {
      if (e && (e.which === 3 || e.type === "keyup" && e.which !== KEYCODES.TAB)) return;
      var container = this.getContainer();

      if (container.contains(e.target) && container !== e.target && (e.type !== "keyup" || e.which === KEYCODES.TAB)) {
        return;
      }

      this.toggle(e);
    }
  }, {
    key: "toggle",
    value: function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var props = omit(this.props, ["toggle", "disabled", "inNavbar", "direction"]);

      var className = props.className,
          children = props.children,
          dropup = props.dropup,
          open = props.open,
          group = props.group,
          size = props.size,
          nav = props.nav,
          setActiveFromChild = props.setActiveFromChild,
          active = props.active,
          addonType = props.addonType,
          attrs = _objectWithoutProperties(props, _excluded$q);

      var direction = this.props.direction === "down" && dropup ? "up" : this.props.direction;
      attrs.tag = attrs.tag || (nav ? "li" : "div");
      var subItemIsActive = false;

      if (setActiveFromChild) {
        React.Children.map(this.props.children[1].props.children, function (dropdownItem) {
          if (dropdownItem && dropdownItem.props.active) subItemIsActive = true;
        });
      }

      var classes = classNames(className, direction !== "down" && "drop".concat(direction), nav && active && "active", setActiveFromChild && subItemIsActive && "active", addonType && "input-group-".concat(addonType), group && "btn-group", !!size && "btn-group-".concat(size), !group && !addonType && "dropdown", open && "show", nav && "nav-item");
      var toggle = this.toggle;
      return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
        value: {
          toggle: toggle,
          open: open,
          direction: direction,
          nav: nav
        }
      }, /*#__PURE__*/React.createElement(reactPopper.Manager, attrs, /*#__PURE__*/React.createElement(DropdownContext.Consumer, null, function () {
        return /*#__PURE__*/React.createElement("div", {
          className: classes,
          ref: _this4.ref
        }, children);
      })));
    }
  }]);

  return Dropdown;
}(React.Component);

Dropdown.propTypes = {
  /**
   * Whether it is open, or not.
   */
  open: propTypes.bool,

  /**
   * Whether it is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * The toggle function.
   */
  toggle: propTypes.func,

  /**
   * Whether it is located inside a navbar, or not.
   */
  inNavbar: propTypes.bool,

  /**
   * Whether it is a drop-up, or not.
   */
  dropup: propTypes.bool,

  /**
   * The component's tag type.
   */
  tag: propTypes.string,

  /**
   * Whether it is located inside a Nav, or not.
   */
  nav: propTypes.bool,

  /**
   * The direction.
   */
  direction: propTypes.oneOf(["up", "down", "left", "right"])
};
Dropdown.defaultProps = {
  open: false,
  direction: "down",
  nav: false
};

var _excluded$r = ["className", "theme", "caret", "split", "nav", "tag"];

var DropdownToggle = /*#__PURE__*/function (_React$Component) {
  _inherits(DropdownToggle, _React$Component);

  var _super = _createSuper(DropdownToggle);

  function DropdownToggle(props) {
    var _this;

    _classCallCheck(this, DropdownToggle);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DropdownToggle, [{
    key: "onClick",
    value: function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.nav && !this.props.tag) {
        e.preventDefault();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }

      this.context.toggle(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          theme = _this$props.theme,
          caret = _this$props.caret,
          split = _this$props.split,
          nav = _this$props.nav,
          tag = _this$props.tag,
          attrs = _objectWithoutProperties(_this$props, _excluded$r);

      var ariaLabel = attrs["aria-label"] || "Toggle Dropdown";
      var classes = classNames(className, (caret || split) && "dropdown-toggle", split && "dropdown-toggle-split", nav && "nav-link");
      var children = attrs.children || /*#__PURE__*/React.createElement("span", {
        className: "sr-only"
      }, ariaLabel);
      var Tag;

      if (nav && !tag) {
        Tag = "a";
        attrs.href = "#";
      } else if (!tag) {
        Tag = Button;
        attrs.theme = theme;
      } else {
        Tag = tag;
      }

      if (this.context.inNavbar) {
        return /*#__PURE__*/React.createElement(reactPopper.Reference, null, function () {
          return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
            className: classes,
            onClick: _this2.onClick,
            "aria-expanded": _this2.context.isOpen
          }), children);
        });
      }

      return /*#__PURE__*/React.createElement(reactPopper.Reference, null, function () {
        return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
          className: classes,
          onClick: _this2.onClick,
          "aria-expanded": _this2.context.isOpen
        }), children);
      });
    }
  }]);

  return DropdownToggle;
}(React.Component);

DropdownToggle.propTypes = {
  /**
   * Whether it should display a caret, or not.
   */
  caret: propTypes.bool,

  /**
   * The theme color.
   */
  theme: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether it is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * The function that should be triggered on click.
   */
  onClick: propTypes.func,

  /**
   * The aria-haspopup attribute.
   */
  "aria-haspopup": propTypes.bool,

  /**
   * Whether it is split, or not.
   */
  split: propTypes.bool,

  /**
   * Whether it is located inside a nav, or not.
   */
  nav: propTypes.bool,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
DropdownToggle.defaultProps = {
  "aria-haspopup": true,
  theme: "primary"
};
DropdownToggle.contextType = DropdownContext;

var _excluded$s = ["className", "children", "right", "tag", "flip", "small", "modifiers", "persist"];

var DropdownMenu = /*#__PURE__*/function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  var _super = _createSuper(DropdownMenu);

  function DropdownMenu() {
    _classCallCheck(this, DropdownMenu);

    return _super.apply(this, arguments);
  }

  _createClass(DropdownMenu, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          right = _this$props.right,
          Tag = _this$props.tag,
          flip = _this$props.flip,
          small = _this$props.small,
          modifiers = _this$props.modifiers,
          persist = _this$props.persist,
          attrs = _objectWithoutProperties(_this$props, _excluded$s);

      var classes = classNames(className, "dropdown-menu", small && "dropdown-menu-small", right && "dropdown-menu-right", this.context.open && "show");

      if (persist || this.context.open && !this.context.inNavbar) {
        var pos1 = DROPDOWN_POSITION_MAP[this.context.direction.toUpperCase()] || "bottom";
        var pos2 = right ? "end" : "start";
        attrs.placement = "".concat(pos1, "-").concat(pos2);
        attrs.component = Tag;
        attrs.modifiers = !flip ? _objectSpread2(_objectSpread2({}, modifiers), {
          flip: {
            enabled: false
          }
        }) : modifiers;
        return /*#__PURE__*/React.createElement(reactPopper.Popper, attrs, function (_ref) {
          var ref = _ref.ref,
              placement = _ref.placement;
          return /*#__PURE__*/React.createElement("div", {
            ref: ref,
            className: classes,
            "x-placement": placement,
            "aria-hidden": !_this.context.open,
            tabIndex: "-1",
            role: "menu"
          }, children);
        });
      }

      return /*#__PURE__*/React.createElement(Tag, _extends({
        tabIndex: "-1",
        role: "menu"
      }, attrs, {
        className: classes
      }), children);
    }
  }]);

  return DropdownMenu;
}(React.Component);

DropdownMenu.propTypes = {
  /**
   * The component tag.
   */
  tag: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node.isRequired,

  /**
   * Whether it is positioned on the right side, or not.
   */
  right: propTypes.bool,

  /**
   * Whether it should flip, or not.
   */
  flip: propTypes.bool,

  /**
   * Whether the dropdown is small, or not.
   */
  small: propTypes.bool,

  /**
   * The modifiers config object.
   */
  modifiers: propTypes.object,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether it should persist, or not.
   */
  persist: propTypes.bool
};
DropdownMenu.defaultProps = {
  tag: "div",
  flip: true
};
DropdownMenu.contextType = DropdownContext;

var _excluded$t = ["className", "divider", "tag", "header", "active"];

var DropdownItem = /*#__PURE__*/function (_React$Component) {
  _inherits(DropdownItem, _React$Component);

  var _super = _createSuper(DropdownItem);

  function DropdownItem(props) {
    var _this;

    _classCallCheck(this, DropdownItem);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.getTabIndex = _this.getTabIndex.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DropdownItem, [{
    key: "onClick",
    value: function onClick(e) {
      if (this.props.disabled || this.props.header || this.props.divider) {
        e.preventDefault();
        return;
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }

      if (this.props.toggle) {
        this.context.toggle(e);
      }
    }
  }, {
    key: "getTabIndex",
    value: function getTabIndex() {
      if (this.props.disabled || this.props.header || this.props.divider) {
        return "-1";
      }

      return "0";
    }
  }, {
    key: "render",
    value: function render() {
      var _omit = omit(this.props, ["toggle"]),
          className = _omit.className,
          divider = _omit.divider,
          Tag = _omit.tag,
          header = _omit.header,
          active = _omit.active,
          attrs = _objectWithoutProperties(_omit, _excluded$t);

      var tabIndex = this.getTabIndex();
      var classes = classNames(className, attrs.disabled && "disabled", !divider && !header && "dropdown-item", header && "dropdown-header", divider && "dropdown-divider", active && "active");

      if (Tag === "button") {
        if (header) {
          Tag = "h6";
        } else if (divider) {
          Tag = "div";
        } else if (attrs.href) {
          Tag = "a";
        }
      }

      return /*#__PURE__*/React.createElement(Tag, _extends({
        type: Tag === "button" && (attrs.onClick || attrs.toggle) ? "button" : undefined
      }, attrs, {
        style: _objectSpread2({
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }, attrs && attrs.style),
        tabIndex: tabIndex,
        className: classes,
        onClick: this.onClick
      }));
    }
  }]);

  return DropdownItem;
}(React.Component);

DropdownItem.propTypes = {
  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * Whether it is active, or not.
   */
  active: propTypes.bool,

  /**
   * Whether it is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * Whether it is a divider, or not.
   */
  divider: propTypes.bool,

  /**
   * Whether it is a dropdown header item, or not.
   */
  header: propTypes.bool,

  /**
   * The function that should be triggered on click.
   */
  onClick: propTypes.func,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether it should toggle the dropdown, or not.
   */
  toggle: propTypes.bool,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
DropdownItem.defaultProps = {
  tag: "button",
  toggle: true
};
DropdownItem.contextType = DropdownContext;

var _excluded$u = ["className", "tag", "inline", "innerRef"];
/**
 * Examples and usage guidelines for form controls.
 */

var Form = /*#__PURE__*/function (_React$Component) {
  _inherits(Form, _React$Component);

  var _super = _createSuper(Form);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _super.call(this, props);
    _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Form, [{
    key: "getRef",
    value: function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    }
  }, {
    key: "submit",
    value: function submit() {
      if (this.ref) {
        this.ref.submit();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          Tag = _this$props.tag,
          inline = _this$props.inline,
          innerRef = _this$props.innerRef,
          attrs = _objectWithoutProperties(_this$props, _excluded$u);

      var classes = classNames(className, inline && "form-inline");
      return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
        ref: innerRef,
        className: classes
      }));
    }
  }]);

  return Form;
}(React.Component);

Form.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether it is inline, or not.
   */
  inline: propTypes.bool,

  /**
   * The children nodes.
   */
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]),

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string]),

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
Form.defaultProps = {
  tag: "form"
};

var _excluded$v = ["className", "valid", "tooltip", "tag"];

var FormFeedback = function FormFeedback(props) {
  var className = props.className,
      valid = props.valid,
      tooltip = props.tooltip,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$v);

  var validMode = tooltip ? "tooltip" : "feedback";
  var classes = classNames(className, valid ? "valid-".concat(validMode) : "invalid-".concat(validMode));
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

FormFeedback.propTypes = {
  /**
   * The children.
   */
  children: propTypes.node,

  /**
   * The tag type.
   */
  tag: propTypes.string,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether the feedback is valid, or not.
   */
  valid: propTypes.bool,

  /**
   * Whether the feedback should be displayed as tooltip.
   */
  tooltip: propTypes.bool
};
FormFeedback.defaultProps = {
  tag: "div",
  valid: undefined
};

var _excluded$w = ["className", "children", "inline", "valid", "invalid", "innerRef", "toggle", "small", "id"];
/**
 * The `FormCheckbox` component is a wrapper over Bootstrap's [custom checkbox component](https://getbootstrap.com/docs/4.1/components/forms/#checkboxes-and-radios-1).
 */

var FormCheckbox = /*#__PURE__*/function (_React$Component) {
  _inherits(FormCheckbox, _React$Component);

  var _super = _createSuper(FormCheckbox);

  function FormCheckbox(props) {
    var _this;

    _classCallCheck(this, FormCheckbox);

    _this = _super.call(this, props);
    _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormCheckbox, [{
    key: "getRef",
    value: function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          inline = _this$props.inline,
          valid = _this$props.valid,
          invalid = _this$props.invalid,
          innerRef = _this$props.innerRef,
          toggle = _this$props.toggle,
          small = _this$props.small,
          _id = _this$props.id,
          attrs = _objectWithoutProperties(_this$props, _excluded$w);

      var labelClasses = classNames(className, "custom-control", !toggle ? "custom-checkbox" : "custom-toggle", toggle && small && "custom-toggle-sm", inline && "custom-control-inline", valid && "is-valid", invalid && "is-invalid");
      var inputClasses = classNames("custom-control-input", valid && "is-valid", invalid && "is-invalid");

      var id = _id || "dr-checkbox-".concat(nanoid.nanoid());

      return /*#__PURE__*/React.createElement("label", {
        className: labelClasses
      }, /*#__PURE__*/React.createElement("input", _extends({}, attrs, {
        ref: innerRef,
        id: id,
        type: "checkbox",
        className: inputClasses
      })), /*#__PURE__*/React.createElement("label", {
        id: id,
        className: "custom-control-label",
        "aria-hidden": "true",
        onClick: this.props.onChange
      }), /*#__PURE__*/React.createElement("span", {
        className: "custom-control-description"
      }, children));
    }
  }]);

  return FormCheckbox;
}(React.Component);

FormCheckbox.defaultProps = {
  onChange: function onChange() {}
};
FormCheckbox.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * Whether it is inline, or not.
   */
  inline: propTypes.bool,

  /**
   * Whether it is valid, or not.
   */
  valid: propTypes.bool,

  /**
   * Whether it is invalid, or not.
   */
  invalid: propTypes.bool,

  /**
   * Whether it is a toggle button, or not.
   */
  toggle: propTypes.bool,

  /**
   * Whether it is small (toggle), or not.
   */
  small: propTypes.bool,

  /**
   * The onChange handler.
   */
  onChange: propTypes.func,

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string])
};

var _excluded$x = ["className", "row", "disabled", "check", "inline", "tag"];
/**
 * Form groups allow you to easily add structure to your forms.
 */

var FormGroup = function FormGroup(props) {
  var className = props.className,
      row = props.row,
      disabled = props.disabled,
      check = props.check,
      inline = props.inline,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$x);

  var classes = classNames(className, row && "row", check ? "form-check" : "form-group", check && inline && "form-check-inline", check && disabled && "disabled");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

FormGroup.propTypes = {
  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * Whether it is a row, or not.
   */
  row: propTypes.bool,

  /**
   * Whether it is a form check, or not.
   */
  check: propTypes.bool,

  /**
   * Whether it is displayed inline (form check) or not.
   */
  inline: propTypes.bool,

  /**
   * Whether it is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * The components' tag type.
   */
  tag: propTypes.string,

  /**
   * The class name.
   */
  className: propTypes.string
};
FormGroup.defaultProps = {
  tag: "div"
};

var _excluded$y = ["className", "plaintext", "size", "invalid", "valid", "innerRef"];
/**
 * The form input allows you to create various text style inputs such as `text`, `password`, `email`, `number`, `url`, `search` and more.
 */

var FormInput = /*#__PURE__*/function (_React$Component) {
  _inherits(FormInput, _React$Component);

  var _super = _createSuper(FormInput);

  function FormInput(props) {
    var _this;

    _classCallCheck(this, FormInput);

    _this = _super.call(this, props);
    _this.ref = null;
    _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
    _this.focus = _this.focus.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormInput, [{
    key: "getRef",
    value: function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.ref) {
        this.ref.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          plaintext = _this$props.plaintext,
          size = _this$props.size,
          invalid = _this$props.invalid,
          valid = _this$props.valid,
          innerRef = _this$props.innerRef,
          attrs = _objectWithoutProperties(_this$props, _excluded$y);

      var classes = classNames(className, plaintext ? "form-control-plaintext" : "form-control", plaintext && "w-100", size && "form-control-".concat(size), valid && "is-valid", invalid && "is-invalid");
      return /*#__PURE__*/React.createElement("input", _extends({}, attrs, {
        ref: innerRef,
        className: classes
      }));
    }
  }]);

  return FormInput;
}(React.Component);

FormInput.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * Whether it is inline, or not.
   */
  inline: propTypes.bool,

  /**
   * The input type.
   */
  type: propTypes.oneOf(INPUT_TYPES),

  /**
   * Whether it is plaintext, or not.
   */
  plaintext: propTypes.bool,

  /**
   * The input's size.
   */
  size: propTypes.string,

  /**
   * Whether it is valid, or not.
   */
  valid: propTypes.bool,

  /**
   * Whether it is invalid, or not.
   */
  invalid: propTypes.bool,

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string])
};

var _excluded$z = ["className", "children", "inline", "valid", "invalid", "innerRef", "onChange", "id"];

var FormRadio = /*#__PURE__*/function (_React$Component) {
  _inherits(FormRadio, _React$Component);

  var _super = _createSuper(FormRadio);

  function FormRadio(props) {
    var _this;

    _classCallCheck(this, FormRadio);

    _this = _super.call(this, props);
    _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormRadio, [{
    key: "getRef",
    value: function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          inline = _this$props.inline,
          valid = _this$props.valid,
          invalid = _this$props.invalid,
          innerRef = _this$props.innerRef,
          onChange = _this$props.onChange,
          _id = _this$props.id,
          attrs = _objectWithoutProperties(_this$props, _excluded$z);

      var labelClasses = classNames("custom-control", "custom-radio", inline && "custom-control-inline", valid && "is-valid", invalid && "is-invalid");
      var inputClasses = classNames(className, "custom-control-input", valid && "is-valid", invalid && "is-invalid");

      var id = _id || "dr-radio-".concat(nanoid.nanoid());

      return /*#__PURE__*/React.createElement("label", {
        className: labelClasses
      }, /*#__PURE__*/React.createElement("input", _extends({}, attrs, {
        ref: innerRef,
        id: id,
        type: "radio",
        className: inputClasses,
        onChange: onChange
      })), /*#__PURE__*/React.createElement("label", {
        id: id,
        className: "custom-control-label",
        "aria-hidden": "true",
        onClick: onChange
      }), /*#__PURE__*/React.createElement("span", {
        className: "custom-control-description"
      }, children));
    }
  }]);

  return FormRadio;
}(React.Component);

FormRadio.defaultProps = {
  onChange: function onChange() {}
};
FormRadio.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children.
   */
  children: propTypes.node,

  /**
   * Whether it is inline, or not.
   */
  inline: propTypes.bool,

  /**
   * Whether it is valid, or not.
   */
  valid: propTypes.bool,

  /**
   * The function that should run on change.
   */
  onChange: propTypes.func,

  /**
   * Whether it is invalid, or not.
   */
  invalid: propTypes.bool,

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string])
};

var _excluded$A = ["className", "children", "size", "valid", "invalid", "innerRef"];
/**
 * The `FormSelect` component is a wrapper over Bootstrap's [custom select component](https://getbootstrap.com/docs/4.1/components/forms/#select-menu).
 */

var FormSelect = /*#__PURE__*/function (_React$Component) {
  _inherits(FormSelect, _React$Component);

  var _super = _createSuper(FormSelect);

  function FormSelect(props) {
    var _this;

    _classCallCheck(this, FormSelect);

    _this = _super.call(this, props);
    _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormSelect, [{
    key: "getRef",
    value: function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          size = _this$props.size,
          valid = _this$props.valid,
          invalid = _this$props.invalid,
          innerRef = _this$props.innerRef,
          attrs = _objectWithoutProperties(_this$props, _excluded$A);

      var classes = classNames(className, "form-control", "custom-select", valid && "is-valid", invalid && "is-invalid", size && "form-control-".concat(size), size && "custom-select-".concat(size));
      return /*#__PURE__*/React.createElement("select", _extends({}, attrs, {
        className: classes,
        ref: innerRef
      }), children);
    }
  }]);

  return FormSelect;
}(React.Component);

FormSelect.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The size.
   */
  size: propTypes.string,

  /**
   * Whether it is valid, or not.
   */
  valid: propTypes.bool,

  /**
   * Whether it is invalid, or not.
   */
  invalid: propTypes.bool,

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string])
};

var _excluded$B = ["className", "children", "innerRef", "plaintext", "size", "valid", "invalid"];
/**
 * The `FormTextarea` component allows you to easily create multi-line text inputs.
 */

var FormTextarea = /*#__PURE__*/function (_React$Component) {
  _inherits(FormTextarea, _React$Component);

  var _super = _createSuper(FormTextarea);

  function FormTextarea(props) {
    var _this;

    _classCallCheck(this, FormTextarea);

    _this = _super.call(this, props);
    _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormTextarea, [{
    key: "getRef",
    value: function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          innerRef = _this$props.innerRef,
          plaintext = _this$props.plaintext,
          size = _this$props.size,
          valid = _this$props.valid,
          invalid = _this$props.invalid,
          attrs = _objectWithoutProperties(_this$props, _excluded$B);

      var classes = classNames(className, children, plaintext ? "form-control-plaintext" : "form-control", plaintext && "w-100", size && "form-control-".concat(size), valid && "is-valid", invalid && "is-invalid");
      return /*#__PURE__*/React.createElement("textarea", _extends({}, attrs, {
        className: classes,
        ref: innerRef
      }));
    }
  }]);

  return FormTextarea;
}(React.Component);

FormTextarea.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The size.
   */
  size: propTypes.string,

  /**
   * Whether it should be displayed as plain text, or not.
   */
  plaintext: propTypes.bool,

  /**
   * Whether it is valid, or not.
   */
  valid: propTypes.bool,

  /**
   * Whether it is invalid, or not.
   */
  invalid: propTypes.bool,

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string])
};

var _excluded$C = ["className", "tag", "size", "seamless"];
/**
 * Using the `InputGroup` component you can easily extend form controls by adding various elements such as text, buttons and button groups.
 */

var InputGroup = function InputGroup(props) {
  var className = props.className,
      Tag = props.tag,
      size = props.size,
      seamless = props.seamless,
      attrs = _objectWithoutProperties(props, _excluded$C);

  var classes = classNames(className, "input-group", seamless && "input-group-seamless", size && "input-group-".concat(size));
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

InputGroup.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The size.
   */
  size: propTypes.string,

  /**
   * Whether it is seamless, or not.
   */
  seamless: propTypes.bool,

  /**
   * The tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
InputGroup.defaultProps = {
  tag: "div"
};

var _excluded$D = ["className", "tag"];

var InputGroupText = function InputGroupText(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$D);

  var classes = classNames(className, "input-group-text");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

InputGroupText.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
InputGroupText.defaultProps = {
  tag: "span"
};

var _excluded$E = ["className", "children", "tag", "type"];

var InputGroupAddon = function InputGroupAddon(props) {
  var className = props.className,
      children = props.children,
      Tag = props.tag,
      type = props.type,
      attrs = _objectWithoutProperties(props, _excluded$E);

  var classes = classNames(className, "input-group-".concat(type));

  if (typeof children === "string") {
    return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
      className: classes
    }), /*#__PURE__*/React.createElement(InputGroupText, null, children));
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }), children);
};

InputGroupAddon.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The addon type.
   */
  type: propTypes.oneOf(INPUT_GROUP_ADDON_TYPES).isRequired,

  /**
   * The component's tag type.
   */
  tag: propTypes.string
};
InputGroupAddon.defaultProps = {
  tag: "div"
};

var _excluded$F = ["className", "tag", "flush", "small"];
/**
 * List groups allow you to display series of content.
 */

var ListGroup = function ListGroup(props) {
  var className = props.className,
      Tag = props.tag,
      flush = props.flush,
      small = props.small,
      attrs = _objectWithoutProperties(props, _excluded$F);

  var classes = classNames(className, "list-group", small && "list-group-sm", flush && "list-group-flush");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

ListGroup.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether the list group should be flushed, or not.
   */
  flush: propTypes.bool,

  /**
   * Whether the list group is small, or not.
   */
  small: propTypes.bool,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
ListGroup.defaultProps = {
  tag: "ul"
};

var _excluded$G = ["className", "tag", "active", "action", "disabled", "theme"];

var ListGroupItem = function ListGroupItem(props) {
  var className = props.className,
      Tag = props.tag,
      active = props.active,
      action = props.action,
      disabled = props.disabled,
      theme = props.theme,
      attrs = _objectWithoutProperties(props, _excluded$G);

  var classes = classNames(className, active && "active", disabled && "disabled", action && "list-group-item-action", theme && "list-group-item-".concat(theme), "list-group-item");

  if (disabled) {
    attrs.onClick = function (e) {
      e.preventDefault();
    };
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

ListGroupItem.propTypes = {
  /**
   * Whether it is active, or not.
   */
  active: propTypes.bool,

  /**
   * Whether it is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * The theme color.
   */
  theme: propTypes.string,

  /**
   * Whether it is an action item, or not.
   */
  action: propTypes.bool,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
ListGroupItem.defaultProps = {
  tag: "li"
};

var _excluded$H = ["className", "tag"];

var ListGroupItemHeading = function ListGroupItemHeading(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$H);

  var classes = classNames(className, "list-group-item-heading");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

ListGroupItemHeading.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.any,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
ListGroupItemHeading.defaultProps = {
  tag: "h5"
};

var _excluded$I = ["className", "tag"];

var ListGroupItemText = function ListGroupItemText(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$I);

  var classes = classNames(className, "list-group-item-text");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

ListGroupItemText.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
ListGroupItemText.defaultProps = {
  tag: "p"
};

/**
 * Creating flexible modal dialogs can be achieved using the `Modal` component. They feature a series of helpful subcomponents, sizes and various other options that you can use to customize the display and behavior of your modals.
 */

var Modal = /*#__PURE__*/function (_React$Component) {
  _inherits(Modal, _React$Component);

  var _super = _createSuper(Modal);

  function Modal(props) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _super.call(this, props);
    _this.state = {
      open: _this.props.open || false
    };
    _this.handleOnEntered = _this.handleOnEntered.bind(_assertThisInitialized(_this));
    _this.handleOnExit = _this.handleOnExit.bind(_assertThisInitialized(_this));
    _this.handleOnExited = _this.handleOnExited.bind(_assertThisInitialized(_this));
    _this.handleBackdropClick = _this.handleBackdropClick.bind(_assertThisInitialized(_this));
    _this.modalContent = null;
    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.open !== this.props.open) {
        this.setState({
          open: this.props.open
        });
      }
    }
  }, {
    key: "handleOnEntered",
    value: function handleOnEntered(type, node) {
      var _this$props = this.props,
          fade = _this$props.fade,
          showModal = _this$props.showModal;

      if (type === "backdrop" && fade === false) {
        return;
      }

      node.classList.add("show");

      if (type === "modal") {
        showModal && showModal();
      }
    }
  }, {
    key: "handleOnExit",
    value: function handleOnExit(type, node) {
      var _this$props2 = this.props,
          fade = _this$props2.fade,
          hideModal = _this$props2.hideModal;

      if (type === "backdrop" && fade === false) {
        return;
      }

      node.classList.remove("show");

      if (type === "modal") {
        hideModal && hideModal();
      }
    }
  }, {
    key: "handleOnExited",
    value: function handleOnExited() {
      this.props.hiddenModal && this.props.hiddenModal();
    }
  }, {
    key: "handleBackdropClick",
    value: function handleBackdropClick(e) {
      if (!this.modalContent.contains(e.target)) {
        this.props.toggle();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this.state.open) {
        return null;
      }

      var _this$props3 = this.props,
          id = _this$props3.id,
          backdrop = _this$props3.backdrop,
          fade = _this$props3.fade,
          tabIndex = _this$props3.tabIndex,
          backdropClassName = _this$props3.backdropClassName,
          modalClassName = _this$props3.modalClassName,
          animation = _this$props3.animation,
          modalContentClassName = _this$props3.modalContentClassName,
          position = _this$props3.position,
          role = _this$props3.role,
          size = _this$props3.size,
          children = _this$props3.children,
          centered = _this$props3.centered,
          className = _this$props3.className,
          nodeRef = _this$props3.nodeRef; // open, showModal, hideModal, hiddenModal, toggle

      var backdropClasses = classNames("modal-backdrop", fade ? "fade" : "show", backdropClassName);
      var modalClasses = classNames("modal", fade && "fade", modalClassName, fade && (animation || position && position.split("-").slice(-1)[0] || "top"));
      var modalAttrs = {
        "aria-hidden": true,
        id: id || undefined,
        tabIndex: tabIndex,
        role: role,
        style: {
          display: "block"
        }
      };
      var modalDialogClasses = classNames("modal-dialog", className, size && "modal-".concat(size), centered && "modal-dialog-centered", position && "modal-".concat(position));
      var contentClasses = classNames("modal-content", modalContentClassName);
      return /*#__PURE__*/React.createElement(React.Fragment, null, backdrop && /*#__PURE__*/React.createElement(reactTransitionGroup.Transition, {
        timeout: fade ? TIMEOUT.FADE : 0,
        in: this.state.open,
        appear: this.state.open,
        mountOnEnter: true,
        unmountOnExit: true,
        onEntered: function onEntered(node) {
          return _this2.handleOnEntered("backdrop", node);
        },
        onExit: function onExit(node) {
          return _this2.handleOnExit("backdrop", node);
        },
        onExited: this.handleOnExited,
        nodeRef: nodeRef
      }, /*#__PURE__*/React.createElement("div", {
        className: backdropClasses
      })), /*#__PURE__*/React.createElement(reactTransitionGroup.Transition, {
        timeout: fade ? TIMEOUT.FADE : 0,
        in: this.state.open,
        appear: this.state.open,
        mountOnEnter: true,
        unmountOnExit: true,
        onClick: this.handleBackdropClick,
        onEntered: function onEntered(node) {
          return _this2.handleOnEntered("modal", node);
        },
        onExit: function onExit(node) {
          return _this2.handleOnExit("modal", node);
        },
        nodeRef: nodeRef
      }, /*#__PURE__*/React.createElement("div", _extends({
        className: modalClasses
      }, modalAttrs), /*#__PURE__*/React.createElement("div", {
        className: modalDialogClasses,
        role: "document"
      }, /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this2.modalContent = el;
        },
        className: contentClasses
      }, children)))));
    }
  }]);

  return Modal;
}(React.Component);

Modal.propTypes = {
  /**
   * The id.
   */
  id: propTypes.string,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether it is open, or not.
   */
  open: propTypes.bool,

  /**
   * Whether it should fade, or not.
   */
  fade: propTypes.bool,

  /**
   * Whether it should display a backdrop, or not.
   */
  backdrop: propTypes.bool,

  /**
   * The function that should be triggered when the modal is shown.
   */
  showModal: propTypes.func,

  /**
   * The function that should be triggered when the modal is set to hide.
   */
  hideModal: propTypes.func,

  /**
   * The function that should be triggered when the modal is finally hidden.
   */
  hiddenModal: propTypes.func,

  /**
   * Whether it should be centered, or not.
   */
  centered: propTypes.bool,

  /**
   * The class name for the backdrop element.
   */
  backdropClassName: propTypes.string,

  /**
   * The toggle function.
   */
  toggle: propTypes.func,

  /**
   * The class name for the modal.
   */
  modalClassName: propTypes.string,

  /**
   *
   */
  animation: propTypes.bool,

  /**
   * The position.
   */
  position: propTypes.string,

  /**
   * The size.
   */
  size: propTypes.string,

  /**
   * The tab index.
   */
  tabIndex: propTypes.string,

  /**
   * The class name for the modal content.
   */
  modalContentClassName: propTypes.string,

  /**
   * The role attribute for the modal.
   */
  role: propTypes.string,
  nodeRef: propTypes.shape({
    current: propTypes.any
  }),

  /**
   * The children nodes.
   */
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node])
};
Modal.defaultProps = {
  open: false,
  fade: true,
  backdrop: true,
  nodeRef: undefined,
  role: "dialog"
};

var _excluded$J = ["className", "children"];

var ModalBody = function ModalBody(props) {
  var className = props.className,
      children = props.children,
      attrs = _objectWithoutProperties(props, _excluded$J);

  var classes = classNames("modal-body", className);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, attrs), children);
};

ModalBody.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node])
};

var _excluded$K = ["className", "children", "toggle", "tag", "closeAriaLabel", "titleClass"];

var ModalHeader = function ModalHeader(props) {
  var className = props.className,
      children = props.children,
      toggle = props.toggle,
      Tag = props.tag,
      closeAriaLabel = props.closeAriaLabel,
      titleClass = props.titleClass,
      attrs = _objectWithoutProperties(props, _excluded$K);

  var classes = classNames("modal-header", className);
  var titleClasses = classNames("modal-title", titleClass);
  var closeButton = null;

  if (toggle) {
    closeButton = /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: toggle,
      className: "close",
      "aria-label": closeAriaLabel
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, String.fromCharCode(215)));
  }

  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, attrs), /*#__PURE__*/React.createElement(Tag, {
    className: titleClasses
  }, children), closeButton);
};

ModalHeader.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The toggle function.
   */
  toggle: propTypes.func,

  /**
   * The component's tag type.
   */
  tag: propTypes.string,

  /**
   * The close button's aria label.
   */
  closeAriaLabel: propTypes.string,

  /**
   * The class for the modal title.
   */
  titleClass: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node])
};
ModalHeader.defaultProps = {
  tag: "h5",
  closeAriaLabel: "Close"
};

var _excluded$L = ["className", "children"];

var ModalFooter = function ModalFooter(props) {
  var className = props.className,
      children = props.children,
      attrs = _objectWithoutProperties(props, _excluded$L);

  var classes = classNames("modal-footer", className);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, attrs), children);
};

ModalFooter.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node])
};

var _excluded$M = ["className", "navbar", "horizontal", "vertical", "tabs", "card", "pills", "justified", "fill", "tag"];
/**
 * The `Nav` component allows you to build all types of navigation components.
 */

var Nav = function Nav(props) {
  var className = props.className,
      navbar = props.navbar,
      horizontal = props.horizontal,
      vertical = props.vertical,
      tabs = props.tabs,
      card = props.card,
      pills = props.pills,
      justified = props.justified,
      fill = props.fill,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$M);

  var verticalClass;

  if (vertical === true || vertical === "xs") {
    verticalClass = "flex-column";
  } else if (vertical === false) {
    verticalClass = false;
  } else if (typeof vertical === "string") {
    verticalClass = "flex-".concat(vertical, "-column");
  }

  var classes = classNames(className, navbar ? "navbar-nav" : "nav", horizontal && "justify-content-".concat(horizontal), verticalClass, tabs && "nav-tabs", card && tabs && "card-header-tabs", pills && "nav-pills", card && pills && "card-header-pills", justified && "nav-justified", fill && "nav-fill");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

Nav.defaultProps = {
  tag: "ul",
  vertical: false
};
Nav.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * Whether it is located inside a Navbar, or not.
   */
  navbar: propTypes.bool,

  /**
   * Justify content horizontally.
   */
  horizontal: propTypes.string,

  /**
   * Whether it should be displayed as tabs, or not.
   */
  tabs: propTypes.bool,

  /**
   * Whether it is located inside a card, or not.
   */
  card: propTypes.bool,

  /**
   * Whether it should be displayed as pills, or not.
   */
  pills: propTypes.bool,

  /**
   * Whether it is justified, or not.
   */
  justified: propTypes.bool,

  /**
   * Whether it should fill the entire space, or not.
   */
  fill: propTypes.bool,

  /**
   * Whether it is vertical, or not.
   */
  vertical: propTypes.oneOfType([propTypes.bool, propTypes.string]),

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};

var _excluded$N = ["className", "active", "disabled", "tag"];

var NavItem = function NavItem(props) {
  var className = props.className,
      active = props.active,
      disabled = props.disabled,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$N);

  var classes = classNames(className, "nav-item", active && "active", disabled && "disabled");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

NavItem.propTypes = {
  /**
   * Whether it is active, or not.
   */
  active: propTypes.bool,

  /**
   * Whether it is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
NavItem.defaultProps = {
  tag: "li"
};

var _excluded$O = ["className", "active", "disabled", "tag", "innerRef"];

var NavLink = /*#__PURE__*/function (_React$Component) {
  _inherits(NavLink, _React$Component);

  var _super = _createSuper(NavLink);

  function NavLink(props) {
    var _this;

    _classCallCheck(this, NavLink);

    _this = _super.call(this, props);
    _this.handleOnClick = _this.handleOnClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(NavLink, [{
    key: "handleOnClick",
    value: function handleOnClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.href === "#") {
        e.preventDefault();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          active = _this$props.active,
          disabled = _this$props.disabled,
          Tag = _this$props.tag,
          innerRef = _this$props.innerRef,
          attrs = _objectWithoutProperties(_this$props, _excluded$O);

      var classes = classNames(className, "nav-link", disabled && "disabled", active && "active");
      return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
        ref: innerRef,
        onClick: this.handleOnClick,
        className: classes
      }));
    }
  }]);

  return NavLink;
}(React.Component);

NavLink.propTypes = {
  /**
   * Whether it is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * Whether it is active, or not.
   */
  active: propTypes.bool,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The function that should be triggered on click.
   */
  onClick: propTypes.func,

  /**
   * The href attribute value.
   */
  href: propTypes.any,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  /**
   * The inner ref.
   */
  innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string])
};
NavLink.defaultProps = {
  tag: "a"
};

var _excluded$P = ["className", "expand", "fixed", "sticky", "theme", "type", "tag"];
/**
 * Using the `Navbar` component you can create powerful and responsive navigation headers.
 */

var Navbar = function Navbar(props) {
  var className = props.className,
      expand = props.expand,
      fixed = props.fixed,
      sticky = props.sticky,
      theme = props.theme,
      type = props.type,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$P);

  var expandClass;

  if (expand === false) {
    expandClass = false;
  } else if (expand === true || expand === "xs") {
    expandClass = "navbar-expand";
  } else if (typeof expand === "string") {
    expandClass = "navbar-expand-".concat(expand);
  }

  var classes = classNames(className, "navbar", expandClass, type === "light" && "navbar-light", type === "dark" && "navbar-dark", theme && "bg-".concat(theme), fixed && "fixed-".concat(fixed), sticky && "sticky-".concat(sticky));
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

Navbar.propTypes = {
  /**
   * Whether it is full, or not.
   */
  full: propTypes.bool,

  /**
   * Whether it is fixed, or not.
   */
  fixed: propTypes.string,

  /**
   * Whether it is sticky, or not.
   */
  sticky: propTypes.string,

  /**
   * The theme color.
   */
  theme: propTypes.string,

  /**
   * The role attribute.
   */
  role: propTypes.string,

  /**
   * The class name attribute.
   */
  className: propTypes.string,

  /**
   * The navbar type.
   */
  type: propTypes.oneOf(["dark", "light"]),

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  /**
   * Whether it should expand, or not.
   */
  expand: propTypes.oneOfType([propTypes.bool, propTypes.string])
};
Navbar.defaultProps = {
  tag: "nav",
  expand: false
};

var _excluded$Q = ["className", "tag"];

var NavbarBrand = function NavbarBrand(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$Q);

  var classes = classNames(className, "navbar-brand");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

NavbarBrand.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
NavbarBrand.defaultProps = {
  tag: "a"
};

var _excluded$R = ["className", "children", "tag"];

var NavbarToggler = function NavbarToggler(props) {
  var className = props.className,
      children = props.children,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$R);

  var classes = classNames(className, "navbar-toggler");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }), children || /*#__PURE__*/React.createElement("span", {
    className: "navbar-toggler-icon"
  }));
};

NavbarToggler.propTypes = {
  /**
   * The component's tag type.
   */
  type: propTypes.string,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * The tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
NavbarToggler.defaultProps = {
  tag: "button",
  type: "button"
};

class PopperManager extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlacementChange = this.handlePlacementChange.bind(this);
    this.setTargetNode = this.setTargetNode.bind(this);
    this.getReferenceElement = this.getReferenceElement.bind(this);
    this._element = null;
    this.state = {
      placement: null
    };
  }

  componentDidUpdate() {
    if (this._element && this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
      this._element.childNodes[0].focus();
    }
  }

  setTargetNode(node) {
    this.targetNode = node;
  }

  getReferenceElement() {
    return this.targetNode;
  }

  getContainerNode() {
    return getTarget(this.props.container);
  }

  handlePlacementChange(data) {
    if (this.state.placement !== data.placement) {
      this.setState({
        placement: data.placement
      });
    }

    return data;
  }

  renderChildren() {
    const {
      children,
      open,
      target,
      offset,
      placementPrefix,
      noArrow,
      arrowClassName,
      className,
      container,
      modifiers,
      boundariesElement,
      flip,
      fallbackPlacement,
      tag,
      ...attrs
    } = this.props;

    const _placement = this.state.placement || attrs.placement;

    const _className = classNames(className, placementPrefix ? `${placementPrefix}-${_placement}` : _placement);

    const _arrowClassName = classNames('arrow', arrowClassName);

    const _modifiers = {
      offset: {
        offset
      },
      flip: {
        enabled: flip,
        behavior: fallbackPlacement
      },
      preventOverflow: {
        boundariesElement
      },
      update: {
        enabled: true,
        order: 950,
        fn: this.handlePlacementChange
      },
      ...modifiers
    };
    return /*#__PURE__*/React.createElement(reactPopper.Popper, _extends({
      referenceElement: this.getReferenceElement(),
      modifiers: _modifiers,
      placement: _placement
    }, attrs), _ref => {
      let {
        ref,
        style,
        placement,
        arrowProps
      } = _ref;
      return /*#__PURE__*/React.createElement("div", {
        ref: ref,
        className: _className,
        style: style,
        "data-placement": placement
      }, children, !noArrow && /*#__PURE__*/React.createElement("div", {
        ref: arrowProps.ref,
        style: arrowProps.style,
        className: _arrowClassName
      }));
    });
  }

  render() {
    const {
      target,
      open,
      container
    } = this.props;
    this.setTargetNode(getTarget(target));

    if (!open) {
      return null;
    }

    if (container === 'inline') {
      return this.renderChildren();
    }

    const containerNode = this.getContainerNode();
    return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", null, this.renderChildren()), containerNode);
  }

}

PopperManager.propTypes = {
  /**
   * The target.
   */
  target: CustomPropTypes.target.isRequired,

  /**
   * The container.
   */
  container: CustomPropTypes.target,

  /**
   * The children.
   */
  children: propTypes.node.isRequired,

  /**
   * Whether the Popper is open, or not.
   */
  open: propTypes.bool,

  /**
   * Whether the Popper should flip, or not.
   */
  flip: propTypes.bool,

  /**
   * The Popper offset.
   */
  offset: propTypes.oneOfType([propTypes.string, propTypes.number]),

  /**
   * The Popper fallback placement.
   */
  fallbackPlacement: propTypes.oneOfType([propTypes.string, propTypes.array]),

  /**
   * The Popper placement prefix.
   */
  placementPrefix: propTypes.string,

  /**
   * The Popper's arrow className.
   */
  arrowClassName: propTypes.string,

  /**
   * Whether to hide the arrow, or not.
   */
  noArrow: propTypes.bool,

  /**
   * The Popper class name.
   */
  className: propTypes.string,

  /**
   * The component tag.
   */
  tag: propTypes.string,

  /**
   * The modifiers object.
   */
  modifiers: propTypes.object,

  /**
   * The boundaries element for the Popper instance.
   */
  boundariesElement: propTypes.oneOfType([propTypes.string, propTypes.element])
};
PopperManager.defaultProps = {
  boundariesElement: 'scrollParent',
  placement: 'auto',
  arrow: true,
  open: false,
  offset: 0,
  fallbackPlacement: 'flip',
  flip: true,
  container: 'body',
  modifiers: Object.create(null)
};

var _excluded$S = ["className", "target", "container", "modifiers", "open", "innerClassName", "noArrow", "arrowClassName", "placement", "placementPrefix", "boundariesElement", "offset", "disabled", "toggle", "delay"];
/**
 * Popovers are powerful elements similar to tooltips and powered by Popper.js that can be applies to any interactive element.
 */

var Popover = /*#__PURE__*/function (_React$Component) {
  _inherits(Popover, _React$Component);

  var _super = _createSuper(Popover);

  function Popover(props) {
    var _this;

    _classCallCheck(this, Popover);

    _this = _super.call(this, props);
    _this.show = _this.show.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.maybeShow = _this.maybeShow.bind(_assertThisInitialized(_this));
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this.addListeners = _this.addListeners.bind(_assertThisInitialized(_this));
    _this.removeListeners = _this.removeListeners.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.getDelay = _this.getDelay.bind(_assertThisInitialized(_this));
    _this._target = null;
    _this._hideTimeout = null;
    _this._showTimeout = null;
    return _this;
  }

  _createClass(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._target = getTarget(this.props.target);
      this.maybeShow();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.maybeShow();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this._showTimeout);
      clearTimeout(this._hideTimeout);
      this.removeListeners();
    }
  }, {
    key: "show",
    value: function show() {
      clearTimeout(this._hideTimeout);
      this.addListeners();

      if (!this.props.open) {
        clearTimeout(this._showTimeout);
        this._showTimeout = setTimeout(this.toggle, this.getDelay("show"));
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      clearTimeout(this._showTimeout);
      this.removeListeners();

      if (this.props.open) {
        clearTimeout(this._hideTimeout);
        this._hideTimeout = setTimeout(this.toggle, this.getDelay("hide"));
      }
    }
  }, {
    key: "maybeShow",
    value: function maybeShow() {
      if (this.props.open) {
        this.show();
        return;
      }

      this.hide();
    }
  }, {
    key: "toggle",
    value: function toggle(event) {
      if (this.props.disabled) {
        event.preventDefault();
        return;
      }

      return this.props.toggle(event);
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this2 = this;

      EVENTS.CLICK.forEach(function (event) {
        return document.addEventListener(event, _this2.handleClick, true);
      });
    }
  }, {
    key: "removeListeners",
    value: function removeListeners() {
      var _this3 = this;

      EVENTS.CLICK.forEach(function (event) {
        document.removeEventListener(event, _this3.handleClick, true);
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (!this._target) {
        return;
      }

      if (event.target !== this._target && !this._target.contains(event.target) && event.target !== this._popover && !(this._popover && this._popover.contains(event.target))) {
        if (this._hideTimeout) {
          clearTimeout(this._hideTimeout);
        }

        if (this.props.open) {
          this.toggle(event);
        }
      }
    }
  }, {
    key: "getDelay",
    value: function getDelay(key) {
      key = key.toUpperCase();

      if (_typeof(this.props.delay) === "object") {
        return isNaN(this.props.delay[key]) ? TIMEOUT[key] : this.props.delay[key];
      }

      return this.props.delay;
    }
  }, {
    key: "render",
    value: function render() {
      /* eslint-disable no-unused-vars */
      var _this$props = this.props,
          className = _this$props.className,
          target = _this$props.target,
          container = _this$props.container,
          modifiers = _this$props.modifiers,
          open = _this$props.open,
          innerClassName = _this$props.innerClassName,
          noArrow = _this$props.noArrow,
          arrowClassName = _this$props.arrowClassName,
          placement = _this$props.placement,
          placementPrefix = _this$props.placementPrefix,
          boundariesElement = _this$props.boundariesElement,
          offset = _this$props.offset,
          disabled = _this$props.disabled,
          toggle = _this$props.toggle,
          delay = _this$props.delay,
          attrs = _objectWithoutProperties(_this$props, _excluded$S);
      /* eslint-enable no-unused-vars */


      if (!open) {
        return null;
      }

      var classes = classNames("popover-inner", innerClassName);
      var popperClasses = classNames("popover", "show", className);
      return /*#__PURE__*/React.createElement(PopperManager, {
        className: popperClasses,
        target: target,
        container: container,
        modifiers: modifiers,
        offset: offset,
        open: open,
        noArrow: noArrow,
        arrowClassName: arrowClassName,
        placement: placement,
        placementPrefix: placementPrefix,
        boundariesElement: boundariesElement
      }, /*#__PURE__*/React.createElement("div", _extends({}, attrs, {
        className: classes
      })));
    }
  }]);

  return Popover;
}(React.Component);

Popover.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The target element.
   */
  target: CustomPropTypes.target.isRequired,

  /**
   * The popover container.
   */
  container: CustomPropTypes.target,

  /**
   * Popper modifiers object.
   */
  modifiers: propTypes.object,

  /**
   * Whether the popover is open, or not.
   */
  open: propTypes.bool,

  /**
   * The inner class name.
   */
  innerClassName: propTypes.string,

  /**
   * Whether the popover is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * Whether to hide the arrow, or not.
   */
  noArrow: propTypes.bool,

  /**
   * The arrow class name.
   */
  arrowClassName: propTypes.string,

  /**
   * The boundaries element for the Popover instance.
   */
  boundariesElement: propTypes.oneOfType([propTypes.string, propTypes.element]),

  /**
   * The popover placement.
   */
  placement: propTypes.string,

  /**
   * The placement prefix.
   */
  placementPrefix: propTypes.string,

  /**
   * The popover offset.
   */
  offset: propTypes.oneOfType([propTypes.string, propTypes.number]),

  /**
   * The toggle function.
   */
  toggle: propTypes.func.isRequired,

  /**
   * The show/hide delay in ms.
   */
  delay: propTypes.oneOfType([propTypes.number, propTypes.shape({
    show: propTypes.number,
    hide: propTypes.number
  })])
};
Popover.defaultProps = {
  open: false,
  noArrow: false,
  placement: "top",
  placementPrefix: "bs-popover",
  delay: {
    show: 0,
    hide: 0
  },
  toggle: function toggle() {}
};

var _excluded$T = ["className", "tag"];

var PopoverBody = function PopoverBody(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$T);

  var classes = classNames(className, "popover-body");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

PopoverBody.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The component's tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
PopoverBody.defaultProps = {
  tag: "div"
};

var _excluded$U = ["className", "tag"];

var PopoverHeader = function PopoverHeader(props) {
  var className = props.className,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$U);

  var classes = classNames(className, "popover-header");
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: classes
  }));
};

PopoverHeader.propTypes = {
  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The tag type.
   */
  tag: propTypes.oneOfType([propTypes.func, propTypes.string])
};
PopoverHeader.defaultProps = {
  tag: "h3"
};

var _excluded$V = ["children", "className", "barClassName", "value", "max", "animated", "striped", "theme", "bar", "multi", "tag"];
/**
 * You can use the `Progress` component to display simple or complex progress bars.
 */

var Progress = function Progress(props) {
  var children = props.children,
      className = props.className,
      barClassName = props.barClassName,
      value = props.value,
      max = props.max,
      animated = props.animated,
      striped = props.striped,
      theme = props.theme,
      bar = props.bar,
      multi = props.multi,
      Tag = props.tag,
      attrs = _objectWithoutProperties(props, _excluded$V);

  var percent = Number(value) / Number(max) * 100;
  var progressClasses = classNames(className, "progress");
  var progressBarClasses = classNames("progress-bar", bar ? className || barClassName : barClassName, animated && "progress-bar-animated", theme && "bg-".concat(theme), (striped || animated) && "progress-bar-striped");
  var ProgressBar = multi ? children : /*#__PURE__*/React.createElement("div", {
    className: progressBarClasses,
    style: {
      width: "".concat(percent, "%")
    },
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": "0",
    "aria-valuemax": max
  }, children);

  if (bar) {
    return ProgressBar;
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
    className: progressClasses
  }), ProgressBar);
};

Progress.propTypes = {
  /**
   * The children nodes.
   */
  children: propTypes.node,

  /**
   * Whether it is a bar, or not.
   */
  bar: propTypes.bool,

  /**
   * Whether there are multiple progress bars nested, or not.
   */
  multi: propTypes.bool,

  /**
   * The component's tag type.
   */
  tag: propTypes.string,

  /**
   * Whether it is animated, or not.
   */
  animated: propTypes.bool,

  /**
   * Whether it is striped, or not.
   */
  striped: propTypes.bool,

  /**
   * The theme color.
   */
  theme: propTypes.string,

  /**
   * The class name.
   */
  className: propTypes.string,

  /**
   * The class name for the bar element.
   */
  barClassName: propTypes.string,

  /**
   * The value.
   */
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),

  /**
   * The max value.
   */
  max: propTypes.oneOfType([propTypes.string, propTypes.number])
};
Progress.defaultProps = {
  tag: "div",
  value: 0,
  max: 100,
  theme: "primary"
};

/**
 * The slider component is powered behind the scenes by the [NoUiSlider](https://refreshless.com/nouislider/) library.
 */

var Slider = /*#__PURE__*/function (_React$Component) {
  _inherits(Slider, _React$Component);

  var _super = _createSuper(Slider);

  function Slider() {
    _classCallCheck(this, Slider);

    return _super.apply(this, arguments);
  }

  _createClass(Slider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.disabled) {
        this.sliderContainer.setAttribute("disabled", true);
      } else {
        this.sliderContainer.removeAttribute("disabled");
      }

      this.createSlider();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.disabled) {
        this.sliderContainer.setAttribute("disabled", true);
      } else {
        this.sliderContainer.removeAttribute("disabled");
      }

      this.slider.destroy();
      this.createSlider();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.slider.destroy();
    }
  }, {
    key: "createSlider",
    value: function createSlider() {
      var slider = this.slider = nouislider.create(this.sliderContainer, _objectSpread2({}, this.props));

      if (this.props.onUpdate) {
        slider.on("update", this.props.onUpdate);
      }

      if (this.props.onChange) {
        slider.on("change", this.props.onChange);
      }

      if (this.props.onSlide) {
        slider.on("slide", this.props.onSlide);
      }

      if (this.props.onStart) {
        slider.on("start", this.props.onStart);
      }

      if (this.props.onEnd) {
        slider.on("end", this.props.onEnd);
      }

      if (this.props.onSet) {
        slider.on("set", this.props.onSet);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          className = _this$props.className,
          theme = _this$props.theme;
      var classes = classNames(className, theme && "slider-".concat(theme));
      return /*#__PURE__*/React.createElement("div", {
        className: classes,
        ref: function ref(slider) {
          _this.sliderContainer = slider;
        }
      });
    }
  }]);

  return Slider;
}(React.Component);

Slider.propTypes = {
  className: propTypes.string,
  theme: propTypes.string,
  animate: propTypes.bool,
  behaviour: propTypes.string,
  cssPrefix: propTypes.string,
  disabled: propTypes.bool,
  limit: propTypes.number,
  margin: propTypes.number,
  onChange: propTypes.func,
  onEnd: propTypes.func,
  onSet: propTypes.func,
  onSlide: propTypes.func,
  onStart: propTypes.func,
  onUpdate: propTypes.func,
  pips: propTypes.object,
  range: propTypes.object.isRequired,
  start: propTypes.arrayOf(propTypes.number).isRequired,
  step: propTypes.number,
  direction: propTypes.oneOf(["ltr", "rtl"]),
  orientation: propTypes.oneOf(["horizontal", "vertical"]),
  connect: propTypes.oneOfType([propTypes.arrayOf(propTypes.bool), propTypes.bool]),
  tooltips: propTypes.oneOfType([propTypes.bool, propTypes.arrayOf(propTypes.shape({
    to: propTypes.func
  }))])
};

var _excluded$W = ["target", "container", "open", "className", "arrowClassName", "innerClassName", "boundariesElement", "placement", "placementPrefix", "modifiers", "offset", "noArrow"];
/**
 * Tooltips are powerful components powered behind the scenes by Popper.js that can be attached to any element.
 */

var Tooltip = /*#__PURE__*/function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  var _super = _createSuper(Tooltip);

  function Tooltip(props) {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _super.call(this, props);
    _this.addListeners = _this.addListeners.bind(_assertThisInitialized(_this));
    _this.removeListeners = _this.removeListeners.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_assertThisInitialized(_this));
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_assertThisInitialized(_this));
    _this.handleMouseOverContent = _this.handleMouseOverContent.bind(_assertThisInitialized(_this));
    _this.handleMouseLeaveContent = _this.handleMouseLeaveContent.bind(_assertThisInitialized(_this));
    _this.show = _this.show.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this._target = null;
    _this._hideTimeout = null;
    _this._showTimeout = null;
    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._target = getTarget(this.props.target);
      this.addListeners();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this._hideTimeout);
      clearTimeout(this._showTimeout);
      this.removeListeners();
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this2 = this;

      var triggers = this.props.trigger.trim().split(/\s+/);
      triggers.forEach(function (trigger) {
        switch (trigger) {
          case "click":
            EVENTS.CLICK.forEach(function (e) {
              return document.addEventListener(e, _this2);
            });
            break;

          case "hover":
            EVENTS.MOUSE.forEach(function (e) {
              return _this2._target.addEventListener(e, _this2);
            });
            break;

          case "focus":
            EVENTS.FOCUS.forEach(function (e) {
              return _this2._target.addEventListener(e, _this2);
            });
            break;

          default:
            break;
        }
      }, this);
    }
  }, {
    key: "removeListeners",
    value: function removeListeners() {
      var _this3 = this;

      EVENTS.CLICK.forEach(function (e) {
        return document.removeEventListener(e, _this3);
      }, this);
      EVENTS.MOUSE.concat(EVENTS.FOCUS).forEach(function (e) {
        return _this3._target.removeEventListener(e, _this3);
      }, this);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(e) {
      if (this.props.disabled || this._target === null) {
        return;
      }

      switch (e.type) {
        case "click":
        case "touchstart":
          this.handleClick(e);
          break;

        case "mouseenter":
          this.handleMouseEnter(e);
          break;

        case "mouseleave":
          this.handleMouseLeave(e);
          break;

        case "focusin":
          this.show(e);
          break;

        case "focusout":
          this.hide(e);
          break;

        default:
          break;
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (this._target !== null && (e.target === this._target || this._target.contains(e.target))) {
        if (this._hideTimeout) {
          clearTimeout(this._hideTimeout);
        }

        if (!this.props.open) {
          this.toggle(e);
        }

        return;
      }

      if (this.props.open && e.target.getAttribute("role") !== "tooltip") {
        if (this._showTimeout) {
          clearTimeout(this._showTimeout);
        }

        this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay("hide"));
      }
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter(e) {
      if (this._hideTimeout) {
        clearTimeout(this._hideTimeout);
      }

      this._showTimeout = setTimeout(this.show.bind(this, e), this.getDelay("show"));
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave(e) {
      if (this._showTimeout) {
        clearTimeout(this._showTimeout);
      }

      this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay("hide"));
    }
  }, {
    key: "handleMouseOverContent",
    value: function handleMouseOverContent() {
      if (this.props.autohide) {
        return;
      }

      if (this._hideTimeout) {
        clearTimeout(this._hideTimeout);
      }
    }
  }, {
    key: "handleMouseLeaveContent",
    value: function handleMouseLeaveContent(e) {
      if (this.props.autohide) {
        return;
      }

      if (this._showTimeout) {
        clearTimeout(this._showTimeout);
      }

      e.persist();
      this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay("hide"));
    }
  }, {
    key: "getDelay",
    value: function getDelay(key) {
      key = key.toUpperCase();

      if (_typeof(this.props.delay) === "object") {
        return isNaN(this.props.delay[key]) ? TIMEOUT[key] : this.props.delay[key];
      }

      return this.props.delay;
    }
  }, {
    key: "show",
    value: function show(e) {
      if (!this.props.open) {
        clearTimeout(this._showTimeout);
        this.toggle(e);
      }
    }
  }, {
    key: "hide",
    value: function hide(e) {
      if (this.props.open) {
        clearTimeout(this._hideTimeout);
        this.toggle(e);
      }
    }
  }, {
    key: "toggle",
    value: function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = omit(this.props, ["trigger", "disabled", "delay", "toggle", "autohide"]);

      var target = _props.target,
          container = _props.container,
          open = _props.open,
          className = _props.className,
          arrowClassName = _props.arrowClassName,
          innerClassName = _props.innerClassName,
          boundariesElement = _props.boundariesElement,
          placement = _props.placement,
          placementPrefix = _props.placementPrefix,
          modifiers = _props.modifiers,
          offset = _props.offset,
          noArrow = _props.noArrow,
          attrs = _objectWithoutProperties(_props, _excluded$W);

      if (!open) {
        return null;
      }

      var classes = classNames("tooltip-inner", innerClassName);
      var popperClasses = classNames("tooltip", "show", className);
      return /*#__PURE__*/React.createElement(PopperManager, {
        container: container,
        className: popperClasses,
        arrowClassName: arrowClassName,
        target: target,
        open: open,
        noArrow: noArrow,
        boundariesElement: boundariesElement,
        placement: placement,
        placementPrefix: placementPrefix,
        modifiers: modifiers,
        offset: offset
      }, /*#__PURE__*/React.createElement("div", _extends({}, attrs, {
        className: classes,
        role: "tooltip",
        "aria-hidden": open,
        onMouseOver: this.handleMouseOverContent,
        onMouseLeave: this.handleMouseLeaveContent
      })));
    }
  }]);

  return Tooltip;
}(React.Component);

Tooltip.propTypes = {
  /**
   * The target element.
   */
  target: CustomPropTypes.target.isRequired,

  /**
   * The tooltip container.
   */
  container: CustomPropTypes.target,

  /**
   * The trigger(s) (click, hover, focus).
   */
  trigger: propTypes.string,

  /**
   * Whether the tooltip is open, or not.
   */
  open: propTypes.bool,

  /**
   * Whether the tooltip is disabled, or not.
   */
  disabled: propTypes.bool,

  /**
   * The tooltip class name.
   */
  className: propTypes.string,

  /**
   * The arrow class name.
   */
  arrowClassName: propTypes.string,

  /**
   * The tooltip inner class name.
   */
  innerClassName: propTypes.string,

  /**
   * The tooltip offset.
   */
  offset: propTypes.oneOfType([propTypes.string, propTypes.number]),

  /**
   * The show/hide delay in ms.
   */
  delay: propTypes.oneOfType([propTypes.number, propTypes.shape({
    show: propTypes.number,
    hide: propTypes.number
  })]),

  /**
   * The boundaries element for the tooltip instance.
   */
  boundariesElement: propTypes.oneOfType([propTypes.string, propTypes.element]),

  /**
   * The tooltip placement.
   */
  placement: propTypes.oneOf(POPPER_PLACEMENTS),

  /**
   * The placement prefix.
   */
  placementPrefix: propTypes.string,

  /**
   * Whether to hide the arrow, or not.
   */
  noArrow: propTypes.bool,

  /**
   * The toggle function.
   */
  toggle: propTypes.func.isRequired,

  /**
   * Popper modifiers object.
   */
  modifiers: propTypes.object,

  /**
   * Whether the tooltip should auto-hide, or not.
   */
  autohide: propTypes.bool
};
Tooltip.defaultProps = {
  trigger: "hover",
  open: false,
  disabled: false,
  noArrow: false,
  placement: "top",
  placementPrefix: "bs-tooltip",
  autohide: true,
  delay: {
    show: 0,
    hide: 0
  },
  toggle: function toggle() {}
};

exports.Alert = Alert;
exports.Badge = Badge;
exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbItem = BreadcrumbItem;
exports.Button = Button;
exports.ButtonGroup = ButtonGroup;
exports.ButtonToolbar = ButtonToolbar;
exports.Card = Card;
exports.CardBody = CardBody;
exports.CardColumns = CardColumns;
exports.CardFooter = CardFooter;
exports.CardGroup = CardGroup;
exports.CardHeader = CardHeader;
exports.CardImg = CardImg;
exports.CardImgOverlay = CardImgOverlay;
exports.CardLink = CardLink;
exports.CardSubtitle = CardSubtitle;
exports.CardText = CardText;
exports.CardDeck = CardDeck;
exports.CardTitle = CardTitle;
exports.Collapse = Collapse;
exports.Container = Container;
exports.Row = Row;
exports.Col = Col;
exports.DatePicker = DatePicker;
exports.Dropdown = Dropdown;
exports.DropdownToggle = DropdownToggle;
exports.DropdownMenu = DropdownMenu;
exports.DropdownItem = DropdownItem;
exports.Fade = Fade;
exports.Form = Form;
exports.FormFeedback = FormFeedback;
exports.FormCheckbox = FormCheckbox;
exports.FormGroup = FormGroup;
exports.FormInput = FormInput;
exports.FormRadio = FormRadio;
exports.FormSelect = FormSelect;
exports.FormTextarea = FormTextarea;
exports.InputGroup = InputGroup;
exports.InputGroupAddon = InputGroupAddon;
exports.InputGroupText = InputGroupText;
exports.ListGroup = ListGroup;
exports.ListGroupItem = ListGroupItem;
exports.ListGroupItemHeading = ListGroupItemHeading;
exports.ListGroupItemText = ListGroupItemText;
exports.Modal = Modal;
exports.ModalBody = ModalBody;
exports.ModalHeader = ModalHeader;
exports.ModalFooter = ModalFooter;
exports.Nav = Nav;
exports.NavItem = NavItem;
exports.NavLink = NavLink;
exports.Navbar = Navbar;
exports.NavbarBrand = NavbarBrand;
exports.NavbarToggler = NavbarToggler;
exports.Popover = Popover;
exports.PopoverBody = PopoverBody;
exports.PopoverHeader = PopoverHeader;
exports.Progress = Progress;
exports.Slider = Slider;
exports.Tooltip = Tooltip;
//# sourceMappingURL=shards-react.common.js.map
