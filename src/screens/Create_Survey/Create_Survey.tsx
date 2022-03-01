import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sb_Question from "../../components/Sb_Question/Sb_Question";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

export default function Create_Survey () {
  let params = useParams();
  return (
    <Col>
      <Row>
        <Col md="3">
          <Form.Group className="mb-3" controlId="LoginEmail">
              <Form.Label><Sb_Text font={16}>Project Name</Sb_Text></Form.Label>
              <Form.Select size="sm" placeholder="Name" disabled>
                <option value="">{params.pid}</option>
              </Form.Select>
					</Form.Group>
        </Col>
        <Col md="3">
          <Form.Group className="mb-3" controlId="LoginEmail">
              <Form.Label><Sb_Text font={16}>Survey Name</Sb_Text></Form.Label>
              <Form.Control size="sm" type="text" placeholder="Name"/>
					</Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md="6">
          <Sb_Question id="123" number={1} onAddEdit={() => console.log("EDIT/ADD")} onRemove={() => console.log("REMOVE")}/>
        </Col>
        <Col md="6">
          <Sb_Question id="456" number={2} onAddEdit={() => console.log("EDIT/ADD")} onRemove={() => console.log("REMOVE")}/>
        </Col>
        <Col md="6">
          <Sb_Question id="456" number={3} onAddEdit={() => console.log("EDIT/ADD")} onRemove={() => console.log("REMOVE")}/>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Button size="sm" variant="secondary" className="mt-3 float-start"><Sb_Text font={12} color="--lightGrey">New Question</Sb_Text></Button>
          <Button variant="primary" className="mt-3 float-end"><Sb_Text font={16} color="--lightGrey">Create Survey</Sb_Text></Button>
        </Col>
      </Row>
    </Col>
  )
}