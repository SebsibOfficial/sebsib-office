import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import Sb_Text from "../Sb_Text/Sb_Text";
import './Sb_Header.css';
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
    header: string,
    onBackClick(): any,
}

const Sb_Header = (props:Props) => {
    return(
        <Row className="sb-header g-0">
            <Row className="g-0">
                <Col>
                    <FontAwesomeIcon 
                        icon={faLongArrowAltLeft} 
                        className="sb-header-back-btn"
                        onClick={() => props.onBackClick()}
                    />
                </Col>
            </Row>
            <Row className="g-0">
                <Col>
                    <Sb_Text font={48} weight={600}>{props.header}</Sb_Text>
                </Col>
            </Row>
        </Row>                            
    )
}

export default Sb_Header;