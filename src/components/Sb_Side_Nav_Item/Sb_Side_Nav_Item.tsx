import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Sb_Text from "../Sb_Text/Sb_Text";
import "./Sb_Side_Nav_Item.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../states/AuthContext";

interface SideNavData {
  id: number;
  title: string;
  icon: IconProp;
  path: string;
}

interface Props {
  navItemData: SideNavData;
  active?: boolean;
}



const Sb_Side_Nav_Item: React.FC<Props> = (props:Props) => {
  var {active = false} = props;
  let color = "";
  active ? (color = "sb-bg-dark") : (color = "bg-transparent");
  let navigate = useNavigate();
  const Auth = useContext(AuthContext);

  function logoutHandler () {
    Auth.setAuthToken('');
    navigate(props.navItemData.path, { state: true });
  }

  return (
    <Container fluid className={" navItemContainer " + color} 
    onClick={() => props.navItemData.path == '/login' ? logoutHandler() : navigate(props.navItemData.path, { state: true })}>
      <Col className="iconCol p-2 align-items-center ">
        <FontAwesomeIcon icon={props.navItemData.icon} className="icon me-3" />
        <Sb_Text font={16} color="--lightGrey">
          {props.navItemData.title}
        </Sb_Text>
      </Col>
    </Container>
  );
};

export default Sb_Side_Nav_Item;
