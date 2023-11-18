import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import { useEffect, useState } from "react";
import { getListHistoryByYearForStatistic, getRevenueHistoryByYear } from "Apis/statistic.api";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import { TextField } from "@mui/material";
import MDButton from "components/MDButton";
import Loading from "components/Loading";

function Revenue() {
  const [arrRevenue, setArrRevenue] = useState([]);
  const [arrRevenueYear, setArrRevenueYear] = useState([]);
  const [arrRevenueByMonth, setArrRevenueByMonth] = useState([]);
  const [year, setYear] = useState(null);
  const [clickSearch, setclickSearch] = useState(false);
  const [revenueYear, setRevenueYear] = useState(0);
  const [isSave, setIsSave] = useState(true);
  const [isSaveMonth, setIsSaveMonth] = useState(false);
  const handlePromise = async () => {
    const currentYear = new Date().getFullYear();
    const arrYear = [];
    const arrRevenueCopy = [];
    const promises = [];
    for (let i = currentYear; i > currentYear - 10; i -= 1) {
      promises.push(
        getListHistoryByYearForStatistic(i)
          .then((data) => {
            arrRevenueCopy.unshift({ data, index: i });
          })
          .catch((e) => {
            console.log(e);
          })
      );
      arrYear.unshift(i.toString());
    }
    Promise.all(promises)
      .then(() => {
        const arr = arrRevenueCopy.sort((a, b) => a.index - b.index);
        const arr1 = arr.map((item) => item.data);
        setArrRevenue(arr1);
        setArrRevenueYear(arrYear);
        setIsSave(false);
      })
      .catch((e) => {
        console.log(e);
        setIsSave(false);
      });
  };
  useEffect(() => {
    if (isSave) {
      handlePromise();
    }
  }, [isSave]);

  useEffect(() => {
    if (clickSearch) {
      getRevenueHistoryByYear(year, setArrRevenueByMonth, setRevenueYear, setIsSaveMonth);
    } else {
      setArrRevenueByMonth([]);
    }
    // return setclickSearch(false);
  }, [clickSearch]);

  return (
    <DashboardLayout>
      <DashboardNavbar title="Doanh thu" />
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
                Doanh thu
              </MDTypography>
            </MDBox>
          </Grid>
          {isSave ? (
            <Grid item xs={12}>
              <Loading type="spin" color="rgb(41,130,235)" />
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                {/* <MDBox
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="transparent"
              borderRadius="lg"
              coloredShadow="info"
              marginBottom="2rem"
            > */}
                <ReportsLineChart
                  color="info"
                  title="Doanh thu theo năm"
                  description=""
                  date="cập nhật 1 ngày trước"
                  chart={{
                    labels: arrRevenueYear,
                    datasets: {
                      label: "Doanh thu",
                      data: arrRevenue,
                    },
                  }}
                />
                {/* </MDBox> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Năm"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  style={{
                    marginRight: 10,
                  }}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setclickSearch(false);
                  }}
                />
                <MDButton
                  // variant="text"
                  color="dark"
                  onClick={() => {
                    setclickSearch(true);
                    setIsSaveMonth(true);
                  }}
                >
                  Tìm kiếm
                </MDButton>
              </Grid>
              {isSaveMonth ? (
                <Grid item xs={12}>
                  <Loading type="spin" color="rgb(41,130,235)" />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  {arrRevenueByMonth?.length > 0 ? (
                    <VerticalBarChart
                      icon={{ color: "info", component: "leaderboard" }}
                      title={`Doanh thu năm ${year}`}
                      description={`Doanh thu: ${revenueYear}vnd`}
                      chart={{
                        labels: [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ],
                        datasets: [
                          {
                            label: "Doanh thu tháng",
                            color: "dark",
                            data: arrRevenueByMonth,
                          },
                        ],
                      }}
                    />
                  ) : null}
                </Grid>
              )}
            </>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Revenue;
