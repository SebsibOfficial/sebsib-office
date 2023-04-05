import { faShareAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactChild, useContext, useEffect, useState } from "react";
import { Button, Col, Collapse, Pagination, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Modal from "../../components/Sb_Modal/Sb_Modal";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { NotifContext } from "../../states/NotifContext";
import { DeleteSurvey, GetMember, GetResponseList, GetSurvey } from "../../utils/api";
import './View_Survey.css';
import { translateIds, decodeJWT } from "../../utils/helpers";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement } from 'chart.js';
import * as XLSX from "sheetjs-style";
import CryptoJS from "crypto-es";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";
import Sb_Loader from "../../components/Sb_Loader";
import { useAuth } from "../../states/AuthContext";
import { Bar, Pie } from "react-chartjs-2";

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
  expectedMin?: number;
  expectedMax?: number;
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
  const backgroundColor = [
    'rgb(211, 63, 73)',
    'rgb(63, 48, 71)', 
    'rgb(134, 187, 216)',
    'rgb(249, 200, 14)', 
    'rgb(242, 100, 25)',
    'rgb(4, 114, 77)', 
    'rgb(21, 30, 63)'
  ]
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
          var push_count = 0; // How many responses were pushed
          (IRA.answer as []).forEach(IRA_ANS => {
            NewAnswerArray.push(IRA_ANS)
            push_count += 1;
          })
          // The length of the response gap (Input1, Input2...) for multi-text
          var Q_LENGTH = 0;
          EQ_CPY.forEach((EQ, index) => {
            if ((EQ as Question).questionText){
              if ((EQ as Question)._id === IRA.questionId) {
                for (let INNER_INDEX = index; INNER_INDEX < EQ_CPY.length; INNER_INDEX++) {
                  const element = EQ_CPY[INNER_INDEX];
                  if ((element as Question)._id)
                    Q_LENGTH = INNER_INDEX - index - 1;
                }
              }
            }
          })

          for (let index = 0; index < Q_LENGTH - push_count; index++) {
            NewAnswerArray.push("")
          }
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
                  NewAnswerArray.splice(index, 1, (IRA.answer as []).map((ans:string) => { translateIds("ID", IRA.inputType) === "DATE" ? ans.substring(0,10) : ans}).join('\r\n'))
                else
                  NewAnswerArray.splice(index, 1, translateIds("ID", IRA.inputType) === "DATE" ? (IRA.answer as string).substring(0,10) : IRA)
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
      console.log(questions)
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

  function handleStatusChange (checked: boolean) {
    if (checked)
      setSurveyStatus("STARTED")
    else
      setSurveyStatus("STOPPED")
  }

  function ValueFrequency (items:string[]) {
    const result:any = {};

    const itemFreq = items.reduce((acc:any, curr:any) => {
      acc[curr] = (acc[curr] ?? 0) + 1;
      if (acc[curr] >= 3) {
        result[curr] = acc[curr];
      }
      return acc;
    }, {});

    return itemFreq
  }

  function visualize (question: Question):ReactChild {
    switch (translateIds("ID", question.inputType)) {
      case "CHOICE":
        return visualizeChoice(question);
      case "MULTI-SELECT":
        return visualizeMultiSelect(question);
      case "TIME":
        return visualizeTime(question);
      case "DATE":
        return visualizeDate(question);
      case "NUMBER":
        return visualizeNumber(question);
    
      default:
        return (<></>)
    }
  }

  function visualizeChoice (question: Question):ReactChild {
    var LABELS:string[] = []
    var DATA:number[] = []
    var RAW_RES:string[] = []

    for (let index = 0; index < responses.length; index++) {
      const resp = responses[index];
      for (let ANS_INDX = 0; ANS_INDX < resp.answers.length; ANS_INDX++) {
        const answer = resp.answers[ANS_INDX];
        if (answer.questionId === question?._id)
          RAW_RES.push(answer.answer as string)
      }
    }

    const ValFreqObj = ValueFrequency(RAW_RES);

    for (const [key, value] of Object.entries(ValFreqObj)) {
      LABELS.push(getAnswer(key));
      DATA.push(value as number)
    }


    ChartJS.register(ArcElement, Tooltip, Legend, Title);
    var data = {
      labels: LABELS,
      datasets: [
        {
          data: DATA,
          backgroundColor: backgroundColor
        },
      ],
    };

    var options = {
      plugins: {
        legend: {
          position: "right" as const
        },
      }
    }
    return (<div><p className="visual-question">{question?.questionText}</p><Pie data={data} options={options}/></div>)
  }

  function visualizeDate (question: Question):ReactChild {
    var DATA_MNTH_RAW:string[] = []
    var DATA_YEAR_RAW:string[] = []
    var DATA_DAY_RAW:string[] = []
    var LABEL_YEAR:string[] = []
    var LABEL_MNTH:string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var LABEL_DAY:string[] = []
    var RAW_RES:string[] = []

    var YEAR_DATA:number[] = []
    var MNTH_DATA:number[] = []
    var DAY_DATA:number[] = []

    for (let index = 0; index < responses.length; index++) {
      const resp = responses[index];
      for (let ANS_INDX = 0; ANS_INDX < resp.answers.length; ANS_INDX++) {
        const answer = resp.answers[ANS_INDX];
        if (answer.questionId === question?._id){
          RAW_RES.push((answer.answer as string).substring(0,10))
          DATA_MNTH_RAW.push((answer.answer as string).substring(5,7))
          DATA_YEAR_RAW.push((answer.answer as string).substring(0,4))
          DATA_DAY_RAW.push((answer.answer as string).substring(8,10))
        }
      }
    }

    const MNTH_FRQ = ValueFrequency(DATA_MNTH_RAW.sort((a, b) => b.localeCompare(a, undefined, {numeric: true})));
    const DAY_FRQ = ValueFrequency(DATA_DAY_RAW.sort((a, b) => b.localeCompare(a, undefined, {numeric: true})));
    const YEAR_FRQ = ValueFrequency(DATA_YEAR_RAW.sort((a, b) => b.localeCompare(a, undefined, {numeric: true})));

    for (const [key, value] of Object.entries(YEAR_FRQ)) {
      LABEL_YEAR.push(key);
      YEAR_DATA.push(value as number)
    }    
    
    for (const [key, value] of Object.entries(MNTH_FRQ)) 
      MNTH_DATA.push(value as number)

    for (const [key, value] of Object.entries(DAY_FRQ))
      DAY_DATA.push(value as number)
    
    for (let index = 1; index <= 31; index++) 
      LABEL_DAY.push(index.toString())  
    
    const options = { plugins: { legend: { position: "top" as const } } };

    const data_year = {
      labels: LABEL_YEAR,
      datasets: [
        {
          label: "The Year",
          data: YEAR_DATA,
          backgroundColor: backgroundColor[3],
        }
      ],
    };

    const data_mnth = {
      labels: LABEL_MNTH,
      datasets: [
        {
          label: "The Month",
          data: YEAR_DATA,
          backgroundColor: backgroundColor[4],
        }
      ],
    };

    const data_day = {
      labels: LABEL_DAY,
      datasets: [
        {
          label: "The Day",
          data: YEAR_DATA,
          backgroundColor: backgroundColor[5],
        }
      ],
    };

    return (
      <div>
        <Row>
          <div>
            <p className="visual-question">{question?.questionText}</p>
            <Bar options={options} data={data_day} />
          </div>
        </Row>
        <Row>
            <Bar options={options} data={data_mnth} />
        </Row>
        <Row>
            <Bar options={options} data={data_year} />
        </Row>
      </div>
    )
  }

  function visualizeTime (question: Question):ReactChild {
    var RAW_RES:number[] = []
    var LABELS:string[] = []
    var DATA:number[] = []

    for (let index = 0; index < responses.length; index++) {
      const resp = responses[index];
      for (let ANS_INDX = 0; ANS_INDX < resp.answers.length; ANS_INDX++) {
        const answer = resp.answers[ANS_INDX];
        if (answer.questionId === question?._id){
          RAW_RES.push(Number((answer.answer as string).substring(0, 2)))
        }
      }
    }

    // Get frequency
    const ValFreqObj = ValueFrequency(RAW_RES.sort(((a,b) => a - b)).map(r => r.toString()));
    for (const [key, value] of Object.entries(ValFreqObj)) {
      DATA.push(value as number);
      LABELS.push(key+":00");
    }

    ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
    
    const options = { 
      plugins: { 
        legend: { 
          position: "top" as const }, 
          scales: {
            yAxes: [{
              type: 'linear',
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                autoSkip: false
              },
            }]
          } 
      }, 
    };

    const data = {
      labels: LABELS,
      datasets: [
        {
          label: "Hour",
          data: DATA,
          backgroundColor: backgroundColor[4],
        }
      ],
    };

    return (<div><p className="visual-question">{question?.questionText}</p><Bar options={options} data={data} /></div>)
  }

  function visualizeMultiSelect (question: Question):ReactChild {
    var LABELS:string[] = []
    var DATA:number[] = []
    var RAW_RES:string[] = []
    
    for (let index = 0; index < responses.length; index++) {
      const resp = responses[index];
      for (let ANS_INDX = 0; ANS_INDX < resp.answers.length; ANS_INDX++) {
        const answer = resp.answers[ANS_INDX];
        if (answer.questionId === question?._id)
          RAW_RES = RAW_RES.concat(answer.answer as [])
      }
    }

    const ValFreqObj = ValueFrequency(RAW_RES);

    for (const [key, value] of Object.entries(ValFreqObj)) {
      LABELS.push(getAnswer(key));
      DATA.push(value as number)
    }

    ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
    
    const options = { plugins: { legend: { position: "right" as const, display: false }, maintainAspectRatio: false} };

    const data = {
      labels: LABELS,
      datasets: [
        {
          data: DATA,
          backgroundColor: backgroundColor[2],
        },
      ],
    };

    return (<div><p className="visual-question">{question?.questionText}</p><Bar options={options} data={data} /></div>)
  }

  function visualizeNumber (question: Question):ReactChild {
    var LABELS:string[] = []
    var DATA:number[] = []
    var DATA_AVG:number[] = []
    var DATA_RNG:number[] = []
    var DATA_MD:number[] = []
    var RAW_RES:number[] = []
    
    for (let index = 0; index < responses.length; index++) {
      const resp = responses[index];
      for (let ANS_INDX = 0; ANS_INDX < resp.answers.length; ANS_INDX++) {
        const answer = resp.answers[ANS_INDX];
        if (answer.questionId === question?._id)
          RAW_RES.push(answer.answer as number)
      }
    }

    var mode:number = 0
    // Get frequency
    const ValFreqObj = ValueFrequency(RAW_RES.sort(((a,b) => a - b)).map(r => r.toString()));
    for (const [key, value] of Object.entries(ValFreqObj)) {
      LABELS.push(key);
      DATA.push(value as number);
      (value as number) >= mode ? mode = value as number : null;
    }
    // Get Mode
    DATA_MD.push(mode)

    // Get Average/Mean
    DATA_AVG.push(RAW_RES.reduce((a,b) => (a + b) / RAW_RES.length))
    // Get Range
    DATA_RNG.push(RAW_RES.sort((a,b) => b - a)[0] - RAW_RES.sort((a,b) => b - a)[RAW_RES.length - 1])

    ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
    
    const options = { plugins: { legend: { position: "top" as const } } };

    const data = {
      labels: LABELS,
      datasets: [
        {
          label: "Count",
          data: DATA,
          backgroundColor: backgroundColor[2],
        }
      ],
    };

    const data_meta = {
      labels: [""],
      datasets: [
        {
          label: "Average",
          data: DATA_AVG,
          backgroundColor: backgroundColor[3],
        },
        {
          label: "Range",
          data: DATA_RNG,
          backgroundColor: backgroundColor[4],
        },
        {
          label: "Mode",
          data: DATA_MD,
          backgroundColor: backgroundColor[5],
        },
      ],
    };

    return (
      <div>
        <Row>
          <div>
            <p className="visual-question">{question?.questionText}</p>
            <Bar options={options} data={data} />
          </div>
        </Row>
        <Row>
            <Bar options={options} data={data_meta} />
        </Row>
      </div>
    )
  }

  function expectedValDisp (questions: Question[], answer: Answer):string {
    for (let index = 0; index < questions.length; index++) {
      const q = questions[index];
      if (q._id === answer.questionId) {
        if ((answer.answer as number) > (q?.expectedMax ?? 0) || (answer.answer as number) < (q?.expectedMin ?? 0))
          return 'exceedRange CellWithComment'
        else
          return 'IN'
      }
    }
    return 'OUT'
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
            translateIds("ID", decodeJWT(token as string).role) !== "VIEWER" &&
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
            translateIds("ID", decodeJWT(token as string).role) !== "VIEWER" &&
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
            translateIds("ID", decodeJWT(token as string).role) !== "VIEWER" &&
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
                        <td key={Math.random()} style={{'whiteSpace':'pre', }} className={ translateIds("ID", (answer as Answer).inputType) === "NUMBER" ? expectedValDisp(questions, (answer as Answer)) : " "}>
                          <span className="CellComment">Outside Defined Range</span>
                          {(answer as Answer).answer ?? answer}
                        </td>
                      )))
                    }
                  </tr>
                )))
              }
            </tbody>
          </Table>
          <Row className="mb-4">
            <Col className="d-flex m-4" style={{'justifyContent':'center'}}>
              <Pagination className="sb-pagination">
                <Pagination.Item onClick={() => goTo(currPage-1)}>Prev</Pagination.Item>
                {items}
                <Pagination.Item onClick={() => goTo(currPage+1)}>Next</Pagination.Item>
              </Pagination>
            </Col>
          </Row>
          <Row className="justify-content-around">
            {
              questions
              .filter((q) => ["CHOICE", "MULTI-SELECT", "DATE", "TIME", "NUMBER"].includes(translateIds("ID", q.inputType) as string))
              .map((q) => (
                <Col md="5" className="me-4 mb-4 visual-cont">
                  { visualize(q) }
                </Col>
              ))
            }
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