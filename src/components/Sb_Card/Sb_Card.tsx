import { ReactChild, ReactChildren } from 'react';
import './Sb_Card.css';

interface Props {
    className?: string,
    borderRadius?: 10 | 5,
    children: ReactChildren | ReactChild
}

export default function Sb_Card(props:Props) {
    return (
        <div className={props.className + ' sb-card'} style={{'borderRadius':props.borderRadius}}>
            {props.children}
        </div>
    );
}