import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArchive, faCog, faThLarge, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sb_Container from '../../components/Sb_Container/Sb_Container';
import Sb_Header from '../../components/Sb_Header/Sb_Header';
import Sb_List from '../../components/Sb_List/Sb_List';
import Sb_Main_Items from '../../components/Sb_Main_Items/Sb_Main_Item';
import Sb_Row from '../../components/Sb_Row/Sb_Row';
import Sb_Side_Nav from '../../components/Sb_Side_Nav/Sb_Side_Nav';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import './Dashboard.css';

export default function Dashboard () {
  let location = useLocation();
  let navBack = useNavigate();

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

  return (
    <Row className='dashboard-container g-0'>
      <Col md='2'>
        <Sb_Side_Nav name='Abebe Beso'/>
      </Col>
      <Col style={{'padding':'1em 4em', 'overflowX':'auto'}}>
        <Row className='g-0' style={{'marginBottom':'3em'}}>
          <Col>
            <Sb_Header 
              header = {capitalizeFirst(getPageTitle().split("-").join(" "))} 
              onBackClick = { () => navBack(-1)}
              hideBackButton = { getPageTitle() === 'dashboard' ? true : false}
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

export function Dashboard_Landing () {
  let navigate = useNavigate();
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
                        <Sb_Main_Items id='1' text='Argiculture Studies in North Gondar' type='PROJECT' onClick={() => navigate('projects', { state:true })}/>
                        <Sb_Main_Items id='2' text='Argiculture Studies in North Oromia' type='PROJECT' onClick={() => navigate('projects', { state:true })}/>
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
                        <Sb_Main_Items id='1' text='Argiculture Studies in North Gondar' type='SURVEY' onClick={(id) => navigate(`projects/view-survey/${id}`, { state:true })}/>
                        <Sb_Main_Items id='2' text='Argiculture Studies in North Oromia' type='SURVEY' onClick={(id) => navigate(`projects/view-survey/${id}`, { state:true })}/>
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
                      <div className='recent-table'>
                        <Sb_Row id='12' header color='DARK'/>
                        <Sb_Row id='14' color='PURPLE' project='Some Proj' survey='Some Surv' enumrator='Chala' date='12/02/2022'
                        onView={(id) => navigate(`projects/view-survey/${id}`, { state:true })}/>
                        <Sb_Row id='15' color='PURPLE' project='Some Proj' survey='Some Surv' enumrator='Chala' date='12/02/2022'
                        onView={(id) => navigate(`projects/view-survey/${id}`, { state:true })}/>
                      </div>
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
                  <Sb_List items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }]} 
                  listType="MEMBER" compType='DISPLAY' onAction={(id, ac) => console.log()}/>
                </Sb_Container>
              </Row>
            </div>
          </Col>
        </Row>        
      </div>
    </Col>
  )
}