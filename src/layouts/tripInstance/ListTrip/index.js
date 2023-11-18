import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import tabledatatrip from "layouts/tripInstance/data/tabledatatrip";
import Item from "layouts/tripInstance/itemTrip";
import { PropTypes } from "prop-types";

function ListTrip({ tripInstances, setIsSave, setNotification }) {
  const { columns, rows } = tabledatatrip();
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" ml={2}>
          Danh sách
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <Item
          stt="STT"
          departure="Điểm đi"
          arrival="Điểm đến"
          date="Ngày khởi hành"
          time="Thời gian khởi hành"
          hide
        />
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
          <MDBox mt="-40px">
            {tripInstances.length > 0
              ? tripInstances.map((item, index) => (
                  <Item
                    stt={index + 1}
                    departure={item.adminGetRouteResponse.route.departure.nameStation}
                    arrival={item.adminGetRouteResponse.route.arrival.nameStation}
                    date={item.date}
                    time={item.timeStart}
                    idTripInstance={item.id}
                    idRoute={item.adminGetRouteResponse.route.id}
                    hide={false}
                    setIsSave={setIsSave}
                    setNotification={setNotification}
                  />
                ))
              : null}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

ListTrip.propTypes = {
  tripInstances: PropTypes.arrayOf.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default ListTrip;
