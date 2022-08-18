import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Question, { ActionType, Payload } from "../../components/Sb_Question/Sb_Question";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { NotifContext } from "../../states/NotifContext";
import { CriticalContext, useCritical } from '../../states/CriticalContext';
import { CreateSurvey } from "../../utils/api";
import { generateId } from "../../utils/helpers";

export class FinalPayload {
  constructor (sn: string, pl: Payload[]) {
    this.surveyName = sn;
    this.questions = pl;
  }
  surveyName: string;
  questions: Payload[];
}

interface StateInterface {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: {name: string},
}

export default function Create_Survey () {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const state = useLocation() as StateInterface;
  const Notif = useContext(NotifContext);
  
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
  /*############# STATES ############### */
  const [questions, setQuestion] = useState([{id: generateId()}]);
  const [questionsData, setQuestionsData] = useState<Payload[]>([]);
  const [surveyName, setSurveyName] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const {page, setCriticalpage} = useCritical();

  useEffect(() => {
    if (surveyName != "") {
      setCriticalpage("CREATE_SURVEY");
    }
  },[surveyName])

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

  function removeHandler (id: string) {
    var qdArr = [...questionsData]; var qArr = [...questions];
    qdArr = qdArr.filter((question) => question.id != id); qArr = qArr.filter((question) => question.id != id);
    setQuestionsData(qdArr); setQuestion(qArr);
  }
  
  async function createSurveyHandler (projId: string) {
    setBtnLoading(true);
    var res = await CreateSurvey(projId, new FinalPayload(surveyName, questionsData));
    if (res.code == 200) {
      setCriticalpage('');
      navigate('/dashboard/projects', {state: true});
    } else {
      console.log(res.data);
      setBtnLoading(false);
      Notif?.setNotification({code:res.code, type: "ERROR", message: res.data, id:1})
    }
    //console.log(new FinalPayload(surveyName, questionsData));
  }

  function questionExists (Qid: string) {
    if (questionsData.findIndex((question) => question.id === Qid) != -1)
      return true
    else 
      return false
  }

  function handleScroll () {
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  return (
    <Col>
      <Sb_Alert>To create a survey first enter the survey name, then fill out the questions, choices and the question type. 
        After creating a question you must <b>Add</b> it. When you want to create more question click the <b>New Question</b> button below the questions.
        When you finish creating your questions you can click on <b>Create Survey</b> to create the survey.
        </Sb_Alert>
      <Row>
        <Col md="3">
          <Form.Group className="mb-3" controlId="LoginEmail">
              <Form.Label><Sb_Text font={16}>Project Name</Sb_Text></Form.Label>
              <Form.Select size="sm" placeholder="Name" disabled>
                <option value="">{state.state.name}</option>
              </Form.Select>
					</Form.Group>
        </Col>
        <Col md="3">
          <Form.Group className="mb-3" controlId="LoginEmail">
              <Form.Label><Sb_Text font={16}>Survey Name</Sb_Text></Form.Label>
              <Form.Control size="sm" type="text" placeholder="Name" value={surveyName}
              onChange={(e) => setSurveyName(e.target.value)}/>
					</Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        {
          questions.map((question, index) => (
            <Col md="6" key={index}>
              <Sb_Question key={index + 1} id={question.id} number={index + 1} 
              isLast={questions.length == 1 || questions[0].id == question.id ? true : false}
              state={ questionExists(question.id) ? 'EDIT' : 'ADD'} otherQuestions={questionsData}
              onAddEdit={(id: string, actionType: ActionType, payload: any) => addEditHandler(payload, actionType)} 
              onRemove={(id: string) => removeHandler(id)}/>
            </Col>
          ))
        }
      </Row>

      <Row className="mt-3">
        <Col>
          <Button size="sm" variant="secondary" className="mt-3 float-start" onClick={() => newQuestionHandler()}>
            <Sb_Text font={12} color="--lightGrey">New Question</Sb_Text>
          </Button>
          <Button variant="primary" className="mt-3 float-end" onClick={() => createSurveyHandler(params.pid as string)} disabled={btnLoading}>
            {
              btnLoading ? <Sb_Loader/> : <Sb_Text font={16} color="--lightGrey">Create Survey</Sb_Text>
            }
          </Button>
        </Col>
      </Row>
    </Col>
  )
}