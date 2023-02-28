import React, { useRef } from 'react';
import './App.scss';
import Colors from './Colors';
import { TrendsGlobal } from './TrendsGlobal/TrendsGlobal';
import './scss/base.scss';
import './scss/global.scss';
import './scss/react-tooltip.scss';
import { ServerList } from './serverList/ServerList';

function App() {
  const trendsPos = useRef(null);
  const scrollToTrends = () => trendsPos.current.scrollIntoView();
  const serversPos = useRef(null);
  const scrollToServers = (e) => {
    serversPos.current.scrollIntoView();
  };

  return (
    <>
      <Colors />
      <div className="App">
        <h2>Trends in your myniverse</h2>
        <p>
          Trends aggregated from <strong>the top 20</strong> of{' '}
          <a href="#servers" onClick={scrollToServers}>
            below
          </a>{' '}
          servers with status 'active'
        </p>

        <div ref={trendsPos}></div>
        <TrendsGlobal />

        <div ref={serversPos}></div>
        <ServerList />

        <div className="scroll-menu menu">
          <button className="button" onClick={scrollToTrends}>Trends</button>
          <button className="button" onClick={scrollToServers}>Servers</button>
        </div>
      </div>
    </>
  );
}

export default App;
