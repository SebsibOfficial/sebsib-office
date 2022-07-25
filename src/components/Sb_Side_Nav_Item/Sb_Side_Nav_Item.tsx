import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Sb_Text from "../Sb_Text/Sb_Text";
import "./Sb_Side_Nav_Item.css";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../../states/AuthContext";
import { useCritical } from "../../states/CriticalContext";
import Sb_Modal from "../Sb_Modal/Sb_Modal";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
  const {token, setAuthToken} = useAuth();
  const {page, setCriticalpage} = useCritical();
  const [modalState, setModalState] = useState(false);
  
  function logoutHandler () {
    setAuthToken('');
    navigate(props.navItemData.path, { state: true });
  }

  function checkCritcal () {
    if (page != ''){
      setModalState(true);
      return 0;
    }
    props.navItemData.path == '/login' ? logoutHandler() : navigate(props.navItemData.path, { state: true })
  }

  return (
    <>
    <Container fluid className={" navItemContainer " + color} 
    onClick={() => checkCritcal()}>
      <Col className="iconCol p-2 align-items-center ">
        <FontAwesomeIcon icon={props.navItemData.icon} className="icon me-3" />
        <Sb_Text font={16} color="--lightGrey">
          {props.navItemData.title}
        </Sb_Text>
      </Col>
    </Container>
    {/* --------------------- Modal ---------------------------------------------------- */}
    <Sb_Modal show={modalState} onHide={() => setModalState(false)} 
     width={30}>
      <>          
          <div className="d-block text-center" style={{'fontSize':'4em'}}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            {page == 'CREATE_SURVEY' && <Sb_Text font={20} weight={500} align="center">Are you sure you want to leave this page? Your survey will be lost.</Sb_Text>}
          </div>
          <div>
            <Button variant="primary" size="sm" className="mt-3 float-start" 
            onClick={() => {setModalState(false); props.navItemData.path == '/login' ? logoutHandler() : navigate(props.navItemData.path, { state: true });setCriticalpage('');}}>
              <Sb_Text font={16} color="--lightGrey">Leave</Sb_Text>
            </Button>
            <Button variant="secondary" size="sm" className="mt-3 float-end"  onClick={() => setModalState(false)}>
              <Sb_Text font={16} color="--lightGrey">Cancel</Sb_Text>
            </Button>
          </div>
      </>
      
    </Sb_Modal>
    </>
  );
};

export default Sb_Side_Nav_Item;
