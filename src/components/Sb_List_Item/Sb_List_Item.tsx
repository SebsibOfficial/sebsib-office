import { faArchive, faCheckCircle, faMinusSquare, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sb_Checkbox from '../Sb_Checkbox/Sb_Checkbox';
import Sb_Text from '../Sb_Text/Sb_Text';
import './Sb_List_Item.css';

export type actionType = "REMOVE" | "UNSELECTED" | "SELECTED";
export type compType = "SELECT" | "REMOVE";

export interface Props {
    id: string,
    text: string,
    type: "MEMBER" | "PROJECT",
    compType: compType,
    defaultSelectValue?: "UNSELECTED" | "SELECTED" | undefined,
    onAction: (id:string, actionType:actionType) => void
}

export default function Sb_List_Item (props:Props) {
    var {defaultSelectValue = "UNSELECTED"} = props;
    if (defaultSelectValue === undefined) defaultSelectValue = "UNSELECTED";
    if (props.compType === 'REMOVE') {
        return (
            <div className='d-flex sb-list-item list-remove'>
                <div className='d-inline-flex align-items-center'>
                    <FontAwesomeIcon icon={props.type === 'MEMBER' ? faUserCircle : faArchive} 
                    style={{'fontSize':'1.3em', 'marginRight':'0.6em'}}/>
                    <Sb_Text font={16}>{props.text}</Sb_Text>
                </div>
                <FontAwesomeIcon icon={faMinusSquare} style={{'color': 'var(--DangerRed)','cursor':'pointer'}} 
                onClick={() => props.onAction(props.id, "REMOVE")}/>
            </div>
        )
    }
    else if (props.compType === 'SELECT' ) {
        return (
            <div className='d-flex sb-list-item list-select'>
                <div className='d-inline-flex align-items-center'>
                    {/* There is something confusing in this component, it is returning the opposite. So i adapted. */}
                    <Sb_Checkbox default={defaultSelectValue} onChange={(checkState:boolean) => props.onAction(props.id, checkState ? 'UNSELECTED' : 'SELECTED')}/> 
                    <FontAwesomeIcon icon={props.type === 'MEMBER' ? faUserCircle : faArchive} 
                    style={{'fontSize':'1.3em', 'marginRight':'0.6em'}}/>
                    <Sb_Text font={16}>{props.text}</Sb_Text>
                </div>
            </div>
        )
    }
    else return null;
}