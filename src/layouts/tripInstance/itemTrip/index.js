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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import * as React from "react";
// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { deleteTripInstance, updateTripInstance } from "Apis/tripinstance.api";

function ItemTrip({
  stt,
  departure,
  arrival,
  date,
  time,
  hide,
  idTripInstance,
  idRoute,
  setIsSave,
  setNotification,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [open, setOpen] = React.useState(false);
  const [dataUpdate, setDataUpdate] = React.useState({
    date: "",
    idRoute: 0,
    idTripInstance: 0,
    timeStart: "",
  });
  React.useEffect(() => {
    setDataUpdate({ date, idRoute, idTripInstance, timeStart: time });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteTripInstance = () => {
    // alert(idTripInstance);
    deleteTripInstance(idTripInstance, setIsSave, setNotification);
  };
  const handleUpdateTripInstance = () => {
    updateTripInstance(dataUpdate, setIsSave, setNotification);
  };

  return (
    <MDBox
      pl={2}
      display="flex"
      height="3.5rem"
      borderBottom="0.2px solid #f0f2f5"
      width="100%"
      alignItems="center"
    >
      <MDTypography variant="caption" color="text" fontWeight="medium" marginLeft="5px" width="10%">
        {stt}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="medium"
        ml={1}
        width="17%"
        textAlign="left"
      >
        {departure}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="medium"
        ml={1}
        width="17%"
        textAlign="left"
      >
        {arrival}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="medium"
        ml={1}
        width="16%"
        textAlign="left"
      >
        {date}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="medium"
        ml={1}
        width="16%"
        textAlign="left"
      >
        {time}
      </MDTypography>
      {hide ? (
        <MDBox display="flex" alignItems="center" mt={0} width="10%">
          {null}
        </MDBox>
      ) : (
        <MDBox display="flex" alignItems="center" mt={0} width="10%">
          <MDBox mr={1} ml={1}>
            <MDButton
              variant="text"
              color="error"
              onClick={() => {
                handleDeleteTripInstance();
              }}
            >
              <Icon>delete</Icon>&nbsp;Xóa
            </MDButton>
          </MDBox>
          {new Date().valueOf() - Date.parse(date) < 0 ? (
            <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={handleClickOpen}>
              <Icon>edit</Icon>&nbsp;Sửa
            </MDButton>
          ) : (
            <MDButton variant="text" color={darkMode ? "white" : "dark"} disabled>
              <Icon>edit</Icon>&nbsp;Sửa
            </MDButton>
          )}
        </MDBox>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle ml="43%">Cập nhật</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ngày khởi hành"
            type="date"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            value={dataUpdate.date}
            onChange={(e) => {
              setDataUpdate({
                ...dataUpdate,
                date: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Thời gian khởi hành"
            type="time"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            value={dataUpdate.timeStart}
            onChange={(e) => {
              if (!e.target.value) {
                setDataUpdate({
                  ...dataUpdate,
                  timeStart: `${e.target.value}`,
                });
              } else {
                setDataUpdate({
                  ...dataUpdate,
                  timeStart: `${e.target.value}:00`,
                });
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              handleUpdateTripInstance();
              handleClose();
            }}
            disabled={!dataUpdate.date || !dataUpdate.timeStart}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

ItemTrip.propTypes = {
  stt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  departure: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  idTripInstance: PropTypes.number.isRequired,
  idRoute: PropTypes.number.isRequired,
  hide: PropTypes.bool.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default ItemTrip;
