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
      width: "10%",
      align: "left"
    }, {
      Header: "Điểm đi",
      accessor: "dep",
      width: "30%",
      align: "left"
    }, {
      Header: "Điểm đến",
      accessor: "des",
      width: "30%",
      align: "left"
    }, {
      Header: "Thời gian",
      accessor: "time",
      width: "30%",
      align: "left"
    }],
    rows: []
  };
}