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

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { login } from "Apis/auth.api";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// import SignUp from "layouts/authentication/sign-up";

function Basic() {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: 0,
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    login(
      {
        username: data.username,
        password: data.password,
      },
      navigate,
      setErr,
      data.role
    );
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Đăng nhập
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Tên tài khoản"
                fullWidth
                onChange={(e) => {
                  setData({
                    ...data,
                    username: e.target.value,
                  });
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Mật khẩu"
                fullWidth
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
              />
            </MDBox>
            <FormControl
              size="small"
              sx={{ width: "100%" }}
              style={{
                height: 40,
                marginRight: 20,
              }}
            >
              <InputLabel id="demo-simple-select-label">Quyền</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Quyền"
                defaultValue={0}
                onChange={(e) => {
                  setData({
                    ...data,
                    role: e.target.value,
                  });
                }}
                style={{ height: "100%" }}
              >
                <MenuItem value={0}>Quản trị</MenuItem>
                <MenuItem value={1}>Hãng xe</MenuItem>
              </Select>
            </FormControl>
            {err ? (
              <MDBox mt={0.5} mb={0.5} ml={1.5} textAlign="start">
                <MDTypography color="error" fontWeight="small" textGradient fontSize={13}>
                  {err} haha
                </MDTypography>
              </MDBox>
            ) : null}

            <MDBox mt={4} mb={1}>
              <MDButton
                component={Link}
                to="/admin/dashboard"
                variant="gradient"
                fullWidth
                color="info"
                onClick={() => {
                  handleLogin();
                }}
              >
                Đăng nhập
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
