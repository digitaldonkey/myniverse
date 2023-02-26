import '../components/Trends.scss';
import Trend from './Trend';

export default function Trends(props) {
  const { trends, minTootThreshold } = props;

  if (!Array.isArray(trends) || !trends.length) {
    return null;
  }

  const orderedTrends = [...trends].sort((t1, t2) => {
    // Reorder by today's max uses.
    return parseInt(t2.history[0].uses) - parseInt(t1.history[0].uses);
  });

  if (orderedTrends.length) {
    return (
      <div className="trends">
        {orderedTrends.map((trend, i) => {
          const data = [];
          let dataMaxValue = 0;

          // console.log({uses: trend.history[0].uses, minTootThreshold, bool: trend.history[0].uses >= minTootThreshold})
          // get the y-axis max value.
          trend.history.forEach((day) => {
            dataMaxValue = Math.max(dataMaxValue, day.uses);
          });

          // Alternative parseInt(trend.history[0].uses) makes new days weird
          if (dataMaxValue >= minTootThreshold) {
            trend.history.forEach((day) => {
              // Prepare LineChart Data.
              const date = new Date(day.day * 1000);
              const now = new Date();
              const daysAgo = parseInt(
                (now.getTime() - date.getTime()) / (1000 * 3600 * 24),
              );
              data.push({
                xLabel: daysAgo > 0 ? `${daysAgo} days ago` : 'Today',
                date: date.toLocaleDateString('en-US'),
                sharingAccounts: day.accounts,
                shares: day.uses,
              });
            });

            return (
              <Trend
                key={trend.name}
                trend={trend}
                data={data.reverse()}
                dataMaxValue={dataMaxValue}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
}
