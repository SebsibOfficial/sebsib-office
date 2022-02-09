import { ReactChild, ReactChildren } from 'react';
import './Sb_Container.css';

interface Props {
    className?: string,
    borderDir?: "HORIZONTAL" | "VERTICAL",
    thin?: boolean,
    color?: "DARK" | "PURPLE",
    children: ReactChildren | ReactChild
}

export default function Sb_Container(props: Props) {
    var {borderDir = "VERTICAL", className = "p-2", color = "PURPLE"} = props;
    var thickness = 'THICK';
    if (props.thin) thickness = 'THIN';
    return (
        <div className={'sb-container ' + className +' '+ borderDir+'-'+thickness+' '+color}>
            {props.children}
        </div>
    );
}
