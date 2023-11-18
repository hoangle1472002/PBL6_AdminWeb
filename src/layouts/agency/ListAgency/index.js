import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/route/data/authorsTableData";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createAgency } from "Apis/agency.api";
import ItemAgency from "../itemAgency";

function ListAgency({ listAgency, setIsSave, setNotification }) {
  const { columns, rows } = authorsTableData();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    inforRequest: {
      address: "",
      city: "",
      country: "",
      email: "",
      name: "",
      phone: "",
      wards: "",
    },
    signupRequest: {
      password: "",
      role: 2,
      username: "",
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddAgency = () => {
    console.log(data);
    createAgency(data, setIsSave, setNotification);
  };
  return (
    <Card id="delete-account">
      <MDBox
        pt={3}
        px={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <MDTypography variant="h6" fontWeight="medium" ml={2}>
          Danh sách hãng xe
        </MDTypography>
        <MDButton
          variant="gradient"
          color="info"
          onClick={() => {
            handleClickOpen();
          }}
        >
          Thêm hãng xe
        </MDButton>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <ItemAgency
          stt="STT"
          name="Tên hãng xe"
          phone="Số điện thoại"
          email="Email"
          province="Tỉnh"
          country="Nước"
          address="Địa chỉ"
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
            {listAgency?.map((item, index) => (
              <ItemAgency
                stt={index + 1}
                name={item.userName}
                phone={item.phone}
                email={item.email}
                province={item.city}
                country={item.country}
                address={item.address}
                idAgency={item.userId}
                hide={false}
                setIsSave={setIsSave}
                setNotification={setNotification}
              />
            ))}
          </MDBox>
        </MDBox>
      </MDBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle ml="43%">Cập nhật</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên hãng"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            onChange={(e) => {
              setData({
                inforRequest: {
                  ...data.inforRequest,
                  name: e.target.value,
                },
                signupRequest: {
                  ...data.signupRequest,
                  username: e.target.value,
                },
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Số điện thoại"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => {
              setData({
                ...data,
                inforRequest: {
                  ...data.inforRequest,
                  phone: e.target.value,
                },
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            onChange={(e) => {
              setData({
                ...data,
                inforRequest: {
                  ...data.inforRequest,
                  email: e.target.value,
                },
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phường"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            onChange={(e) => {
              setData({
                ...data,
                inforRequest: {
                  ...data.inforRequest,
                  wards: e.target.value,
                },
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tỉnh"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            onChange={(e) => {
              setData({
                ...data,
                inforRequest: {
                  ...data.inforRequest,
                  city: e.target.value,
                },
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nước"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            onChange={(e) => {
              setData({
                ...data,
                inforRequest: {
                  ...data.inforRequest,
                  country: e.target.value,
                },
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Địa chỉ"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            onChange={(e) => {
              setData({
                ...data,
                inforRequest: {
                  ...data.inforRequest,
                  address: e.target.value,
                },
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên tài khoản"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            onChange={(e) => {
              setData({
                ...data,
                signupRequest: {
                  ...data.signupRequest,
                  username: e.target.value,
                },
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mật khẩu"
            type="password"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            onChange={(e) => {
              setData({
                ...data,
                signupRequest: {
                  ...data.signupRequest,
                  password: e.target.value,
                },
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              handleAddAgency();
              handleClose();
            }}
            disabled={
              !data.inforRequest.email ||
              !data.inforRequest.name ||
              !data.inforRequest.phone ||
              !data.inforRequest.wards ||
              !data.inforRequest.city ||
              !data.inforRequest.country ||
              !data.inforRequest.address ||
              !data.signupRequest.username ||
              !data.signupRequest.password
            }
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
ListAgency.propTypes = {
  listAgency: PropTypes.arrayOf.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
export default ListAgency;
