import pLimit from 'p-limit';

export function fetchInstanceData(url, dataType) {
  if (!window.pLimit) {
    window.pLimit = pLimit(50);
  }
  console.info('fetchInstanceData', { url, dataType });
  const API = {
    instance: '/api/v1/instance',
    trends: '/api/v1/trends/tags?limit=20',
    peers: '/api/v1/instance/peers',
    // api/v1/instance/activity
    //   Server Activity diagram?
    //   e.g. https://mastodon.social/api/v1/instance/activity
  };

  return window
    .pLimit(() => fetch(url + API[dataType], { mode: 'cors' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw Error(`Response code != 2xx but ${response.status}`);
      }
    })
    .then((data) => {
      const ret = {
        url: url,
        status: 'active',
        lastUpdate: new Date().valueOf(),
      };
      ret[dataType] = data;
      console.info('fetch (' + url + API[dataType] + ') ', ret);
      return ret;
    })
    .catch((error) => {
      // Fetch failed. Domain not reachable !
      // Also includes a strange, temporarily net::ERR_HTTP2_PROTOCOL_ERROR 200
      // I noticed and probably other JS-inaccessible net::XX errors.
      if (error.message === 'Failed to fetch') {
        if (window.navigator.onLine) {
          console.info('fetch (' + url + API[dataType] + ') ', {
            url: url,
            status: 'unreachable',
          });
          return { url: url, status: 'unreachable' };
        }
        else {
          console.info(`Could not fetch ${url}. Browser offline.`);
        }
      }
      else {
        return {
          url: url,
          status: 'error',
          error: `${error.name} ${error.message}`,
        };
      }
    });
}
