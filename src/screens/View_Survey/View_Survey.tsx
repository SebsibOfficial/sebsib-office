import { faShareAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Collapse, Pagination, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Modal from "../../components/Sb_Modal/Sb_Modal";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { NotifContext } from "../../states/NotifContext";
import { DeleteSurvey, GetMember, GetResponseList, GetSurvey } from "../../utils/api";
import './View_Survey.css';
import { translateIds, decodeJWT } from "../../utils/helpers";
// import * as XLSX from "xlsx";
import * as XLSX from "sheetjs-style";
import CryptoJS from "crypto-es";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";
import Sb_Loader from "../../components/Sb_Loader";
import { useAuth } from "../../states/AuthContext";

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
  shortSurveyId: string,
  surveyId: string,
  enumratorId: string,
  enumratorName: string | null,
  geoPoint?: string,
  sentDate: Date,
  name: string,
  answers: Answer[]
}

interface ResponseExpanded {
  _id: string,
  shortSurveyId: string,
  surveyId: string,
  enumratorId: string,
  enumratorName: string | null,
  geoPoint?: string,
  sentDate: Date,
  name: string,
  answers: (Answer | string) []
}

interface Option {
  _id: string,
  text: string
}

interface Question {
  _id: string;
  questionText: string;
  options: Option[];
  inputType: string;
  hasShowPattern: boolean;
  number: number
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
  const [questionsForDisplay, setQuestionsForDisplay] = useState<( Question | Option | string)[]>([]);
  const [responseForDisplay, setResponseForDisplay] = useState<ResponseExpanded[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [collapse, setCollapse] = useState(false);
  const [shortSurveyId, setShortSurveyId] = useState("");
  const [surveydesc, setSurveyDesc] = useState("");
  const [surveyStatus, setSurveyStatus] = useState<"STARTED" | "STOPPED">("STOPPED");
  const [surveyType, setSurveyType] = useState<"REGULAR" | "ONLINE" | "INCENTIVIZED">("REGULAR")
  const {token, setAuthToken} = useAuth();
  
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
  
  /* WORKS */
  /* ------------*/
  const ReOrderAnswers = (IQC: Question[], IRC: Response[]):Response[] => {
    var InputQuestions = clone(IQC) as Question[]; var InputResponses = clone(IRC) as Response[];
    var NewAnswerArray:Answer[] = []
    var QidOrder:string[] = []
    
    for (let index = 0; index < InputQuestions.length; index++) {
      const element = InputQuestions[index];
      QidOrder.push(element._id)
    }
    
    var NewResponseArray:Response[] = []
    
    for (let IRIndex = 0; IRIndex < InputResponses.length; IRIndex++) {
      const IR = InputResponses[IRIndex];
      
      NewAnswerArray = []

      for (let inidex = 0; inidex < QidOrder.length; inidex++) {
        NewAnswerArray.push({_id: "EMP", inputType: "EMP", questionId: QidOrder[inidex], answer: "EMP"})
      }

      for (let indexA = 0; indexA < IR.answers.length; indexA++) {
        const IRA = IR.answers[indexA];
        var placeAt = QidOrder.indexOf(IRA.questionId)
        NewAnswerArray.splice(placeAt, 1, IRA)
      }

      IR.answers = NewAnswerArray
    }

    NewResponseArray = InputResponses
    return NewResponseArray
  }

  /* WORKS */
  /* ------------*/
  const ExpandQuestions = (InputQuestions: Question[], OrderedInputResponses: Response[]):(Question | Option | string)[] => {
    var NewQuestionArray:(Question | Option | string)[] = []
    var OIR_CPY = clone(OrderedInputResponses) as Response[]

    InputQuestions.forEach(IQ => {
      if (translateIds("ID", IQ.inputType)  === "CHOICE" || translateIds("ID", IQ.inputType)  === "MULTI-SELECT") {
        NewQuestionArray.push(IQ)
        IQ.options.forEach(O => {
          NewQuestionArray.push(O)
        })
      }
      else if (translateIds("ID", IQ.inputType) === "MULTI-TEXT") {
        var largestCount = 0
        for (let indexANS = 0; indexANS < OIR_CPY.length; indexANS++) {
          const IR = OIR_CPY[indexANS];
          for (let indexEA = 0; indexEA < IR.answers.length; indexEA++) {
            const IA = IR.answers[indexEA];
            console.log(IA.answer)
            if ((IA.answer as []).length > largestCount && (typeof IA.answer === "object"))
              largestCount = (IA.answer as []).length
          }
          console.log("----------")
        }

        NewQuestionArray.push(IQ)
        for (let index = 0; index < largestCount; index++)
          NewQuestionArray.push("Input "+(index+1))  
      }
      else
        NewQuestionArray.push(IQ)
    })

    return NewQuestionArray
  }

  function clone(obj:any){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
  }

  /* WORKS */
  /* ------------*/
  const ExpandAnswers = (ExpanadedQuestions: (Question | Option | string)[], OrderedInputResponses: Response[]) => {
    var NewResponseArray:ResponseExpanded[] = []
    var NewAnswerArray:(Answer | string)[] = []
    var EQ_CPY = clone(ExpanadedQuestions) as (Question | Option | string)[]

    for (let Rindex = 0; Rindex < OrderedInputResponses.length; Rindex++) {
      const IR = OrderedInputResponses[Rindex];
      NewAnswerArray = []
      for (let indexIR = 0; indexIR < IR.answers.length; indexIR++) {
        const IRA = IR.answers[indexIR];
        
        if (translateIds("ID", IRA.inputType) === "MULTI-SELECT"){
          (IRA.answer as []).forEach(IRA_ANS => {
            EQ_CPY.forEach((EQ, index) => {
              if ((EQ as Option).text) {
                if ((EQ as Option)._id === IRA_ANS)
                  NewAnswerArray[index] = "1"
              }
            })
          })
        }
        else if (translateIds("ID", IRA.inputType) === "CHOICE") {
          EQ_CPY.forEach((EQ, index) => {
            if ((EQ as Option).text) {
              if ((EQ as Option)._id === IRA.answer)
                NewAnswerArray[index] = "1"
              else
                NewAnswerArray[index] = "0"
            }
          })
        }
        else if (translateIds("ID", IRA.inputType) === "MULTI-TEXT" || translateIds("ID", IRA.inputType) === "MULTI-NUMBER") {
          NewAnswerArray.push("→");
          (IRA.answer as []).forEach(IRA_ANS => {
            NewAnswerArray.push(IRA_ANS)
          })
        }
        else if (typeof translateIds("ID", IRA.inputType) === "undefined") {
          EQ_CPY.forEach((EQ, index) => {
            if ((EQ as Question).questionText) {
              if ((EQ as Question)._id === IRA.questionId) {
                  NewAnswerArray.splice(index, 1, "")
              }
            }
          })
        }
        else {
          EQ_CPY.forEach((EQ, index) => {
            if ((EQ as Question).questionText) {
              if ((EQ as Question)._id === IRA.questionId) {
                if (typeof IRA.answer === "object")
                  NewAnswerArray.splice(index, 1, (IRA.answer as []).join('\r\n'))
                else
                  NewAnswerArray.splice(index, 1, IRA.answer)
              }
            }
          })
        }
      }
      
      NewAnswerArray = Array.from(NewAnswerArray, item => typeof item === 'undefined' ? '→' : item);
      
      console.log(NewAnswerArray)
      var temp:ResponseExpanded = IR
      temp.answers = NewAnswerArray
      NewResponseArray.push(temp)
    }

    return NewResponseArray.sort(function(a,b) { return new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime() } )
  }

  const exportToXLSX = (Jdata:any, fileName:string) => {
    const ws = XLSX.utils.aoa_to_sheet(Jdata);
    var wscols = [
      {wch: 30},
      {wch: 20},
    ];

    ws['!cols'] = wscols;
    for (const [key, value] of Object.entries(ws)) {
      // Set Question Row Style
      if ((key.length == 2 && key.charAt(1) == '5')) {
        ws[key].s = { // set the style for target cell
          font: {
            bold: true
          },
        };
      }
      // Set Links Style
      if ((ws[key].v+'').includes(process.env.REACT_APP_FILE_SERVER_URL as string) || (ws[key].v+'').includes("https://maps.google")){
        if (!(ws[key].v+'').includes(',')){
          ws[key].l = { Target: ws[key].v, Tooltip: "View" };
        }
        ws[key].s = { 
          font: {
            underline: true
          },
          color: {rgb: "FF0000FF"}
        };
      }
      // Set Number Format
      if (!isNaN(Number(ws[key].v))) {
        ws[key].v = Number(ws[key].v)
        ws[key].t = 'n'
      }
      // Set Date Format
      if ((ws[key].v+'')[4] == '-' && (ws[key].v+'')[7] == '-' && (ws[key].v+'').length == 16) {
        ws[key].t = 'd'
      }
    }
    // Set Excel Title style
    ws["A2"].s = { // set the style for target cell
      font: {
        name:"Arial",
        sz: 24,
        bold: true,
      },
    };
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  function goTo(page:number) {
    if (page < Math.ceil(responses.length/perPage)){
      setCurrPage(page)
      setArSt(page*perPage); setArEnd(page*perPage + perPage);
    }
  }

  function OrderQuestions (QS: any) {
    var THE_QS:Question[] = clone(QS)
    return THE_QS.sort(function(a,b) { return (a.number - b.number) } )
  }

  async function loadResponses () {
    var res = await GetResponseList(params.sid as string);
    if (res.code == 200) {
      setQuestions(OrderQuestions(res.data.questions));
      await filterResponses(res.data.responses);
      var RDQ = clone(res.data.questions);
      var RDR = clone(res.data.responses);
      setQuestionsForDisplay(ExpandQuestions(OrderQuestions(RDQ), ReOrderAnswers(OrderQuestions(RDQ), RDR)))
      setResponseForDisplay(ExpandAnswers(ExpandQuestions(OrderQuestions(RDQ), ReOrderAnswers(OrderQuestions(RDQ), RDR)), ReOrderAnswers(OrderQuestions(RDQ), RDR)))
      setPageLoading(false);
    } else {
      console.log(res.data);
    }

    GetSurvey(location.pathname.slice(location.pathname.length - 24, location.pathname.length)).then(res => {
      if (res.code == 200){
        setShortSurveyId(res.data.shortSurveyId as string);
      }
    })
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
    loadResponses();
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

  function formatData (questions: (Question | Option | string)[], responses: ResponseExpanded[]) {
    var rows:any[][] = [[]];
    var queses:string[] = [];
    rows.push([state.state.name + ' Generated Report'])
    rows.push(["Generated on : "+new Date().toLocaleDateString()]);
    rows.push([])
    queses.push("Enumrator Name");
    queses.push("Sent From");
    queses.push("Sent Date and Time");
    questions.forEach((question:(Question | Option | string)) => {
      queses.push((question as Question).questionText ?? (question as Option).text ?? question as string)
    });
    rows.push(queses);
    responses.forEach((response:ResponseExpanded) => {
      let anses:any[] = [];
      anses.push(response.enumratorName);
      anses.push(`https://maps.google.com/?q=${(response.geoPoint ?? '' as string).split(',')[0]},${(response.geoPoint ?? '' as string).split(',')[1]}`);
      anses.push(response.sentDate.toString().replace('T',' ').slice(0,16));
      response.answers.forEach((answer:Answer | string) => {
        anses.push(((answer as Answer).answer ?? answer) === "" ? "-" : ((answer as Answer).answer ?? answer));
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
    else if (translateIds('ID', answer.inputType) == 'MULTI-NUMBER' || translateIds('ID', answer.inputType) == 'MULTI-TEXT') {
      if (typeof answer.answer === 'object') {
        var nums:string[] = answer.answer;
        return (
          <>
            {
              nums.map((num, index) => (
                <>
                  { nums.length - 1 == index ? num : num+", " }
                </>
              ))
            }
          </>
        )
      }
    }
    else {
      if (typeof answer.answer === 'object') {
        var anses:string[] = answer.answer;
        return (
          <>
            {
              anses.map((plain_answer, index) => (
                <>
                  { anses.length - 1 == index ? plain_answer : plain_answer+", " }
                </>
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

  function handleStatusChange (checked: boolean) {
    if (checked)
      setSurveyStatus("STARTED")
    else
      setSurveyStatus("STOPPED")
  }
  return (
    pageLoading ? <Sb_Loader full/> :
    <>
    <Col className="veiw-survey">
      <Row className="g-0 mb-3" style={{'margin': 'auto'}}>
        <Sb_Alert>This where you can view the gathered data, not only view but <b>Export</b> it to Excel also. You can <b>Delete</b> the survey and also view the questions and choices of the survey by clicking the <b>View Questionnaire</b> button</Sb_Alert>
        <Col>
          <Sb_Text font={32} weight={600}>{state.state.name}</Sb_Text><br></br><Sb_Text font={12}>ID: {shortSurveyId}</Sb_Text>
        </Col>
        <Col className='text-end'>
          <Button style={{'marginRight': '2em'}} variant="secondary" size="sm" 
          onClick={() => setCollapse(!collapse)}>
            <Sb_Text font={12} color="--lightGrey">{collapse ? "Hide Questionnaire" : "View Questionnaire"}</Sb_Text>
          </Button>
          {
            translateIds("ID", decodeJWT(token as string).role) !== "VISITOR" &&
            <Button style={{'marginRight': '2em'}} variant="secondary" size="sm" 
            onClick={() => navigate("/dashboard/projects/edit-survey/"+params.sid, {state: true})}>
              <Sb_Text font={12} color="--lightGrey">Edit Survey</Sb_Text>
            </Button>
          }

          <Button style={{'marginRight': '2em'}} variant="primary" size="sm" 
          onClick={() => exportToXLSX(formatData(questionsForDisplay, responseForDisplay), state.state.name)}>
            <Sb_Text font={12} color="--lightGrey">Download Excel</Sb_Text>
          </Button>

          {
            translateIds("ID", decodeJWT(token as string).role) !== "VISITOR" &&
            <Button variant="danger" size="sm" onClick={() => setModalState(true)}>
              <Sb_Text font={12} color="--lightGrey">Delete Survey</Sb_Text>
            </Button>
          }
        </Col>
        <Row className="g-0">
          <Col className="d-flex p-0" style={{'transform':'scale(0.7)', 'transformOrigin':'left'}}>
          {
            surveyType == "ONLINE" || surveyType == "INCENTIVIZED" && 
            <>
              <div className="link-share-box">
                <FontAwesomeIcon icon={faShareAlt}/>
              </div>
              <div className="link-container">
                <Sb_Text font={16}>forms.sebsib.com/ytvasb-213basd</Sb_Text>
              </div>
            </>
          }
          </Col>
          
          {
            translateIds("ID", decodeJWT(token as string).role) !== "VISITOR" &&
            <Col md="2" className="d-flex" style={{'justifyContent':'flex-end', 'alignItems':'center'}}>
              <label className="switch">
                <input type="checkbox" onChange={(e) => handleStatusChange(e.target.checked)}/>
                <span className="slider round"></span>
              </label>
              <Sb_Text font={16}>{surveyStatus == "STARTED"? "Started" : "Stopped"}</Sb_Text>
            </Col>
          }
        </Row>
      </Row>
      <Row>
        <Col>
          <Collapse in={collapse}>
          <Row className="form g-0 mb-4 p-4">
            <Row className="mb-3 p-0">
              <Col>
                <Sb_Text font={16}>{surveydesc}</Sb_Text>
              </Col>
            </Row>
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
                <th style={{'display': surveyType == "REGULAR" ? '' : 'none'}}>Enumrator</th>
                <th style={{'display': surveyType == "REGULAR" ? '' : 'none'}}>Sent From</th>
                <th>Date</th>
                {
                  questionsForDisplay.map(((question, index) => (
                     <th key={index}>{(question as Question).questionText ?? (question as Option).text ?? question}</th>
                  )))
                }
              </tr>
            </thead>
            <tbody>
              {
                responseForDisplay.slice(arSt, arEnd).map(((response, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{'display': surveyType == "REGULAR" ? '' : 'none'}}>{response.enumratorName}</td>
                    <td style={{'display': surveyType == "REGULAR" ? '' : 'none'}}>
                      {
                        response.geoPoint != undefined ||  response.geoPoint != null ? 
                        <a href={`https://maps.google.com/?q=${(response.geoPoint as string).split(',')[0]},${(response.geoPoint as string).split(',')[1]}` ?? '-'} target={'_blank'}>View on Google Maps</a> :
                        "-"
                      }
                    </td>
                    <td>{response.sentDate.toString().substring(0, 10)}</td>
                    {
                      response.answers.map((answer => (
                        <td key={Math.random()} style={{'whiteSpace':'pre'}}>
                          {(answer as Answer).answer ?? answer}
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