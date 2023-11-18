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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import * as React from "react";

function ItemStation({ stt, dep, des, time }) {
  return (
    <MDBox pl={3} display="flex" height="3.5rem" pt={2} borderBottom="0.2px solid #f0f2f5">
      <MDTypography variant="caption" color="text" fontWeight="medium" marginLeft="5px">
        {stt}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={8} width="30%">
        {dep}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={4} width="30%">
        {des}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="medium" ml={4} width="30%">
        {time}
      </MDTypography>
    </MDBox>
  );
}

ItemStation.propTypes = {
  stt: PropTypes.string.isRequired,
  dep: PropTypes.string.isRequired,
  des: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default ItemStation;
