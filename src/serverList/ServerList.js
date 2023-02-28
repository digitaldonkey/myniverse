import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip';
import BlacklistInput from '../components/BlacklistInput';
import ThresholdInput from '../components/ThresholdInput';
import {
  addServerByUri,
  getConfig,
  getServerList,
  updateConfig,
  updateInstancesByStatus,
} from '../redux/myniverse';
import Server from './Server';
import './ServerList.scss';
import { filterByStatus, getServerStatus } from './ServerStatus';
import InfoBubble from "../components/InfoBubble";

export function ServerList() {
  const dispatch = useDispatch();
  const {
    serverDefaultTootThreshold,
    peering,
    serverFilter
  } = useSelector(getConfig);
  const servers = useSelector(getServerList);

  // Local vars
  const [showServers, setShowServers] = useState(true);
  const [showPeerSettings, setShowPeerSettings] = useState(false);
  const [statusFilter, setStatusFilter] = useState(
    getServerStatus(serverFilter.status),
  );
  const [orderBy, setOrderBy] = useState(serverFilter.orderBy);
  const serversPos = useRef(null);
  const scrollToServers = () => serversPos.current.scrollIntoView({ behavior: 'smooth' });

  // Order
  const orderedServers = orderServers(
    filterByStatus(servers, statusFilter),
    orderBy,
  );

  return (
    <div className="server-list" ref={serversPos}>
      <div className="menu">
        <form
          className="server-list--form"
          onSubmit={(event) => {
            event.preventDefault();
            const uriForm = document.getElementById('new-server-uri');
            if (uriForm && uriForm.value) {
              dispatch(addServerByUri(uriForm.value));
              uriForm.value = '';
            }
          }}
        >
          <button
            className="button button-server-list-toggle"
            type="button"
            onClick={() => {
              if (!showServers) {
                setTimeout(() => {
                  scrollToServers();
                }, 500);
              }
              setShowServers(!showServers);
            }}
          >
            ☰
          </button>
          <input
            id="new-server-uri"
            type="url"
            pattern="https://.*"
            required="required"
            placeholder="https://mastodon.social"
          />
          <button className="button primary" type="submit">+ Add Instance</button>
        </form>
      </div>
      {showServers ? (
        <div>
          <div className="menu">
            <div className="filter" >
              <label>Global min toots Toots</label>
              <ThresholdInput
                currentMinTootThreshold={serverDefaultTootThreshold}
                action={(e) => {
                  dispatch(
                    updateConfig({
                      serverDefaultTootThreshold: e.target.value,
                    }),
                  );
                }}
                maxValue={20000}
              />
              <InfoBubble
                id="server-filter-min-toots"
                content="Global minimum troots before trend is displayed within server list."
              />
            </div>

            <div className="filter">
              <button
                className="button primary"
                onClick={() => {
                  dispatch(
                    updateInstancesByStatus(getServerStatus(['active'])),
                  );
                }}
              >
                Update active
              </button>
              <span>
                &nbsp;(
                {filterByStatus(servers, getServerStatus(['active'])).length})
              </span>
            </div>

            <div className="filter filter-status">
              <div className="label">Filter by status</div>
              <div className="select-wrapper">
                <Select
                  defaultValue={statusFilter}
                  onChange={(statusList) => {
                    setStatusFilter(statusList);
                    dispatch(
                      updateConfig({
                        serverFilter: {
                          ...serverFilter,
                          ...{ status: statusList.map((x) => x.value) },
                        },
                      }),
                    );
                  }}
                  options={getServerStatus()}
                  isMulti
                />
              </div>
              <button
                className="button"
                onClick={() => {
                  dispatch(updateInstancesByStatus(statusFilter));
                }}
              >
                Update visible Instances
              </button>
              <span>
                &nbsp;({filterByStatus(servers, statusFilter).length})
              </span>
            </div>

            <div className="status-count  filter">
              <ul className="list">
                {getServerStatus().map((s) => (
                  <li className="item" key={s.value} id={s.value}>
                    <span>{s.value}:</span>
                    <span>{filterByStatus(servers, getServerStatus(s.value)).length}</span>

                    <Tooltip
                      anchorSelect={`#${s.value}`}
                      place="bottom"
                      content={s.label}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter filter-order">
              <div className="label">Ordering</div>
              <div className="select-wrapper">
                <Select
                  defaultValue={orderOptions[0]}
                  onChange={(status) => {
                    if (orderBy !== status.value) {
                      setOrderBy(status.value);
                      dispatch(
                        updateConfig({
                          serverFilter: {
                            ...serverFilter,
                            ...{ orderBy: status.value },
                          },
                        }),
                      );
                    }
                  }}
                  options={orderOptions}
                />
              </div>
            </div>
            <div className={`filter filter-panel--panel ${
                showPeerSettings ? 'active' : ''
              }`}
            >
              <button
                className="filter-panel--button button"
                type="button"
                onClick={() => {
                  setShowPeerSettings(!showPeerSettings);
                }}
              >
                <span className="threshold-icon">⚙</span>
                <span>Peer settings</span>
              </button>
              {/*<Tooltip*/}
              {/*  id="tooltip-server-peer-settings"*/}
              {/*  anchorSelect="#server-peer-settings"*/}
              {/*  place="bottom"*/}
              {/*  content="Peering conditions when processing add peers."*/}
              {/*/>*/}
              {!showPeerSettings &&
                <InfoBubble
                  id="server-peer-settings"
                  content="Peering conditions when processing add peers."
                />
              }
            </div>
            {showPeerSettings && (
              <div className="menu-panel">
                <h4>Peering settings</h4>
                <p>
                  When you <em>add Peers</em> in a server context all all peers
                  of that instance will be evaluated.
                  <br />
                  To avoid adding tiny instances without trends or with a non
                  representative user base we only list the instances with
                  following criteria.
                </p>
                <div id="config-minPeerUserCount">
                  <p>Minimum user accounts</p>
                  <ThresholdInput
                    currentMinTootThreshold={peering.minUserCount}
                    action={(e) => {
                      dispatch(
                        updateConfig({
                          peering: {
                            ...peering,
                            ...{ minUserCount: parseInt(e.target.value) },
                          },
                        }),
                      );
                    }}
                    maxValue={20000}
                  />
                  <br />
                  <small>(Recommended: 5000)</small>
                </div>
                <div id="config-minPeerUserCount">
                  <p>Minimum Toot count</p>
                  <ThresholdInput
                    currentMinTootThreshold={peering.minTootCount}
                    action={(e) => {
                      dispatch(
                        updateConfig({
                          peering: {
                            ...peering,
                            ...{ minTootCount: parseInt(e.target.value) },
                          },
                        }),
                      );
                    }}
                    maxValue={20000}
                  />
                  <br />
                  <small>(Recommended: 1000)</small>
                </div>
                <p>
                  Blacklist
                  <br />
                  Instance urls including any of the lines wont be added to
                  server list.
                </p>
                <BlacklistInput
                  blacklist={peering.blacklist}
                  action={(blacklist) => {
                    dispatch(
                      updateConfig({
                        peering: {
                          ...peering,
                          ...{ blacklist: blacklist },
                        },
                      }),
                    );
                  }}
                />

                <div id="config-rePeerTimeout">
                  <p>
                    Time before retry to peer if instance is unreachable or does
                    not match above peering criteria.
                  </p>
                  <ThresholdInput
                    currentMinTootThreshold={peering.repeerTimeout}
                    action={(e) => {
                      dispatch(
                        updateConfig({
                          peering: {
                            ...peering,
                            ...{ repeerTimeout: parseInt(e.target.value) },
                          },
                        }),
                      );
                    }}
                    maxValue={5000}
                  />{' '}
                  hours = {(peering.repeerTimeout / 24).toFixed(0)} days.
                  <br />
                  <small>(Recommended: 168 hours, one Week)</small>
                </div>

                <button
                  className="primary button button-peer-settings-toggle"
                  type="button"
                  onClick={() => {
                    setShowPeerSettings(!showPeerSettings);
                  }}
                >
                  <span>Close peer settings</span>
                </button>
              </div>
            )}
          </div>

          <Tooltip
            id="tooltip-update-trends"
            anchorSelect=".button-update-trends"
            place="bottom"
          >
            Update the trends on this instance.
            <ul>
              <li>If instance is "disabled" it will become "active"</li>
              <li>
                If instance has trends they will be added or aggregated at
                global trends
              </li>
              <li>
                If instance does not allow trend request instance will be
                disabled
              </li>
            </ul>
          </Tooltip>

          <Tooltip
            id="tooltip-add-peers"
            anchorSelect=".button-add-peers"
            place="bottom"
          >
            Add all peers of this instance to the server list.
            <ul>
              <li>
                Only peers fulfilling the "peer settings" filter will be added
              </li>
              <li>
                This will trigger at least one request per per peered instance!
              </li>
            </ul>
          </Tooltip>
          <Tooltip
            id="tooltip-server-min-troot-threshold"
            anchorSelect=".server-min-troot-threshold"
            place="bottom"
          >
            Check out whats trending on this specific instance.
          </Tooltip>
          <Tooltip id="status-tooltip" place="bottom" />

          {orderedServers && (
            <div className="server-list">
              {orderedServers.map((server) => (
                <Server key={server.url} server={server} />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

const orderServers = (array, type) => {
  // Order by instance.stats[type]
  if (type.substring(type.length - 5) === 'count') {
    return array.sort((s1, s2) => {
      if (
        !s2.instance ||
        !s2.instance.stats ||
        !s1.instance ||
        !s1.instance.stats
      ) {
        if (!s2.instance || !s2.instance.stats) {
          // sort s1 before s2
          return -1;
        }
        if (!s1.instance || !s1.instance.stats) {
          // sort s1 after s2
          return 1;
        }
      }
      return s2.instance.stats[type] - s1.instance.stats[type];
    });
  }

  // Order alphabetical by instance prop = orderOptions.value
  return array.sort((s1, s2) => {
    if (
      !s2.instance ||
      !s2.instance[type] ||
      !s1.instance ||
      !s1.instance[type]
    ) {
      if (!s2.instance || !s2.instance[type]) {
        // sort s1 before s2
        return -1;
      }
      if (!s1.instance || !s1.instance[type]) {
        // sort s1 after s2
        return 1;
      }
    }
    return s1.instance[type].trim().localeCompare(s2.instance[type].trim());
  });
};

const orderOptions = [
  {
    label: 'Peer count',
    value: 'domain_count',
  },
  {
    label: 'Status count',
    value: 'status_count',
  },
  {
    label: 'User count',
    value: 'user_count',
  },
  {
    label: 'Domain name',
    value: 'uri',
  },
  {
    label: 'Server name',
    value: 'title',
  },
];
