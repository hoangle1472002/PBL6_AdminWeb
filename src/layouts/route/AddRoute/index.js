import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import * as React from "react";
import { PropTypes } from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { createRouteStation } from "Apis/route.api";

function AddRoute({ listStation, setIsSave, setNotification }) {
  const [numberStation, setNumberStation] = React.useState(0);
  const [isRemoveFirst, setIsRemoveFirst] = React.useState(false);
  const [time1, setTime1] = React.useState("");
  const [time2, setTime2] = React.useState("");
  const [time3, setTime3] = React.useState("");
  // const [disabled, setDisabled] = React.useState(false);

  const [dataAddRoute, setDataAddRoute] = React.useState({
    descriptionDep: "",
    descriptionDes: "",
    descriptionStation1: "",
    descriptionStation2: "",
    idDep: 0,
    idDes: 0,
    idStation1: 0,
    idStation2: 0,
    quantityStation: numberStation,
    time: [],
  });

  // React.useEffect(() => {
  //   if (numberStation === 0) {
  //     if (
  //       dataAddRoute.descriptionDep &&
  //       dataAddRoute.descriptionDes &&
  //       dataAddRoute.idDep &&
  //       dataAddRoute.idDes &&
  //       time1
  //     ) {
  //       setDisabled(false);
  //     } else {
  //       setDisabled(true);
  //     }
  //   } else if (numberStation === 1 && isRemoveFirst) {
  //     if (
  //       dataAddRoute.descriptionDep &&
  //       dataAddRoute.descriptionDes &&
  //       dataAddRoute.idDep &&
  //       dataAddRoute.idDes &&
  //       dataAddRoute.descriptionStation2 &&
  //       dataAddRoute.idStation2 &&
  //       time3 &&
  //       time1
  //     ) {
  //       setDisabled(false);
  //     } else {
  //       setDisabled(true);
  //     }
  //   } else if (numberStation === 1 && !isRemoveFirst) {
  //     if (
  //       dataAddRoute.descriptionDep &&
  //       dataAddRoute.descriptionDes &&
  //       dataAddRoute.idDep &&
  //       dataAddRoute.idDes &&
  //       dataAddRoute.descriptionStation1 &&
  //       dataAddRoute.idStation1 &&
  //       time2 &&
  //       time1
  //     ) {
  //       setDisabled(false);
  //     } else {
  //       setDisabled(true);
  //     }
  //   } else if (numberStation === 2) {
  //     if (
  //       dataAddRoute.descriptionDep &&
  //       dataAddRoute.descriptionDes &&
  //       dataAddRoute.idDep &&
  //       dataAddRoute.idDes &&
  //       dataAddRoute.descriptionStation2 &&
  //       dataAddRoute.idStation2 &&
  //       dataAddRoute.descriptionStation1 &&
  //       dataAddRoute.idStation1 &&
  //       time3 &&
  //       time1 &&
  //       time2
  //     ) {
  //       setDisabled(false);
  //     } else {
  //       setDisabled(true);
  //     }
  //   }
  // }, [dataAddRoute, numberStation, time1, time2, time3, isRemoveFirst]);

  // React.useEffect(() => {
  //   setDisabled(true);
  // }, [numberStation]);

  // React.useEffect(() => {
  //   if (numberStation === 1 && isRemoveFirst) {
  //     if (
  //       dataAddRoute.descriptionDep &&
  //       dataAddRoute.descriptionDes &&
  //       dataAddRoute.idDep &&
  //       dataAddRoute.idDes &&
  //       dataAddRoute.descriptionStation2 &&
  //       dataAddRoute.idStation2 &&
  //       time3 &&
  //       time1
  //     ) {
  //       setDisabled(false);
  //     } else {
  //       setDisabled(true);
  //     }
  //   } else if (numberStation === 1 && !isRemoveFirst) {
  //     if (
  //       dataAddRoute.descriptionDep &&
  //       dataAddRoute.descriptionDes &&
  //       dataAddRoute.idDep &&
  //       dataAddRoute.idDes &&
  //       dataAddRoute.descriptionStation1 &&
  //       dataAddRoute.idStation1 &&
  //       time2 &&
  //       time1
  //     ) {
  //       setDisabled(false);
  //     } else {
  //       setDisabled(true);
  //     }
  //   }
  // }, [isRemoveFirst]);

  const handleCreateRoute = () => {
    let requestObject = {
      ...dataAddRoute,
    };
    if (numberStation === 0) {
      requestObject = {
        descriptionDep: dataAddRoute.descriptionDep,
        descriptionDes: dataAddRoute.descriptionDes,
        idDep: dataAddRoute.idDep,
        idDes: dataAddRoute.idDes,
        quantityStation: numberStation,
        time: [time1],
      };
    } else if (numberStation === 1 && isRemoveFirst) {
      requestObject = {
        descriptionDep: dataAddRoute.descriptionDep,
        descriptionDes: dataAddRoute.descriptionDes,
        idDep: dataAddRoute.idDep,
        idDes: dataAddRoute.idDes,
        quantityStation: numberStation,
        descriptionStation1: dataAddRoute.descriptionStation2,
        idStation1: dataAddRoute.idStation2,
        time: [time3, time1],
      };
    } else if (numberStation === 1 && !isRemoveFirst) {
      requestObject = {
        descriptionDep: dataAddRoute.descriptionDep,
        descriptionDes: dataAddRoute.descriptionDes,
        idDep: dataAddRoute.idDep,
        idDes: dataAddRoute.idDes,
        quantityStation: numberStation,
        descriptionStation1: dataAddRoute.descriptionStation1,
        idStation1: dataAddRoute.idStation1,
        time: [time2, time1],
      };
    } else {
      requestObject = {
        ...dataAddRoute,
        quantityStation: numberStation,
        time: [time2, time3, time1],
      };
    }
    createRouteStation(requestObject, setIsSave, setNotification);
  };
  return (
    <Card sx={{ height: "100%", width: "100%", mb: 4 }}>
      <MDBox display="flex" pt={3} px={4}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Thêm tuyến
        </MDTypography>
      </MDBox>
      <MDBox mt={3} pb={2} px={4}>
        <MDBox mb={2} display="flex" width="100%">
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" width="10%">
            Tuyến
          </MDTypography>
          <MDBox ml={4} mt={1} width="90%" display="block">
            <MDBox mb={2} display="flex" width="100%" alignItems="center">
              <MDTypography variant="caption" color="text" fontWeight="bold" width="20%">
                Điểm đi:
              </MDTypography>
              <MDBox ml={0} width="40%">
                <FormControl
                  size="small"
                  sx={{ width: "100%" }}
                  style={{
                    height: 40,
                  }}
                >
                  <InputLabel id="demo-simple-select-label">Điểm đi</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Departure"
                    value={dataAddRoute.idDep}
                    onChange={(e) => {
                      setDataAddRoute({
                        ...dataAddRoute,
                        idDep: e.target.value,
                      });
                    }}
                    style={{ height: "100%" }}
                  >
                    <MenuItem value={0}>Tất Cả</MenuItem>
                    {listStation?.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.nameStation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDTypography variant="caption" color="text" fontWeight="bold" width="20%" ml={8}>
                Mô tả:
              </MDTypography>
              <MDBox ml={0} width="40%">
                <TextField
                  variant="outlined"
                  sx={{ mt: -1, width: "100%" }}
                  onChange={(e) => {
                    setDataAddRoute({
                      ...dataAddRoute,
                      descriptionDep: e.target.value,
                    });
                  }}
                />
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox
          mb={6}
          mt={1}
          display="flex"
          width="100%"
          justifyContent="flex-start"
          alignItems="center"
        >
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" width="10%">
            Trạm
          </MDTypography>
          <MDBox mt={0} mb={0} ml={4} width="20%">
            <MDButton
              component=""
              to="/admin/dashboard"
              variant="gradient"
              fullWidth
              color="info"
              onClick={() => {
                if (numberStation === 2) {
                  alert("You only choose max 2 stations");
                } else {
                  setNumberStation(numberStation + 1);
                  setIsRemoveFirst(false);
                }
              }}
            >
              THêm trạm
            </MDButton>
          </MDBox>
          <MDTypography variant="caption" color="text" fontWeight="bold" width="35%" mt={0} ml={2}>
            Thêm trạm cho tuyến (tối đa 2 trạm)
          </MDTypography>
          {/* <MDBox ml={3.8} width="70%">
            <TextField
              variant="outlined"
              type="number"
              sx={{ mt: -1, width: "24ch" }}
              onChange={(e) => {
                setDataAddRoute({
                  ...dataAddRoute,
                  quantityStation: e.target.value,
                });
              }}
            />
          </MDBox> */}
        </MDBox>
        {(numberStation === 1 && !isRemoveFirst) || numberStation === 2 ? (
          <MDBox mb={5} mt={2} display="flex" width="100%" alignItems="center">
            <MDTypography variant="caption" color="text" fontWeight="bold" width="10%">
              Trạm 1:
            </MDTypography>
            <MDBox ml={1} width="20%">
              <FormControl
                size="small"
                sx={{ width: "100%" }}
                style={{
                  height: 40,
                }}
              >
                <InputLabel id="demo-simple-select-label">Trạm 1</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Trạm 1"
                  value={dataAddRoute.idStation1}
                  onChange={(e) => {
                    setDataAddRoute({
                      ...dataAddRoute,
                      idStation1: e.target.value,
                    });
                  }}
                  style={{ height: "100%" }}
                >
                  <MenuItem value={0}>Tất Cả</MenuItem>
                  {listStation?.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.nameStation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
            <MDTypography variant="caption" color="text" fontWeight="bold" width="10%" ml={4}>
              mô tả:
            </MDTypography>
            <MDBox ml={1} width="30%">
              <TextField
                variant="outlined"
                sx={{ mt: 0, width: "100%" }}
                onChange={(e) => {
                  setDataAddRoute({
                    ...dataAddRoute,
                    descriptionStation1: e.target.value,
                  });
                }}
              />
            </MDBox>
            <MDTypography variant="caption" color="text" fontWeight="bold" width="10%" ml={5}>
              thời gian:
            </MDTypography>
            <MDBox ml={0} width="15%">
              <TextField
                id="time"
                label="thời gian"
                type="time"
                // defaultValue="03:30"
                sx={{ width: 200, mt: -1 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setTime2(`${e.target.value}:00`);
                }}
              />
            </MDBox>
            <MDBox mt={0} mb={1} ml={4} width="10%" alignSelf="flex-end">
              <HighlightOffRoundedIcon
                style={{
                  // fontSize: 40,
                  color: "red",
                  cursor: "pointer",
                  marginLeft: 40,
                  marginTop: -4,
                }}
                onClick={() => {
                  setNumberStation(numberStation - 1);
                  setIsRemoveFirst(true);
                }}
              />
            </MDBox>
          </MDBox>
        ) : null}

        {numberStation === 2 || (numberStation === 1 && isRemoveFirst) ? (
          <MDBox mb={5} mt={4} display="flex" width="100%" alignItems="center">
            <MDTypography variant="caption" color="text" fontWeight="bold" width="10%">
              Trạm 2:
            </MDTypography>
            <MDBox ml={1} width="20%">
              <FormControl
                size="small"
                sx={{ width: "100%" }}
                style={{
                  height: 40,
                }}
              >
                <InputLabel id="demo-simple-select-label">Trạm 2</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Station 2"
                  // defaultValue={1}
                  value={dataAddRoute.idStation2}
                  onChange={(e) => {
                    setDataAddRoute({
                      ...dataAddRoute,
                      idStation2: e.target.value,
                    });
                  }}
                  style={{ height: "100%" }}
                >
                  <MenuItem value={0}>Tất Cả</MenuItem>
                  {listStation?.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.nameStation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
            <MDTypography variant="caption" color="text" fontWeight="bold" width="10%" ml={4}>
              mô tả:
            </MDTypography>
            <MDBox ml={1} width="30%">
              <TextField
                variant="outlined"
                sx={{ mt: -1, width: "100%" }}
                onChange={(e) => {
                  setDataAddRoute({
                    ...dataAddRoute,
                    descriptionStation2: e.target.value,
                  });
                }}
              />
            </MDBox>
            <MDTypography variant="caption" color="text" fontWeight="bold" width="10%" ml={5}>
              thời gian:
            </MDTypography>
            <MDBox ml={0} width="15%">
              <TextField
                id="time"
                label="thời gian"
                type="time"
                // defaultValue="03:30"
                sx={{ width: 200, mt: -1 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setTime3(`${e.target.value}:00`);
                }}
              />
            </MDBox>
            <MDBox mt={0} mb={1} ml={4} width="10%">
              <HighlightOffRoundedIcon
                style={{
                  // fontSize: 40,
                  color: "red",
                  cursor: "pointer",
                  marginLeft: 40,
                  marginTop: -4,
                }}
                onClick={() => {
                  setNumberStation(numberStation - 1);
                  setIsRemoveFirst(false);
                }}
              />
            </MDBox>
          </MDBox>
        ) : null}
        <MDBox
          mb={2}
          display="flex"
          width="100%"
          alignItems="center"
          // ml="13%"
        >
          <MDTypography variant="caption" color="text" fontWeight="bold" width="10%">
            Điểm đến:
          </MDTypography>
          <MDBox ml={1} width="20%">
            <FormControl
              size="small"
              sx={{ width: "100%" }}
              style={{
                height: 40,
              }}
            >
              <InputLabel id="demo-simple-select-label">Destination</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Departure"
                // defaultValue={2}
                value={dataAddRoute.idDes}
                onChange={(e) => {
                  setDataAddRoute({
                    ...dataAddRoute,
                    idDes: e.target.value,
                  });
                }}
                style={{ height: "100%" }}
              >
                <MenuItem value={0}>Tất Cả</MenuItem>
                {listStation?.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.nameStation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MDBox>
          <MDTypography variant="caption" color="text" fontWeight="bold" width="10%" ml={4}>
            mô tả:
          </MDTypography>
          <MDBox ml={1} width="30%">
            <TextField
              variant="outlined"
              sx={{ mt: -1, width: "100%" }}
              onChange={(e) => {
                setDataAddRoute({
                  ...dataAddRoute,
                  descriptionDes: e.target.value,
                });
              }}
            />
          </MDBox>
          <MDTypography variant="caption" color="text" fontWeight="bold" width="10%" ml={5}>
            thời gian:
          </MDTypography>
          <MDBox ml={0} width="15%">
            <TextField
              id="time"
              label="thời gian"
              type="time"
              // defaultValue="03:30"
              sx={{ width: 200, mt: -1 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setTime1(`${e.target.value}:00`);
              }}
            />
          </MDBox>
          <MDBox mt={0} mb={1} ml={4} width="10%">
            {null}
          </MDBox>
        </MDBox>

        <MDBox mt={4} mb={2} ml="90%" width="50px">
          <MDButton
            component=""
            to="/admin/dashboard"
            variant="gradient"
            fullWidth
            color="info"
            onClick={() => {
              handleCreateRoute();
            }}
            // disabled={disabled}
          >
            Lưu
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}
AddRoute.propTypes = {
  listStation: PropTypes.arrayOf.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
export default AddRoute;
