import { useContext, useEffect, useReducer, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";
import Sb_List from "../../components/Sb_List/Sb_List";
import { actionType } from "../../components/Sb_List_Item/Sb_List_Item";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { useAuth } from "../../states/AuthContext";
import { NotifContext } from "../../states/NotifContext";
import { AddMember, EditMember, GetMember, GetMemberList, GetProjectList } from "../../utils/api";
import { decodeJWT } from "../../utils/helpers";

interface Props {
  pageType: "ADD" | "EDIT"
}

class AddMemberPayload {
  constructor (mfn: string,mln: string, mph: string, me: string, mp: string, pi: string[]){
    this.firstname = mfn;
    this.lastname = mln;
    this.phone = mph;
    this.email = me;
    this.password = mp;
    this.projectsId = pi;
  }
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  projectsId: string[];
}

type ProjectItem = {_id: string, name: string, defaultSelectValue?:"UNSELECTED" | "SELECTED"};

export default function Add_Modify_Member(props:Props) {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const {token, setAuthToken} = useAuth();
  const Notif = useContext(NotifContext);

  /*############# STATES ############### */
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberLastName, setMemberLastName] = useState("");
  const [memberFirstName, setMemberFirstName] = useState("");
  const [memberUsername, setMemberUsername] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [projectsInvolved, setProjectsInvolved] = useState<string[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [projIn, setProj] = useState(false);

  useEffect(() => {
    // Populate Project List
    GetProjectList(decodeJWT(token as string).org)
    .then(res => {
      if (res.code == 200) {
        var prj_arr = res.data;
        var arr:ProjectItem[] = [];
        prj_arr.forEach((project:any) => {
          arr.push({_id: project._id, name: project.name})
        })
        setProjects(arr);
      } else {
        console.log(res.code);
      }
    })
  },[])

  useEffect(() => {
    // Check if Projects are set
    if (projects.length != 0)
      setProj(true);
  }, [projects]);

  useEffect(() => {
  // Get the editable member data
  if (params.id != null && params.id != undefined){
    if (projIn){
    GetMember(params.id).then((res:any) => {
      if (res.code == 200){
        console.log(res.data);
        setMemberFirstName(res.data.firstName)
        setMemberLastName(res.data.lastName)
        setMemberPhone(res.data.phone)
        setMemberEmail(res.data.email);
        setProjectsInvolved(res.data.projectsId);
        var projectList = [...projects];
        projects.forEach((project:ProjectItem) => {
          var mem_prj_arr = res.data.projectsId as Array<string>;
          if (mem_prj_arr.includes(project._id))
            projectList.forEach(prj => { if (prj._id == project._id) prj.defaultSelectValue = 'SELECTED'})
        })
        setProjects(projectList);
      } else {
        console.info(res)
      }
      setPageLoading(false)
    })
  }
  }
  else setPageLoading(false);
  }, [projIn]);

  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);

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
//(mfn: string,mln: string, mph: string, me: string, mu: string, mp: string, pi: string[]){
  function saveAddButtonHandler () {
    setBtnLoading(true);
    if (props.pageType === 'ADD'){
      var payload = new AddMemberPayload(memberFirstName, memberLastName, memberPhone, memberEmail, memberPassword, projectsInvolved);
      AddMember(payload).then(res => {
        if (res.code == 200) {
          setBtnLoading(false);
          navigate('/dashboard/members', {state: {code: res.code, type: "OK", message: "Member Added", id:1}})
        } else {
          console.log(res.data);
          setBtnLoading(false);
          Notif?.setNotification({code: res.code, type: "ERROR", message: res.data.message, id:1})
        }
      })
    }
    else if (props.pageType === 'EDIT') {
      var payload = new AddMemberPayload(memberFirstName, memberLastName, memberPhone, memberEmail, memberPassword, projectsInvolved);
      EditMember(params.id as string, payload).then(res => {
        if (res.code == 200) {
          setBtnLoading(false);
          navigate('/dashboard/members', {state: {code: res.code, type: "OK", message: "Member Edited", id:1}})
        } else {
          console.log(res.data);
          setBtnLoading(false);
          Notif?.setNotification({code: res.code, type: "ERROR", message: res.data, id:1})
        }
      })
    }
  }

  return (
    pageLoading ? <Sb_Loader full/> :
    <Col>
      <Row className="mb-4">
      <Sb_Alert>Enter the enumrator name, email, username and the projects they will be involved in, then click 
        {props.pageType === 'ADD' ? <><b> Add Member</b> to create a new member</> : <><b> Save Changes</b> to save the new changes</>}   
      </Sb_Alert>
        <Col md="3" className="me-4">
					<Form.Group className="mb-3" controlId="AddMemberName">
						<Form.Label><Sb_Text font={16}>Member First Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name" value={memberFirstName} onChange={(e) => setMemberFirstName(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberName">
						<Form.Label><Sb_Text font={16}>Member Last Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name" value={memberLastName} onChange={(e) => setMemberLastName(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberName">
						<Form.Label><Sb_Text font={16}>Member Phone</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name" value={memberPhone} onChange={(e) => setMemberPhone(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberEmail">
						<Form.Label><Sb_Text font={16}>Email</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Email" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberPassword">
						<Form.Label><Sb_Text font={16}>Password</Sb_Text></Form.Label><br></br>
            <Form.Label><Sb_Text weight={300} font={12}>Do not forget this password, Copy it if you can</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Password" value={memberPassword} onChange={(e) => setMemberPassword(e.target.value)}/>
					</Form.Group>
        </Col>
        <Col md="4">
          <Sb_Text font={16} weight={500}><p>Projects Involved In</p></Sb_Text>
          <Sb_List 
					items={projects} 
					listType="PROJECT" compType='SELECT' onAction={(id, name, ac) => projectSelectHandler(id, ac)}/>
          <Button className="mt-3" size="sm" style={{'float':'right'}} onClick={() => saveAddButtonHandler()}>
            <Sb_Text font={12} color="--lightGrey">
              {
                btnLoading ? <Sb_Loader/> :<span>{props.pageType === 'ADD' ? 'Add Member' : 'Save Changes'}</span>
              }
            </Sb_Text>
          </Button>
        </Col>
      </Row>
    </Col>
  )
}