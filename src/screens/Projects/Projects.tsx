import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Sb_Container from "../../components/Sb_Container/Sb_Container";
import Sb_List from "../../components/Sb_List/Sb_List";
import Sb_Main_Items from "../../components/Sb_Main_Items/Sb_Main_Item";
import Sb_Modal from "../../components/Sb_Modal/Sb_Modal";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import Create_Project from "../Create_Project/Create_Project";
import "./Projects.css";

export default function Projects () {
  const [modalState, setModalState] = useState(false);
  
  return (
    <>
    {/* office.sebsib.com/dashboard/projects */}
    <Col className="d-none">
      <Row className="mb-4">
        <Col>
          <Button><Sb_Text font={16} color='--lightGrey'>Create Project</Sb_Text></Button>
        </Col>
      </Row>
      {/* A project */}
      <Row className="mb-5">
        <Col>
          <Row className='g-0 mb-2'>
            <Col md="10">
              <Sb_Text font={20} weight={500}>Argiculture Studies</Sb_Text>
            </Col>
            <Col className='text-end'>
              <Button variant="danger" size="sm"><Sb_Text font={12} color="--lightGrey">Delete Project</Sb_Text></Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="g-0" style={{'minHeight':200}}>
                <Col md="9">
                  <Sb_Container className="d-block">
                    <Row>
                      <Col>
                        <Button size="sm" className="m-4"><Sb_Text font={12} color="--lightGrey">Create Survey</Sb_Text></Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex mb-3 ms-3">
                        <Sb_Main_Items id='1' text='Argiculture Studies in North Gondar' type='PROJECT' onClick={(id:string) => console.log(id + "Clicked")}/>
                        <Sb_Main_Items id='2' text='Argiculture Studies in North Oromia' type='PROJECT' onClick={(id:string) => console.log(id + "Clicked")}/>
                      </Col>              
                    </Row>
                  </Sb_Container>
                </Col>
                <Col style={{'minHeight':'100%'}}>
                  <Sb_Container borderDir="HORIZONTAL" className="p-0 d-block pe-4 min-height-inherit">
                    <Row className="g-0" style={{marginTop:'-6px'}}>
                      <Col>
                        <Button size="sm" className="my-4" onClick={() => setModalState(true)}>
                          <Sb_Text font={12} color="--lightGrey">Add Enumerator</Sb_Text>
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Sb_List items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }]} 
                        listType="MEMBER" compType='REMOVE' onAction={(id, ac) => console.log(id+" CLICKED "+ac)}/>
                      </Col>
                    </Row>
                  </Sb_Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* A project */}
      <Row className="mb-5">
        <Col>
          <Row className='g-0 mb-2'>
            <Col md="10">
              <Sb_Text font={20} weight={500}>Argiculture Studies</Sb_Text>
            </Col>
            <Col className='text-end'>
              <Button variant="danger" size="sm"><Sb_Text font={12} color="--lightGrey">Delete Project</Sb_Text></Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="g-0" style={{'minHeight':200}}>
                <Col md="9">
                  <Sb_Container className="d-block">
                    <Row>
                      <Col>
                        <Button size="sm" className="m-4"><Sb_Text font={12} color="--lightGrey">Create Survey</Sb_Text></Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex mb-3 ms-3">
                        <Sb_Main_Items id='1' text='Argiculture Studies in North Gondar' type='PROJECT' onClick={(id:string) => console.log(id + "Clicked")}/>
                        <Sb_Main_Items id='2' text='Argiculture Studies in North Oromia' type='PROJECT' onClick={(id:string) => console.log(id + "Clicked")}/>
                      </Col>              
                    </Row>
                  </Sb_Container>
                </Col>
                <Col style={{'minHeight':'100%'}}>
                  <Sb_Container borderDir="HORIZONTAL" className="p-0 d-block pe-4 min-height-inherit">
                    <Row className="g-0" style={{marginTop:'-6px'}}>
                      <Col>
                        <Button size="sm" className="my-4"><Sb_Text font={12} color="--lightGrey">Add Enumerator</Sb_Text></Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Sb_List items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }]} 
                        listType="MEMBER" compType='REMOVE' onAction={(id, ac) => console.log(id+" CLICKED "+ac)}/>
                      </Col>
                    </Row>
                  </Sb_Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* ---------------------------------The Modal------------------------------------------------------ */}
      <Sb_Modal show={modalState} onHide={() => setModalState(false)} header="Add Enumrators" width={30}>
        <Sb_List 
        items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }, {id:'2', text:'Minamin Chala', }, {id:'2', text:'Minamin Chala', }]} 
        listType="MEMBER" compType='SELECT' onAction={(id, ac) => console.log(id+" CLICKED "+ac)}/>
        <Button size="sm" className="mt-3"><Sb_Text font={16} color="--lightGrey">Add</Sb_Text></Button>
      </Sb_Modal>
    </Col>
    {/* office.sebsib.com/dashboard/projects/create-project */}
    <Create_Project/>
    </>
  )
}