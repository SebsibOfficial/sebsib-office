import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Question, { ActionType, Payload } from "../../components/Sb_Question/Sb_Question";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { generateId } from "../../utils/helpers";

export default function Create_Survey () {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
  /*############# STATES ############### */
  const [questions, setQuestion] = useState([{id: generateId()}]);
  const [questionsData, setQuestionsData] = useState<Payload[]>([]);

  /*------------- METHODS -------------- */
  function addEditHandler (payload: Payload, actionType: ActionType) {
    if (questionsData.findIndex((question) => question.id === payload.id) != -1){
      // Replace the question with the new payload
      var qdArr = [...questionsData];
      const index = qdArr.findIndex(question => question.id === payload.id);
      if (index > -1) {
          qdArr[index] = payload;
      }
      setQuestionsData(qdArr);
    }
    else {
      var qdArr = [...questionsData];
      qdArr.push(payload);
      setQuestionsData(qdArr);
    }
  }

  function newQuestionHandler () {
    var qArr = [...questions];
    qArr.push({id: generateId()})
    setQuestion(qArr);
    setTimeout(() => handleScroll(), 50);
  }

  function questionExists(Qid: string) {
    if (questionsData.findIndex((question) => question.id === Qid) != -1)
      return true
    else 
      return false
  }

  function handleScroll() {
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  return (
    <Col>
      {console.log(questionsData)}
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
        {
          questions.map((question, index) => (
            <Col md="6" key={index}>
              <Sb_Question key={index + 1} id={question.id} number={index + 1} 
              state={ questionExists(question.id) ? 'EDIT' : 'ADD'} otherQuestions={questionsData}
              onAddEdit={(id: string, actionType: ActionType, payload: any) => addEditHandler(payload, actionType)} 
              onRemove={() => console.log("REMOVE")}/>
            </Col>
          ))
        }
      </Row>

      <Row className="mt-3">
        <Col>
          <Button size="sm" variant="secondary" className="mt-3 float-start" onClick={() => newQuestionHandler()}>
            <Sb_Text font={12} color="--lightGrey">New Question</Sb_Text>
          </Button>
          <Button variant="primary" className="mt-3 float-end">
            <Sb_Text font={16} color="--lightGrey">Create Survey</Sb_Text>
          </Button>
        </Col>
      </Row>
    </Col>
  )
}