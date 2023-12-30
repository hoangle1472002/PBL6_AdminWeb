import axios from "axios";
import { STORAGE, getLocalStorage } from "Utils/storage";
import baseUrl from "./config";

const getTripInstance = (
  setTripInstance,
  setIsSave = null,
  setCurrentPage = null,
  setTotalPage = null,
  params
) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-trip-instance`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
    params,
  })
    .then((res) => res.data)
    .then((data) => {
      setTripInstance(data.content);
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
    });
};
const getTripInstanceById = (idTripInstance, setListStation, setIsSave) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-trip-instance-by-id/${idTripInstance}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      setListStation(data.body.adminGetRouteResponse.routeStationList);
      setIsSave(false);
      // if (setNumberStation) {
      //   setNumberStation(data.body.routeStationList.length - 1);
      // }
    })
    .catch((err) => {
      // setNotification("error");
      console.log(err);
    });
};

const createTripInstance = (Data, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/create-trip-instance`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setNotification(data);
      setIsSave(true);
    })
    .catch((err) => {
      console.log(err);
      setNotification("error");
    });
};

const deleteTripInstance = (idTripInstance, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/delete-trip-instance/${idTripInstance}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setIsSave(true);
      setNotification(data);
    })
    .catch((err) => {
      console.log(err);
      setNotification("error");
    });
};

const updateTripInstance = (Data, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/update-trip-instance`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setIsSave(true);
      setNotification(data);
    })

    .catch((err) => {
      console.log(err);
      setNotification("error");
    });
};

export {
  getTripInstance,
  getTripInstanceById,
  createTripInstance,
  updateTripInstance,
  deleteTripInstance,
};
