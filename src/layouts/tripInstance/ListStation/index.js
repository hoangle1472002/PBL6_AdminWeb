import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tripInstance/data/authorsTableData";
import Item from "layouts/tripInstance/itemStation";
import { PropTypes } from "prop-types";

function ListStation({ listStation }) {
  const { columns, rows } = authorsTableData();

  return (
    <Card id="delete-account" sx={{ height: "370px", mb: 4 }}>
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" ml={2}>
          Danh sách trạm
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <Item stt="STT" dep="Điểm đi" des="Điểm đến" time="Thời gian" />
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
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
    </Card>
  );
}
ListStation.propTypes = {
  listStation: PropTypes.arrayOf.isRequired,
};
export default ListStation;
