import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArchive, faCog, faThLarge, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnySrvRecord } from 'dns';
import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sb_Container from '../../components/Sb_Container/Sb_Container';
import Sb_Header from '../../components/Sb_Header/Sb_Header';
import Sb_List from '../../components/Sb_List/Sb_List';
import Sb_Loader from '../../components/Sb_Loader';
import Sb_Main_Items from '../../components/Sb_Main_Items/Sb_Main_Item';
import Sb_Row from '../../components/Sb_Row/Sb_Row';
import Sb_Side_Nav from '../../components/Sb_Side_Nav/Sb_Side_Nav';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import { AuthContext, useAuth } from '../../states/AuthContext';
import { NotifContext, NotifContextInterface, NotifInterface } from '../../states/NotifContext';
import { GetMemberList, GetProjectList, GetRecentResponseList, GetSurveyListByOrg } from '../../utils/api';
import { decodeJWT, validRoutes } from '../../utils/helpers';
import './Dashboard.css';

export default function Dashboard () {
  let location = useLocation();
  let navBack = useNavigate();
  const {notif} = useContext(NotifContext) as NotifContextInterface;
  const {token, setAuthToken} = useAuth();
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navBack("/404");
    }
    if (token == "") {
      return navBack("/login", {state: true});
    }
  },[location.state]);
  
  function capitalizeFirst (str:string):string {
    return str.match("^[a-z]") ? str.charAt(0).toUpperCase() + str.substring(1) : str;
  }

  function getPageTitle ():string {
    let routeArray:string[] = location.pathname.split("/");
    let arrayLength = routeArray.length;
    if (routeArray[arrayLength - 1].match('[0-9]') || routeArray[arrayLength - 1].length > 15) {
      if (routeArray[arrayLength - 2] === 'add' || routeArray[arrayLength - 2] === 'edit')
        return routeArray[arrayLength - 3];
      else
        return routeArray[arrayLength - 2];
    }
    else
      return routeArray[arrayLength - 1];
  }

  function getPageIcon ():IconProp {
    let routeArray:string[] = location.pathname.split("/");
    switch (routeArray[2]) {
      case 'members':
        return faUsers;
      case 'projects':
        return faArchive;
      case 'settings':
        return faCog;
      default:
        return faThLarge;
    }
  }

  function goBack () {
    let route = location.pathname;
    let routeArray = route.split('/');
    routeArray.forEach(rt => rt.length == 24 || rt.match('[0-9]') ? rt = "*" : null);
    for (let index = 0; index < routeArray.length; index++) {
      const element = routeArray[index];
      if (element.length == 24 || element.match('[0-9]'))
        routeArray[index] = "*";
    }
    var filteredRoutes = routeArray.join('/');
    let prevRoute = filteredRoutes.slice(0, filteredRoutes.lastIndexOf('/'));
    if (validRoutes.includes(prevRoute)) {
      navBack(prevRoute, {state: true});
    }
    else {
      navBack(prevRoute.slice(0, prevRoute.lastIndexOf('/')), {state: true});
    }
  }

  return (
    <Row className='dashboard-container g-0'>
      <Col md='2'>
        <Sb_Side_Nav name={decodeJWT(token as string).org_name}/>
      </Col>
      <Col style={{'padding':'1em 4em', 'overflowX':'auto'}}>
        <Row className='g-0' style={{'marginBottom':'3em'}}>
          <Col>
            <Sb_Header 
              header = {capitalizeFirst(getPageTitle().split("-").join(" "))} 
              onBackClick = { () => goBack()}
              hideBackButton = { getPageTitle() === 'dashboard' ? true : false}
              notif = {notif}
            >
              <FontAwesomeIcon icon={getPageIcon()} style={{'fontSize':'2.5em','color':'var(--primary)'}} className="me-3"/>
            </Sb_Header>
          </Col>
        </Row>
        <Row className='g-0 '>
          <Outlet/>
        </Row>
      </Col>
    </Row>
  )
}

type MemberItem = { _id:string, name:string, defaultSelectValue?:"UNSELECTED" | "SELECTED"};
type ProjectItem = {_id: string, name: string};
type SurveyRow = {_id: string, project: string, survey: string, enumrator: string, date: string};

export function Dashboard_Landing () {
  let navigate = useNavigate();
  const {token, setAuthToken} = useAuth();
  
  // ## MEMBER RELATED STATES
  const [members, setMembers] = useState<MemberItem[]>([])
  const [memberLoading, setMemberLoading] = useState<boolean>(true);
  // ## PROJECT RELATED STATES
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [fullProjects, setFullProjects] = useState([]);
  const [projectLoading, setProjectLoading] = useState<boolean>(true);
  // ## SURVEY RELATED STATES
  const [surveys, setSurveys] = useState<ProjectItem[]>([])
  const [surveyLoading, setSurveyLoading] = useState<boolean>(true);
  // ## RECENT SURVEY RELATED STATES
  const [recentSurveys, setRecentSurveys] = useState<SurveyRow[]>([]);
  const [recentLoading, setRecentLoading] = useState<boolean>(true);
  
  useEffect(() => {
    GetMemberList(decodeJWT(token as string).org).then(async (res) => {
      if (res.code == 200){
        var mem_arr = res.data;
        var arr:MemberItem[] = [];
        mem_arr.forEach((member:any) => {
          if (member.roleId != '623cc24a8b7ab06011bd1e60')
            arr.push({_id: member._id, name: member.username})
        })
        setMembers(arr);
        setMemberLoading(false);
        setRecentLoading(false);
      } else {
        console.info(res)
      }
    })
    .catch((err) => console.log(err))
    
    // Populate the Projects
    GetProjectList(decodeJWT(token as string).org).then((res) => {
      if (res.code == 200){
        var prj_arr = res.data;
        setFullProjects(prj_arr);
        var arr:ProjectItem[] = [];
        prj_arr.forEach((project:any) => {
          arr.push({_id: project._id, name: project.name})
        })
        arr.length = 6;
        setProjects(arr);
        setProjectLoading(false);
      } else {
        console.info(res)
      }
    }).catch((err) => console.log(err))
    
    // Populate the Surveys
    GetSurveyListByOrg(decodeJWT(token as string).org).then((res:any) => {
      if (res.code == 200){
        var srv_arr = res.data;
        var arr:ProjectItem[] = [];
        srv_arr.forEach((survey:any) => {
          arr.push({_id: survey._id, name: survey.name})
        })
        arr.length = 6;
        setSurveys(arr);
        setSurveyLoading(false);
      } else {
        console.info(res)
      }
    }).catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    getRecentResp();
  }, [members, surveys])

  function getProjectId (surveyId: string):string {
    var id:string = "";
    fullProjects.forEach((project:any) => {
      if (project.surveysId.includes(surveyId)){
        id = project._id;
      }
    })
    return id;
  }
  
  function getName(type:"S"|"M"|"P", firstArg: string, projectArr?: Array<any>):string {
    var ret = "";
    switch (type) {
      case "M":
        members.length != 0 ? members.forEach(mem => {
          if (mem._id == firstArg) {
            ret = mem.name;
          }
        }) : null;
        break;
      case "S":
        surveys.length != 0 ? surveys.forEach(srv => {
          if (srv._id == firstArg) {
            ret = srv.name;
          }
        }) : null
        break;
      case "P":
        projectArr?.forEach((proj:any) => {
          if (proj.surveysId.includes(firstArg)) ret = proj.name;
        })
        break;
    
      default:
        break;
    }
    return ret;
  }

  async function getRecentResp() {
    try {
      var res = await GetRecentResponseList(decodeJWT(token as string).org);
      if (res.code == 200){
        var resp_arr = [];
        var rows:SurveyRow[] = [];
        resp_arr = res.data.resp;
        resp_arr.forEach((resp:any) => {
          rows.push({_id: resp._id, survey: getName('S', resp.surveyId), 
          enumrator: getName('M', resp.enumratorId), date: resp.sentDate.toString().substring(0, 10), 
          project: getName('P', resp.surveyId, res.data.proj)});
        })
        setRecentSurveys(rows);
      } else {
        console.log(res.data);
      } 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Col className='main-content'>
      <div >
        <Row className='g-0'>
          <Col md="9">
            <Row>
              <Col>
                <div className='dash-cols dash-projects'>
                  <Row className='g-0 mb-2'>
                    <Col md="10">
                      <Sb_Text font={16}>Recently Opened Projects</Sb_Text>
                    </Col>
                    <Col className='text-end'>
                      <Sb_Text font={12} weight={300}>See All</Sb_Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Sb_Container className='p-3'>
                        {
                          projectLoading ? <Sb_Loader/> : projects.map((project:ProjectItem, index:number) => <Sb_Main_Items key={project._id} id={project._id} text={project.name} type='PROJECT' onClick={() => navigate('projects', { state:true })}/>)
                        }
                      </Sb_Container>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='dash-cols dash-surveys'>
                  <Row className='g-0 mb-2'>
                    <Col md="10">
                      <Sb_Text font={16}>Recently Opened Surveys</Sb_Text>
                    </Col>
                    <Col className='text-end'>
                      <Sb_Text font={12} weight={300}>See All</Sb_Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Sb_Container className='p-3'>
                      {
                        surveyLoading ? <Sb_Loader/> : 
                        surveys.map((survey) => 
                          <Sb_Main_Items key={survey._id} id={survey._id} text={survey.name} 
                          type='SURVEY' 
                          onClick={(id) => navigate(`projects/view-survey/${survey._id}`, { state:{name: survey.name, projectId: getProjectId(survey._id)}})}/>) 
                      }
                      </Sb_Container>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className='dash-cols dash-recent'>
                  <Row className='g-0 mb-2'>
                    <Col>
                      <Sb_Text font={16}>Recent Entries</Sb_Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {
                        recentLoading ? <Sb_Loader/> : 
                        <div className='recent-table'>
                          <Sb_Row id='12' header color='DARK'/>
                          {
                            recentSurveys.map(surv => (
                              <Sb_Row key={surv._id} id={surv._id} color='PURPLE' project={surv.project} 
                              survey={surv.survey} enumrator={surv.enumrator} date={surv.date}
                              onView={(id) => navigate(`projects/view-survey/${id}`, { state:true })}/>
                            )
                            )
                          }
                        </div>
                      }
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="3">
            <div className='dash-cols dash-members'>
              <Row className='g-0 mb-2'>
                <Col md="8">
                  <Sb_Text font={16}>Member List</Sb_Text>
                </Col>
                <Col className='text-end' style={{'cursor':'pointer'}} onClick={() => navigate('members', { state:true })}>
                  <Sb_Text font={12} weight={300}>See All</Sb_Text>
                </Col>
              </Row>
              <Row>
                <Sb_Container borderDir='HORIZONTAL' className='p-3'>
                {
                  memberLoading ? <Sb_Loader/> : <Sb_List items={members} listType="MEMBER" compType='DISPLAY' onAction={(id, ac) => console.log()}/>
                }
                </Sb_Container>
              </Row>
            </div>
          </Col>
        </Row>        
      </div>
    </Col>
  )
}