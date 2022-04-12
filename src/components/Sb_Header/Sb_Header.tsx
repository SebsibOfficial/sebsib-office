import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import Sb_Text from "../Sb_Text/Sb_Text";
import './Sb_Header.css';
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactChild, useContext } from "react";
import Sb_Notice from "../Sb_Notice/Sb_Notice";
import { NotifContext, NotifContextInterface, NotifInterface } from "../../states/NotifContext";

interface Props {
    header: string,
    children?: any,
    hideBackButton?: boolean,
    notif?: NotifInterface | null,
    onBackClick(): any,
}

const Sb_Header = (props:Props) => {
    var {hideBackButton = false, notif = null} = props;
    const {setNotification} = useContext(NotifContext) as NotifContextInterface;

    return(
        <Row className="sb-header g-0">
            <Row className="g-0" style={{'visibility': hideBackButton ? 'hidden' : 'visible'}}>
                <Col>
                    <FontAwesomeIcon 
                        icon={faLongArrowAltLeft}
                        style={{'cursor':'pointer'}}
                        className="sb-header-back-btn"
                        onClick={ !hideBackButton ? () => props.onBackClick() : () => null}
                    />
                </Col>
            </Row>
            <Row className="g-0">
                <Col className="d-flex align-items-center">
                    {props.children}
                    <Sb_Text font={48} weight={600}>{props.header}</Sb_Text>
                    <div style={{'position': 'absolute', 'right': '6em'}}>
                        {
                            notif != null ? <Sb_Notice id={notif.id} message={notif.message} clickClose={() => setNotification(null)} code={notif.code} type={notif.type}/> : ''
                        }
                    </div>
                </Col>
            </Row>
        </Row>                            
    )
}

export default Sb_Header;