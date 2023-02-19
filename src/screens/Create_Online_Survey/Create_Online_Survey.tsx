import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Question, { ActionType, Payload } from "../../components/Sb_Question/Sb_Question";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { NotifContext } from "../../states/NotifContext";
import { CriticalContext, useCritical } from '../../states/CriticalContext';
import { CreateSurvey } from "../../utils/api";
import { generateId, translateIds } from "../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faFileUpload, faShare, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import "./Create_Online_Survey.css"

export class FinalPayload {
  constructor (sn: string, sd: string, fp: string, pl: Payload[]) {
    this.surveyName = sn;
    this.surveyDesc = sd;
    this.filePath = fp;
    this.questions = pl;
  }
  surveyName: string;
  surveyDesc: string;
  filePath: string;
  questions: Payload[];
}

interface StateInterface {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: {name: string},
}

export default function Create_Online_Survey () {
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
  const [fileNameDisp, setFileNameDisp] = useState("");
  const [fileObj, setFileObj] = useState();
  const [surveyDesc, setSurveyDesc] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const {page, setCriticalpage} = useCritical();
  const [collapse, setCollapse] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [succesCreation, setSuccessCreation] = useState(true);
  
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

  const handleFileChange = (e:any) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    setFileNameDisp(fileObj.name)
    setFileObj(fileObj);
  };

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
    // TODO 
    /* 
      1. Upload photo to FTP
      2. Use the path, to add to database
    */
    // var res = await CreateSurvey(projId, new FinalPayload(surveyName, questionsData));
    // if (res.code == 200) {
    //   setCriticalpage('');
    //   navigate('/dashboard/projects', {state: true});
    // } else {
    //   console.log(res.data);
    //   setBtnLoading(false);
    //   Notif?.setNotification({code:res.code, type: "ERROR", message: res.data, id:1})
    // }
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

  function onFinishHandler () {

  }

  return (
    <>
      {succesCreation ? 
      <>
        <Col>
          <Sb_Alert>Your survey has successfully been created, Hurray!! You can now share this link to anyone and they can fill in your survey.
          </Sb_Alert>
          <Row>
            <Row>
              <div className="d-flex mb-4">
                <FontAwesomeIcon icon={faCheckCircle} style={{'color':'var(--yellow)', 'fontSize':'2em', 'marginRight':'0.5em'}}/>
                <Sb_Text font={20}>Online Survey Created Successfully, Here is the link:</Sb_Text>
              </div>
              <div className="d-flex mb-4">
                <div className="link-share-box">
                  <FontAwesomeIcon icon={faShareAlt}/>
                </div>
                <div className="link-container">
                  <Sb_Text font={16}>forms.sebsib.com/ytvasb-213basd</Sb_Text>
                </div>
              </div>
              <div>
                <Button variant="primary" onClick={() => onFinishHandler()}><Sb_Text color="--lightGrey" font={16}>Finish</Sb_Text></Button>
              </div>
            </Row>
          </Row>
        </Col>
      </> : 
      <>
        <Col>
          <Sb_Alert>To create a survey first enter the survey name, then fill out the questions, choices and the question type. 
            After creating a question you must <b>Confirm</b> it. When you want to create more question click the <b>New Question</b> button below the questions.
            If you want to implement a Skip Pattern, tick the <b>Show Pattern</b> circle, select the question that this question depends on, then select what answer will show this question.
            Click <b>Preview Survey</b> to see what your survey looks like. When you finish creating your questions you can click on <b>Create Survey</b> to create the survey.
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
          <Row>
            <Col md="5">
              <Form.Group className="mb-3" controlId="LoginEmail">
                  <Form.Label><Sb_Text font={16}>Survey Thumbnail Image</Sb_Text></Form.Label>
                  <div>
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{'display':'flex','alignItems':'center'}}>
                    <Button onClick={() => inputRef.current?.click()} variant="secondary" size="sm" style={{'marginRight':'1em'}} >
                      <FontAwesomeIcon icon={faFileUpload} style={{'marginRight':'10px'}}/>
                      File Upload
                    </Button>
                    <Sb_Text>{fileNameDisp}</Sb_Text>
                  </div>
                </div>
              </Form.Group>
            </Col>    
          </Row>
          <Row>
            <Col>
            <Form.Label><Sb_Text font={16}>Survey Description</Sb_Text></Form.Label>
            <Form.Group>
              <textarea name="question" id="" cols={75} rows={2} className="question-text-area" style={{'fontSize':'12px', 'padding':'1em'}}
              onChange={(e) => setSurveyDesc(e.target.value)}></textarea>
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
            <Row>
            <Col>          
              <Collapse in={collapse}>
                <Row className="form g-0 mb-4 p-4">
                  {
                    questionsData.map((question:Payload, index:number) => (
                      <Col md="6" className="pe-4 mb-4" key={index}>
                        <Row className="question-form mb-2 pe-4">
                          <Col>
                            {(index + 1)+". "} <b style={{'color':'var(--primary)'}}>{(question.showPattern.hasShow ? "[Depends on a previous response]" : "")}</b> {question.question} 
                            <b style={{'color':'var(--secondary)'}}>{(question.mandatory ? " [Required]" : "")}</b>
                          </Col>
                        </Row>
                        {console.log(question.inputType)}
                        <Row className="answer-form g-0">
                          {
                            question.inputType == "CHOICE" || question.inputType == "MULTI-SELECT" ?
                            question.choices.map((option:any, letter:number) => (
                              <Col className="an-answer mb-1" key={letter}>
                                { String.fromCharCode(letter + 65)+". "+option.text}
                              </Col>
                            )) :
                            <Col className="an-answer mb-1 text-answer"></Col>
                          }
                        </Row>
                      </Col>
                    ))
                  }
                </Row>
              </Collapse>
            </Col>
            </Row>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button size="sm" variant="secondary" className="mt-3 float-start" onClick={() => newQuestionHandler()}>
                <Sb_Text font={12} color="--lightGrey">New Question</Sb_Text>
              </Button>
              <Button size="sm" variant="secondary" className="mt-3 float-start ms-4" onClick={() => setCollapse(!collapse)}>
                <Sb_Text font={12} color="--lightGrey">{collapse ? "Hide Preview" : "Preview Survey"}</Sb_Text>
              </Button>
              <Button variant="primary" className="mt-3 float-end" onClick={() => createSurveyHandler(params.pid as string)} disabled={btnLoading}>
                {
                  btnLoading ? <Sb_Loader/> : <Sb_Text font={16} color="--lightGrey">Create Survey</Sb_Text>
                }
              </Button>
            </Col>
          </Row>
        </Col>
      </>}
    </>
  )
}