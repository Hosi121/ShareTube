import React from "react";
import { Box } from "@mui/material";
import Typography from "../atoms/typography";
import Button from "../atoms/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface AnalyticsHeaderProps {
  title: string;
  onExportCSV: () => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  title,
  onExportCSV,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
    }}
  >
    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
      {title}
    </Typography>
    <Button startIcon={<FileDownloadIcon />} onClick={onExportCSV}>
      CSV出力
    </Button>
  </Box>
);

export default AnalyticsHeader;
