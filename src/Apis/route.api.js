import axios from "axios";
import { STORAGE, getLocalStorage } from "Utils/storage";
import baseUrl from "./config";

const getRoute = (setRoute, setIsSave = null) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-route-and-routestation`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => data.body)
    .then((body) => {
      // console.log(body);
      setRoute(body);
      if (setIsSave) {
        setIsSave(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getStation = (setStation) => {
  axios({
    method: "get",
    url: `${baseUrl}station`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setStation(data);
    })

    .catch((err) => {
      console.log(err);
    });
};

const getRouteStationById = (
  idRoute,
  setStationById,
  setIsSave,
  setNotification,
  setNumberStation = null
) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-route-and-routestation-by-id-route/${idRoute}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      // console.log(data);
      if (setNumberStation) {
        setNumberStation(data.routeStationList.length - 1);
        setStationById(data);
      } else {
        setStationById(data.routeStationList);
      }
      setIsSave(false);
    })
    .catch((err) => {
      // setNotification("error");
      console.log(err);
    });
};

const createRouteStation = (Data, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/create-route-station`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      setNotification("Add route successfully!!");
      setIsSave(true);
    })
    .catch((err) => {
      setNotification("error");
      console.log(err);
    });
};

const deleteRoute = (idRoute, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/delete-route/${idRoute}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      setNotification("Delete route successfully!!");
      setIsSave(true);
    })
    .catch((err) => {
      setNotification("error");
      console.log(err);
    });
};

const updateRoute = (Data, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/update-route-and-routestation`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      setNotification("Update route successfully!!");
      setIsSave(true);
    })
    .catch((err) => {
      setNotification("error");
      console.log(err);
    });
};

export { getRoute, getRouteStationById, getStation, createRouteStation, updateRoute, deleteRoute };
