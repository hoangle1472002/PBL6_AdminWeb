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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { updateVehicle } from "Apis/vehicle.api";

function ItemVehicle({
  stt,
  name,
  licensePlate,
  seatQuantity,
  status,
  setClickSave,
  setNotification,
  hide,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [open, setOpen] = React.useState(false);
  const [vehicle, setVehicle] = React.useState({
    licensePlate,
    nameVehicle: name,
    seatQuantity,
    status: true,
  });
  React.useEffect(() => {
    // console.log(setclickSave);
    setVehicle({
      licensePlate,
      nameVehicle: name,
      seatQuantity,
      status: true,
    });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateVehicle = () => {
    updateVehicle({ ...vehicle }, setClickSave, setNotification);
  };
  return (
    <MDBox pl={1} display="flex" height="3.5rem" pt={2} borderBottom="0.2px solid #f0f2f5">
      <MDTypography variant="caption" color="text" fontWeight="medium" width="10%">
        {stt}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" width="23%">
        {name}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={1} width="17%">
        {licensePlate}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={1} width="15%">
        {seatQuantity}
      </MDTypography>
      {hide ? (
        <MDTypography variant="caption" color="text" fontWeight="medium" ml={1} width="20%">
          {status}
        </MDTypography>
      ) : (
        <MDTypography variant="caption" color="text" fontWeight="medium" ml={1} width="20%">
          {status === "true" ? "Đang hoạt động" : "Dừng hoạt động"}
        </MDTypography>
      )}

      {/* <TextField type="checkbox" value={status} /> */}
      {hide ? (
        <MDBox display="flex" alignItems="center" mt={-2} width="10%">
          {null}
        </MDBox>
      ) : (
        <MDBox display="flex" alignItems="center" mt={-3} width="10%">
          {/* <MDBox>
            <MDButton variant="text" color="error" disabled>
              <Icon>delete</Icon>&nbsp;Xóa
            </MDButton>
          </MDBox> */}
          <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={handleClickOpen}>
            <Icon>edit</Icon>&nbsp;Sửa
          </MDButton>
        </MDBox>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle ml="43%">Cập nhật</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            value={vehicle.nameVehicle}
            onChange={(e) => {
              setVehicle({
                ...vehicle,
                nameVehicle: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Biển số xe"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            value={vehicle.licensePlate}
            onChange={(e) => {
              setVehicle({
                ...vehicle,
                licensePlate: e.target.value,
              });
            }}
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Số lượng ghế"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            value={vehicle.seatQuantity}
            onChange={(e) => {
              setVehicle({
                ...vehicle,
                seatQuantity: e.target.value,
              });
            }}
            disabled
          />
          <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Trạng thái"
            onChange={(e) => {
              setVehicle({
                ...vehicle,
                status: e.target.value,
              });
            }}
          >
            <MenuItem value="true">Đang hoạt động</MenuItem>
            <MenuItem value="false">Dừng hoạt động</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              handleUpdateVehicle();
              handleClose();
            }}
            disabled={!vehicle.nameVehicle}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

ItemVehicle.propTypes = {
  stt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  licensePlate: PropTypes.string.isRequired,
  seatQuantity: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  setClickSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
};

export default ItemVehicle;
