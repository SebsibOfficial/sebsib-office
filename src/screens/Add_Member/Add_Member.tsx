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
import { AddMember, EditMember, GetMember, GetMemberList, GetProjectList, GetSurveyListByOrg_PIVOT } from "../../utils/api";
import { decodeJWT, translateIds } from "../../utils/helpers";
import validator from "validator";

interface Props {
  pageType: "ADD" | "EDIT"
}

class AddMemberPayload {
  constructor (mfn: string,mln: string, mph: string, rid: string, me: string, mp: string, pi: string[], stv: string[]){
    this.firstname = mfn;
    this.lastname = mln;
    this.phone = mph;
    this.role = rid;
    this.email = me;
    this.password = mp;
    this.projectsId = pi;
    this.surveysToView = stv;
  }
  firstname: string;
  lastname: string;
  phone: string;
  role: string;
  email: string;
  password: string;
  projectsId: string[];
  surveysToView: string[];
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
  const [memberRole, setMemberRole] = useState("MEMBER");
  const [memberUsername, setMemberUsername] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [projectsInvolved, setProjectsInvolved] = useState<string[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [surveys, setSurveys] = useState<ProjectItem[]>([]);
  const [surveysToView, setSurveysToView] = useState<string[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [projIn, setProj] = useState(false);
  const [survtoView, setSurvToView] = useState(false);

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

    // Populate Survey List
    GetSurveyListByOrg_PIVOT(decodeJWT(token as string).org)
    .then(res => {
      if (res.code == 200) {
        var srvs = res.data;
        var arr:ProjectItem[] = [];
        srvs.forEach((srv:any) => {
          arr.push({_id: srv.id, name: srv.name})
        })
        setSurveys(arr);
      } else {
        console.log(res.code);
      }
    })
  },[])

  useEffect(() => {
    // Check if Projects are set
    if (projects.length != 0)
      setProj(true);
    if (surveys.length != 0)
      setSurvToView(true);
  }, [projects, surveys]);

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
        setMemberRole(translateIds("ID",res.data.roleId) as string)
        setMemberEmail(res.data.email);
        setProjectsInvolved(res.data.projectsId);
        // Set Value for Projects
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

  if (survtoView) {
    GetMember(params.id).then((res:any) => {
      if (res.code == 200){
        console.log(res.data);
        setMemberFirstName(res.data.firstName)
        setMemberLastName(res.data.lastName)
        setMemberPhone(res.data.phone)
        setMemberRole(translateIds("ID",res.data.roleId) as string)
        setMemberEmail(res.data.email);
        setSurveysToView(res.data.toView)
        // Set value for Survey
        var surveyList = [...surveys];
        surveys.forEach((survey:ProjectItem) => {
          var mem_srv_arr = res.data.toView as Array<string>;
          if (mem_srv_arr.includes(survey._id))
            surveyList.forEach(srv => { if (srv._id == survey._id) srv.defaultSelectValue = 'SELECTED'})
        })
        setSurveys(surveyList);
      } else {
        console.info(res)
      }
      setPageLoading(false)
    })
  }
  }
  else setPageLoading(false);
  }, [projIn, survtoView]);

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

  function surveySelectHandler (id: string, ac: actionType | undefined) {
    if (ac === 'SELECTED'){
      var stv = [...surveysToView];
      stv.push(id);
      setSurveysToView(stv);
    }
    else if (ac === 'UNSELECTED'){
      var stv = [...surveysToView];
      stv = stv.filter(survID => survID != id);
      setSurveysToView(stv);
    }
  }

  function validateInput ():boolean {
    if (!validator.isEmail(memberEmail)) return false
    return true
  }

  function saveAddButtonHandler () {
    setBtnLoading(true);
    if (props.pageType === 'ADD'){
      var payload:AddMemberPayload;
      if (memberRole == "MEMBER")
        payload = new AddMemberPayload(memberFirstName, memberLastName, memberPhone, memberRole, memberEmail, memberPassword, projectsInvolved, []);
      else if (memberRole == "ANALYST")
        payload = new AddMemberPayload(memberFirstName, memberLastName, memberPhone, memberRole, memberEmail, memberPassword, [], []);
      else
        payload = new AddMemberPayload(memberFirstName, memberLastName, memberPhone, memberRole, memberEmail, memberPassword, [], surveysToView);

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
      var payload = new AddMemberPayload(memberFirstName, memberLastName, memberPhone, memberRole, memberEmail, memberPassword, projectsInvolved, surveysToView);
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
      <Sb_Alert>Enter the name, email, username of the members. Select the projects Enumerators will be involved in or Select the surveys the viewer can view, then click 
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
						<Form.Control size="sm" type="text" placeholder="Phone" value={memberPhone} onChange={(e) => setMemberPhone(e.target.value)}/>
					</Form.Group>
          {
             props.pageType == 'ADD' ? 
             <>
              <Form.Group className="mb-3" controlId="AddMemberName">
                <Form.Label><Sb_Text font={16}>Member Role</Sb_Text></Form.Label>
                <Form.Select size="sm"
                  value={memberRole}
                  name="package"
                  id="pk"
                  onChange={(e) => setMemberRole(e.target.value)}
                  required>
                    <option value="MEMBER">Enumerator</option>
                    <option value="ANALYST">Analyst</option>
                    <option value="VIEWER">Viewer</option>
                  </Form.Select>
              </Form.Group>
             </>
             :
             null
          }
          <Form.Group className="mb-3" controlId="AddMemberEmail">
						<Form.Label><Sb_Text font={16}>Email</Sb_Text></Form.Label>
						<Form.Control size="sm" type="email" placeholder="Email" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberPassword">
						<Form.Label><Sb_Text font={16}>Password</Sb_Text></Form.Label><br></br>
            <Form.Label><Sb_Text weight={300} font={12}>Share this password to the members { memberRole != "MEMBER" ? ", They will be prompted to change it" : ""}</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Password" value={memberPassword} onChange={(e) => setMemberPassword(e.target.value)}/>
					</Form.Group>
          {
             memberRole == "ANALYST" ? 
             <>
              <Button className="mt-3" size="sm" style={{'float':'right'}} onClick={() => validateInput() ? saveAddButtonHandler() : null} disabled={!validateInput()}>
                <Sb_Text font={12} color="--lightGrey">
                  {
                    btnLoading ? <Sb_Loader/> :<span>{props.pageType === 'ADD' ? 'Add Member' : 'Save Changes'}</span>
                  }
                </Sb_Text>
              </Button>
             </>
             :
             null
          }
        </Col>
        <Col md="4">
          {
            memberRole == "MEMBER" ? 
            <>
              <Sb_Text font={16} weight={500}><p>Projects Involved In</p></Sb_Text>
              <Sb_List 
              items={projects} 
              listType="PROJECT" compType='SELECT' onAction={(id, name, ac) => projectSelectHandler(id, ac)}/>
              <Button className="mt-3" size="sm" style={{'float':'right'}} onClick={() => validateInput() ? saveAddButtonHandler() : null} disabled={!validateInput()}>
                <Sb_Text font={12} color="--lightGrey">
                  {
                    btnLoading ? <Sb_Loader/> :<span>{props.pageType === 'ADD' ? 'Add Member' : 'Save Changes'}</span>
                  }
                </Sb_Text>
              </Button>
            </> 
            : null
          }
          {
            memberRole == "VIEWER" ? 
            <>
              <Sb_Text font={16} weight={500}><p>Surveys To View</p></Sb_Text>
              <Sb_List 
              items={surveys} 
              listType="SURVEY" compType='SELECT' onAction={(id, name, ac) => surveySelectHandler(id, ac)}/>
              <Button className="mt-3" size="sm" style={{'float':'right'}} onClick={() =>  validateInput() ? saveAddButtonHandler() : null} disabled={!validateInput()}>
                <Sb_Text font={12} color="--lightGrey">
                  {
                    btnLoading ? <Sb_Loader/> :<span>{props.pageType === 'ADD' ? 'Add Member' : 'Save Changes'}</span>
                  }
                </Sb_Text>
              </Button>
            </> 
            : null
          }          
        </Col>
      </Row>
    </Col>
  )
}