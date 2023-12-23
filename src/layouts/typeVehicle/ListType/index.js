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
import { createTypeVehicle } from "Apis/vehicle.api";
import ItemType from "../itemType";

function ListType({ listType, setIsSave, setNotification }) {
  const { columns, rows } = authorsTableData();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    description: "",
    quantity: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddTypeVehicle = () => {
    console.log(data);
    createTypeVehicle(data, setIsSave, setNotification);
  };
  console.log(listType);
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
          Danh sách loại xe
        </MDTypography>
        <MDButton
          variant="gradient"
          color="info"
          onClick={() => {
            handleClickOpen();
          }}
        >
          Thêm loại xe
        </MDButton>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <ItemType stt="STT" description="Loại xe" quantity="Số lượng ghế" hide />
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
          <MDBox mt="-40px">
            {listType?.map((item, index) => (
              <ItemType
                stt={index + 1}
                description={item.description}
                quantity={item.quantity}
                idType={item.id}
                hide={false}
                setIsSave={setIsSave}
                setNotification={setNotification}
              />
            ))}
          </MDBox>
        </MDBox>
      </MDBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle ml="35%">Thêm loại xe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Loại xe"
            type="text"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            onChange={(e) => {
              setData({
                ...data,
                description: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Số lượng ghế"
            type="number"
            fullWidth
            variant="standard"
            sx={{ width: "450px", mx: 4 }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => {
              setData({
                ...data,
                quantity: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              handleAddTypeVehicle();
              handleClose();
            }}
            disabled={!data.description || !data.quantity}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
ListType.propTypes = {
  listType: PropTypes.arrayOf.isRequired,
  setIsSave: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
export default ListType;
