"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = data;

function data() {
  return {
    columns: [{
      Header: "stt",
      accessor: "stt",
      width: "2%",
      align: "left"
    }, {
      Header: "route",
      accessor: "route",
      width: "20%",
      align: "left"
    }, {
      Header: "date",
      accessor: "date",
      width: "20%",
      align: "left"
    }, {
      Header: "time start",
      accessor: "time",
      width: "30%",
      align: "left"
    }],
    rows: []
  };
}