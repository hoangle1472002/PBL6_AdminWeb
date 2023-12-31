import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import tabledatatrip from "layouts/tripInstance/data/tabledatatrip";
import Item from "layouts/historyBooking/itemHistory";
import { PropTypes } from "prop-types";
import { FormControl, InputLabel, Select, MenuItem, TextField, Icon } from "@mui/material";
import MDButton from "components/MDButton";
import Loading from "components/Loading";
import MDPagination from "components/MDPagination";
import { useEffect } from "react";

function ListHistory({
  listHistory,
  setSearch,
  search,
  status,
  setStatus,
  setIsSave,
  isSave,
  currentPage,
  setCurrentPage,
  totalPage,
  pageSize,
}) {
  const { columns, rows } = tabledatatrip();

  useEffect(() => {
    setCurrentPage(1);
    setIsSave(true);
  }, [status]);
  console.log(status);

  return (
    <Card id="delete-account">
      <MDBox py={3} px={2} display="flex" flexDirection="row" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium" mx={1} mr={2}>
          Danh sách
        </MDTypography>
        <FormControl
          size="small"
          sx={{ width: "20%" }}
          style={{
            height: 40,
            marginRight: 20,
          }}
        >
          <InputLabel id="demo-simple-select-label">Lọc</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Lọc"
            defaultValue={0}
            onChange={(e) => {
              if (e.target.value === 0) {
                setIsSave(true);
              }
              setSearch({
                ...search,
                type: e.target.value,
                value: "",
              });
            }}
            style={{ height: "100%" }}
          >
            <MenuItem value={0}>Tất Cả</MenuItem>
            <MenuItem value={1}>Ngày đặt</MenuItem>
            <MenuItem value={2}>Ngày đi</MenuItem>
            <MenuItem value={3}>Số điện thoại</MenuItem>
            {/* <MenuItem value={4}>Năm</MenuItem> */}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ width: "10%" }}
          style={{
            height: 40,
            marginRight: 20,
          }}
        >
          <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Trạng thái"
            defaultValue={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            style={{ height: "100%" }}
          >
            <MenuItem value="All">Tất Cả</MenuItem>
            <MenuItem value="Success">Đã thanh toán</MenuItem>
            <MenuItem value="Cancel">Đã hủy</MenuItem>
            <MenuItem value="Refund">Hoàn tiền</MenuItem>
          </Select>
        </FormControl>
        {search.type === 0 ? null : (
          <>
            <TextField
              id="outlined-basic"
              label="Giá trị"
              variant="outlined"
              value={search.value}
              type={search.type === 1 || search.type === 2 ? "date" : "text"}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                setSearch({
                  ...search,
                  value: e.target.value,
                });
              }}
              mr={3}
            />
            <MDButton
              variant="text"
              color="dark"
              onClick={() => {
                setIsSave(true);
              }}
              disabled={!search.value}
            >
              Tìm kiếm
            </MDButton>
          </>
        )}
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <Item
          stt="STT"
          name="Số điện thoại"
          route="Tuyến"
          dateOrder="Ngày đặt"
          date="Ngày đi"
          time="Thời gian"
          nameVehicle="Tên xe"
          numberTicket="Số lượng vé"
          totalPrice="Tổng giá"
          status="Trạng thái"
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
          {isSave ? (
            <Loading type="spin" color="rgb(41,130,235)" />
          ) : (
            <MDBox mt="-40px">
              {listHistory.length > 0
                ? listHistory.map((item, index) => (
                    <Item
                      key={item.id}
                      // stt={index + 1}
                      // departure={item.adminGetRouteResponse.route.departure.nameStation}
                      // arrival={item.adminGetRouteResponse.route.arrival.nameStation}
                      // date={item.date}
                      // time={item.timeStart}
                      // idTripInstance={item.id}
                      // idRoute={item.adminGetRouteResponse.route.id}
                      // hide={false}
                      // setIsSave={setIsSave}
                      // setNotification={setNotification}
                      stt={index + (currentPage - 1) * pageSize + 1}
                      name={item.customer.username}
                      route={item.route}
                      dateOrder={item.datOrder}
                      date={item.dateStart}
                      time={item.timeStart}
                      nameVehicle={item.nameVehicle}
                      numberTicket={item.numberTicket}
                      totalPrice={item.totalPrice}
                      status={item.status}
                      hide={false}
                    />
                  ))
                : null}
            </MDBox>
          )}
        </MDBox>
      </MDBox>
      {search.type !== 1 && search.type !== 2 && (
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
      )}
    </Card>
  );
}

ListHistory.propTypes = {
  listHistory: PropTypes.arrayOf.isRequired,
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.objectOf.isRequired,
  setStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  setIsSave: PropTypes.func.isRequired,
  isSave: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default ListHistory;
