"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTrip = exports.updatePriceTrip = exports.createTripPrice = exports.getEveryTrip = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _storage = require("Utils/storage");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getEveryTrip = function getEveryTrip(setTrip, setIsSave) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "admin//api/admin/get-everything-trip"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data.body;
  }).then(function (body) {
    console.log(body);
    setTrip(body);
    setIsSave(false);
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getEveryTrip = getEveryTrip;

var createTripPrice = function createTripPrice(Data, setIsSave, setNotification) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "admin/create-trip-price"),
    data: Data,
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data.body;
  }).then(function (body) {
    console.log(body);
    setNotification(body);
    setIsSave(true);
  })["catch"](function (err) {
    console.log(err);
    setNotification("error");
  });
};

exports.createTripPrice = createTripPrice;

var updatePriceTrip = function updatePriceTrip(Data, setIsSave, setNotification) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "admin/update-price"),
    data: Data,
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data.body;
  }).then(function (body) {
    console.log(body);
    setIsSave(true);
    setNotification(body);
  })["catch"](function (err) {
    console.log(err);
    setNotification("error");
  });
};

exports.updatePriceTrip = updatePriceTrip;

var updateTrip = function updateTrip(Data, setIsSave, setNotification) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "admin/update-trip"),
    data: Data,
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data.body;
  }).then(function (body) {
    console.log(body);
    setIsSave(true);
    setNotification(body);
  })["catch"](function (err) {
    console.log(err);
    setNotification("error");
  });
};

exports.updateTrip = updateTrip;