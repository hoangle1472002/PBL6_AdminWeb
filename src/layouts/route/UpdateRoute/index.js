import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
// import MDButton from "components/MDButton";
import * as React from "react";
import { PropTypes } from "prop-types";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
// import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { getRouteStationById, updateRoute } from "Apis/route.api";

function UpdateRoute({ listStation, handleClose, idRoute, setIsSave, setNotification }) {
  const [numberStation, setNumberStation] = React.useState(0);
  // const [isRemoveFirst, setIsRemoveFirst] = React.useState(false);
  const [stationById, setStationById] = React.useState({});
  const [id1, setId1] = React.useState(0);
  const [id2, setId2] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);

  const [dataUpdate, setDataUpdate] = React.useState({
    descriptionDep: "",
    descriptionDes: "",
    descriptionStation1: "",
    descriptionStation2: "",
    idDep: 0,
    idDes: 0,
    idStation1: 0,
    idStation2: 0,
    idRoute: 0,
    listIdRouteStation: [],
    time: [],
  });

  React.useEffect(() => {
    getRouteStationById(idRoute, setStationById, setIsSave, setNotification, setNumberStation);
  }, []);

  React.useEffect(() => {
    if (
      dataUpdate.descriptionDep &&
      dataUpdate.descriptionDes &&
      dataUpdate.idDep &&
      dataUpdate.idDes &&
      dataUpdate.descriptionStation2 &&
      dataUpdate.descriptionStation1 &&
      id1 &&
      id2 &&
      idRoute &&
      dataUpdate.listIdRouteStation.length > 0 &&
      dataUpdate.time?.[0] !== ":00" &&
      dataUpdate.time?.[1] !== ":00" &&
      dataUpdate.time?.[2] !== ":00"
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [dataUpdate, id1, id2]);

  React.useEffect(() => {
    let requestObject = {};
    // setNumberStation(stationById.routeStationList?.length - 1);
    if (stationById.routeStationList?.length === 3) {
      requestObject = {
        descriptionDep: stationById.routeStationList[0].stationP.nameStation,
        descriptionDes: stationById.routeStationList[2].stationS.nameStation,
        descriptionStation1: stationById.routeStationList[1].stationP.nameStation,
        descriptionStation2: stationById.routeStationList[1].stationS.nameStation,
        idDep: stationById.route.departure.id,
        idDes: stationById.route.arrival.id,
        idStation1: stationById.routeStationList[1].stationP.id,
        idStation2: stationById.routeStationList[1].stationS.id,
        idRoute,
        listIdRouteStation: [
          stationById.routeStationList[0].id,
          stationById.routeStationList[1].id,
          stationById.routeStationList[2].id,
        ],
        time: [
          stationById.routeStationList[2].time,
          stationById.routeStationList[1].time,
          stationById.routeStationList[0].time,
        ],
      };
      setId1(stationById.routeStationList[1].stationP.id);
      setId2(stationById.routeStationList[1].stationS.id);
    } else if (stationById.routeStationList?.length === 2) {
      requestObject = {
        descriptionDep: stationById.routeStationList[0].stationP.nameStation,
        descriptionDes: stationById.routeStationList[1].stationS.nameStation,
        descriptionStation1: stationById.routeStationList[0].stationS.nameStation,
        idDep: stationById.route.departure.id,
        idDes: stationById.route.arrival.id,
        idStation1: stationById.routeStationList[0].stationS.id,
        idRoute,
        listIdRouteStation: [
          stationById.routeStationList[0].id,
          stationById.routeStationList[1].id,
        ],
        time: [stationById.routeStationList[1].time, stationById.routeStationList[0].time],
      };
      setId1(stationById.routeStationList[0].stationS.id);
    } else if (stationById.routeStationList?.length === 1) {
      requestObject = {
        descriptionDep: stationById.routeStationList[0].stationP.nameStation,
        descriptionDes: stationById.routeStationList[0].stationS.nameStation,
        idDep: stationById.route.departure.id,
        idDes: stationById.route.arrival.id,
        idRoute,
        listIdRouteStation: [stationById.routeStationList[0].id],
        time: [stationById.routeStationList[0].time],
      };
    }
    // console.log(stationById.routeStationList[1].stationP.id);
    setDataUpdate(requestObject);
  }, [stationById]);
  const handleUpdateRoute = () => {
    let requestObject = {
      ...dataUpdate,
    };
    if (numberStation === 0) {
      requestObject = {
        descriptionDep: dataUpdate.descriptionDep,
        descriptionDes: dataUpdate.descriptionDes,
        idDep: dataUpdate.idDep,
        idDes: dataUpdate.idDes,
        idRoute,
        time: dataUpdate.time,
      };
    } else if (numberStation === 1) {
      requestObject = {
        descriptionDep: dataUpdate.descriptionDep,
        descriptionDes: dataUpdate.descriptionDes,
        idDep: dataUpdate.idDep,
        idDes: dataUpdate.idDes,
        idRoute,
        descriptionStation1: dataUpdate.descriptionStation1,
        idStation1: id1,
        listIdRouteStation: dataUpdate.listIdRouteStation,
        time: dataUpdate.time,
      };
    } else {
      requestObject = {
        ...dataUpdate,
        idStation1: id1,
        idStation2: id2,
      };
    }
    updateRoute(requestObject, setIsSave, setNotification);
  };
  return (
    <Card sx={{ height: "100%", width: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={4}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Cập nhật tuyến
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
                    label="Điểm đi"
                    value={dataUpdate.idDep}
                    onChange={(e) => {
                      setDataUpdate({
                        ...dataUpdate,
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
                  value={dataUpdate.descriptionDep}
                  onChange={(e) => {
                    setDataUpdate({
                      ...dataUpdate,
                      descriptionDep: e.target.value,
                    });
                  }}
                />
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox
          mb={4}
          mt={3}
          display="flex"
          width="100%"
          justifyContent="flex-start"
          alignItems="center"
        >
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" width="15%">
            Trạm
          </MDTypography>
          {/* <MDBox mt={0} mb={0} ml={0} width="20%">
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
              Thêm trạm
            </MDButton>
          </MDBox>
          <MDTypography variant="caption" color="text" fontWeight="bold" width="35%" mt={0} ml={2}>
            Thêm trạm cho tuyến (tối đa 2 trạm)
          </MDTypography> */}
          {/* <MDBox ml={3.8} width="70%">
            <TextField
              variant="outlined"
              type="number"
              sx={{ mt: -1, width: "24ch" }}
              onChange={(e) => {
                setDataUpdate({
                  ...dataUpdate,
                  quantityStation: e.target.value,
                });
              }}
            />
          </MDBox> */}
        </MDBox>
        {numberStation === 1 || numberStation === 2 ? (
          <MDBox mb={2} mt={4} display="flex" width="100%" alignItems="center">
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
                  value={id1}
                  onChange={(e) => {
                    setDataUpdate({
                      ...dataUpdate,
                      idStation1: e.target.value,
                    });
                    setId1(e.target.value);
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
                value={dataUpdate.descriptionStation1}
                onChange={(e) => {
                  setDataUpdate({
                    ...dataUpdate,
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
                value={dataUpdate.time?.[1]}
                sx={{ width: 200, mt: -1 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const arrTime = [...dataUpdate.time];
                  if (!e.target.value) {
                    arrTime[1] = `${e.target.value}`;
                  } else {
                    arrTime[1] = `${e.target.value}:00`;
                  }
                  setDataUpdate({
                    ...dataUpdate,
                    time: arrTime,
                  });
                }}
              />
            </MDBox>
            <MDBox mt={0} mb={1} ml={5} width="10%">
              {null}
            </MDBox>
          </MDBox>
        ) : null}

        {numberStation === 2 ? (
          <MDBox mb={3} mt={3} display="flex" width="100%" alignItems="center">
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
                  label="Trạm 2"
                  value={id2}
                  onChange={(e) => {
                    setDataUpdate({
                      ...dataUpdate,
                      idStation2: e.target.value,
                    });
                    setId2(e.target.value);
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
                value={dataUpdate.descriptionStation2}
                onChange={(e) => {
                  setDataUpdate({
                    ...dataUpdate,
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
                value={dataUpdate.time?.[2]}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const arrTime = [...dataUpdate.time];
                  if (!e.target.value) {
                    arrTime[2] = `${e.target.value}`;
                  } else {
                    arrTime[2] = `${e.target.value}:00`;
                  }
                  setDataUpdate({
                    ...dataUpdate,
                    time: arrTime,
                  });
                }}
              />
            </MDBox>
            <MDBox mt={0} mb={1} ml={5} width="10%">
              {null}
            </MDBox>
          </MDBox>
        ) : null}

        <MDBox mb={2} display="flex" width="100%" alignItems="center">
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
              <InputLabel id="demo-simple-select-label">Điểm đến</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Điểm đến"
                // defaultValue={0}
                value={dataUpdate.idDes}
                onChange={(e) => {
                  setDataUpdate({
                    ...dataUpdate,
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
              type="text"
              sx={{ mt: -1, width: "100%" }}
              value={dataUpdate.descriptionDes}
              onChange={(e) => {
                setDataUpdate({
                  ...dataUpdate,
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
              value={dataUpdate.time?.[0]}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                const arrTime = [...dataUpdate.time];
                if (!e.target.value) {
                  arrTime[0] = `${e.target.value}`;
                } else {
                  arrTime[0] = `${e.target.value}:00`;
                }
                setDataUpdate({
                  ...dataUpdate,
                  time: arrTime,
                });
              }}
            />
          </MDBox>
          <MDBox mt={0} mb={1} ml={5} width="10%">
            {null}
          </MDBox>
        </MDBox>
        <MDBox
          mt={4}
          mb={2}
          ml="80%"
          width="20%"
          display="flex"
          // justifyContent="flex-end"
          // alignContent="center"
          // alignItems="center"
        >
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              handleUpdateRoute();
              handleClose();
            }}
            disabled={disabled}
          >
            Cập nhật
          </Button>
        </MDBox>
      </MDBox>
    </Card>
  );
}
UpdateRoute.propTypes = {
  listStation: PropTypes.arrayOf.isRequired,
  handleClose: PropTypes.func.isRequired,
  idRoute: PropTypes.number.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
export default UpdateRoute;
