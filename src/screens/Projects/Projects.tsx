import { faArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sb_Container from "../../components/Sb_Container/Sb_Container";
import Sb_List from "../../components/Sb_List/Sb_List";
import Sb_Main_Items from "../../components/Sb_Main_Items/Sb_Main_Item";
import Sb_Modal from "../../components/Sb_Modal/Sb_Modal";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import "./Projects.css";

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

  /*------------- METHODS -------------- */
  function deleteProjectHandler () {
    // Logic Here
    setModalState(false)
  } 

  function memberRemoveHandler (id: string) {}

  function memberSelectHandler (id: string) {}

  function addMemberHandler () {}
  
  return (
    <Col md="10">
      <Row className="mb-4">
        <Col>
          <Button onClick={() => navigate('create-project', { state:true })}><Sb_Text font={16} color='--lightGrey'>Create Project</Sb_Text></Button>
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
              <Button variant="danger" size="sm" onClick={() => {setModalType("DELETION");setModalState(true)}}>
                <Sb_Text font={12} color="--lightGrey">Delete Project</Sb_Text>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="g-0" style={{'minHeight':200}}>
                <Col md="9">
                  <Sb_Container className="d-block">
                    <Row>
                      <Col>
                        <Button size="sm" className="m-4" onClick={() => navigate('create-survey/345', { state:true })}>
                          <Sb_Text font={12} color="--lightGrey">Create Survey</Sb_Text></Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex mb-3 ms-3">
                        <Sb_Main_Items id='1' text='Argiculture Studies in North Gondar' type='SURVEY' onClick={(id:string) => navigate(`view-survey/${id}`, { state:true })}/>
                        <Sb_Main_Items id='2' text='Argiculture Studies in North Oromia' type='SURVEY' onClick={(id:string) => navigate(`view-survey/${id}`, { state:true })}/>
                      </Col>              
                    </Row>
                  </Sb_Container>
                </Col>
                <Col style={{'minHeight':'100%'}}>
                  <Sb_Container borderDir="HORIZONTAL" className="p-0 d-block pe-4 min-height-inherit">
                    <Row className="g-0" style={{marginTop:'-6px'}}>
                      <Col>
                        <Button size="sm" className="my-4" onClick={() => {setModalType("SELECTION");setModalState(true)}}>
                          <Sb_Text font={12} color="--lightGrey">Add Enumerator</Sb_Text>
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Sb_List items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }]} 
                        listType="MEMBER" compType='REMOVE' onAction={(id) => memberRemoveHandler(id)}/>
                      </Col>
                    </Row>
                  </Sb_Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      
      
      {/* When there are no Projects */}
      <Row>
        <Col className="d-none text-center" style={{'opacity':'0.1'}}>
          <FontAwesomeIcon icon={faArchive} style={{'fontSize':'10em'}}/><br></br>
          <Sb_Text font={48} weight={900}>No Projects</Sb_Text>
        </Col>
      </Row>


      {/* ---------------------------------The Modal------------------------------------------------------ */}
      <Sb_Modal show={modalState} onHide={() => setModalState(false)} header={ modalType == "SELECTION" ? "Add Enumrator" : false } width={30}>
        <>
        {modalType === "SELECTION" &&
          <>
            <Sb_List 
            items={[{id:'1', text:'Kebede Debebe', }, {id:'2', text:'Minamin Chala', }, {id:'3', text:'Minamin Chala', }, {id:'4', text:'Minamin Chala', }]} 
            listType="MEMBER" compType='SELECT' onAction={(id) => memberSelectHandler(id)}/>
            <Button size="sm" className="mt-3" onClick={() => addMemberHandler()}>
              <Sb_Text font={16} color="--lightGrey">Add</Sb_Text>
            </Button>
          </>
        }
        {modalType === "DELETION" && 
          <>
            <div className="d-block text-center" style={{'fontSize':'4em'}}>
              <FontAwesomeIcon icon={faTrash}/>
              <Sb_Text font={20} weight={500} align="center">Are you sure you want to delete this project? You will lose all your surveys.</Sb_Text>
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