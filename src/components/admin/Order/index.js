import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableViewIcon from "@mui/icons-material/TableView";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import WaitingOrderTable from "./WaitingOrderTable";
import ProgressOrderTable from "./OnProgressTable";
import CompleteOrderTable from "./CompleteOrderTable";

function Order() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const [value, setValue] = useState(queryParams.get("tab") || "pending");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/admin/order?tab=${newValue}`);
  };
  return (
    <div className="flex flex-col w-full">
      <div className=" flex space-x-2">
        <TableViewIcon sx={{ color: "#193254" }} />
        <p className="font-bold text-space-cadet">Order</p>
      </div>
      <div className="mt-14 md:mt-14 flex w-full justify-center flex-wrap  bg-white rounded-lg drop-shadow-lg">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} sx={{ width: "100%" }}>
                <Tab label="Waiting Order" value="waiting" sx={{ width: "33.3%" }} to="/order" />
                <Tab label="On Progress" value="progress" sx={{ width: "33.3%" }} />
                <Tab label="Complete Order" value="complete" sx={{ width: "33.3%" }} />
              </TabList>
            </Box>
            <TabPanel value="waiting">
              <WaitingOrderTable />
            </TabPanel>
            <TabPanel value="progress">
              <ProgressOrderTable />
            </TabPanel>
            <TabPanel value="complete">
              <CompleteOrderTable />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default Order;
