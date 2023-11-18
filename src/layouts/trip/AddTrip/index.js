import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import * as React from "react";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { getTripInstance, getTripInstanceById } from "Apis/tripinstance.api";
import { getVehicle, getVehicleById } from "Apis/vehicle.api";
import { createTripPrice } from "Apis/trip.api";
import Item from "layouts/tripInstance/itemStation";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { PropTypes } from "prop-types";

function AddTrip({ setIsSave, setNotification }) {
  const [tripInstances, setTripInstances] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [isSaveTripIns, setIsSaveTripIns] = useState(true);
  const [listStation, setListStation] = useState([]);
  const [isSaveStation, setIsSaveStation] = useState(true);
  const [idTripInstanceChosen, setIdTripInstanceChosen] = useState(0);
  const [isSaveVehicle, setIsSaveVehicle] = useState(true);
  const [idVehicleChosen, setIdVehicleChosen] = useState(0);
  const [VehicleChosen, setVehicleChosen] = useState([]);
  const [listVehicleChosen, setListVehicleChosen] = useState([]);
  const [idVehicle, setIdVehicle] = useState([]);
  const [listPrice, setListPrice] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [price, setPrice] = useState({
    price1: 0,
    price2: 0,
    price3: 0,
  });

  useEffect(() => {
    if (isSaveTripIns) {
      getTripInstance(setTripInstances, setIsSaveTripIns);
      getVehicle(setVehicle, setIsSaveTripIns);
    }
  }, [isSaveTripIns]);
  useEffect(() => {
    if (isSaveStation) {
      if (idTripInstanceChosen === 0) {
        setListStation([]);
        setIsSaveStation(false);
      } else {
        getTripInstanceById(idTripInstanceChosen, setListStation, setIsSaveStation);
      }
    }
  }, [isSaveStation, idTripInstanceChosen]);

  useEffect(() => {
    if (isSaveVehicle) {
      if (idVehicleChosen === 0) {
        setVehicleChosen([]);
        setIsSaveVehicle(false);
      } else {
        getVehicleById(idVehicleChosen, setVehicleChosen, setIsSaveVehicle);
        setIdVehicle(idVehicle.concat(idVehicleChosen));
      }
    }
  }, [isSaveVehicle, idVehicleChosen]);
  useEffect(() => {
    if (isSaveVehicle) {
      setListVehicleChosen(listVehicleChosen.concat(VehicleChosen));
    }
  }, [VehicleChosen]);

  const handleRemoveItem = (id) => {
    setListVehicleChosen(listVehicleChosen.filter((item) => item.id !== id));
    setIdVehicle(idVehicle.filter((item) => item !== id));
  };

  useEffect(() => {
    if (listStation.length > 2) {
      if (price.price1 && price.price2 && price.price3) {
        setDisabled(false);
      }
    } else if (listStation.length > 1) {
      if (price.price1 && price.price2) {
        setDisabled(false);
      }
    } else if (listStation.length > 0) {
      if (price.price1) {
        setDisabled(false);
      }
    }
  }, [disabled, listStation, price]);

  const handleValid1 = (val) => {
    if (val.length < 1) {
      setDisabled(true);
    }
  };
  const handleValid2 = (val) => {
    if (val.length < 1) {
      setDisabled(true);
    }
  };
  const handleValid3 = (val) => {
    if (val.length < 1) {
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (listStation.length > 2) {
      setListPrice([
        {
          idRouteStation: listStation[0].id,
          price: parseInt(price.price1, 10),
        },
        {
          idRouteStation: listStation[1].id,
          price: parseInt(price.price2, 10),
        },
        {
          idRouteStation: listStation[2].id,
          price: parseInt(price.price3, 10),
        },
      ]);
    } else if (listStation.length > 1) {
      setListPrice([
        {
          idRouteStation: listStation[0].id,
          price: parseInt(price.price1, 10),
        },
        {
          idRouteStation: listStation[1].id,
          price: parseInt(price.price2, 10),
        },
      ]);
    } else if (listStation.length > 0) {
      setListPrice([
        {
          idRouteStation: listStation[0].id,
          price: parseInt(price.price1, 10),
        },
      ]);
    }
  }, [listStation, price]);

  const handleCreateTrip = () => {
    createTripPrice(
      {
        idTripInstance: idTripInstanceChosen,
        idVehicle,
        listPrice,
      },
      setIsSave,
      setNotification
    );
  };
  return (
    <Card sx={{ mb: 4 }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={4}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Thêm chuyến
        </MDTypography>
      </MDBox>
      <MDBox mt={3} pb={2} px={4}>
        <MDBox mb={2} display="block">
          <MDBox mb={2} mt={2} display="flex">
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" width="20%">
              Chuyến
            </MDTypography>
            {listStation.length > 0 && (
              <MDBox display="flex" width="80%">
                <MDTypography variant="h6" fontWeight="medium" ml={1} width="77%">
                  Trạm
                </MDTypography>
                <MDTypography variant="h6" fontWeight="medium" ml={3} width="10%">
                  Giá
                </MDTypography>
              </MDBox>
            )}
          </MDBox>
          <MDBox mb={2} mt={2} display="flex">
            <MDBox ml={0} width="20%">
              <FormControl
                size="small"
                sx={{ width: "100%" }}
                style={{
                  height: 40,
                }}
              >
                <InputLabel id="demo-simple-select-label">TripInstance</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Lop"
                  defaultValue={0}
                  onChange={(e) => {
                    setIdTripInstanceChosen(e.target.value);
                    setIsSaveStation(true);
                  }}
                  style={{ height: "100%" }}
                >
                  <MenuItem value={0}>Tất Cả</MenuItem>
                  {tripInstances.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.adminGetRouteResponse.route.departure.nameStation}- to -
                      {item.adminGetRouteResponse.route.arrival.nameStation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
            <MDBox ml={0} mt={3} width="70%">
              <MDBox pt={1} pb={2} px={2}>
                <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                  <MDBox mt="-40px">
                    {listStation.length > 0
                      ? listStation.map((item, index) => (
                          <Item
                            stt={index + 1}
                            dep={item.stationP.nameStation}
                            des={item.stationS.nameStation}
                            time={item.time}
                          />
                        ))
                      : null}
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox ml={0} mt={3} width="20%">
              <MDBox pt={1} pb={2} px={2}>
                <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                  <MDBox mt="-40px">
                    {listStation.length > 0 && (
                      <MDBox ml={1} mt={1} width="100%">
                        <TextField
                          variant="outlined"
                          sx={{ mt: 0, width: "100%" }}
                          onChange={(e) => {
                            setPrice({
                              ...price,
                              price1: e.target.value,
                            });
                            handleValid1(e.target.value);
                          }}
                        />
                      </MDBox>
                    )}
                    {listStation.length > 1 && (
                      <MDBox ml={1} mt={1} width="100%">
                        <TextField
                          variant="outlined"
                          sx={{ mt: 0, width: "100%" }}
                          onChange={(e) => {
                            setPrice({
                              ...price,
                              price2: e.target.value,
                            });
                            handleValid2(e.target.value);
                          }}
                        />
                      </MDBox>
                    )}
                    {listStation.length > 2 && (
                      <MDBox ml={1} mt={1} width="100%">
                        {/* <TextField
                          variant="outlined"
                          sx={{ mt: -1, width: "100%" }}
                          onChange={(e) => {
                            setVehicle({
                              ...vehicle,
                              seatQuantity: e.target.value,
                            });
                          }}
                        /> */}
                        <TextField
                          variant="outlined"
                          sx={{ mt: 0, width: "100%" }}
                          onChange={(e) => {
                            setPrice({
                              ...price,
                              price3: e.target.value,
                            });
                            handleValid3(e.target.value);
                          }}
                        />
                      </MDBox>
                    )}
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox mb={2} display="block">
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" width="100px">
            Xe
          </MDTypography>
          <MDBox mb={2} mt={2} display="flex">
            <MDBox ml={0} width="18%">
              <FormControl
                size="small"
                sx={{ width: "100%" }}
                style={{
                  height: 40,
                }}
              >
                <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Lop"
                  defaultValue={0}
                  onChange={(e) => {
                    setIdVehicleChosen(e.target.value);
                    setIsSaveVehicle(true);
                  }}
                  style={{ height: "100%" }}
                >
                  <MenuItem value={0}>Tất Cả</MenuItem>
                  {vehicle.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.nameVehicle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
            <MDBox ml={0} mt={3} width="70%">
              <MDBox pt={1} pb={2} px={2}>
                <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                  <MDBox mt="-40px">
                    {listVehicleChosen.map((item, index) => (
                      <MDBox width="100%">
                        <MDBox display="flex">
                          <MDBox mt={0} mb={1} ml={4} width="90%" alignSelf="flex-end">
                            <Item
                              stt={index + 1}
                              dep={item.nameVehicle}
                              des={item.licensePlate}
                              time={item.seatQuantity.quantity}
                            />
                          </MDBox>
                          <MDBox mt={0} mb={2} ml={4} width="10%" alignSelf="flex-end">
                            <HighlightOffRoundedIcon
                              style={{
                                // fontSize: 40,
                                color: "red",
                                cursor: "pointer",
                                marginLeft: 40,
                                marginTop: -4,
                              }}
                              onClick={() => {
                                handleRemoveItem(item.id);
                              }}
                            />
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    ))}
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox mt={4} mb={2} ml="90%" width="50px">
          {listVehicleChosen.length > 0 && !disabled ? (
            <MDButton
              component=""
              to="/admin/dashboard"
              variant="gradient"
              fullWidth
              color="info"
              onClick={() => {
                handleCreateTrip();
              }}
            >
              Lưu
            </MDButton>
          ) : (
            <MDButton
              component=""
              to="/admin/dashboard"
              variant="gradient"
              fullWidth
              color="info"
              disabled
              onClick={() => {
                handleCreateTrip();
              }}
            >
              Lưu
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}
AddTrip.propTypes = {
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
export default AddTrip;
