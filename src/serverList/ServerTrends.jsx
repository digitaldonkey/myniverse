import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThresholdInput from '../components/ThresholdInput';
import Trends from '../components/Trends';
import { getConfig, updateServerMinTootThreshold } from '../redux/myniverse';
import InfoBubbleIcon from "../components/InfoBubbleIcon";
import StatsIcon from "../components/StatsIcon.jsx";

export default function ServerTrends(props) {
  const dispatch = useDispatch();
  const { serverDefaultTootThreshold } = useSelector(getConfig);
  const { trends, url, minTootThreshold } = props.server;
  const [currentMinTootThreshold, setCurrentMinTootThreshold] = useState(
    minTootThreshold >= 0 ? minTootThreshold : serverDefaultTootThreshold,
  );
  const isDefault = minTootThreshold === -1;

  useEffect(() => {
    if (minTootThreshold === -1) {
      setCurrentMinTootThreshold(serverDefaultTootThreshold);
    }
  }, [serverDefaultTootThreshold, minTootThreshold]);

  if (!trends.length){
    return null;
  }
  return (
    <>
      <div className="filter filter-distplay-stats">
        <StatsIcon />
        <label className="label">min toot
        <ThresholdInput
          currentMinTootThreshold={currentMinTootThreshold}
          action={(e) => {
            setCurrentMinTootThreshold(e.target.value);
            dispatch(
              updateServerMinTootThreshold({
                url,
                minTootThreshold: e.target.value,
              }),
            );
          }}
          maxValue={20000}
        />
        </label>
        <label>
          &#32;&nbsp;
          <input
            type="checkbox"
            checked={isDefault}
            disabled={isDefault}
            onChange={(e) => {
              if (e.target.checked) {
                setCurrentMinTootThreshold(serverDefaultTootThreshold);
                dispatch(
                  updateServerMinTootThreshold({ url, minTootThreshold: -1 }),
                );
              }
            }}
          />&nbsp;
          use global
        </label>
        <InfoBubbleIcon className="server-min-troots" />
      </div>
      <Trends trends={trends} minTootThreshold={currentMinTootThreshold} />
    </>
  );
}
