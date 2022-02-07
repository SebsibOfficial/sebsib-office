import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* eslint-disable */
// @ts-ignore
import Checkbox from 'react-custom-checkbox';
/* eslint-enable */

interface Props {
    onChange:Function
}
// TODO: Implement select states here
export default function Sb_Checkbox (props:Props) {
    return (
        <Checkbox name="my-input" 
            checked={false} 
            style={{'marginRight':'0.5em'}} 
            borderColor="var(--secondary)"
            borderRadius={20}
            icon={<FontAwesomeIcon icon={faCheckCircle} color="var(--primary)" style={{fontSize:20}}/>}
            onChange={ () => props.onChange()}
        />
    )
}