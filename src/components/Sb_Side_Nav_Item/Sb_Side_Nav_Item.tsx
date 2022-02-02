import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Sb_Text from "../Sb_Text/Sb_Text";
import "./Sb_Side_Nav_Item.css";

interface SideNavData {
  id: number;
  title: string;
  icon: IconProp;
  path: string | string[] ;
}

interface Props {
  navItemData: SideNavData;
  activeId: number;
}

const Sb_Side_Nav_Item: React.FC<Props> = ({ navItemData, activeId }) => {
  let color = "";
  activeId === navItemData.id
    ? (color = "sb-bg-dark")
    : (color = "bg-transparent");

  return (
    <Container fluid className={" navItemContainer " + color}>
      <Col className="iconCol py-3 align-items-center ">
        <FontAwesomeIcon icon={navItemData.icon} className="icon me-3" />
        <Sb_Text font="light16" className="text">
          {navItemData.title}
        </Sb_Text>
      </Col>
    </Container>
  );
};

export default Sb_Side_Nav_Item;
