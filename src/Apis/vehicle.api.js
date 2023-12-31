import axios from "axios";
import { STORAGE, getLocalStorage } from "Utils/storage";
import baseUrl from "./config";

const getVehicle = (setVehicles, setIsSave) => {
  axios({
    method: "get",
    url: `${baseUrl}all-vehicle-agency`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => data.body)
    .then((body) => {
      // console.log(body);
      setVehicles(body);
      if (setIsSave) {
        setIsSave(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsSave(false);
    });
};

const getVehicleById = (idVehicle, setVehicle, setIsSave) => {
  axios({
    method: "get",
    url: `${baseUrl}get-vehicle-by-id/${idVehicle}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setVehicle(data.body);
      setIsSave(false);
      // if (setNumberStation) {
      //   setNumberStation(data.body.routeStationList.length - 1);
      // }
    })
    .catch((err) => {
      // setNotification("error");
      console.log(err);
      setIsSave(false);
    });
};

const getAllTypeVehicle = (setSeatQuantities, setIsSave) => {
  axios({
    method: "get",
    url: `${baseUrl}all-type-vehicle`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      // Set seat quantities in the state
      setSeatQuantities(data);

      if (setIsSave) {
        setIsSave(false);
      }
    })
    .catch((err) => {
      // Handle error
      console.error(err);
    });
};

const createTypeVehicle = (Data, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}admin/create-type-vehicle`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => {
      setNotification(res);
      setIsSave(true);
    })
    .catch((err) => {
      setNotification("error");
      console.log(err);
    });
};

const removeTypeVehicle = (idType, setIsSave, setNotification) => {
  axios({
    method: "delete",
    url: `${baseUrl}admin/remove-type-vehicle/${idType}`,
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

// const getAllVehicle = (setAllVehicles, setIsSave) => {
//   axios({
//     method: "get",
//     url: `${baseUrl}all-vehicle`,
//     headers: {
//       Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
//     },
//   })
//     .then((res) => res.data)
//     .then((data) => data.body)
//     .then((body) => {
//       // console.log(body);
//       setAllVehicles(body);
//       setIsSave(false);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const createVehicle = (Data, setIsSave, setNotification) => {
  axios({
    method: "post",
    url: `${baseUrl}create-vehicle`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => data.body)
    .then((body) => {
      console.log(body);
      setNotification(body);
      setIsSave(true);
    })
    .catch((err) => {
      setNotification("error");
      console.log(err);
    });
};

const updateVehicle = (Data, setIsSave, setNotification) => {
  axios({
    method: "put",
    url: `${baseUrl}update-vehicle`,
    data: Data,
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

export {
  getVehicle,
  getVehicleById,
  createVehicle,
  updateVehicle,
  getAllTypeVehicle,
  createTypeVehicle,
  removeTypeVehicle,
};
