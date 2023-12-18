import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import { useState, useEffect } from "react";
import { createVehicle, getAllTypeVehicle } from "Apis/vehicle.api";
import { PropTypes } from "prop-types";
import { Select, MenuItem } from "@mui/material";

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

  const [seatQuantities, setSeatQuantities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllTypeVehicle(setVehicle, setSeatQuantities);
      } catch (error) {
        console.error("Error fetching seat quantities:", error);
        // Handle the error, e.g., show an error notification
      }
    };
    fetchData();
  }, []);

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

        <MDBox mb={2} display="flex" justifyContent="flex-start" alignItems="center">
          <MDTypography variant="caption" color="text" fontWeight="bold" width="30%">
            Loại xe :
          </MDTypography>
          <Select
            ml={3} // Adjust the margin-left for proper alignment
            fullWidth
            value={vehicle.seatQuantity}
            onChange={(e) => {
              setVehicle({
                ...vehicle,
                seatQuantity: e.target.value,
              });
            }}
            variant="standard"
            sx={{ width: "100%", mx: 4, border: "1px solid #ccc", borderRadius: 4 }}
          >
            {seatQuantities.map((item) => (
              <MenuItem key={item.id} value={item.quantity}>
                {item.description}
              </MenuItem>
            ))}
          </Select>
        </MDBox>

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
