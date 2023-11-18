/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
// import { Button } from "@mui/material";
import { deleteRoute } from "Apis/route.api";
import UpdateRoute from "../UpdateRoute";

function ItemRoute({
  stt,
  dep,
  des,
  quantity,
  station,
  time,
  hide,
  listStation,
  idRoute,
  setIsSave,
  setNotification,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleleRoute = () => {
    deleteRoute(idRoute, setIsSave, setNotification);
  };
  return (
    <MDBox
      pl={2}
      display="flex"
      height="3.5rem"
      borderBottom="0.2px solid #f0f2f5"
      alignItems="center"
    >
      <MDTypography variant="caption" color="text" fontWeight="medium" marginLeft="5px" width="6%">
        {stt}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={1} width="14%">
        {dep}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={1} width="14%">
        {des}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={1} width="8%">
        {quantity}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={1} width="25%">
        {station}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={2} width="11%">
        {time}
      </MDTypography>
      {hide ? (
        <MDBox display="flex" alignItems="center" mt={-2} width="10%">
          {null}
        </MDBox>
      ) : (
        <MDBox display="flex" alignItems="center" mt={0} width="10%">
          <MDBox mr={0} ml={0}>
            <MDButton
              variant="text"
              color="error"
              onClick={() => {
                handleDeleleRoute();
              }}
            >
              <Icon>delete</Icon>&nbsp;Xóa
            </MDButton>
          </MDBox>
          <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={handleClickOpen}>
            <Icon>edit</Icon>&nbsp;Sửa
          </MDButton>
        </MDBox>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle ml="43%">Cập nhật</DialogTitle>
        <UpdateRoute
          listStation={listStation}
          handleClose={handleClose}
          idRoute={idRoute}
          setIsSave={setIsSave}
          setNotification={setNotification}
        />
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Update
          </Button>
        </DialogActions> */}
      </Dialog>
    </MDBox>
  );
}

ItemRoute.propTypes = {
  stt: PropTypes.string.isRequired,
  dep: PropTypes.string.isRequired,
  des: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  station: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
  listStation: PropTypes.arrayOf.isRequired,
  idRoute: PropTypes.number.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default ItemRoute;
