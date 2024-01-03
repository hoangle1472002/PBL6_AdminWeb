import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";
import Loading from "components/Loading";
import { getAgency } from "Apis/agency.api";
import ListAgency from "./ListAgency";

function Agency() {
  const [listAgency, setListAgency] = useState([]);
  const [isSave, setIsSave] = useState(true);
  const [notification, setNotification] = useState("");
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
      getAgency(setListAgency, setIsSave);
    }
  }, [isSave]);
  const elemNoti = () => {
    let res = null;
    if (notification.length > 0) {
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
            style={{ marginBottom: "10px", backgroundColor: "rgb(212,250,218)", color: "black" }}
          >
            {notification}
          </Alert>
        );
      }
    }
    return res;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar title="Hãng xe" />
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
                Quản lý hãng Xe
              </MDTypography>
            </MDBox>

            <MDBox mb={3} display="block">
              {elemNoti()}
              {isSave ? (
                <Loading type="spin" color="rgb(41,130,235)" />
              ) : (
                <ListAgency
                  listAgency={listAgency}
                  setIsSave={setIsSave}
                  setNotification={setNotification}
                />
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Agency;
