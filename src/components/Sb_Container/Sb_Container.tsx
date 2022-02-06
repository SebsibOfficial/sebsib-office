import { ReactChild, ReactChildren } from 'react';
import './Sb_Container.css';

interface Props {
    className?: string,
    borderDir?: "horizontal" | "vertical",
    children: ReactChildren | ReactChild
}

export default function Sb_Container(props: Props) {
    var {borderDir = "vertical", className = "p-2"} = props;
    return (
        <div className={'sb-container ' + className +' '+ borderDir}>
            {props.children}
        </div>
    );
}
