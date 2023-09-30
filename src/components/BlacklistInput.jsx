import { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

export default function BlacklistInput(props) {
  const { blacklist, action } = props;

  const [currentVal, setCurrentVal] = useState(blacklist);
  useEffect(() => {
    setCurrentVal([...blacklist]);
  }, [blacklist]);

  const valString = currentVal.join('\n');
  const valLength = currentVal.length + 1;
  const processInput = (e) => {
    const values = e.target.value.split('\n');
    const blackList = values.filter((l, index, self) => {
      const line = l.toLowerCase().trim();
      // Clean empty lines.
      if (!line.length > 0) {
        return null;
      }
      // Clean duplicate lines.
      // const isDuplicate = !(self.indexOf(l) === index);
      if (!(self.indexOf(line) === index)) {
        return null;
      }
      return line;
    });
    setCurrentVal(blacklist);
    return action(blackList);
  };

  return (
    <div className="blacklist-input">
      <DebounceInput
        element="textarea"
        spellCheck="false"
        autoComplete="off"
        pattern="([0-9][A-Z][a-z:/\?&\n])"
        cols="50"
        rows={valLength}
        name="blacklist-input"
        className="blacklist-input--value"
        value={valString}
        onChange={(e) => processInput(e)}
        debounceTimeout={1000}
      />
      <div>
        <small>One entry per line.</small>
      </div>
    </div>
  );
}
