import { useEffect, useState } from "react";
import './Sb_Checkbox_V2.css'

interface Props {
  checked: boolean,
  disabled?: boolean,
  onCheckAction:Function
}

const Checkbox = (props:Props) => {
  const defaultChecked = props.checked ? props.checked : false;
  const disabled = props.disabled ? props.disabled : false;
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

  return (
    <div className="checkbox-wrapper">
      <label>
        <input disabled={disabled} type="checkbox" checked={props.checked} onChange = {(e:any) => {props.onCheckAction(isChecked); setIsChecked((prev) => !prev); }}/>
      </label>
      {console.log(isChecked ? "Selected" : "Unchecked")}
      
    </div>
  );
};
export default Checkbox;