import { faCog, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sb_Text from "../Sb_Text/Sb_Text";

interface Props {
  username: string;
  role?: string
}

const Sb_User_Profile: React.FC<Props> = ({ username, role }:Props) => {
  let navigate = useNavigate();

  return (
    <Container className="userProfile mb-4 ps-4 align-items-center">
      <FontAwesomeIcon icon={faUserCircle} style={{'bottom': 0, 'paddingBottom': 0, 'marginRight': '1rem', 'fontSize': '1em'}} />
      <div className="d-flex" style={{'alignItems': 'center', 'width': '70%', 'justifyContent': 'space-between', 'wordBreak':'break-all', 'whiteSpace':'pre'}}>
        <Sb_Text font={12} color="--lightGrey">
          {username}
        </Sb_Text>
        {
          role !== "VIEWER" && 
          <FontAwesomeIcon
            icon={faCog}
            className = "setting-icon"
            style={{ cursor: "pointer" }}
            onClick={() => navigate('/dashboard/settings', { state: true})}
          />
        }
        
      </div>
    </Container>
  );
};

export default Sb_User_Profile;
