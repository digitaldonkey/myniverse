import './App.scss';
import Colors from './Colors.jsx';
import './scss/base.scss';
import './scss/global.scss';
import './scss/react-tooltip.scss';
import { ServerList } from './serverList/ServerList.jsx';
import { TrendsGlobal } from './TrendsGlobal/TrendsGlobal.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './scss/react-tabs.scss';
import { getTrendsList, getActiveTab, setActiveTab } from "./redux/myniverse.js";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const hasTrends = useSelector(getTrendsList).length > 0;
  const activeTab = useSelector(getActiveTab).activeTab
  return (
    <>
      <Colors />
      <div className="App">
        <h2>Trends in your myniverse</h2>
        <p>
          Trends aggregated from <strong>the top 20</strong> of servers with status `active`
        </p>
        <Tabs selectedIndex={activeTab} onSelect={(index) => {
          dispatch(
            setActiveTab({
              activeTab: index,
            }),
          );
          return false;
        }}>
          <TabList>
            {hasTrends && <Tab><h3>Your Trends</h3></Tab> }
            <Tab><h3>Server list</h3></Tab>
          </TabList>
          {hasTrends && <TabPanel>
            <TrendsGlobal />
          </TabPanel>}
          <TabPanel>
            <ServerList />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
export default App
