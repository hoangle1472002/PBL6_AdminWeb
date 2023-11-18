import axios from "axios";
import { setLocalStorage, STORAGE, removeLocalStorage, getLocalStorage } from "Utils/storage";
import baseUrl from "./config";

function currentUser1(accessToken, Data, navigate, role, setErr) {
  axios({
    method: "get",
    url: `${baseUrl}auth/current`,
    headers: {
      authorization: `${accessToken}`,
      "content-type": "application/json",
    },
  })
    .then((res) => res.data)
    .then((data) => {
      if (
        (data.authorities[0].authority === "ROLE_AGENCY" && role === 1) ||
        (data.authorities[0].authority === "ROLE_ADMIN" && role === 0)
      ) {
        setLocalStorage(STORAGE.USER_DATA, JSON.stringify(Data));
        setLocalStorage(STORAGE.USER_TOKEN, accessToken);
        setLocalStorage("EXPIRE", JSON.stringify(new Date()));
        if (data.authorities[0].authority === "ROLE_AGENCY") {
          setLocalStorage("POSITION", "AGENCY");
          navigate("/admin/dashboard");
        } else {
          setLocalStorage("POSITION", "ADMIN");
          navigate("/admin/profile");
        }
      } else {
        setErr("Vui lòng kiểm tra quyền truy cập");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function login(Data, navigate, setErr, role) {
  axios({
    method: "post",
    url: `${baseUrl}auth/login`,
    data: Data,
  })
    .then((res) => res.data)
    .then((data) => {
      if (data.message) {
        // setErr("Vui lòng kiểm tra lại tài khoản hoặc mật khẩu");
        setErr(data.message);
        alert(data.message);
      } else {
        currentUser1(data.accessToken, data, navigate, role, setErr);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function register(Data) {
  axios({
    method: "post",
    url: `${baseUrl}auth/create-teacher`,
    data: Data,
  })
    .then((res) => res.data)
    .then((data) => {
      // setLocalStorage(STORAGE.USER_DATA, JSON.stringify(data));
      // setLocalStorage(STORAGE.USER_TOKEN, data.accessToken);
      // window.location.reload();
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function logout(navigate) {
  // console.log(getLocalStorage(STORAGE.USER_TOKEN).split(".")[2]);
  axios({
    method: "post",
    url: `${baseUrl}auth/logout`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then(() => {
      removeLocalStorage(STORAGE.USER_DATA);
      removeLocalStorage(STORAGE.USER_TOKEN);
      removeLocalStorage("EXPIRE");
      navigate("/authentication/sign-in");
    })
    .catch((err) => {
      console.log(err);
    });
}

function currentUser(setProfile, setIsSave) {
  axios({
    method: "get",
    url: `${baseUrl}auth/current`,
    headers: {
      authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
      "content-type": "application/json",
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setProfile(data);
      setIsSave(false);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getProfile(setProfile, setIsSave) {
  axios({
    method: "get",
    url: `${baseUrl}profile/info`,
    headers: {
      authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
      "content-type": "application/json",
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setProfile(data);
      setIsSave(false);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { login, register, logout, currentUser, getProfile };
// ${JSON.parse(getLocalStorage(STORAGE.USER_DATA)).tokenType}
