import './ServerStats.scss';

export default function ServerStats(props) {
  if (!props.stats) {
    return null;
  }
  return (
    <ul className="server-stats">
      <li
        data-tooltip-id="status-tooltip"
        data-tooltip-content={`Instance connected to ${kFormat(
          props.stats.domain_count,
        )} other instances.`}
      >
        <svg
          fill="var(--color-text)"
          width=".9em"
          height=".9em"
          viewBox="0 -4 48 48"
        >
          <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM40.1,16H35.2a27.8,27.8,0,0,0-3-8A18.5,18.5,0,0,1,40.1,16ZM42,24a17.5,17.5,0,0,1-.5,4H35.8c.1-1.3.2-2.6.2-4s-.1-2.7-.2-4h5.7A17.5,17.5,0,0,1,42,24ZM6,24a17.5,17.5,0,0,1,.5-4h5.7c-.1,1.3-.2,2.6-.2,4s.1,2.7.2,4H6.5A17.5,17.5,0,0,1,6,24Zm10,0c0-1.4.1-2.7.2-4H22v8H16.2C16.1,26.7,16,25.4,16,24ZM26,6.7a11.7,11.7,0,0,1,3,3.7A21.7,21.7,0,0,1,31.1,16H26Zm-4,0V16H16.9A21.7,21.7,0,0,1,19,10.4,11.7,11.7,0,0,1,22,6.7ZM22,32v9.3a11.7,11.7,0,0,1-3-3.7A21.7,21.7,0,0,1,16.9,32Zm4,9.3V32h5.1A21.7,21.7,0,0,1,29,37.6,11.7,11.7,0,0,1,26,41.3ZM26,28V20h5.8c.1,1.3.2,2.6.2,4s-.1,2.7-.2,4ZM15.8,8a27.8,27.8,0,0,0-3,8H7.9A18.5,18.5,0,0,1,15.8,8ZM7.9,32h4.9a27.8,27.8,0,0,0,3,8A18.5,18.5,0,0,1,7.9,32Zm24.3,8a27.8,27.8,0,0,0,3-8h4.9A18.5,18.5,0,0,1,32.2,40Z" />
        </svg>
        <span className="visually-hidden">Peer count</span>{' '}
        {kFormat(props.stats.domain_count)}
      </li>
      <li
        data-tooltip-id="status-tooltip"
        data-tooltip-content={`Instance has ${kFormat(
          props.stats.status_count,
        )} status updates`}
      >
        <svg
          fill="var(--color-text)"
          width="1.8em"
          height="1.1em"
          viewBox="-10 -7 24 24"
        >
          <path d="M3.656 17.979A1 1 0 0 1 2 17.243V15a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8.003l-4.347 2.979zm.844-3.093a.536.536 0 0 0 .26-.069l2.355-1.638A1 1 0 0 1 7.686 13H12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5c0 .54.429.982 1 1 .41.016.707.083.844.226.128.134.135.36.156.79.003.063.003.177 0 .37a.5.5 0 0 0 .5.5zm11.5-4.87a7.136 7.136 0 0 0 0 .37v-.37c.02-.43.028-.656.156-.79.137-.143.434-.21.844-.226.571-.018 1-.46 1-1V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5V2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v2.243a1 1 0 0 1-1.656.736L16 13.743v-3.726z" />
        </svg>
        <span className="visually-hidden">Status count</span>{' '}
        {kFormat(props.stats.status_count)}
      </li>
      <li
        data-tooltip-id="status-tooltip"
        data-tooltip-content={`Instance has ${kFormat(
          props.stats.user_count,
        )} users.`}
      >
        <svg
          fill="var(--color-text)"
          width="1.5em"
          height="1.4em"
          viewBox="0 -5 24 24"
          stroke="#fffff"
        >
          <circle
            cx="9"
            cy="9"
            r="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M16 19C16 15.6863 12.866 13 9 13C5.13401 13 2 15.6863 2 19"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M15 13C17.2091 13 19 11.2091 19 9C19 6.79086 17.2091 5 15 5C13.8053 5 12.7329 5.52375 12 6.35418"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M22 19C22 15.6863 18.866 13 15 13C14.1928 13 12.897 12.7069 12 11.7655"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <span className="visually-hidden">User count</span>{' '}
        {kFormat(props.stats.user_count)}
      </li>
    </ul>
  );
}

function kFormat(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
}
