import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import { useState } from "react";
import { createVehicle } from "Apis/vehicle.api";
import { PropTypes } from "prop-types";

function AddVehicle({ setClickSave, setNotification }) {
  const [vehicle, setVehicle] = useState({
    licensePlate: "",
    nameVehicle: "",
    seatQuantity: 46,
    status: true,
  });
  const handleCreateVehicle = () => {
    // console.log(vehicle);
    // setClickSave(false);
    // console.log(setClickSave);
    createVehicle(vehicle, setClickSave, setNotification);
  };
  return (
    <Card sx={{ height: "350px" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={4}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Thêm xe
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={4}>
        <MDBox mb={2} display="flex" justifyContent="flex-start">
          <MDTypography variant="caption" color="text" fontWeight="bold" width="30%">
            Tên
          </MDTypography>
          <MDBox ml={3} width="70%">
            <TextField
              variant="outlined"
              sx={{ mt: -1, width: "100%" }}
              onChange={(e) => {
                setVehicle({
                  ...vehicle,
                  nameVehicle: e.target.value,
                });
              }}
            />
          </MDBox>
        </MDBox>
        <MDBox mb={2} display="flex" justifyContent="flex-start">
          <MDTypography variant="caption" color="text" fontWeight="bold" width="30%">
            Biển số xe
          </MDTypography>
          <MDBox ml={3} width="70%">
            <TextField
              variant="outlined"
              sx={{ mt: -1, width: "100%" }}
              onChange={(e) => {
                setVehicle({
                  ...vehicle,
                  licensePlate: e.target.value,
                });
              }}
            />
          </MDBox>
        </MDBox>
        {/* <MDBox mb={2} display="flex">
          <MDTypography variant="caption" color="text" fontWeight="bold" width="30%">
            Số lượng ghế
          </MDTypography>
          <MDBox ml={3} width="70%">
            <TextField
              variant="outlined"
              sx={{ mt: -1, width: "100%" }}
              onChange={(e) => {
                setVehicle({
                  ...vehicle,
                  seatQuantity: e.target.value,
                });
              }}
            />
          </MDBox>
        </MDBox> */}
        {/* <MDBox mb={2} display="flex">
          <MDTypography variant="caption" color="text" fontWeight="bold" width="80px">
            Status
          </MDTypography>
          <MDBox ml={4} width="15rem">
            <TextField
              label="status"
              variant="outlined"
              sx={{ mt: -1, width: "24ch" }}
              onChange={(e) => {
                setVehicle({
                  ...vehicle,
                });
              }}
            />
          </MDBox>
        </MDBox> */}
        <MDBox mt={1} mb={2} ml="83%" width="50px">
          <MDButton
            component=""
            to="/admin/dashboard"
            variant="gradient"
            fullWidth
            color="info"
            onClick={() => {
              handleCreateVehicle();
            }}
            disabled={!vehicle.nameVehicle || !vehicle.licensePlate}
          >
            Lưu
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}
AddVehicle.propTypes = {
  setClickSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default AddVehicle;
