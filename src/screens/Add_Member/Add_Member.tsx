import { Button, Col, Form, Row } from "react-bootstrap";
import Sb_List from "../../components/Sb_List/Sb_List";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

interface Props {
  pageType: "ADD" | "MODIF"
}

export default function Add_Modify_Member(props:Props) {
  return (
    <Col>
      <Row className="mb-4">
        <Col md="3" className="me-4">
					<Form.Group className="mb-3" controlId="AddMemberName">
						<Form.Label><Sb_Text font={16}>Member Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name"/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberEmail">
						<Form.Label><Sb_Text font={16}>Email</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Email"/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberUsername">
						<Form.Label><Sb_Text font={16}>Member Username</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name"/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberPassword">
						<Form.Label><Sb_Text font={16}>Password</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Password"/>
					</Form.Group>
        </Col>
        <Col md="4">
          <Sb_Text font={16} weight={500}><p>Projects Involved In</p></Sb_Text>
          <Sb_List 
					items={[{id:'1', text:'Agriculture In Gondar', }, {id:'2', text:'AIDS Prevalance', }, {id:'3', text:'Minamin Chala', }, {id:'2', text:'Minamin Chala', }]} 
					listType="PROJECT" compType='SELECT' onAction={(id, ac) => console.log(id+" CLICKED "+ac)}/>
          <Button className="mt-3" size="sm" style={{'float':'right'}}><Sb_Text font={12} color="--lightGrey">
            {props.pageType === 'ADD' ? 'Add Member' : 'Save Changes'}
            </Sb_Text>
          </Button>
        </Col>
      </Row>
    </Col>
  )
}