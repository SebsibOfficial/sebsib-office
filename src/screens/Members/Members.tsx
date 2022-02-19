import { Button, Col, Row } from "react-bootstrap";
import Sb_Member_Card from "../../components/Sb_Member_Card/Sb_Member_Card";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import './Members.css';

export default function Members () {
  return (
    <Col>
      <Row className="mb-4">
        <Col>
          <Button><Sb_Text font={16} color='--lightGrey'>Add Member</Sb_Text></Button>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <Sb_Member_Card id="12" name="Abebe" onDelete={(id) => console.log(id)} onClick={(id) => console.log(id)}/>
        </Col>
        <Col md="3">
          <Sb_Member_Card id="12" name="Abebe Abebe Abebe Abebe" onDelete={(id) => console.log(id)} onClick={(id) => console.log(id)}/>
        </Col>
        <Col md="3">
          <Sb_Member_Card id="12" name="Abebe" onDelete={(id) => console.log(id)} onClick={(id) => console.log(id)}/>
        </Col>
        <Col md="3">
          <Sb_Member_Card id="12" name="Abebe" onDelete={(id) => console.log(id)} onClick={(id) => console.log(id)}/>
        </Col>
        <Col md="3">
          <Sb_Member_Card id="12" name="Abebe" onDelete={(id) => console.log(id)} onClick={(id) => console.log(id)}/>
        </Col>
        <Col md="3">
          <Sb_Member_Card id="12" name="Abebe" onDelete={(id) => console.log(id)} onClick={(id) => console.log(id)}/>
        </Col>
      </Row>
    </Col>
  )
}