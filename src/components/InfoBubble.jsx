import { Tooltip } from 'react-tooltip';
import InfoBubbleIcon from "./InfoBubbleIcon";

export default function InfoBubble(props) {
  return (
    <span className={`info-bubble ${props.inline ? 'inline' : ''}`}>
      <InfoBubbleIcon id={props.id} />
      <Tooltip
        anchorSelect={`#${props.id}`}
        place="bottom"
        content={props.content}
      />
    </span>
  );
}
