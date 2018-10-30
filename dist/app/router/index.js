'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bookRouter = require('./book-router');

Object.keys(_bookRouter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _bookRouter[key];
    }
  });
});