import { ReactChild, ReactChildren } from "react";
import { Button, Modal } from "react-bootstrap";
import Sb_Text from "../Sb_Text/Sb_Text";

interface Props {
  show: boolean,
  onHide: Function,
  width?: number,
  header?: string | boolean,
  children: ReactChild | ReactChildren | ReactChild [] | ReactChildren [] | boolean | boolean[]
}

export default function Sb_Modal (props:Props) {
  var {header = false, width = 50} = props;
  return (
    <div style={{'maxWidth':`${width}vw`}}>
    <Modal
        show={props.show}
        onHide={() => props.onHide()}
        dialogClassName={`modal-90w`}
        aria-labelledby="example-custom-modal-styling-title"
        centered
        contentClassName="w-75"
      >
        <Modal.Header style={{'display': header ? 'flex' : 'none'}} closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <Sb_Text font={24}>{header}</Sb_Text>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
      </Modal>
      </div>
  )
}