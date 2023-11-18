import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/route/data/authorsTableData";
import Item from "layouts/route/itemRoute";
import { PropTypes } from "prop-types";

function ListRoute({ listRoute, listStation, setIsSave, setNotification }) {
  const { columns, rows } = authorsTableData();
  const convertTimeToNumber = (time1 = "00:00:00", time2 = "00:00:00", time3 = "00:00:00") => {
    const arrTime1 = time1.split(":").map((item1) => parseInt(item1, 10));
    const [hour1, minutes1, seconds1] = arrTime1;
    const start = hour1 * 3600 + minutes1 * 60 + seconds1;

    const arrTime2 = time2.split(":").map((item2) => parseInt(item2, 10));
    const [hour2, minutes2, seconds2] = arrTime2;
    const end = hour2 * 3600 + minutes2 * 60 + seconds2;

    const arrTime3 = time3.split(":").map((item3) => parseInt(item3, 10));
    const [hour3, minutes3, seconds3] = arrTime3;
    const end2 = hour3 * 3600 + minutes3 * 60 + seconds3;

    const time = start + end + end2;
    const h = Math.floor(time / 3600);
    const timeh = time % 3600;
    const m = Math.floor(timeh / 60);
    const times = timeh % 60;
    const s = Math.floor(times / 60);
    const hours = h >= 10 ? h : `0${h}`;
    const seconds = s >= 10 ? s : `0${s}`;
    const minutes = m >= 10 ? m : `0${m}`;
    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" ml={2}>
          Danh sách tuyến
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <Item
          stt="STT"
          dep="Điểm đi"
          des="Điểm đến"
          quantity="Số trạm"
          station="Trạm"
          time="Thời gian"
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
            {listRoute?.map((item, index) => (
              <Item
                stt={index + 1}
                dep={item.route.departure?.nameStation}
                des={item.route.arrival?.nameStation}
                quantity={item.routeStationList.length - 1}
                station={item.routeStationList
                  .slice(0, item.routeStationList.length - 1)
                  .map((itemRouteStation, indexIn) => {
                    if (
                      indexIn ===
                      item.routeStationList.slice(0, item.routeStationList.length - 1).length - 1
                    ) {
                      return `${itemRouteStation.stationS?.nameStation}`;
                    }
                    return `${itemRouteStation.stationS?.nameStation}, `;
                  })}
                time={convertTimeToNumber(
                  item.routeStationList[0]?.time,
                  item.routeStationList[1]?.time,
                  item.routeStationList[2]?.time
                )}
                idRoute={item.route.id}
                hide={false}
                listStation={listStation}
                setIsSave={setIsSave}
                setNotification={setNotification}
              />
            ))}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}
ListRoute.propTypes = {
  listRoute: PropTypes.arrayOf.isRequired,
  listStation: PropTypes.arrayOf.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
export default ListRoute;
