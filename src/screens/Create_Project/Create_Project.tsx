import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Sb_List from "../../components/Sb_List/Sb_List";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

export default function Create_Project () {
	let location = useLocation();
  let navigate = useNavigate();
  
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
	/*############# STATES ############### */
	const [projectname, setProjectname] = useState("");
	const [members, setMembers] = useState([]);

	/*------------- METHODS -------------- */
	function memberSelectHandler (id: string) {}

	function createProjectHandler () {}

	return (
		<Col>
			<Row className="mb-4" style={{'width':'30%'}}>
        <Col>
					<Form.Group className="mb-3" controlId="LoginEmail">
						<Form.Label><Sb_Text font={16}>Project Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name" onChange={(e) => setProjectname(e.target.value)}/>
					</Form.Group>
        </Col>
      </Row>
			<Row style={{'width':'30%'}}>
				<Col className="d-block">
					<Sb_Text font={16}>Enumerators</Sb_Text>
					<br />
					<Sb_List 
					items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }, {id:'2', text:'Minamin Chala', }, {id:'2', text:'Minamin Chala', }]} 
					listType="MEMBER" compType='SELECT' onAction={(id) => memberSelectHandler(id)}/>
					<Button size="sm" className="mt-3" onClick={() => createProjectHandler()}>
						<Sb_Text font={16} color="--lightGrey">Create Project</Sb_Text>
					</Button>
				</Col>
			</Row>
		</Col>
	)
}