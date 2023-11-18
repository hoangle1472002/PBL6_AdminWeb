"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRoute = exports.updateRoute = exports.createRouteStation = exports.getStation = exports.getRouteStationById = exports.getRoute = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _storage = require("Utils/storage");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getRoute = function getRoute(setRoute, setIsSave) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "admin/get-route-and-routestation"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data.body;
  }).then(function (body) {
    console.log(body);
    setRoute(body);
    setIsSave(false);
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getRoute = getRoute;

var getStation = function getStation(setStation) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "station"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    setStation(data);
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getStation = getStation;

var getRouteStationById = function getRouteStationById(idRoute, setStationById, setIsSave, setNotification, setNumberStation) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "admin/get-route-and-routestation-by-id-route/").concat(idRoute),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    // console.log(data);
    setStationById(data.routeStationList);
    setIsSave(false);
    setNumberStation(data.routeStationList.length - 1);
  })["catch"](function (err) {
    setNotification("error");
    console.log(err);
  });
};

exports.getRouteStationById = getRouteStationById;

var createRouteStation = function createRouteStation(Data, setIsSave, setNotification) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "admin/create-route-station"),
    data: Data,
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    console.log(data);
    setNotification("Add route successfully!!");
    setIsSave(true);
  })["catch"](function (err) {
    setNotification("error");
    console.log(err);
  });
};

exports.createRouteStation = createRouteStation;

var deleteRoute = function deleteRoute(idRoute, setIsSave, setNotification) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "admin/delete-route/").concat(idRoute),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    console.log(data);
    setNotification("Delete route successfully!!");
    setIsSave(true);
  })["catch"](function (err) {
    setNotification("error");
    console.log(err);
  });
};

exports.deleteRoute = deleteRoute;

var updateRoute = function updateRoute(Data, setIsSave, setNotification) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "admin/update-route-and-station"),
    data: Data,
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    console.log(data);
    setNotification("Update route successfully!!");
    setIsSave(true);
  })["catch"](function (err) {
    setNotification("error");
    console.log(err);
  });
};

exports.updateRoute = updateRoute;