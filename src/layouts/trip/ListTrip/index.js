import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Item from "layouts/trip/itemTrip";
import { PropTypes } from "prop-types";

function ListTrip({ listTrip, setIsSave, setNotification }) {
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" ml={2}>
          Danh sách chuyến
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Item
            stt="STT"
            dep="Điểm đi"
            des="Điểm đến"
            date="Ngày khởi hành"
            time="Thời gian khởi hành"
            vehicle="Xe"
            hide
          />
          <MDBox mt="0px">
            {listTrip.length > 0
              ? listTrip.map((item, index) => (
                  <Item
                    stt={index + 1}
                    dep={item.tripInstance.route.departure.nameStation}
                    des={item.tripInstance.route.arrival.nameStation}
                    date={item.tripInstance.date}
                    time={item.tripInstance.timeStart}
                    vehicle={item.adminListVehicle.nameVehicle}
                    idTrip={item.idTrip}
                    routeStationPrice={item.routeStationPrice}
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
  listTrip: PropTypes.arrayOf.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
export default ListTrip;
