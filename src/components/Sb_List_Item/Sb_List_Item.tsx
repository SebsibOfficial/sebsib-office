import { faArchive, faCheckCircle, faMinusSquare, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sb_Checkbox from '../Sb_Checkbox/Sb_Checkbox';
import Sb_Text from '../Sb_Text/Sb_Text';
import './Sb_List_Item.css';

type actionType = "REMOVE" | "SELECT-CHANGE";

interface Props {
    id: string,
    text: string,
    type: "MEMBER" | "PROJECT",
    actionType: actionType,
    onAction: (id:string, actionType:actionType) => void
}

export default function Sb_List_Item (props:Props) {
    if (props.actionType === 'REMOVE') {
        return (
            <div className='d-flex sb-list-item'>
                <div className='d-inline-flex align-items-center'>
                    <FontAwesomeIcon icon={props.type === 'MEMBER' ? faUserCircle : faArchive} 
                    style={{'fontSize':'1.3em', 'marginRight':'0.6em'}}/>
                    <Sb_Text font={16}>{props.text}</Sb_Text>
                </div>
                <FontAwesomeIcon icon={faMinusSquare} style={{'color': 'var(--DangerRed)','cursor':'pointer'}} 
                onClick={() => props.onAction(props.id, props.actionType)}/>
            </div>
        )
    }
    else if (props.actionType === 'SELECT-CHANGE') {
        // TODO: Send state change here
        return (
            <div className='d-flex sb-list-item list-select'>
                <div className='d-inline-flex align-items-center'>
                    <Sb_Checkbox onChange={() => props.onAction(props.id, props.actionType)}/> 
                    <FontAwesomeIcon icon={props.type === 'MEMBER' ? faUserCircle : faArchive} 
                    style={{'fontSize':'1.3em', 'marginRight':'0.6em'}}/>
                    <Sb_Text font={16}>{props.text}</Sb_Text>
                </div>
            </div>
        )
    }
    else return null;
}