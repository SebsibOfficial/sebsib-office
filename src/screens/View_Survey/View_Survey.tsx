import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Collapse, Pagination, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Modal from "../../components/Sb_Modal/Sb_Modal";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { NotifContext } from "../../states/NotifContext";
import { DeleteSurvey, GetMember, GetResponseList } from "../../utils/api";
import './View_Survey.css';
import { translateIds } from "../../utils/helpers";
import * as XLSX from "xlsx";
import CryptoJS from "crypto-es";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";
import Sb_Loader from "../../components/Sb_Loader";

interface StateInterface {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: {name: string, projectId: string},
}

interface Answer {
  _id: string,
  inputType: string,
  questionId: string,
  answer: any
}

interface Response {
  _id: string,
  surveyId: string,
  enumratorId: string,
  enumratorName: string | null,
  geoPoint?: string,
  sentDate: Date,
  name: string,
  answers: Answer[]
}

interface Question {
  id: string;
  questionText: string;
  options: {
    _id: string,
    text: string
  }[];
  inputType: string;
  hasShowPattern: boolean;
}

export default function View_Survey () {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const Notif = useContext(NotifContext);
  const state = useLocation() as StateInterface;
  const [modalState, setModalState] = useState(false);
  const [arSt, setArSt] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currPage, setCurrPage] = useState(0);
  const [arEnd, setArEnd] = useState(10);
  const [pageLoading, setPageLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [collapse, setCollapse] = useState(false);

  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
  let items = [];
  for (let number = 1; number <= Math.ceil(responses.length/perPage); number++) {
    items.push(
      <Pagination.Item key={number} active={number === currPage + 1} onClick={() => goTo(number-1)}>
        {number}
      </Pagination.Item>,
    );
}

  const exportToXLSX = (Jdata:any, fileName:string) => {
    const ws = XLSX.utils.aoa_to_sheet(Jdata);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  function goTo(page:number) {
    if (page < Math.ceil(responses.length/perPage)){
      setCurrPage(page)
      setArSt(page*perPage); setArEnd(page*perPage + perPage);
    }
  }

  async function loadResponses () {
    var res = await GetResponseList(params.sid as string);
    if (res.code == 200) {
      console.log(res.data.questions);
      setQuestions(res.data.questions);
      await filterResponses(res.data.responses);
      setPageLoading(false);
    } else {
      console.log(res.data);
    }
  }

  async function filterResponses (responses:Response[]) {
    var enumr:string[] = [];
    var resp:string[] = [];
    var modifiedResp:Response[] = responses;
    for (let index = 0; index < responses.length; index++) {
      if (resp.includes(responses[index]._id)) {
        modifiedResp[index].enumratorName = enumr[resp.findIndex((rsp) => rsp == responses[index]._id)];
      }
      else {
        var res = await GetMember(responses[index].enumratorId);
        if (res.code == 200) {
          resp.push(responses[index]._id);
          enumr.push(res.data.firstName+' '+res.data.lastName);
          modifiedResp[index].enumratorName = res.data.firstName+' '+res.data.lastName;
        }
      }      
    }
    //console.log(modifiedResp);
    setResponses(modifiedResp.sort(function(a,b) { return new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime() } ));
  }

  useEffect(() => {
    loadResponses()
  }, [])

  async function deleteSurveyHandler () {
    setPageLoading(true);
    setModalState(false);
    var res = await DeleteSurvey(state.state.projectId, params.sid as string);
    if (res.code == 200) {
      navigate("/dashboard/projects", {state: true});
    } else {
      console.log(res.data.message);
      Notif?.setNotification({type:"ERROR", message:res.data.message, id:1})
    }
    setPageLoading(false);
  }

  function getAnswer (id: string):string {
    var output:string[] = [];
    if (typeof id === 'object') {
      var ids:string[] = id;
      questions.forEach((question) => {
        question.options.forEach((option) => {
          ids.forEach(ID => {
            if (option._id == ID) output.push(option.text) 
          })
        })
      })
      return output.join(", ")
    }
    else if (typeof id === 'string') {
      questions.forEach((question) => {
        question.options.forEach((option) => {      
          if (option._id == id){
            output.push(option.text)
          }
        })
      })
      return output.join()
    }
    return 'Not found';
  }

  function encryptPath (path: string) {
    var encrypted = CryptoJS.Rabbit.encrypt(path, process.env.REACT_APP_PRIVATE_KEY);
    return encrypted.toString().replaceAll('/', '*');
  }

  function formatData (questions: Question[], responses: Response[]) {
    var rows:any[][] = [[]];
    var queses:string[] = [];
    rows.push([state.state.name + ' Generated Report'])
    rows.push([" "]);
    queses.push("Enumrator Name");
    queses.push("Sent Date and Time");
    questions.forEach((question:Question) => {
      queses.push(question.questionText)
    });
    rows.push(queses);
    responses.forEach((response:Response) => {
      let anses:any[] = [];
      anses.push(response.enumratorName);
      anses.push(response.sentDate.toString().replace('T',' ').slice(0,16));
      response.answers.forEach((answer:Answer) => {
        //anses.push(translateIds('ID', answer.inputType) == 'TEXT' ? answer.answer : getAnswer(answer.answer));
        anses.push(properDisplayString(answer));
      })
      rows.push(anses);
    })
    return rows;
  }

  function properDisplayString (answer:Answer) {
    if (translateIds('ID', answer.inputType) == 'CHOICE' || translateIds('ID', answer.inputType) == 'MULTI-SELECT') {
      return getAnswer(answer.answer as string)
    }
    else if (translateIds('ID', answer.inputType) == 'MULTI-PHOTO' || translateIds('ID', answer.inputType) == 'MULTI-FILE') {
      if (typeof answer.answer === 'object') {
        var paths:string[] = answer.answer;
        var out_p:string = "";
        paths.map((path) => {
          out_p = out_p.concat(`${process.env.REACT_APP_FILE_SERVER_URL+encryptPath(path)} ,`)
        })
        return out_p
      }
      else if (typeof answer.answer === 'string') {
        return `${process.env.REACT_APP_FILE_SERVER_URL+encryptPath(answer.answer)}`
      }
    }
    else if (translateIds('ID', answer.inputType) == 'PHOTO' || translateIds('ID', answer.inputType) == 'FILE') {
      return `${process.env.REACT_APP_FILE_SERVER_URL+encryptPath(answer.answer)}`
    }
    else if (translateIds('ID', answer.inputType) == 'GEO-POINT' || translateIds('ID', answer.inputType) == 'MULTI-GEO-POINT') {
      if (typeof answer.answer === 'object') {
        var locs:string[] = answer.answer;
        var out_g = ""
        locs.map((loc) => {
          out_g = out_g.concat(`https://maps.google.com/?q=${(loc as string).split(',')[0]},${(loc as string).split(',')[1]} ,`)
        })
        return out_g
      }
      else if (typeof answer.answer === 'string') {
        return `https://maps.google.com/?q=${(answer.answer as string).split(',')[0]},${(answer.answer as string).split(',')[1]}`
      }
    }
    else {
      if (typeof answer.answer === 'object') {
        var anses:string[] = answer.answer;
        var out_pl = "";
        anses.map((plain_answer) => (
          out_pl = out_pl.concat(plain_answer+' ,')
        ))
        return out_pl
      }
      else if (typeof answer.answer === 'string') {
        return answer.answer
      }
    }
  }

  function properDisplay (answer:Answer) {
    if (translateIds('ID', answer.inputType) == 'CHOICE' || translateIds('ID', answer.inputType) == 'MULTI-SELECT') {
      return getAnswer(answer.answer as string)
    }
    else if (translateIds('ID', answer.inputType) == 'MULTI-PHOTO' || translateIds('ID', answer.inputType) == 'MULTI-FILE') {
      if (typeof answer.answer === 'object') {
        var paths:string[] = answer.answer;
        return (
          <>
            {
              paths.map((path) => (
                <a className="d-block" href={`${process.env.REACT_APP_FILE_SERVER_URL+encryptPath(path)}`} target={'_blank'}>View File/Photo</a>
              ))
            }
          </>
        )
      }
      else if (typeof answer.answer === 'string') {
        return (        
          <a href={`${process.env.REACT_APP_FILE_SERVER_URL+encryptPath(answer.answer)}`} target={'_blank'}>View File/Photo</a>
        )
      }
    }
    else if (translateIds('ID', answer.inputType) == 'PHOTO' || translateIds('ID', answer.inputType) == 'FILE') {
      return (        
        <a href={`${process.env.REACT_APP_FILE_SERVER_URL+encryptPath(answer.answer)}`} target={'_blank'}>View File/Photo</a>
      )
    }
    else if (translateIds('ID', answer.inputType) == 'GEO-POINT' || translateIds('ID', answer.inputType) == 'MULTI-GEO-POINT') {
      if (typeof answer.answer === 'object') {
        var locs:string[] = answer.answer;
        return (
          <>
            {
              locs.map((loc) => (
                <a className="d-block" href={`https://maps.google.com/?q=${(loc as string).split(',')[0]},${(loc as string).split(',')[1]}`} target={'_blank'}>View On Google Maps</a>
              ))
            }
          </>
        )
      }
      else if (typeof answer.answer === 'string') {
        return (        
          <a className="d-block" href={`https://maps.google.com/?q=${(answer.answer as string).split(',')[0]},${(answer.answer as string).split(',')[1]}`} target={'_blank'}>
            View On Google Maps
            </a>
        )
      }
    }
    else {
      if (typeof answer.answer === 'object') {
        var anses:string[] = answer.answer;
        return (
          <>
            {
              anses.map((plain_answer) => (
                plain_answer
              ))
            }
          </>
        )
      }
      else if (typeof answer.answer === 'string') {
        return (        
          answer.answer
        )
      }
    }
  }

  return (
    pageLoading ? <Sb_Loader full/> :
    <>
    <Col className="veiw-survey">
      <Row className="g-0 mb-3" style={{'margin': 'auto'}}>
        <Sb_Alert>This where you can view the gathered data, not only view but <b>Export</b> it to Excel also. You can <b>Delete</b> the survey and also view the questions and choices of the survey by clicking the <b>View Questionnaire</b> button</Sb_Alert>
        <Col>
          <Sb_Text font={32} weight={600}>{state.state.name}</Sb_Text>
        </Col>
        <Col className='text-end'>
          <Button style={{'marginRight': '2em'}} variant="secondary" size="sm" 
          onClick={() => setCollapse(!collapse)}>
            <Sb_Text font={12} color="--lightGrey">{collapse ? "Hide Questionnaire" : "View Questionnaire"}</Sb_Text>
          </Button>
          <Button style={{'marginRight': '2em'}} variant="primary" size="sm" 
          onClick={() => exportToXLSX(formatData(questions, responses), state.state.name)}>
            <Sb_Text font={12} color="--lightGrey">Download Excel</Sb_Text>
          </Button>
          <Button variant="danger" size="sm" onClick={() => setModalState(true)}>
            <Sb_Text font={12} color="--lightGrey">Delete Survey</Sb_Text>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Collapse in={collapse}>
          <Row className="form g-0 mb-4 p-4">
            {
              questions.map((question:Question, index:number) => (
                <Col md="6" className="pe-4 mb-4">
                  <Row className="question-form mb-2 pe-4">
                    <Col>
                      {(index + 1)+". "} <b style={{'color':'var(--primary)'}}>{(question.hasShowPattern ? "[Depends on a previous response]" : "")}</b> {question.questionText} 
                    </Col>
                  </Row>
                  <Row className="answer-form g-0">
                    {
                      translateIds('ID', question.inputType) == "CHOICE" || translateIds('ID', question.inputType) == "MULTI-SELECT"?
                      question.options.map((option:any, letter:number) => (
                        <Col className="an-answer mb-1">
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
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Enumrator</th>
                <th>Sent From</th>
                <th>Date</th>
                {
                  questions.map(((question, index) => (
                    <th key={index}>{question.questionText}</th>
                  )))
                }
              </tr>
            </thead>
            <tbody>
              {
                responses.slice(arSt, arEnd).map(((response, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{response.enumratorName}</td>
                    <td>
                      {
                        response.geoPoint != undefined ||  response.geoPoint != null ? 
                        <a href={`https://maps.google.com/?q=${(response.geoPoint as string).split(',')[0]},${(response.geoPoint as string).split(',')[1]}` ?? '-'}>View on Google Maps</a> :
                        "-"
                      }
                    </td>
                    <td>{response.sentDate.toString().substring(0, 10)}</td>
                    {
                      response.answers.map((answer => (
                        <td key={answer._id}>
                          {
                            properDisplay(answer)
                          }
                        </td>
                      )))
                    }
                  </tr>
                )))
              }
            </tbody>
          </Table>
          <Row>
            <Col className="d-flex m-4" style={{'justifyContent':'center'}}>
              <Pagination className="sb-pagination">
                <Pagination.Item onClick={() => goTo(currPage-1)}>Prev</Pagination.Item>
                {items}
                <Pagination.Item onClick={() => goTo(currPage+1)}>Next</Pagination.Item>
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* ---------------------------------The Modal------------------------------------------------------ */}
      <Sb_Modal show={modalState} onHide={() => setModalState(false)} width={30}>
          <>
            <div className="d-block text-center" style={{'fontSize':'4em'}}>
              <FontAwesomeIcon icon={faTrash}/>
              <Sb_Text font={20} weight={500} align="center">Are you sure you want to delete this survey?
               You will lose all your responses.</Sb_Text>
            </div>
            <div>
              <Button variant="danger" size="sm" className="mt-3 float-start" onClick={() => deleteSurveyHandler()}>
                <Sb_Text font={16} color="--lightGrey">Continue</Sb_Text>
              </Button>
              <Button variant="secondary" size="sm" className="mt-3 float-end"  onClick={() => setModalState(false)}>
                <Sb_Text font={16} color="--lightGrey">Cancel</Sb_Text>
              </Button>
            </div>
          </>        
      </Sb_Modal>
    </Col>
    </>
  )
}