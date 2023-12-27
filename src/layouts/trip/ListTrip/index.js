import { Icon } from "@mui/material";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDPagination from "components/MDPagination";
import MDTypography from "components/MDTypography";
import Item from "layouts/trip/itemTrip";
import { PropTypes } from "prop-types";

function ListTrip({
  listTrip,
  setIsSave,
  setNotification,
  currentPage,
  setCurrentPage,
  totalPage,
  pageSize,
}) {
  console.log(listTrip);
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
                    key={item.id}
                    stt={index + (currentPage - 1) * pageSize + 1}
                    dep={item?.tripInstance?.route?.departure?.nameStation}
                    des={item?.tripInstance?.route?.arrival?.nameStation}
                    date={item?.tripInstance?.date}
                    time={item?.tripInstance?.timeStart}
                    vehicle={item?.adminListVehicle?.nameVehicle}
                    licensePlate={item?.adminListVehicle?.licensePlate}
                    idTrip={item?.idTrip}
                    routeStationPrice={item?.routeStationPrice}
                    hide={false}
                    setIsSave={setIsSave}
                    setNotification={setNotification}
                  />
                ))
              : null}
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox pb={3} px={2}>
        <MDPagination>
          <MDPagination
            item
            onClick={() => {
              setCurrentPage(currentPage - 1);
              setIsSave(true);
            }}
            disabled={currentPage === 1}
          >
            <Icon>keyboard_arrow_left</Icon>
          </MDPagination>
          {Array.from({ length: totalPage }).map((_, index) => (
            <MDPagination
              item
              onClick={() => {
                setCurrentPage(index + 1);
                setIsSave(true);
              }}
              active={currentPage === index + 1}
            >
              {index + 1}
            </MDPagination>
          ))}
          <MDPagination
            item
            onClick={() => {
              setCurrentPage(currentPage + 1);
              setIsSave(true);
            }}
            disabled={currentPage === totalPage}
          >
            <Icon>keyboard_arrow_right</Icon>
          </MDPagination>
        </MDPagination>
      </MDBox>
    </Card>
  );
}
ListTrip.propTypes = {
  listTrip: PropTypes.arrayOf.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};
export default ListTrip;
