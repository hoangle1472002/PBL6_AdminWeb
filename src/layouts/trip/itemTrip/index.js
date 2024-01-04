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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import Item from "layouts/tripInstance/itemStation";
import { updatePriceTrip } from "Apis/trip.api";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import * as React from "react";
import { useEffect } from "react";

function ItemTrip({
  stt,
  dep,
  des,
  date,
  time,
  vehicle,
  licensePlate,
  hide,
  idTrip,
  routeStationPrice,
  setIsSave,
  setNotification,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);
  const [price, setPrice] = React.useState({
    price1: 0,
    price2: 0,
    price3: 0,
  });
  // const [dataUpdate, setDataUpdate] = React.useState({
  //   date: "",
  //   idRoute: 0,
  //   idTripInstance: 0,
  //   timeStart: "",
  // });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (routeStationPrice?.length > 2) {
      if (price.price1 && price.price2 && price.price3) {
        setDisabled(false);
      }
    } else if (routeStationPrice?.length > 1) {
      if (price.price1 && price.price2) {
        setDisabled(false);
      }
    } else if (routeStationPrice?.length > 0) {
      if (price.price1) {
        setDisabled(false);
      }
    }
  }, [disabled, routeStationPrice, price]);
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
    if (routeStationPrice?.length > 2) {
      setList([
        {
          idRouteStation: routeStationPrice[0].id,
          price: parseInt(price.price1, 10),
        },
        {
          idRouteStation: routeStationPrice[1].id,
          price: parseInt(price.price2, 10),
        },
        {
          idRouteStation: routeStationPrice[2].id,
          price: parseInt(price.price3, 10),
        },
      ]);
    } else if (routeStationPrice?.length > 1) {
      setList([
        {
          idRouteStation: routeStationPrice[0].id,
          price: parseInt(price.price1, 10),
        },
        {
          idRouteStation: routeStationPrice[1].id,
          price: parseInt(price.price2, 10),
        },
      ]);
    } else if (routeStationPrice?.length > 0) {
      setList([
        {
          idRouteStation: routeStationPrice[0].id,
          price: parseInt(price.price1, 10),
        },
      ]);
    }
  }, [routeStationPrice, price]);

  const handleUpdatePriceTrip = () => {
    updatePriceTrip(
      {
        idTrip,
        listPrice: list,
      },
      setIsSave,
      setNotification
    );
  };
  return (
    <MDBox
      pl={1}
      display="flex"
      height="3.5rem"
      borderBottom="0.2px solid #f0f2f5"
      alignItems="center"
    >
      <MDTypography variant="caption" color="text" fontWeight="medium" marginLeft="5px" width="7%">
        {stt}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="medium"
        ml={1}
        width="14%"
        textAlign="left"
      >
        {dep}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="medium"
        ml={1}
        width="14%"
        textAlign="left"
      >
        {des}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="medium"
        ml={1}
        width="14%"
        textAlign="left"
      >
        {date}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="medium"
        ml={1}
        width="14%"
        textAlign="left"
      >
        {time}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="medium"
        ml={1}
        width="14%"
        textAlign="left"
      >
        {licensePlate}
        <br />
        {vehicle}
      </MDTypography>
      {hide ? (
        <MDBox display="flex" alignItems="center" mt={0} width="10%">
          {null}
        </MDBox>
      ) : (
        <MDBox display="flex" alignItems="center" mt={0} width="10%">
          {/* <MDBox mr={0} ml={0}>
            <MDButton variant="text" color="error" disabled>
              <Icon>delete</Icon>&nbsp;Xóa
            </MDButton>
          </MDBox> */}
          {new Date().valueOf() - Date.parse(date) < 0 ? (
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              onClick={() => {
                handleClickOpen();
                setPrice({
                  price1: routeStationPrice[0]?.price,
                  price2: routeStationPrice[1]?.price,
                  price3: routeStationPrice[2]?.price,
                });
              }}
            >
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
          <MDBox display="flex">
            <MDBox ml={0} mt={3} width="70%">
              <MDBox pt={1} pb={2} px={2}>
                <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                  <MDBox mt="-40px">
                    {routeStationPrice?.length > 0
                      ? routeStationPrice.map((item, index) => (
                          <Item
                            stt={index + 1}
                            dep={Object.values(item.stationP)}
                            des={Object.values(item.stationS)}
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
                    {routeStationPrice?.length > 0 && (
                      <MDBox ml={1} mt={1} width="100%">
                        <TextField
                          variant="outlined"
                          sx={{ mt: 0, width: "100%" }}
                          value={price.price1.toString().replace(/\D/, "")}
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
                    {routeStationPrice?.length > 1 && (
                      <MDBox ml={1} mt={1} width="100%">
                        <TextField
                          variant="outlined"
                          sx={{ mt: 0, width: "100%" }}
                          value={price.price2.toString().replace(/\D/, "")}
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
                    {routeStationPrice?.length > 2 && (
                      <MDBox ml={1} mt={1} width="100%">
                        <TextField
                          variant="outlined"
                          sx={{ mt: 0, width: "100%" }}
                          value={price.price3.toString().replace(/\D/, "")}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          {!disabled ? (
            <Button
              onClick={() => {
                handleUpdatePriceTrip();
                handleClose();
              }}
            >
              Cập nhật
            </Button>
          ) : (
            <Button
              disabled
              onClick={() => {
                handleUpdatePriceTrip();
                handleClose();
              }}
            >
              Cập nhật
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

ItemTrip.propTypes = {
  stt: PropTypes.string.isRequired,
  dep: PropTypes.string.isRequired,
  des: PropTypes.string.isRequired,
  vehicle: PropTypes.string.isRequired,
  licensePlate: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  hide: PropTypes.string.isRequired,
  idTrip: PropTypes.string.isRequired,
  routeStationPrice: PropTypes.string.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default ItemTrip;
