import { ReactChild, ReactChildren } from "react";
import { Alert } from "react-bootstrap";

interface Props {
    children: ReactChildren | ReactChild | ReactChildren[] | ReactChild[] | boolean | Element
}
function dismiss (id:string) {
    var el = document.getElementById(id);
    el?.classList.add('gtfo');
}

export default function Sb_Alert (props:Props) {
    var id = `al-${(Math.random()*100).toString().slice(4, 9)}`;
    var ac = localStorage.getItem('access_count') ?? '0';
    
    return (
        <>
        {(parseInt(ac as string) + 1) < 5 && <Alert id={id} className='sb-alert' style={{'fontSize':'12px','borderRadius':'0px'}} variant='dark' dismissible 
        onClick={() => dismiss(id)}>
            {props.children}
        </Alert>
        }
    </>
    )
}