import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Modal from "../../components/Sb_Modal/Sb_Modal";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { NotifContext } from "../../states/NotifContext";
import { DeleteSurvey, GetMember, GetResponseList } from "../../utils/api";
import './View_Survey.css';
import { translateIds } from "../../utils/helpers";
import * as XLSX from "xlsx";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";

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
  const [pageLoading, setPageLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);

  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
  const exportToXLSX = (Jdata:any, fileName:string) => {
    const ws = XLSX.utils.aoa_to_sheet(Jdata);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.writeFile(wb, `${fileName}.xlsx`);
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
          enumr.push(res.data.username);
          modifiedResp[index].enumratorName = res.data.username;
        }
      }      
    }
    //console.log(modifiedResp);
    setResponses(modifiedResp);
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
    return "Choice";
  }

  function formatData (questions: Question[], responses: Response[]) {
    var rows:any[][] = [[]];
    var queses:string[] = [];
    rows.push([state.state.name + ' Generated Report'])
    rows.push([" "]);
    queses.push("Enumrator Name");
    queses.push("Sent Date");
    questions.forEach((question:Question) => {
      queses.push(question.questionText)
    });
    rows.push(queses);
    responses.forEach((response:Response) => {
      let anses:any[] = [];
      anses.push(response.enumratorName);
      anses.push(response.sentDate);
      response.answers.forEach((answer:Answer) => {
        anses.push(answer.answer);
      })
      rows.push(anses);
    })
    return rows;
  }

  return (
    <Col className="veiw-survey">
      <Row className="g-0 mb-3" style={{'margin': 'auto'}}>
        <Sb_Alert>Hey</Sb_Alert>
        <Col>
          <Sb_Text font={32} weight={600}>{state.state.name}</Sb_Text>
        </Col>
        <Col className='text-end'>
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
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Enumrator</th>
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
                responses.map(((response, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{response.enumratorName}</td>
                    <td>{response.sentDate.toString().substring(0, 10)}</td>
                    {
                      response.answers.map((answer => (
                        <td key={answer._id}>
                          {
                            translateIds('ID', answer.inputType) === "CHOICE" || translateIds('ID', answer.inputType) === "MULTI-SELECT"
                            ? getAnswer(translateIds('ID', answer.inputType) as string) : answer.answer
                          }
                        </td>
                      )))
                    }
                  </tr>
                )))
              }
            </tbody>
          </Table>
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
  )
}