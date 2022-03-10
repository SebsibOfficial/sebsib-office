import { faArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sb_Container from "../../components/Sb_Container/Sb_Container";
import Sb_List from "../../components/Sb_List/Sb_List";
import { actionType } from "../../components/Sb_List_Item/Sb_List_Item";
import Sb_Main_Items from "../../components/Sb_Main_Items/Sb_Main_Item";
import Sb_Modal from "../../components/Sb_Modal/Sb_Modal";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { generateId } from "../../utils/helpers";
import "./Projects.css";

interface Project {
  projectID: string,
  projectName: string,
  surveys: {id: string, text: string}[],
  members: {id: string, text: string}[],
}

class AddMemberUpdatePayload {
  constructor (pid: string, nmid: string[]) {
    this.projectID = pid;
    this.newMembersID = nmid;
  }
  projectID: string;
  newMembersID: string[];
}

class RemoveMemberUpdatePayload {
  constructor (pid: string, mid: string) {
    this.projectID = pid;
    this.memberID = mid;  
  }
  projectID: string;
  memberID: string;
}

export default function Projects () {
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

export function Projects_Landing () {
  let navigate = useNavigate();
  
  /*############# STATES ############### */
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState<"SELECTION" | "DELETION">("DELETION");
  const [currentModalID, setCurrentModalID] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([
    {
      projectID: generateId(), projectName: 'Agriculture Project', 
      surveys: [
        // {id: generateId(), text: 'Agricultural Studies in North Ethiopia'},
        // {id: generateId(), text: 'Agricultural Studies in South Ethiopia'}
      ], 
      members: [
        {id: generateId(), text: 'Abebe Beklel'},
        {id: generateId(), text: 'lela Sew Demo'},
        {id: generateId(), text: 'Ahunim lela'},
        {id: generateId(), text: 'Beso abebe'}
      ]
    }
  ]);

  let selectedMembers: {id: string, text: string}[] = [];
  /*------------- METHODS -------------- */
  function deleteProjectHandler () {
    // Logic Here
    setModalState(false)
  } 

  function memberRemoveHandler (id: string, projectID: string) {
    // Gather the removed members ID and project ID
    var payload = new RemoveMemberUpdatePayload(projectID, id);
    // Send to API -> If success 
      // Remove from project Arr
      var prjs = [...projects];
      var prj = prjs.filter((project) => project.projectID === projectID)[0];
      var mmbrs = prj?.members.filter(member => member.id != id);
      prj.members = mmbrs;
      for(var i = 0; i < prjs.length; i++){
        if (prjs[i].projectID == projectID)
          prjs[i].members = mmbrs;
      }
      setProjects(prjs);    
  }

  function memberSelectHandler (id: string, text: string, actionType: actionType | undefined) {
    if (actionType === 'SELECTED')
      selectedMembers.push({id: id, text: text});
    else if (actionType === 'UNSELECTED')
      selectedMembers = selectedMembers.filter(member => member.id === id);
  }

  function addMemberHandler () {
    var prj = [...projects];
    if (selectedMembers.length > 0) {
      // Filter out the id's only
      var memArr: string[] = [];
      selectedMembers.forEach(member => {
        memArr.push(member.id);
      })
      // Gather the new members
      var payload = new AddMemberUpdatePayload(currentModalID, memArr);
      // Send to API -> If success
        // Add members to the project
        selectedMembers.forEach(member => {
          prj.filter(project => project.projectID === currentModalID)[0]?.members.push(member)
        })
        setProjects(prj);
    }
    setModalState(false);
  }
  
  return (
    <Col md="10">
      <Row className="mb-4">
        <Col>
          <Button onClick={() => navigate('create-project', { state:true })}><Sb_Text font={16} color='--lightGrey'>Create Project</Sb_Text></Button>
        </Col>
      </Row>
      {/* A project */}
      {
        projects.map((project, index) => (
          <Row className="mb-5" key={index}>
            <Col>
              <Row className='g-0 mb-2'>
                <Col md="10">
                  <Sb_Text font={20} weight={500}>{project.projectName}</Sb_Text>
                </Col>
                <Col className='text-end'>
                  <Button variant="danger" size="sm" onClick={() => {setModalType("DELETION");setModalState(true);setCurrentModalID(project.projectID)}}>
                    <Sb_Text font={12} color="--lightGrey">Delete Project</Sb_Text>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row className="g-0" style={{'minHeight':200}}>
                    <Col md="9">
                      <Sb_Container className="d-block mnh-100">
                        <Row>
                          <Col>
                            <Button size="sm" className="m-4" onClick={() => navigate('create-survey/345', { state:true })}>
                              <Sb_Text font={12} color="--lightGrey">Create Survey</Sb_Text></Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={project.surveys.length < 1 ? `d-none` : `d-flex mb-3 ms-3`}>
                            {
                              project.surveys.map((survey, index) => (
                                <Sb_Main_Items key={index} id={survey.id} text={survey.text} type='SURVEY' 
                                onClick={(id:string) => navigate(`view-survey/${id}`, { state:true })}/>
                              ))
                            }
                          </Col>
                          {
                            project.surveys.length < 1 &&
                            <Col className="d-flex mb-3 ms-4" style={{'opacity':'0.3'}}>
                              <Sb_Text font={48} weight={900}>No Surveys</Sb_Text>
                            </Col>
                          }              
                        </Row>
                      </Sb_Container>
                    </Col>
                    <Col style={{'minHeight':'100%'}}>
                      <Sb_Container borderDir="HORIZONTAL" className="pb-3 d-block pe-4 min-height-inherit">
                        <Row className="g-0" style={{marginTop:'-6px'}}>
                          <Col>
                            <Button size="sm" className="my-4" 
                            onClick={() => {setModalType("SELECTION");setModalState(true);setCurrentModalID(project.projectID)}}>
                              <Sb_Text font={12} color="--lightGrey">Add Enumerator</Sb_Text>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={project.members.length < 1 ? 'd-none' : ''}>
                            <Sb_List items={project.members} listType="MEMBER" compType='REMOVE' onAction={(id) => memberRemoveHandler(id, project.projectID)}/>
                          </Col>
                          {
                            project.members.length < 1 && 
                            <Col style={{'opacity':'0.3'}}>
                              <Sb_Text font={20} weight={900}>No Enumerators</Sb_Text>
                            </Col>
                          }
                        </Row>
                      </Sb_Container>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        ))
      }
      
      
      {/* When there are no Projects */}
      { projects.length < 1 &&
        <Row>
          <Col className="text-center" style={{'opacity':'0.1'}}>
            <FontAwesomeIcon icon={faArchive} style={{'fontSize':'10em'}}/><br></br>
            <Sb_Text font={48} weight={900}>No Projects</Sb_Text>
          </Col>
        </Row>
      }


      {/* ---------------------------------The Modal------------------------------------------------------ */}
      <Sb_Modal show={modalState} onHide={() => setModalState(false)} 
      header={ modalType == "SELECTION" ? "Add Enumrator" : false } width={30}>
        <>
        {modalType === "SELECTION" &&
          <>
            <Sb_List 
            items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }, 
            {id:'3', text:'Minamin Chala', }, {id:'4', text:'Minamin Chala', }]} 
            listType="MEMBER" compType='SELECT' onAction={(id, text, actionType) => memberSelectHandler(id, text, actionType)}/>
            <Button size="sm" className="mt-3" onClick={() => addMemberHandler()}>
              <Sb_Text font={16} color="--lightGrey">Add</Sb_Text>
            </Button>
          </>
        }
        {modalType === "DELETION" && 
          <>
            <div className="d-block text-center" style={{'fontSize':'4em'}}>
              <FontAwesomeIcon icon={faTrash}/>
              <Sb_Text font={20} weight={500} align="center">Are you sure you want to delete this project?
               You will lose all your surveys.</Sb_Text>
            </div>
            <div>
              <Button variant="danger" size="sm" className="mt-3 float-start" onClick={() => deleteProjectHandler()}>
                <Sb_Text font={16} color="--lightGrey">Continue</Sb_Text>
              </Button>
              <Button variant="secondary" size="sm" className="mt-3 float-end"  onClick={() => setModalState(false)}>
                <Sb_Text font={16} color="--lightGrey">Cancel</Sb_Text>
              </Button>
            </div>
          </>
        }
        </>
        
      </Sb_Modal>
    </Col>
  )
}