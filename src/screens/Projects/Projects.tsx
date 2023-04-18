import { faArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";
import Sb_Container from "../../components/Sb_Container/Sb_Container";
import Sb_List from "../../components/Sb_List/Sb_List";
import { actionType } from "../../components/Sb_List_Item/Sb_List_Item";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Main_Items from "../../components/Sb_Main_Items/Sb_Main_Item";
import Sb_Modal from "../../components/Sb_Modal/Sb_Modal";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { useAuth } from "../../states/AuthContext";
import { NotifContext, NotifInterface } from "../../states/NotifContext";
import { AddMemberToProject, DeleteProject, GetMemberList, GetProjectList, GetSurveyListByProject, RemoveMemberFromProject } from "../../utils/api";
import { decodeJWT, generateId } from "../../utils/helpers";
import "./Projects.css";

interface StateInterface {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: NotifInterface,
}
interface Project {
  projectID: string,
  projectName: string,
  descr?: string,
  surveys: SurveyItem[],
  members: MemberItem[]
}

interface MemberItem {
  _id: string,
  name: string
}

interface SurveyItem {
  _id: string,
  name: string,
  type: "ONLINE" | "REGULAR" | "INCENTIVIZED"
}
interface EnumLoading {
  pid: string | null,
  show: boolean
}
class AddMemberUpdatePayload {
  constructor (pid: string, nmid: string[]) {
    this.projectID = pid;
    this.newMembersID = nmid;
  }
  projectID: string;
  newMembersID: string[];
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
  let location = useLocation();
  const {token, setAuthToken} = useAuth();
  const Notif = useContext(NotifContext);
  const state = useLocation() as StateInterface;

  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
    else {
      state.state.message != undefined && state.state.message != '' 
      ? Notif?.setNotification({code: state.state.code, type: state.state.type, message: state.state.message, id:1}) 
      : '';
    }
  },[location.state]);

  useEffect(() => {
    state.state = {type: undefined, message: '', id: 0};
  },[])

  async function init() {
    var arr:Project[] = [];
    // Populate the Projects
    var proj_res = await GetProjectList(decodeJWT(token as string).org);
    var prj_arr = proj_res.data;
    for (let index = 0; index < prj_arr.length; index++) {
      const prj_id = prj_arr[index]._id;
      const prj_desc = prj_arr[index].description;
      // Get the surveys in the project
      var surv_res = await GetSurveyListByProject(prj_id);
      var srv_arr_resp:any[] = surv_res.data;
      var srv_arr:SurveyItem[] = [];
      srv_arr_resp = srv_arr_resp.sort((a,b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
      for (let j = 0; j < srv_arr_resp.length; j++) {
        const survey_obj = srv_arr_resp[j];
        srv_arr.push({_id: survey_obj._id, name: survey_obj.name, type: survey_obj.type})
      }

      // Get the members involved in the project
      var mem_res = await GetMemberList(decodeJWT(token as string).org);
      var mem_arr_resp = mem_res.data;
      var mem_arr:MemberItem[] = [];
      for (let k = 0; k < mem_arr_resp.length; k++) {
        const member_obj = mem_arr_resp[k];
        // NOT SHOW OWNER
        if (mem_arr_resp[k].projectsId.includes(prj_id) && mem_arr_resp[k].roleId != '623cc24a8b7ab06011bd1e60')
          mem_arr.push({_id: member_obj._id, name: member_obj.firstName+' '+member_obj.lastName});
      }
     
      arr.push({
        projectID: prj_id,
        projectName: prj_arr[index].name,
        descr: prj_desc,
        surveys: srv_arr,
        members: mem_arr
      })

      console.log(arr);
      if (arr.length == prj_arr.length){
        setProjects(arr); 
        setPageLoading(false);
      }
    }
    
    if (prj_arr.length == 0) setPageLoading(false);
  }

  useEffect(() => {
    init();
  },[])

  /*############# STATES ############### */
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState<"SELECTION" | "DELETION">("DELETION");
  const [currentModalID, setCurrentModalID] = useState<string>("");
  const [pageLoading, setPageLoading] = useState(true);
  const [enumLoading, setEnumLoading] = useState<EnumLoading>({pid: null, show: false});
  const [projects, setProjects] = useState<Project[]>([]);
  const [membersToAdd, setMembersToAdd] = useState<MemberItem[]>([]);

  let selectedMembers: {_id: string, name: string}[] = [];
  /*------------- METHODS -------------- */
  async function deleteProjectHandler () {
    setModalState(false);
    setPageLoading(true);
    var res = await DeleteProject(currentModalID);
    if (res.code == 200) {
      var prjs = [...projects];
      prjs = prjs.filter((project) => project.projectID != currentModalID);
      setProjects(prjs);
      Notif?.setNotification({type:"OK", message:"Project deleted", id:1})
    } else {
      console.log(res.data.message);
      Notif?.setNotification({type:"ERROR", message:res.data.message, id:1})
    }
    setPageLoading(false);
  } 

  function memberRemoveHandler (id: string, projectID: string) {
    setEnumLoading({pid: projectID, show: true});
    // Gather the removed members ID and project ID
    RemoveMemberFromProject(id, projectID).then(res => {
      if (res.code == 200) {
        // Remove from project Arr
        var prjs = [...projects];
        var prj = prjs.filter((project) => project.projectID === projectID)[0];
        var mmbrs = prj?.members.filter(member => member._id != id);
        prj.members = mmbrs;
        for(var i = 0; i < prjs.length; i++){
          if (prjs[i].projectID == projectID)
            prjs[i].members = mmbrs;
        }
        setProjects(prjs);
        Notif?.setNotification({type:"OK", message:"Member Removed from Project", id:1})
      }
      else {
        console.log(res.data.message);
        Notif?.setNotification({type:"ERROR", message:res.data.message, id:1})
      }
      setEnumLoading({pid: projectID, show: false});
    })     
  }

  function memberSelectHandler (_id: string, name: string, actionType: actionType | undefined) {
    if (actionType === 'SELECTED')
      selectedMembers.push({_id: _id, name: name});
    else if (actionType === 'UNSELECTED')
      selectedMembers = selectedMembers.filter(member => member._id === _id);
  }

  function addMemberHandler () {
    var prj = [...projects];
    if (selectedMembers.length > 0) {
      // Filter out the id's only
      var memArr: string[] = [];
      selectedMembers.forEach(member => {
        memArr.push(member._id);
      })
      // Gather the new members
      AddMemberToProject(currentModalID, memArr).then(res => {
        if (res.code == 200) {
          // Add members to the project
          selectedMembers.forEach(member => {
          prj.filter(project => project.projectID === currentModalID)[0]?.members.push(member)
        })
        setProjects(prj);
        Notif?.setNotification({type:"OK", message:"Member added to project", id:1})
        AddmemberListRefresh(currentModalID);
        }
        else {
          console.log(res.data);
          Notif?.setNotification({code:res.code, type:"ERROR", message:res.data.message, id:1})
        }
      })     
    }
    setModalState(false);
  }

  async function AddmemberListRefresh  (projectID: string) {
    var mta:MemberItem[] = [];
    // Get the members involved in the project
    var mem_res = await GetMemberList(decodeJWT(token as string).org);
    var mem_arr_resp = mem_res.data;
    mem_arr_resp.forEach((mem:any) => {
      if (!mem.projectsId.includes(projectID) && mem.roleId == '623cc24a8b7ab06011bd1e5f')
        mta.push({_id: mem._id, name: mem.firstName+' '+mem.lastName});
    })
    setMembersToAdd(mta);
  }
  
  return (
    pageLoading ? <Sb_Loader full/> :
    <Col md="10">
      <Row className="mb-4">
        <Col>
        <Sb_Alert>This page is where you see your projects. You can see the enumrators involved and the surveys (Enumrator Based and Online) that are a part of the project. You can <b>Delete</b> and <b>Create Projects</b> also <b>Add Enumrators</b> in a project. These enumrators are the ones which will download the survey and collect the data.</Sb_Alert>
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
                <Col md="8" className="mb-3" style={{'display': project.descr == "" || project.descr == null || project.descr == undefined ? 'none': ''}}>
                  <Sb_Text weight={300}>{project.descr}</Sb_Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row className="g-0" style={{'minHeight':200}}>
                    <Col md="9">
                      <Sb_Container className="d-block mnh-100">
                        <Row>
                          <Col>
                            <Button size="sm" className="m-4" onClick={() => navigate('create-survey/', { state:{name: project.projectName, id:project.projectID} })}>
                              <Sb_Text font={12} color="--lightGrey">Create Survey</Sb_Text></Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={project.surveys.length < 1 ? `d-none` : `d-flex mb-3 ms-3 flex-wrap`}>
                            {
                              project.surveys.map((survey, index) => (
                                <Sb_Main_Items key={index} id={survey._id} text={survey.name} type={survey.type} 
                                onClick={(id:string) => navigate(`view-survey/${id}`, { state:{name: survey.name, projectId: project.projectID, projectName: project.projectName} })}/>
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
                            {
                              enumLoading.pid == project.projectID && enumLoading.show ? <Sb_Loader/> :
                              <Sb_List items={project.members} listType="MEMBER" compType='REMOVE' onAction={(id) => memberRemoveHandler(id, project.projectID)}/>
                            }
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
      <Sb_Modal show={modalState} onHide={() => setModalState(false)} onShow={() => AddmemberListRefresh(currentModalID)} 
      header={ modalType == "SELECTION" ? "Add Enumrator" : false } width={30}>
        <>
        {modalType === "SELECTION" && membersToAdd.length != 0 &&
          <>
            <Sb_List 
            items={membersToAdd} 
            listType="MEMBER" compType='SELECT' onAction={(id, text, actionType) => memberSelectHandler(id, text, actionType)}/>
            <Button size="sm" className="mt-3" onClick={() => addMemberHandler()}>
              <Sb_Text font={16} color="--lightGrey">Add</Sb_Text>
            </Button>
          </>
        }
        {
          modalType === "SELECTION" && membersToAdd.length == 0 &&
          <>
            <Sb_Text font={16} weight={300}>No more members</Sb_Text>
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