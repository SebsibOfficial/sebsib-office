import React from "react";
import './Sb_Text.css';

export default function Sb_Text(props:any){
    return <p className = {'hv ' + props.font + " " + props.color + " " + props.align + " " + props.clamp}> 
        {props.children} 
    </p>
}