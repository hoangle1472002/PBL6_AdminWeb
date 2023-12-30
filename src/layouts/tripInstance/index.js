import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ListStation from "layouts/tripInstance/ListStation";
import AddTrip from "layouts/tripInstance/AddTrip";
import ListTrip from "layouts/tripInstance/ListTrip";
import { useEffect, useState } from "react";
import Loading from "components/Loading";
import { getRoute, getRouteStationById } from "Apis/route.api";
import { Alert, Button } from "@mui/material";
import { getTripInstance } from "Apis/tripinstance.api";

function Trip() {
  const [tripInstances, setTripInstances] = useState([]);
  const [listStation, setListStation] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isSave, setIsSave] = useState(true);
  const [isSaveStation, setIsSaveStation] = useState(true);
  const [idRouteChosen, setIdRouteChosen] = useState(0);
  const [notification, setNotification] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const PAGE_SIZE = 20;
  useEffect(() => {
    const notiTime = setTimeout(() => {
      setNotification("");
    }, 10000);
    return () => {
      clearTimeout(notiTime);
    };
  }, [notification]);
  useEffect(() => {
    if (isSave) {
      getTripInstance(setTripInstances, setIsSave, setCurrentPage, setTotalPage, {
        page: currentPage,
        pageSize: PAGE_SIZE,
      });
      getRoute(setRoutes, setIsSave);
    }
  }, [isSave, currentPage]);
  console.log(isSave);
  useEffect(() => {
    // alert(isSaveStation);
    if (isSaveStation) {
      if (idRouteChosen === 0) {
        setListStation([]);
        setIsSaveStation(false);
      } else {
        getRouteStationById(idRouteChosen, setListStation, setIsSaveStation);
      }
    }
  }, [isSaveStation, idRouteChosen]);
  const elemNoti = () => {
    let res = null;
    if (notification?.length > 0) {
      if (notification === "error") {
        res = (
          <Alert
            severity="error"
            style={{ marginBottom: "10px" }}
            action={
              <Button color="inherit" size="small">
                UNDO
              </Button>
            }
          >
            {notification}
          </Alert>
        );
      } else {
        res = (
          <Alert
            severity="success"
            style={{ marginBottom: "10px", backgroundColor: "rgb(212,250,218)" }}
          >
            {notification}
          </Alert>
        );
      }
    }
    return res;
  };
  console.log(listStation);

  return (
    <DashboardLayout>
      <DashboardNavbar title="Thời gian chuyến" />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              marginBottom="2rem"
            >
              <MDTypography variant="h6" color="white">
                Quản lý thời gian chuyến đi
              </MDTypography>
            </MDBox>
            {elemNoti()}
            <MDBox mb={3} display="block">
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  {isSave ? (
                    <Loading type="spin" color="rgb(41,130,235)" />
                  ) : (
                    <AddTrip
                      routes={routes}
                      setIdRouteChosen={setIdRouteChosen}
                      setIsSaveStation={setIsSaveStation}
                      setIsSave={setIsSave}
                      setNotification={setNotification}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={7}>
                  {isSaveStation ? (
                    <Loading type="spin" color="rgb(41,130,235)" />
                  ) : (
                    <ListStation listStation={listStation} />
                  )}
                </Grid>
              </Grid>
              {isSave ? (
                <Loading type="spin" color="rgb(41,130,235)" />
              ) : (
                <ListTrip
                  tripInstances={tripInstances}
                  setIsSave={setIsSave}
                  setNotification={setNotification}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPage={totalPage}
                  pageSize={PAGE_SIZE}
                />
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Trip;
