import React from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "react-bootstrap";
import UserPinsComponent from "../../components/getPinsComponent";
import UserSavedPinsComponent from "../../components/getSavedPinsComponent";
import "bootstrap/dist/css/bootstrap.min.css";

const TabsComponent = ({ tabvalue, value }) => {
  const components = {
    UserPinsComponent: UserPinsComponent,
    UserSavedPinsComponent: UserSavedPinsComponent,
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Tabs defaultActiveKey={value} id="uncontrolled-tab-example" className="mb-3">
        {tabvalue?.map((tabinfo, index) => {
          const SpecificStory = components[tabinfo.component];
          return (
            <Tab title={tabinfo.tabTitle} eventKey={tabinfo.tabTitle} key={tabinfo.tabTitle}>
              <SpecificStory />
            </Tab>
          )
        }
        )}
      </Tabs>
    </Box>
  );
};

export default TabsComponent;
