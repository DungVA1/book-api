'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookRoute = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookRoute = exports.bookRoute = _express2.default.Router();

bookRoute.get('/books', function (req, res) {
  res.send('GET /books api');
});

bookRoute.post('/books', function (req, res) {
  res.send('POST /books api');
});

bookRoute.put('/books', function (req, res) {
  res.send('PUT /books api');
});

bookRoute.delete('/books', function (req, res) {
  res.send('DELETE /books api');
});