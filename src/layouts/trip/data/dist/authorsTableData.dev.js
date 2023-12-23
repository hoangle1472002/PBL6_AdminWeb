Object.defineProperty(exports, "__esModule", {
  value: true,
});

function data() {
  return {
    columns: [
      {
        Header: "stt",
        accessor: "stt",
        width: "5%",
        align: "left",
      },
      {
        Header: "điểm đi",
        accessor: "dep",
        width: "15%",
        align: "left",
      },
      {
        Header: "điểm đến",
        accessor: "des",
        width: "15%",
        align: "left",
      },
      {
        Header: "số lượng ghế",
        accessor: "quantity",
        width: "15%",
        align: "left",
      },
      {
        Header: "trạm",
        accessor: "station",
        width: "15%",
        align: "left",
      },
      {
        Header: "thời gian",
        accessor: "time",
        width: "25%",
        align: "left",
      },
    ],
    rows: [],
  };
}

exports.default = data;
