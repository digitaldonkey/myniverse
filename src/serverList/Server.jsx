import { useDispatch } from 'react-redux';
import ServerStats from '../components/ServerStats';
import {
  addPeerInstances,
  deleteServer,
  forceUpdateInstanceInfo,
  getServerTrends,
  updateServerUri
} from "../redux/myniverse";
import './Server.scss';
import { getStatusIcon } from "./ServerStatus";
import ServerTrends from './ServerTrends';
import InfoBubbleIcon from "../components/InfoBubbleIcon";

export default function Server(props) {
  const { url, instance, status, error } = props.server;
  const dispatch = useDispatch();
  return (
    <article className="server" key={url}>
      <div className={`server-status server-status--${status}`}>
        {getStatusIcon(status)}
      </div>

      {status === 'no-trends' && (
        <div className="no-trends">No public trends API</div>
      )}

      {status === 'disabled' && (
        <div className="disabled">
          Server did not match peering requirements.
        </div>
      )}

      {instance && (
        <div className="server-info">
          <div className="server-info--details">
            <img
              className="server-thumbnail"
              src={instance.thumbnail}
              alt="Server thumbnail"
            />
            <div className="server-info--data">
              <h3>
                {instance.title} (<code>{instance.uri})</code>
              </h3>
              {/*https://stackoverflow.com/questions/822452/strip-html-from-text-javascript*/}
              <div className="server-description">
                {instance.short_description}
              </div>
              <ServerStats stats={instance.stats} />
            </div>
          </div>
          <div className="filter">

            <button
              className="button primary"
              onClick={() => {
                dispatch(getServerTrends(props.server));
              }}
            >
              {status === 'disabled'
                ? `Activate and add trends`
                : `Update trends`}
            </button>
            <InfoBubbleIcon className="button-update-trends" />
          </div>
          <div className="filter">
            <button
              className="button"
              onClick={() => {
                dispatch(addPeerInstances(url));
              }}
            >
              Add peers
            </button>
            <InfoBubbleIcon className="button-add-peers" />
          </div>

          {props.server.trends && <ServerTrends server={props.server} />}
        </div>
      )}

      {status === 'unreachable' && (
        <div className="is-unreachable">
          <h3>Unreachable</h3>
          <small>Is {url} a Mastodon server?</small>
          <form
            className="update-server-url"
            onSubmit={(event) => {
              event.preventDefault();
              const newUrl = event.currentTarget.childNodes[1].value;
              if (newUrl !== url) {
                dispatch(updateServerUri(url, newUrl));
              }
              event.currentTarget.childNodes[1].value = url;
            }}
          >
            <input className="oldUrl" type="hidden" value={url} />
            <input
              className="newUrl"
              defaultValue={url}
              type="url"
              pattern="https://.*"
              required="required"
            />
            <button>Update Url</button>
            <button
              className="primary button-force-update-instance"
              onClick={() => {
                dispatch(forceUpdateInstanceInfo(props.server));
              }}
            >
              Retry
            </button>
            <button
              onClick={() => {
                dispatch(deleteServer({ url }));
              }}
            >
              Delete
            </button>
          </form>
        </div>
      )}

      {status === 'new' && (
        <div className="is-new">
          <h3>No data yet</h3>
          <small>for {url}</small>

          <div>
            <button
              className="button button-force-update-instance"
              onClick={() => {
                dispatch(forceUpdateInstanceInfo(props.server));
              }}
            >
              Update this instance
            </button>
          </div>

        </div>
      )}
      {status === 'error' && (
        <div className="has-error">
          <h3>Error</h3>
          <small>for {url}</small>
          <div>
            <small>{error}</small>
          </div>
        </div>
      )}
    </article>
  );
}
