import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sb_Card from '../Sb_Card/Sb_Card';
import Sb_Text from '../Sb_Text/Sb_Text';
import './Sb_Notice.css';

interface Props {
    id: number,
    message: string,
    type?: "OK" | "INFO" | "ERROR",
    code?: number,
    clickClose: Function
}

export default function Sb_Notice (props:Props) {
    var {type = "INFO"} = props;
    var icon = null; var classType = '';
    if (type === 'INFO') {
        icon = faInfoCircle;
        classType = 'sb-notice-info';
    }
    else if (type === 'OK'){
        icon = faCheckCircle;
        classType = 'sb-notice-check'
    }
    else {
        icon = faExclamationCircle;
        classType = 'sb-notice-error'
    }
        return (
        <Sb_Card>
            <div className='d-flex'>
                <FontAwesomeIcon icon={icon} className={'sb-notice-icon '+classType}/>                
                <Sb_Text font={16} weight={300}>{`${props.message} ${props.type === 'ERROR' ? "(" + props.code + ")" : ""}`}</Sb_Text>
                <FontAwesomeIcon className="sb-notice-close" icon={faTimes} onClick = {() => props.clickClose(props.id)}/>
            </div>
        </Sb_Card>
    )
}