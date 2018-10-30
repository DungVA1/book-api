'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _router = require('./router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = exports.init = function init() {
  var app = (0, _express2.default)();
  app.use([_router.bookRoute]);

  app.listen(process.env.EXPRESS_PORT || 3000, function () {
    console.log('LISTENNING AT 3000');
  });
};