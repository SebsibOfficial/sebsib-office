import { Button, Col, Row } from "react-bootstrap";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import "./Projects.css";

export default function Projects () {
  return (
    <Col>
      <Row>
        <Col>
        
        </Col>
        <Button><Sb_Text font={16} color='--lightGrey'>Create Project</Sb_Text></Button>
      </Row>
      <Row></Row>
    </Col>
  )
}