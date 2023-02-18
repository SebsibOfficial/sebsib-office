import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faArchive, faFileInvoice, faGlobe, faMoneyBillWave, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sb_Text from '../Sb_Text/Sb_Text';
import './Sb_Main_Item.css';

interface Props {
    id:string,
    type: "PROJECT" | "SURVEY" | "REGULAR" | "ONLINE" | "INCENTIVIZED";
    text: string,
    onClick: (id:string) => void
}

export default function Sb_Main_Items (props:Props) {
  
  function iconDecide (type: string):IconProp {
    switch (type) {
      case "PROJECT":
        return faArchive
      case "SURVEY":
        return faFileInvoice
      case "REGULAR":
        return faFileInvoice
      case "ONLINE":
        return faGlobe
      case "INCETIVIZED":
        return faMoneyBillWave
      default:
        return faQuestionCircle
    }
  }
  
  return (
        <div className='sb-main-items' onClick={() => props.onClick(props.id)}>
            <FontAwesomeIcon icon={iconDecide(props.type)}
            style={{'display':'block', 'marginBottom':'0.3em', 'fontSize':'1.5em'}}/>
            <Sb_Text font={12} clamp={3}>{props.text}</Sb_Text>
        </div>
    )
}