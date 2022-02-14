import { Col, Row } from 'react-bootstrap';
import Sb_Container from '../../components/Sb_Container/Sb_Container';
import Sb_Header from '../../components/Sb_Header/Sb_Header';
import Sb_List from '../../components/Sb_List/Sb_List';
import Sb_Main_Items from '../../components/Sb_Main_Items/Sb_Main_Item';
import Sb_Row from '../../components/Sb_Row/Sb_Row';
import Sb_Side_Nav from '../../components/Sb_Side_Nav/Sb_Side_Nav';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import Projects from '../Projects/Projects';
import './Dashboard.css';

export default function Dashboard () {
  return (
    <Row className='dashboard-container g-0'>
      <Col md='2'>
        <Sb_Side_Nav name='Abebe Beso'/>
      </Col>
      <Col style={{'padding':'1em 4em'}}>
        <Row className='g-0'>
          <Col>
            <Sb_Header header='Projects' onBackClick={() => console.log('Clicked Back Button')} />
          </Col>
        </Row>
        <Row className='g-0'>
          {/* office.sebsib.com/dashboard */}
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
                              <Sb_Main_Items id='1' text='Argiculture Studies in North Gondar' type='PROJECT' onClick={(id) => console.log(id + "Clicked")}/>
                              <Sb_Main_Items id='2' text='Argiculture Studies in North Oromia' type='PROJECT' onClick={(id) => console.log(id + "Clicked")}/>
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
                              <Sb_Main_Items id='1' text='Argiculture Studies in North Gondar' type='SURVEY' onClick={(id) => console.log(id + "Clicked")}/>
                              <Sb_Main_Items id='2' text='Argiculture Studies in North Oromia' type='SURVEY' onClick={(id) => console.log(id + "Clicked")}/>
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
                              <Sb_Row id='13' color='PURPLE' project='Some Proj' survey='Some Surv' enumrator='Chala' date='12/02/2022'/>
                              <Sb_Row id='14' color='PURPLE' project='Some Proj' survey='Some Surv' enumrator='Chala' date='12/02/2022'
                              onView={(id) => console.log(id+" Clicked")}/>
                              <Sb_Row id='15' color='PURPLE' project='Some Proj' survey='Some Surv' enumrator='Chala' date='12/02/2022'
                              onView={(id) => console.log(id+" Clicked")}/>
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
                      <Col className='text-end'>
                        <Sb_Text font={12} weight={300}>See All</Sb_Text>
                      </Col>
                    </Row>
                    <Row>
                      <Sb_Container borderDir='HORIZONTAL' className='p-3'>
                        <Sb_List items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }]} 
                        listType="MEMBER" compType='DISPLAY' onAction={(id, ac) => console.log(id+" CLICKED "+ac)}/>
                      </Sb_Container>
                    </Row>
                  </div>
                </Col>
              </Row>        
            </div>
          </Col>
          {/* office.sebsib.com/dashboard/projects */}
          <Projects/>
        </Row>
      </Col>
    </Row>
  )
}