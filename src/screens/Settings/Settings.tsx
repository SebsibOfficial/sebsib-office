import { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Sb_Container from "../../components/Sb_Container/Sb_Container";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

export default function Settings () {
  let location = useLocation();
  let navigate = useNavigate();
  
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
  return (
    <Col md="5">
      <Sb_Text font={16} weight={500}>Credentials</Sb_Text>
      <Sb_Container className="p-3 mt-2 mb-2">
        <div style={{'width':'70%'}}>
          <Form.Group className="mb-3" controlId="AddMemberUsername">
						<Form.Label><Sb_Text font={16}>Organization Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Your Organization Name"/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberUsername">
						<Form.Label><Sb_Text font={16}>Email</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Your Email"/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberPassword">
						<Form.Label><Sb_Text font={16}>Old Password</Sb_Text></Form.Label>
						<Form.Control size="sm" type="password" placeholder="Password"/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberPassword">
						<Form.Label><Sb_Text font={16}>New Password</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Password"/>
					</Form.Group>
        </div>
      </Sb_Container>
      <Sb_Text font={16} weight={500}>General Settings</Sb_Text>
      <Sb_Container className="p-3 mt-2 mb-3">
        <div style={{'width':'70%'}}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Select"><Sb_Text font={16}>Language</Sb_Text></Form.Label>
            <Form.Select size="sm" id="Select">
              <option>English</option>
            </Form.Select>
          </Form.Group>
        </div>
      </Sb_Container>
      <Button size="sm" style={{'float':'right'}}><Sb_Text font={12} color="--lightGrey">Save Changes</Sb_Text></Button>
    </Col>
  )
}