import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabComponent = (props) => {
  return (
  <Tabs>
    <TabList>
      <Tab>Browse</Tab>
      <Tab>Post</Tab>
    </TabList>
    <TabPanel>
      <div>
      {props.browseView()}
      </div>
    </TabPanel>
    <TabPanel>
      <div>
      {props.postView()}
      </div>
    </TabPanel>
  </Tabs>
);
}

export default TabComponent;