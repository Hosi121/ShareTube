import React from "react";
import { Paper, Tabs, Tab, Box } from "@mui/material";
import Chart from "../molecules/Chart";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface AnalyticsChartsProps {
  videos: any[];
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ videos }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="視聴維持率" />
        <Tab label="エンゲージメント率" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Chart
          data={videos}
          type="line"
          dataKey="retentionRate"
          xAxisDataKey="title"
          name="視聴維持率"
          color="#3f51b5"
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Chart
          data={videos}
          type="bar"
          dataKey="engagementRate"
          xAxisDataKey="title"
          name="エンゲージメント率"
          color="#3f51b5"
        />
      </TabPanel>
    </Paper>
  );
};

export default AnalyticsCharts;
