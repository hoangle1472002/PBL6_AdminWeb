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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Overview page components
import Header from "layouts/profile/components/Header";
import typography from "assets/theme/base/typography";
import { useEffect, useState } from "react";
import { getProfile } from "Apis/auth.api";
import { Alert, Button } from "@mui/material";
import Loading from "components/Loading";

function Overview() {
  const { size } = typography;
  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    setEdit(!edit);
  };

  const [profile, setProfile] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({
    birthday: "",
    idTeacher: "",
    name: "",
    numberPhone: "",
    password: "",
  });
  const [isSave, setIsSave] = useState(true);
  const [notification, setNotification] = useState("");
  useEffect(() => {
    getProfile(setProfile, setIsSave);
  }, [profile]);

  // const handleUpdateProfile = () => {
  //   updateProfile(dataUpdate, setIsSave, setNotification);
  // };
  const [inValidPassword, setInValidPassword] = useState(false);
  const handleValidPassword = (val) => {
    if (val.length > 7) {
      setInValidPassword(true);
    } else {
      setInValidPassword(false);
    }
  };

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
            style={{ marginBottom: "10px", backgroundColor: "rgb(212,255,218)" }}
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
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={profile.body?.name}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} ml={10} sx={{ display: "block" }}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                px={2}
              >
                <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                  Profile information
                </MDTypography>
                <MDTypography
                  onClick={() => {
                    handleClick();
                    setDataUpdate({
                      ...dataUpdate,
                      birthday: profile.body?.birthday.split("T")[0],
                      idTeacher: profile.body?.id,
                      name: profile.body?.name,
                      numberPhone: profile.body?.numberPhone,
                    });
                  }}
                  variant="body2"
                  color="secondary"
                  sx={{ cursor: "pointer" }}
                >
                  <Icon>edit</Icon>
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                {elemNoti()}
                {isSave ? (
                  <Loading type="spin" color="rgb(41,130,235)" />
                ) : (
                  <MDBox>
                    {!edit ? (
                      <MDBox>
                        <MDBox display="flex" py={1} pr={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                            width="120px"
                          >
                            fullName: &nbsp;
                          </MDTypography>
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            &nbsp;{profile.body?.name}
                          </MDTypography>
                        </MDBox>
                        <MDBox display="flex" py={1} pr={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                            width="120px"
                          >
                            mobile: &nbsp;
                          </MDTypography>
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            &nbsp;{profile.body?.numberPhone}
                          </MDTypography>
                        </MDBox>
                        <MDBox display="flex" py={1} pr={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                            width="120px"
                          >
                            birthday: &nbsp;
                          </MDTypography>
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            &nbsp;{profile.body?.birthday}
                          </MDTypography>
                        </MDBox>
                        <MDBox display="flex" py={1} pr={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                            width="120px"
                          >
                            password: &nbsp;
                          </MDTypography>
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            &nbsp;
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    ) : (
                      <MDBox>
                        <MDBox display="flex" py={1} pr={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                            width="120px"
                          >
                            fullName: &nbsp;
                          </MDTypography>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="t4"
                            type="text"
                            variant="standard"
                            sx={{ width: "250px", mt: "-4px" }}
                            value={dataUpdate.name}
                            onChange={(e) => {
                              setDataUpdate({
                                ...dataUpdate,
                                name: e.target.value,
                              });
                            }}
                          />
                        </MDBox>
                        <MDBox display="flex" py={1} pr={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                            width="120px"
                          >
                            mobile: &nbsp;
                          </MDTypography>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="t4"
                            type="text"
                            variant="standard"
                            sx={{ width: "250px", mt: "-4px" }}
                            value={dataUpdate.numberPhone}
                            onChange={(e) => {
                              setDataUpdate({
                                ...dataUpdate,
                                numberPhone: e.target.value,
                              });
                            }}
                          />
                        </MDBox>
                        <MDBox display="flex" py={1} pr={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                            width="120px"
                          >
                            birthday: &nbsp;
                          </MDTypography>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="t4"
                            type="date"
                            variant="standard"
                            sx={{ width: "250px", mt: "-4px" }}
                            value={dataUpdate.birthday}
                            onChange={(e) => {
                              setDataUpdate({
                                ...dataUpdate,
                                birthday: e.target.value,
                              });
                            }}
                          />
                        </MDBox>
                        <MDBox display="flex" py={1} pr={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                            width="120px"
                          >
                            password: &nbsp;
                          </MDTypography>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="t4"
                            type="text"
                            variant="standard"
                            sx={{ width: "250px", mt: "-4px" }}
                            value={dataUpdate.password}
                            onChange={(e) => {
                              setDataUpdate({
                                ...dataUpdate,
                                password: e.target.value,
                              });
                              handleValidPassword(e.target.value);
                            }}
                          />
                        </MDBox>
                        {!inValidPassword ? (
                          <MDBox display="flex" py={1} pr={2}>
                            <Button
                              sx={{ width: "150px", marginLeft: "16rem" }}
                              // onClick={() => {
                              //   handleUpdateProfile();
                              // }}
                              disabled
                            >
                              Update
                            </Button>
                          </MDBox>
                        ) : (
                          <MDBox display="flex" py={1} pr={2}>
                            <Button
                              sx={{ width: "150px", marginLeft: "16rem" }}
                              // onClick={() => {
                              //   handleUpdateProfile();
                              // }}
                            >
                              Update
                            </Button>
                          </MDBox>
                        )}
                      </MDBox>
                    )}
                    <MDBox display="flex" py={1} pr={2}>
                      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                        social: &nbsp;
                      </MDTypography>
                      <MDBox
                        component="a"
                        href="https://www.facebook.com/CreativeTim/"
                        target="_blank"
                        rel="noreferrer"
                        fontSize={size.lg}
                        pr={1}
                        pl={0.5}
                        lineHeight={1}
                      >
                        <FacebookIcon />
                      </MDBox>
                      <MDBox
                        component="a"
                        href="https://twitter.com/creativetim"
                        target="_blank"
                        rel="noreferrer"
                        fontSize={size.lg}
                        pr={1}
                        pl={0.5}
                        lineHeight={1}
                      >
                        <TwitterIcon />
                      </MDBox>
                      <MDBox
                        component="a"
                        href="https://www.instagram.com/creativetimofficial/"
                        target="_blank"
                        rel="noreferrer"
                        fontSize={size.lg}
                        pr={1}
                        pl={0.5}
                        lineHeight={1}
                      >
                        <InstagramIcon />
                      </MDBox>
                    </MDBox>
                  </MDBox>
                )}
              </MDBox>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
