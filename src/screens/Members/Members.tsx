import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sb_Member_Card from "../../components/Sb_Member_Card/Sb_Member_Card";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import './Members.css';

export default function Members () {
  let location = useLocation();
  let navigate = useNavigate();
  
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
  return (
    <>
      <Outlet/>
    </>
  )
}

export function Members_Landing () {
  let navigate = useNavigate();
  
  return (
  <Col className="">
    <Row className="mb-4">
      <Col>
        <Button onClick={() => navigate('add-member', { state:true })}><Sb_Text font={16} color='--lightGrey'>Add Member</Sb_Text></Button>
      </Col>
    </Row>
    <Row>
      <Col md="3">
        <Sb_Member_Card id="12" name="Abebe" onDelete={(id) => console.log(id)} onClick={(id) => navigate('edit-member/234', { state:true })}/>
      </Col>
    </Row>
  </Col>
  )
}