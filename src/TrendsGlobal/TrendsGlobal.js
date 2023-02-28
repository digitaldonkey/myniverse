import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThresholdInput from '../components/ThresholdInput';
import Trends from '../components/Trends';
import {
  getConfig,
  getTrendsList,
  updateAllTrends,
  updateConfig,
} from '../redux/myniverse';
import InfoBubble from "../components/InfoBubble";

export function TrendsGlobal() {
  const trends = useSelector(getTrendsList);
  const dispatch = useDispatch();
  const { trendsFilter } = useSelector(getConfig);

  // Filters
  const [filterMinToots, setFilterMinToots] = useState(trendsFilter.minToots);
  const [filterMinUrls, setFilterMinUrls] = useState(trendsFilter.minUrls);
  const [filterMaxTotal, setFilterMaxTotal] = useState(trendsFilter.maxTotal);

  const filteredMinToots = [...trends].filter((t) => {
    let dataMaxValue = 0;
    t.history.forEach((day) => {
      dataMaxValue = Math.max(dataMaxValue, day.uses);
    });
    // return parseInt(t.history[0].uses) >= filterMinToots;
    return dataMaxValue >= filterMinToots;
  });

  const filteredMinUrls = filteredMinToots.filter((t) => {
    return Object.keys(t.urls).length >= filterMinUrls;
  });

  // Ordering
  const orderedTrends = filteredMinUrls.sort((t1, t2) => {
    return parseInt(t2.history[0].uses) - parseInt(t1.history[0].uses);
  });

  return trends.length ? (
    <div className="trends">
      <div className="trends-header">
        <div className="menu">
          <div className="filters">
            <div className="filter">
              <label>Min Toots</label>
              <ThresholdInput
                currentMinTootThreshold={filterMinToots}
                action={(e) => {
                  setFilterMinToots(e.target.value);
                  dispatch(
                    updateConfig({
                      trendsFilter: {
                        ...trendsFilter,
                        ...{ minToots: e.target.value },
                      },
                    }),
                  );
                }}
                maxValue={20000}
              />
              <InfoBubble
                id="trends-global-min-toots"
                content="Minimum of Toots with the tag."
              />
            </div>

            <div className="filter">
              <label>Min Servers</label>
              <ThresholdInput
                currentMinTootThreshold={filterMinUrls}
                action={(e) => {
                  setFilterMinUrls(e.target.value);
                  dispatch(
                    updateConfig({
                      trendsFilter: {
                        ...trendsFilter,
                        ...{ minUrls: e.target.value },
                      },
                    }),
                  );
                }}
                maxValue={50}
              />
              <InfoBubble
                id="filter-min-urls"
                content="Minimum number of servers the trend is on."
              />
            </div>

            <div className="filter">
              <label>Max total</label>
              <ThresholdInput
                currentMinTootThreshold={filterMaxTotal}
                action={(e) => {
                  setFilterMaxTotal(e.target.value);
                  dispatch(
                    updateConfig({
                      trendsFilter: {
                        ...trendsFilter,
                        ...{ maxTotal: e.target.value },
                      },
                    }),
                  );
                }}
                maxValue={500}
              />
              of {filteredMinUrls.length} filtered
              <InfoBubble
                id="filter-max-total"
                content="Maximum total Tags visible. Reduce if rendering is too slow."
              />
            </div>

            <div className="filter">
              <label>Total Trends {trends.length}</label>
              <InfoBubble
                id="info-total"
                content="All trends available at all servers."
              />
            </div>
          </div>

          <div className="filter">
            <button
              className="button primary"
              onClick={() => {
                dispatch(updateAllTrends());
              }}
            >
              Update all your Trends
            </button>
            <InfoBubble
              id="info-update-all"
              content="All trends servers, by requeing all servers with active state."
            />
          </div>


          {/*<button*/}
          {/*  className="button"*/}
          {/*  id="info-delete-old"*/}
          {/*  onClick={() => {*/}
          {/*    dispatch(deleteOldTrends());*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Delete old trends*/}
          {/*</button>*/}
          {/*<InfoBubble*/}
          {/*  id="info-delete-old"*/}
          {/*  content="Removes trends older than 24h."*/}
          {/*/>*/}
        </div>
      </div>
      <Trends
        trends={orderedTrends.slice(0, filterMaxTotal)}
        minTootThreshold={0}
      />
    </div>
  ) : null;
}
