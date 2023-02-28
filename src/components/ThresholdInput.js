import { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import './ThresholdInput.scss';

export default function ThresholdInput(props) {
  const { currentMinTootThreshold, action, maxValue } = props;
  const [threshold, setThreshold] = useState(currentMinTootThreshold);
  useEffect(() => {
    setThreshold(currentMinTootThreshold);
  }, [currentMinTootThreshold]);

  const step = threshold < 500 ? 1 : Math.log(threshold).toFixed(0);
  return (
    <div className="threshold-input">
      <DebounceInput
        name="threshold"
        className="threshold-input--value"
        value={threshold}
        onChange={(e) => action(e)}
        debounceTimeout={300}
        style={{ width: `${maxValue.toString().length / 2 + 1}em` }}
      />
      <input
        name="threshold"
        type="range"
        min="0"
        max={maxValue}
        // step={threshold < 500 ? 1 : 50}
        step={step}
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        onKeyUpCapture={(e) => action(e)}
        onMouseUp={(e) => action(e)}
      />
    </div>
  );
}
