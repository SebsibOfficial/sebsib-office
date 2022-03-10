import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_List from "../../components/Sb_List/Sb_List";
import { actionType } from "../../components/Sb_List_Item/Sb_List_Item";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

interface Props {
  pageType: "ADD" | "EDIT"
}

class AddMemberPayload {
  constructor (mn: string, me: string, mu: string, mp: string, pi: string[]){
    this.memberName = mn;
    this.memberEmail = me;
    this.memberUsername = mu;
    this.memberPassword = mp;
    this.projectInvolved = pi;
  }
  memberName: string;
  memberEmail: string;
  memberUsername: string;
  memberPassword: string;
  projectInvolved: string[];
}

export default function Add_Modify_Member(props:Props) {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);

  /*############# STATES ############### */
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberUsername, setMemberUsername] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [projectsInvolved, setProjectsInvolved] = useState<string[]>([]);
  
  /*------------- METHODS -------------- */
  function projectSelectHandler (id: string, ac: actionType | undefined) {
    if (ac === 'SELECTED'){
      var pi = [...projectsInvolved];
      pi.push(id);
      setProjectsInvolved(pi);
    }
    else if (ac === 'UNSELECTED'){
      var pi = [...projectsInvolved];
      pi = pi.filter(projID => projID != id);
      setProjectsInvolved(pi);
    }
  }

  function saveAddButtonHandler () {
    if (props.pageType === 'ADD'){
      // Gather data
      var payload = new AddMemberPayload(memberName, memberEmail, memberUsername, memberPassword, projectsInvolved);
      // Send to API -> If successful
        navigate('/dashboard/members', {state: true})
    }
    else {

    }
  }

  return (
    <Col>
      <Row className="mb-4">
        <Col md="3" className="me-4">
					<Form.Group className="mb-3" controlId="AddMemberName">
						<Form.Label><Sb_Text font={16}>Member Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name" value={memberName} onChange={(e) => setMemberName(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberEmail">
						<Form.Label><Sb_Text font={16}>Email</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Email" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberUsername">
						<Form.Label><Sb_Text font={16}>Member Username</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name" value={memberUsername} onChange={(e) => setMemberUsername(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberPassword">
						<Form.Label><Sb_Text font={16}>Password</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Password" value={memberPassword} onChange={(e) => setMemberPassword(e.target.value)}/>
					</Form.Group>
        </Col>
        <Col md="4">
          <Sb_Text font={16} weight={500}><p>Projects Involved In</p></Sb_Text>
          <Sb_List 
					items={[{id:'1', text:'Agriculture In Gondar', }, {id:'2', text:'AIDS Prevalance', }, {id:'3', text:'Minamin Chala', }, {id:'4', text:'Minamin Chala', }]} 
					listType="PROJECT" compType='SELECT' onAction={(id, text, ac) => projectSelectHandler(id, ac)}/>
          <Button className="mt-3" size="sm" style={{'float':'right'}} onClick={() => saveAddButtonHandler()}>
            <Sb_Text font={12} color="--lightGrey">
              {props.pageType === 'ADD' ? 'Add Member' : 'Save Changes'}
            </Sb_Text>
          </Button>
        </Col>
      </Row>
    </Col>
  )
}