import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import * as React from "react";
import { PropTypes } from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createTripInstance } from "Apis/tripinstance.api";

function AddTrip({ routes, setIdRouteChosen, setIsSaveStation, setIsSave, setNotification }) {
  const today = new Date();
  const tomorrow = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const minTime = `${today.getHours()}:${today.getMinutes()}`;
  const [dataAdd, setDataAdd] = React.useState({
    date: "",
    idRoute: 0,
    timeStart: "",
  });
  const handleCreateTripInstance = () => {
    createTripInstance(dataAdd, setIsSave, setNotification);
  };
  return (
    <Card sx={{ height: "370px", mb: 4 }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={4}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Thêm
        </MDTypography>
      </MDBox>
      <MDBox mt={3} pb={2} px={4}>
        <MDBox mb={2} display="flex">
          {/* <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" width="30%">
            Trip station
          </MDTypography> */}
          <MDBox ml={0} mt={1} width="22rem" display="block">
            <MDBox mb={2} display="flex">
              <MDTypography variant="caption" color="text" fontWeight="bold" width="30%">
                Tuyến
              </MDTypography>
              <MDBox ml={0} width="70%">
                <FormControl
                  size="small"
                  sx={{ width: "100%" }}
                  style={{
                    height: 40,
                  }}
                  required
                >
                  <InputLabel id="demo-simple-select-label">Tuyến</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tuyến"
                    defaultValue={0}
                    onChange={(e) => {
                      setIdRouteChosen(e.target.value);
                      setIsSaveStation(true);
                      setDataAdd({
                        ...dataAdd,
                        idRoute: e.target.value,
                      });
                    }}
                    style={{ height: "100%" }}
                  >
                    <MenuItem value={0}>Tất Cả</MenuItem>
                    {routes.map((item) => (
                      <MenuItem value={item.route.id} key={item.route.id}>
                        {item.route.departure.nameStation} to {item.route.arrival.nameStation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
            </MDBox>
            <MDBox mb={2} mt={4} display="flex">
              <MDTypography variant="caption" color="text" fontWeight="bold" width="30%">
                Ngày khởi hành
              </MDTypography>
              <MDBox ml={0} width="70%">
                <TextField
                  id="date"
                  label="Ngày khởi hành"
                  type="date"
                  // defaultValue="2022-12-02"
                  required
                  rules={{
                    isRequired: true,
                  }}
                  sx={{ width: "100%", mt: -1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setDataAdd({
                      ...dataAdd,
                      date: e.target.value,
                    });
                  }}
                  inputProps={{
                    min: tomorrow,
                  }}
                />
              </MDBox>
            </MDBox>
            <MDBox mb={2} mt={4} display="flex">
              <MDTypography variant="caption" color="text" fontWeight="bold" width="30%">
                Thời gian khởi hành
              </MDTypography>
              <MDBox ml={0} width="70%">
                <TextField
                  id="time"
                  label="Thời gian khởi hành"
                  type="time"
                  required
                  // defaultValue="03:30"
                  sx={{ width: "100%", mt: -1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setDataAdd({
                      ...dataAdd,
                      timeStart: `${e.target.value}:00`,
                    });
                  }}
                  inputProps={{
                    min: minTime,
                  }}
                />
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox mt={4} mb={2} ml="80%" width="50px">
          <MDButton
            component=""
            to="/admin/dashboard"
            variant="gradient"
            fullWidth
            color="info"
            onClick={() => {
              handleCreateTripInstance();
            }}
            disabled={!dataAdd.date || !dataAdd.idRoute || !dataAdd.timeStart}
          >
            Lưu
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

AddTrip.propTypes = {
  routes: PropTypes.arrayOf.isRequired,
  setIdRouteChosen: PropTypes.func.isRequired,
  setIsSaveStation: PropTypes.func.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default AddTrip;
