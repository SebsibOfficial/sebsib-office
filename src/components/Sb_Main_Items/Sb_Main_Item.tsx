import { faArchive, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sb_Text from '../Sb_Text/Sb_Text';
import './Sb_Main_Item.css';

interface Props {
    id:string,
    type: "PROJECT" | "SURVEY";
    text: string,
    onClick: (id:string) => void
}

export default function Sb_Main_Items (props:Props) {
    return (
        <div className='sb-main-items' onClick={() => props.onClick(props.id)}>
            <FontAwesomeIcon icon={props.type === 'PROJECT' ? faArchive : faFileInvoice}
            style={{'display':'block', 'marginBottom':'0.3em', 'fontSize':'1.5em'}}/>
            <Sb_Text font={12} clamp={3}>{props.text}</Sb_Text>
        </div>
    )
}