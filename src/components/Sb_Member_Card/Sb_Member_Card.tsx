import { faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { propTypes } from 'react-bootstrap/esm/Image';
import Sb_Text from '../Sb_Text/Sb_Text';
import './Sb_Member_Card.css';

interface Props {
    id: string,
    name:string,
    onDelete: (id:string) => void
}

export default function Sb_Member_Card (props:Props) {
    return (
        <div className='d-flex sb-member-card'>
            <div className='d-inline-flex align-items-center'>
                <FontAwesomeIcon icon={faUserCircle} 
                style={{'fontSize':'1.3em', 'marginRight':'0.6em'}}/>
                <Sb_Text font={16}>{props.name}</Sb_Text>
            </div>
            <FontAwesomeIcon icon={faTrash} style={{'fontSize':'1em', 'color':'var(--DangerRed)', 'cursor':'pointer'}}
            onClick={() => props.onDelete(props.id)}/>
        </div>
    )
}