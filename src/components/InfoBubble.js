import { Tooltip } from 'react-tooltip';
import './InfoBubble.scss';

export default function InfoBubble(props) {
  return (
    <span className={`info-bubble ${props.inline ? 'inline' : ''}`}>
      <div className="icon" id={props.id}>?</div>
      <Tooltip
        anchorSelect={`#${props.id}`}
        place="bottom"
        content={props.content}
      />
    </span>
  );
}
