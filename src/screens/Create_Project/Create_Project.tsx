import { Button, Col, Form, Row } from "react-bootstrap";
import Sb_List from "../../components/Sb_List/Sb_List";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

export default function Create_Project () {
	return (
		<Col>
			<Row className="mb-4" style={{'width':'30%'}}>
        <Col>
					<Form.Group className="mb-3" controlId="LoginEmail">
						<Form.Label><Sb_Text font={16}>Project Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name"/>
					</Form.Group>
        </Col>
      </Row>
			<Row style={{'width':'30%'}}>
				<Col className="d-block">
					<Sb_Text font={16}>Enumerators</Sb_Text>
					<br />
					<Sb_List 
					items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }, {id:'2', text:'Minamin Chala', }, {id:'2', text:'Minamin Chala', }]} 
					listType="MEMBER" compType='SELECT' onAction={(id, ac) => console.log(id+" CLICKED "+ac)}/>
					<Button size="sm" className="mt-3"><Sb_Text font={16} color="--lightGrey">Create Project</Sb_Text></Button>
				</Col>
			</Row>
		</Col>
	)
}