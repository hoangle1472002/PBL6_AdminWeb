import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/vehicle/data/authorsTableData";
import Item from "layouts/vehicle/itemVehicle";
import { PropTypes } from "prop-types";

function ListVehicle(props) {
  const { setClickSave, vehicles, setNotification } = props;
  const { columns, rows } = authorsTableData();
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" ml={1}>
          Danh sách xe
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <Item
          stt="STT"
          name="Tên"
          licensePlate="BIển số xe"
          seatQuantity="Số lượng ghế"
          status="Trạng thái"
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
            {vehicles.map((item, index) => (
              <Item
                stt={index + 1}
                name={item.nameVehicle}
                licensePlate={item.licensePlate}
                seatQuantity={item.seatQuantity?.quantity}
                status={item.status ? "true" : "false"}
                key={item.id}
                setClickSave={setClickSave}
                setNotification={setNotification}
                hide={false}
              />
            ))}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

ListVehicle.propTypes = {
  setClickSave: PropTypes.func.isRequired,
  vehicles: PropTypes.arrayOf.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default ListVehicle;
