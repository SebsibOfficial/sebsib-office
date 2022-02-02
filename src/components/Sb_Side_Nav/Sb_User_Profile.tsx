import { faCog, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sb_Text from "../Sb_Text/Sb_Text";
// import "./Sb_Side_Nav.css";

interface Props {
  username: string;
}

const Sb_User_Profile: React.FC<Props> = ({ username }) => {
  return (
    <Container className="userProfile mb-4 ps-4 align-items-center">
      <FontAwesomeIcon icon={faUserCircle} className=" icons me-3" />

      <Sb_Text font="light16" color="light">
        {username}
      </Sb_Text>

      <FontAwesomeIcon
        icon={faCog}
        className="align-top ms-5"
        style={{ cursor: "pointer" }}
      />
    </Container>
  );
};

export default Sb_User_Profile;
