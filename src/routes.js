// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import Vehicle from "layouts/vehicle";
import Route from "layouts/route";
import TripInstance from "layouts/tripInstance";
import Trip from "layouts/trip";
import HistoryBooking from "layouts/historyBooking";
import Revenue from "layouts/revenue";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";
import Agency from "layouts/agency";

const routes = [
  {
    type: "collapse",
    name: "Trang chủ",
    key: "admin/dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/admin/dashboard",
    component: <Dashboard />,
    permission: "login",
  },
  {
    type: "collapse",
    name: "Quản lý xe",
    key: "admin/vehicle",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/admin/vehicle",
    component: <Vehicle />,
    permission: "login",
  },
  {
    type: "collapse",
    name: "Quản lý tuyến",
    key: "admin/route",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/admin/route",
    component: <Route />,
    permission: "login",
  },
  {
    type: "collapse",
    name: "Quản lý thời gian chuyến đi",
    key: "admin/tripInstance",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/admin/tripInstance",
    component: <TripInstance />,
    permission: "login",
  },
  {
    type: "collapse",
    name: "Quản lý chuyến",
    key: "admin/trip",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/admin/trip",
    component: <Trip />,
    permission: "login",
  },
  {
    type: "collapse",
    name: "Quản lý vé",
    key: "admin/history",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/admin/history",
    component: <HistoryBooking />,
    permission: "login",
  },
  {
    type: "collapse",
    name: "Doanh thu",
    key: "admin/revenue",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/admin/revenue",
    component: <Revenue />,
    permission: "login",
  },
  {
    type: "collapse",
    name: "Thông tin cá nhân",
    key: "admin/profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/admin/profile",
    component: <Profile />,
    permission: "login",
  },
  {
    type: "collapse",
    name: "Đăng xuất",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    permission: "",
  },
  {
    type: "collapse",
    name: "Quản lý hãng xe",
    key: "admin/agency",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/admin/agency",
    component: <Agency />,
    permission: "login",
  },
  {
    type: "collapse",
    name: "Đăng xuất",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    permission: "",
  },
  // {
  //   type: "collapse",
  //   name: "Logout",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  //   permission: "",
  // },
];

export default routes;
