import './InfoBubbleIcon.scss';

export default function InfoBubbleIcon(props) {
  return (
    <div className={`info-bubble-icon ${props.className ? props.className : ''}` } id={props.id ? props.id : null} >
      ?
    </div>
  );
}
