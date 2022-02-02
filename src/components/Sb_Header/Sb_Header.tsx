import { Col, Row } from "react-bootstrap";
import Sb_Text from "../Sb_Text/Sb_Text";
import './Sb_Header.css';

interface Props {
    header?:string, // The Header text
    bc_only?:boolean, // Only show BreadCrumb
    visible?:boolean, // BreadCrumb visibility
    limit?:number // The number of BreadCrumb links to be seen
}

const Sb_Header = (props:Props) => {
    return(
        <Row className="sb-header g-0" style={{display: props.bc_only ? 'none' : 'inherit'}}>
            <Col>
                <Sb_Text font="c-bold48" align="left">{props.header}</Sb_Text>
            </Col>
        </Row>                            
    )
}

export default Sb_Header;