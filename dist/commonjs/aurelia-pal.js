'use strict';

exports.__esModule = true;
exports.AggregateError = AggregateError;
exports.initializePAL = initializePAL;

function AggregateError(message, innerError, skipIfAlreadyAggregate) {
  if (innerError) {
    if (innerError.innerError && skipIfAlreadyAggregate) {
      return innerError;
    }

    if (innerError.stack) {
      message += '\n------------------------------------------------\ninner error: ' + innerError.stack;
    }
  }

  var e = new Error(message);
  if (innerError) {
    e.innerError = innerError;
  }

  return e;
}

var FEATURE = {};

exports.FEATURE = FEATURE;
var PLATFORM = {
  noop: function noop() {},
  eachModule: function eachModule() {}
};

exports.PLATFORM = PLATFORM;
PLATFORM.global = (function () {
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  return new Function('return this')();
})();

var DOM = {};

exports.DOM = DOM;

function initializePAL(platform, feature, dom) {
  Object.assign(PLATFORM, platform);
  Object.assign(FEATURE, feature);
  Object.assign(DOM, dom);
}