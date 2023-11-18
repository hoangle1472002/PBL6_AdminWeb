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

// Material Dashboard 2 React context
import * as React from "react";
import { removeAgency } from "Apis/agency.api";

function ItemAgency({
  stt,
  phone,
  email,
  province,
  country,
  address,
  idAgency,
  name,
  hide,
  setIsSave,
  setNotification,
}) {
  const handleDeleleAgency = () => {
    removeAgency(idAgency, setIsSave, setNotification);
  };
  return (
    <MDBox
      pl={1}
      display="flex"
      height="3.5rem"
      borderBottom="0.2px solid #f0f2f5"
      alignItems="center"
    >
      <MDTypography variant="caption" color="text" fontWeight="medium" marginLeft="5px" width="5%">
        {stt}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" px={1} width="16%">
        {name}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" px={1} width="13%">
        {phone}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" px={1} width="13%">
        {email}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" px={1} width="13%">
        {province}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" px={1} width="12%">
        {country}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" px={1} width="25%">
        {address}
      </MDTypography>
      {hide ? (
        <MDBox display="flex" alignItems="center" mt={-2} width="10%">
          {null}
        </MDBox>
      ) : (
        <MDBox display="flex" alignItems="center" mt={0} width="10%">
          <MDBox mr={1} ml={1}>
            <MDButton
              variant="text"
              color="error"
              onClick={() => {
                handleDeleleAgency();
              }}
            >
              <Icon>delete</Icon>&nbsp;Xóa
            </MDButton>
          </MDBox>
        </MDBox>
      )}
    </MDBox>
  );
}

ItemAgency.propTypes = {
  stt: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  idAgency: PropTypes.number.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default ItemAgency;
