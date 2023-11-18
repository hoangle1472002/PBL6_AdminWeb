import axios from "axios";
import { STORAGE, getLocalStorage } from "Utils/storage";
import baseUrl from "./config";

const getAgency = (setAgencies, setIsSave) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-list-agency`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => data.body)
    .then((body) => {
      setAgencies(body);
      if (setIsSave) {
        setIsSave(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsSave(false);
    });
};

const getAgencyById = (idAgency, setAgency, setIsSave) => {
  axios({
    method: "get",
    url: `${baseUrl}admin/get-agency-by-id/${idAgency}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => data.body)
    .then((body) => {
      setAgency(body);
      if (setIsSave) {
        setIsSave(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsSave(false);
    });
};

const createAgency = (Data, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/create-agency`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setNotification(data.message);
      setIsSave(true);
    })
    .catch((err) => {
      setNotification("error");
      console.log(err);
      setIsSave(true);
    });
};

const removeAgency = (idAgency, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/delete-agency-by-id/${idAgency}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => data.body)
    .then((body) => {
      setNotification(body);
      setIsSave(true);
    })
    .catch((err) => {
      setNotification("error");
      console.log(err);
    });
};

export { getAgency, getAgencyById, removeAgency, createAgency };
