import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getCurrentColorPalette } from '../Colors';
import { makeArray } from '../redux/myniverse';
import './Trend.scss';

export default function Trend(props) {
  const { trend, data, dataMaxValue } = props;
  const palette = getCurrentColorPalette();
  let urls = trend.urls ? makeArray(trend.urls) : [];

  return (
    <div className="trend" key={trend.name}>
      <h3>#{trend.name}</h3>
      <ResponsiveContainer>
        <LineChart width={320} height={180} data={data}>
          <Legend verticalAlign="bottom" height={10} />
          <CartesianGrid stroke={palette.stats.grid} strokeDasharray="2 2" />
          <XAxis allowDataOverflow={false} dataKey="xLabel" />
          <YAxis type="number" domain={[0, dataMaxValue]} orientation="right" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            name="Toots"
            type="curveMonotoneX"
            dataKey="shares"
            stroke={palette.stats.trots}
          />
          <Line
            name="Tooting users"
            type="curveMonotoneXx"
            dataKey="sharingAccounts"
            stroke={palette.stats.users}
          />
        </LineChart>
      </ResponsiveContainer>
      {trend.url && (
        <ul className="trend-urls">
          <li className="trend-url">
            <a href={trend.url} target="_blank" rel="noreferrer">
              {trend.url.replace(/(^\w+:|^)\/\//, '')}
            </a>
          </li>
        </ul>
      )}
      {trend.urls && (
        <ul className="trend-urls">
          {urls.reverse().map((t, i) => (
            <li key={t.url} className="trend-url">
              <a href={t.url} target="_blank" rel="noreferrer">
                {t.url.replace(/(^\w+:|^)\/\//, '')}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // console.log({active, payload, label})
    return (
      <div
        className="tooltip"
        style={{
          fontSize: 'small',
          background: 'var(--background-color)',
          border: '1px solid var(--color-text)',
          padding: '.1em .3em',
          borderRadius: '.2em',
        }}
      >
        <div className="tooltipLabel">{`${label}`}</div>
        <div
          style={{ color: 'var(--color-stats-troots)' }}
        >{`${payload[0].value} Toots`}</div>
        <div
          style={{ color: 'var(--color-stats-users)' }}
        >{`by ${payload[1].value} Users`}</div>
      </div>
    );
  }
  return null;
};
