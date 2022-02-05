import { faCog, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {Container} from "react-bootstrap";
import Sb_Text from "../Sb_Text/Sb_Text";

interface Props {
  username: string;
}

const Sb_User_Profile: React.FC<Props> = ({ username }:Props) => {
  return (
    <Container className="userProfile mb-4 ps-4 align-items-center">
      <FontAwesomeIcon icon={faUserCircle} style={{'bottom': 0, 'paddingBottom': 0, 'marginRight': '1rem', 'fontSize': '1.4em'}} />
      <div className="d-flex" style={{'alignItems': 'center', 'width': '70%', 'justifyContent': 'space-between'}}>
        <Sb_Text font={16} color="--lightGrey">
          {username}
        </Sb_Text>
        <FontAwesomeIcon
          icon={faCog}
          className = "setting-icon"
          style={{ cursor: "pointer" }}
        />
      </div>
    </Container>
  );
};

export default Sb_User_Profile;
