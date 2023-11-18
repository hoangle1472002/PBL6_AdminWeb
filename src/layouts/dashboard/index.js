import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useEffect, useState } from "react";
import { getVehicle } from "Apis/vehicle.api";
import { getRoute } from "Apis/route.api";
import { getEveryTrip } from "Apis/trip.api";
import { getListHistory, getListHistoryByYearForStatistic } from "Apis/statistic.api";

function Dashboard() {
  const [allVehicle, setAllVehicles] = useState([]);
  const [allRoute, setAllRoute] = useState([]);
  const [allTrip, setAllTrip] = useState([]);
  const [allTicket, setAllTicket] = useState([]);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    getVehicle(setAllVehicles);
    getRoute(setAllRoute);
    getEveryTrip(setAllTrip);
    getListHistory(setAllTicket);
    const currentYear = new Date().getFullYear();
    getListHistoryByYearForStatistic(currentYear)
      .then((data) => setRevenue(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar title="Trang chủ" />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} height="18rem">
              <ComplexStatisticsCard
                color="dark"
                icon="directions_bus"
                title="Xe"
                count={`+${allVehicle.length}`}
                percentage={{
                  color: "success",
                  amount: "+",
                  label: "Chi tiết",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="call_split"
                title="Tuyến"
                count={`+${allRoute.length}`}
                percentage={{
                  color: "success",
                  amount: "+",
                  label: "Chi tiết",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} height="18rem">
              <ComplexStatisticsCard
                color="dark"
                icon="details"
                title="Chuyến"
                count={`+${allTrip.length}`}
                percentage={{
                  color: "success",
                  amount: "+",
                  label: "Chi tiết",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="book_online"
                title="Vé"
                count={`+${allTicket.length}`}
                percentage={{
                  color: "success",
                  amount: "+",
                  label: "Chi tiết",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="bar_chart"
                title={`Doanh thu ${new Date().getFullYear()}`}
                count={`${revenue}`}
                percentage={{
                  color: "success",
                  amount: "+",
                  label: "Chi tiết",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
