import { Button, Col, Row } from "react-bootstrap";
import Sb_Container from "../../components/Sb_Container/Sb_Container";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import "./Projects.css";

export default function Projects () {
  return (
    <Col>
      <Row className="mb-4">
        <Col>
          <Button><Sb_Text font={16} color='--lightGrey'>Create Project</Sb_Text></Button>
        </Col>
      </Row>
      {/* A project */}
      <Row>
        <Col>
          <Row className='g-0 mb-2'>
            <Col md="10">
              <Sb_Text font={20} weight={500}>Argiculture Studies</Sb_Text>
            </Col>
            <Col className='text-end'>
              <Button variant="danger" size="sm"><Sb_Text font={12} weight={300} color="--lightGrey">Delete Project</Sb_Text></Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="g-0">
                <Col md="9">
                  <Sb_Container>
                    <Button>Create Survey</Button>
                  </Sb_Container>
                </Col>
                <Col>
                  <Sb_Container borderDir="HORIZONTAL">
                    <Button>Create Survey</Button>
                  </Sb_Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  )
}