import axios from "axios";
import { STORAGE, getLocalStorage } from "Utils/storage";
import baseUrl from "./config";

const getListHistory = (
  setListHistory,
  setIsSave = null,
  setCurrentPage = null,
  setTotalPage = null,
  params
) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-all-history`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
    params,
  })
    .then((res) => res.data)
    .then((data) => {
      setListHistory(data.content);
      if (setCurrentPage) {
        setCurrentPage(data.number + 1);
      }
      if (setTotalPage) {
        setTotalPage(data.totalPages);
      }
      if (setIsSave) {
        setIsSave(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsSave(false);
    });
};
const getListHistoryByDateOrder = (Data, setListHistory, setIsSave, params) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/get-history-by-dateOrder`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
    data: Data,
    params,
  })
    .then((res) => res.data)
    .then((data) => {
      setListHistory(data);
      setIsSave(false);
    })
    .catch((err) => {
      console.log(err);
      setIsSave(false);
    });
};
const getListHistoryByDateStart = (Data, setListHistory, setIsSave, params) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/get-history-by-dateStart`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
    data: Data,
    params,
  })
    .then((res) => res.data)
    .then((data) => {
      setListHistory(data);
      setIsSave(false);
    })
    .catch((err) => {
      console.log(err);
      setIsSave(false);
    });
};
const getListHistoryByCustomer = (
  name,
  setListHistory,
  setIsSave,
  setCurrentPage = null,
  setTotalPage = null,
  params
) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-history-by-phoneCustomer/${name}`,
    // url: `${baseUrl}admin/get-history-by-nameCustommer/${name}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
    params,
  })
    .then((res) => res.data)
    .then((data) => {
      // console.log(data);
      setListHistory(data.content);
      if (setCurrentPage) {
        setCurrentPage(data.number + 1);
      }
      if (setTotalPage) {
        setTotalPage(data.totalPages);
      }
      if (setIsSave) {
        setIsSave(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsSave(false);
    });
};
const getListHistoryByYear = (year, setListHistory, setIsSave) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-statistic/${year}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      const arr = [];
      data.adminGetStatisticList.forEach((item) => {
        for (let i = 0; i < item.historyBookingList.length; i += 1) {
          arr.push({
            ...item.historyBookingList[i],
            month: item.month,
          });
        }
      });
      //   console.log(data);
      setListHistory(arr);
      setIsSave(false);
    })
    .catch((err) => {
      console.log(err);
      setIsSave(false);
    });
};

const getListHistoryByYearForStatistic = async (year) => {
  const res = await axios({
    method: "get",
    url: `${baseUrl}admin/get-statistic/${year}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  });
  console.log(res);
  try {
    const data = { ...res.data };
    return data.totalRevenue;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

const getRevenueHistoryByYear = (year, setListRevenue, setRevenueYear, setIsSave) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-statistic/${year}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      const arr = [];
      data.adminGetStatisticList.forEach((item) => {
        arr.push(item.turnover);
      });
      const sum = arr.reduce((item, sum1) => item + sum1, 0);
      setRevenueYear(sum);
      setListRevenue(arr);
      setIsSave(false);
    })
    .catch((err) => {
      console.log(err);
      setIsSave(false);
    });
};

export {
  getListHistory,
  getListHistoryByCustomer,
  getListHistoryByDateOrder,
  getListHistoryByDateStart,
  getListHistoryByYear,
  getListHistoryByYearForStatistic,
  getRevenueHistoryByYear,
};
