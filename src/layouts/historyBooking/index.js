import Grid from "@mui/material/Grid";
import {
  getListHistory,
  getListHistoryByCustomer,
  getListHistoryByYear,
  getListHistoryByDateStart,
  getListHistoryByDateOrder,
} from "Apis/statistic.api";
// import Loading from "components/Loading";
// import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import ListHistory from "./ListHistory";

function HistoryBooking() {
  const [isSave, setIsSave] = useState(true);
  const [notification, setNotification] = useState("");
  const [listHistory, setListHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const PAGE_SIZE = 20;
  const [search, setSearch] = useState({
    type: 0,
    value: "",
  });
  const [status, setStatus] = useState("All");
  useEffect(() => {
    const notiTime = setTimeout(() => {
      setNotification("");
    }, 10000);
    return () => {
      clearTimeout(notiTime);
    };
  }, [notification]);
  // useEffect(() => {
  //   getListHistory(setListHistory, setIsSave, setCurrentPage, setTotalPage, {
  //     page: currentPage,
  //     pageSize: PAGE_SIZE,
  //     status,
  //   });
  // }, []);
  useEffect(() => {
    if (isSave) {
      if (search.type === 0) {
        getListHistory(setListHistory, setIsSave, setCurrentPage, setTotalPage, {
          page: currentPage,
          pageSize: PAGE_SIZE,
          status,
        });
      } else if (search.type === 1) {
        getListHistoryByDateOrder(
          {
            date: search.value,
          },
          setListHistory,
          setIsSave,
          {
            status,
          }
        );
      } else if (search.type === 2) {
        getListHistoryByDateStart(
          {
            date: search.value,
          },
          setListHistory,
          setIsSave,
          {
            status,
          }
        );
      } else if (search.type === 3) {
        getListHistoryByCustomer(
          search.value,
          setListHistory,
          setIsSave,
          setCurrentPage,
          setTotalPage,
          {
            page: currentPage,
            pageSize: PAGE_SIZE,
            status,
          }
        );
      } else if (search.type === 4) {
        getListHistoryByYear(search.value, setListHistory, setIsSave);
      }
    }
  }, [isSave]);

  console.log(isSave);

  return (
    <DashboardLayout>
      <DashboardNavbar title="Vé" />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              marginBottom="2rem"
            >
              <MDTypography variant="h6" color="white">
                Quản lý vé
              </MDTypography>
            </MDBox>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <ListHistory
                    listHistory={listHistory}
                    setIsSave={setIsSave}
                    setNotification={setNotification}
                    setSearch={setSearch}
                    search={search}
                    isSave={isSave}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    pageSize={PAGE_SIZE}
                    status={status}
                    setStatus={setStatus}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default HistoryBooking;
