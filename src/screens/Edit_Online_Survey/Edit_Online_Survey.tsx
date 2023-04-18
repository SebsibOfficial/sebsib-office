import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Question, { ActionType, Payload } from "../../components/Sb_Question/Sb_Question";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { NotifContext } from "../../states/NotifContext";
import { CriticalContext, useCritical } from '../../states/CriticalContext';
import { EditOnlineSurvey, EditSurvey, GetQuestionListForSurvey, SetSurveyPicture } from "../../utils/api";
import { decodeJWT, encrypt, generateId, translateIds } from "../../utils/helpers";
import Sb_Question_V2 from "../../components/Sb_Question_V2/Sb_Question_V2";
import { ChoiceI, ChoicePayload, ChoiceStorage, CreateOnlineSurveyPayload, CreateSurveyPayload, LangPayload, LangStorage, LangVariantI, LooseObject, OnlineQuestionPayload, QuestionObject, QuestionObjectForConversion, QuestionPayload, QuestionStorage, ShowPatternI, ShowPatternPayload, ShowPatternStorage } from "../../utils/interfaces";
import { useAuth } from "../../states/AuthContext";
/* eslint-disable */
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
/* eslint-enable */

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

export default function Edit_Online_Survey () {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const state = useLocation() as StateInterface;
  const Notif = useContext(NotifContext);
  const inputRef = useRef<HTMLInputElement>(null)
  const {token, setAuthToken} = useAuth();
  /*############# STATES ############### */
  /*#################################### */

  const [surveyName, setSurveyName] = useState("");
  const [surveyId, setSurveyId] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const {page, setCriticalpage} = useCritical();
  const [collapse, setCollapse] = useState(false);
  const [fileNameDisp, setFileName] = useState("")
  const [fileObj, setFileObj] = useState();
  const [surveyDesc, setSurveyDesc] = useState("")
  console.log(state.state.name)
  // Empty question storage
  const [QUESTION_STORE, SET_QUESTION_STORE] = useState<QuestionStorage[]>([])
  // Choice storage
  const [CHOICE_STORE, SET_CHOICE_STORE] = useState<ChoiceStorage[]>([])
  // Language object storage
  const [LNG_STORE, SET_LNG_STORE] = useState<LangStorage[]>([])
  // Showpattern object storage
  const [SHPTRN_STORE, SET_SHPTRN_STORE] = useState<ShowPatternStorage[]>([])

  // For warning the user that they have edited something
  useEffect(() => {
    if (surveyName != "") {
      setCriticalpage("CREATE_SURVEY");
    }
  },[surveyName])

  useEffect(() => {
    GetQuestionListForSurvey(params.sid as string).then(res => {
      if (res.code == 200) {
        console.log(res.data)
        setSurveyName(res.data.name)
        setSurveyId(res.data._id)
        setSurveyDesc(res.data.description)
        destructQuestionResp(assignRID(res.data))
      }
      else
        console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  /*------------- METHODS -------------- */
  /*------------------------------------ */

  function assignRID (RESP:any):QuestionObjectForConversion[] {
    var LocalResp:any[] = RESP.questions
    var TemplateQuestion:QuestionObjectForConversion;
    var AssignedQuestions:QuestionObjectForConversion[] = []

    LocalResp.forEach(Q => {
      TemplateQuestion = {
        RID: "",
        required: false,
        hasShowPattern: false,
        inputType: "",
        expectedMin: 0,
        expectedMax: 10000,
        questionText: [],
        options: [],
        showIf: [],
        number: 0
      }
      TemplateQuestion.RID = Q._id;
      TemplateQuestion.questionText = [{RID: "RND_"+(Math.random() * 1000), langId: "en", text: Q.questionText}]
      TemplateQuestion.required = Q.mandatory;
      TemplateQuestion.hasShowPattern = Q.hasShowPattern;
      TemplateQuestion.inputType = Q.inputType;
      TemplateQuestion.number = Q.number;
      var options:ChoiceI[] = [];      
      for (let index = 0; index < (Q.options as []).length; index++) {
        const o:any = (Q.options as [])[index];
        options.push({
          RID: o._id,
          ChoiceText: [{RID: "RND_"+(Math.random() * 1000), langId: "en", text: o.text}]
        })
      }
      TemplateQuestion.options = options;
      TemplateQuestion.showIf = [{RID: "RND_"+(Math.random() * 1000), IfQues: Q.questionId, IfAns: Q.answerId}]
      AssignedQuestions.push(TemplateQuestion);
    })

    return AssignedQuestions;
  }

  function getLangStore (RESP:QuestionObjectForConversion[]):LangStorage[] {
    var LocalResp:QuestionObjectForConversion[] = RESP
    var STR:LangStorage[] = []

    LocalResp.forEach(Q => {
      (Q.options)?.forEach(O => {
        console.log(O);
        (O.ChoiceText).forEach(T => {
          STR.push(T as LangStorage)
        })
      });

      (Q.questionText).forEach(QT => {
        STR.push(QT as LangStorage)
      })
    })

    return STR
  }

  function getChoiceStore (RESP:QuestionObjectForConversion[]):ChoiceStorage[] {
    var LocalResp:QuestionObjectForConversion[] = RESP
    var STR:ChoiceStorage[] = []

    LocalResp.forEach(Q => {
      (Q.options)?.forEach(O => {
        var L_RID:string[] = [];
        (O.ChoiceText).forEach(T => L_RID.push(T.RID));
        STR.push({RID: (O.RID as string), Choice: L_RID})
      });
    })

    return STR
  }

  function getQuestionStore (RESP:QuestionObjectForConversion[]):QuestionStorage[] {
    var LocalResp:QuestionObjectForConversion[] = RESP
    var STR:QuestionStorage[] = []

    LocalResp.forEach(Q => {
      var C_RID:string[] = [];
      var QT_RID:string[] = [];
      var SHPT_RID:string[] = [];
      (Q.options)?.forEach(O => C_RID.push(O.RID));
      (Q.questionText).forEach(QT => QT_RID.push(QT.RID));
      (Q.showIf)?.forEach(SH => SHPT_RID.push(SH.RID));
      STR.push(
        {RID: Q.RID, 
        required: Q.required, 
        hasShowPattern: Q.hasShowPattern, 
        QuestionText: QT_RID, 
        Choices: C_RID, 
        ShowPatterns: SHPT_RID,
        inputType: translateIds("ID", Q.inputType) as string,
        expectedMin: Q.expectedMin,
        expectedMax: Q.expectedMax
      })
    })

    return STR
  }

  function getShowPatternStore (RESP:QuestionObjectForConversion[]):ShowPatternStorage[] {
    var LocalResp:QuestionObjectForConversion[] = RESP
    var STR:ShowPatternStorage[] = []

    LocalResp.forEach(Q => {
      console.log(Q);
      (Q.showIf)?.forEach(SH => {
        STR.push({RID: (SH.RID as string), IfQues: SH.IfQues, IfAns: SH.IfAns})
      });
    })

    return STR
  }

  function destructQuestionResp (RESP_WITH_ID: QuestionObjectForConversion[]) {
    // 1. Load Language Store
    SET_LNG_STORE(getLangStore(RESP_WITH_ID))
    // 2. Load Choice Store
    SET_CHOICE_STORE(getChoiceStore(RESP_WITH_ID))
    // 3. Load Show pattern store
    SET_SHPTRN_STORE(getShowPatternStore(RESP_WITH_ID))
    // 4. Load Question store
    SET_QUESTION_STORE(getQuestionStore(RESP_WITH_ID))

  }

  /* 
  `handleOnAction`
  ---------------
  Recieves the event parameters fired by the <Sb_Question_V2/> component and delegates the to a sub function 
  in accordance with their action type. Eg. Event parameter: ACTION:`ADD` RID:`6416fa6fe0f7c3135e1a3cf7`
  OBJECT:`CHS` TARGET:`WHL`
  Returns void
  */
  function handleOnAction (
    RID: string, ACTION: "ADD" | "DEL" | "MODIF", OBJECT: "SPT" | "CHS" | "QTN" | "LNG",
    TARGET: "IFANS" | "IFQUES" | "REQ" | "HASSP" | "INPTY" | "EXMN" | "EXMX" | "LNID" | "LNTX" | "WHL",
    VALUE?: any
  ) {
    switch (ACTION) {
      case "ADD":
        handleAddEvents(RID, OBJECT, TARGET, VALUE)
        break;
      case "MODIF":
        handleModifEvents(RID, OBJECT, TARGET, VALUE)
        break;
      case "DEL":
        handleDelEvents(RID, OBJECT, TARGET, VALUE)
        break;
      default:
        break;
    }
  }

  /* 
  `handleFileChange`
  ---------------
  Gets then sets the file name and object
  Returns void
  */
  function handleFileChange (e:any) {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    setFileName(fileObj.name)
    setFileObj(fileObj);
  }

  /* 
  `handleAddEvents`
  ---------------
  Gets the <Sb_Question_V2/> event parameters from the `handleOnAction` function and completes tasks (Adds Objects)
  based on the object types to their respective arrays like LNG_STORE, SHPTRN_STORE...
  E.g " ACTION:`ADD` RID:`6416fa6fe0f7c3135e1a3cf7` OBJECT:`CHS` TARGET:`WHL` " will be handled by this function as 
  "Add a Choice Object to the Parent Object with RID 6416fa6fe0f7c3135e1a3cf7"
  Returns void
  */
  function handleAddEvents (RID: string, OBJECT: "SPT" | "CHS" | "QTN" | "LNG", 
  TARGET: "IFANS" | "IFQUES" | "REQ" | "HASSP" | "INPTY" | "EXMN" | "EXMX" | "LNID" | "LNTX" | "WHL", VALUE?: any) {
    switch (OBJECT) {
      case "SPT":
        // Add Empty Show Pattern
        var thePattern = generateId()
        var T_SH_STORE = [...SHPTRN_STORE]
        T_SH_STORE.push({RID: thePattern, IfQues: "", IfAns: ""})
        SET_SHPTRN_STORE(T_SH_STORE)

        // Add to the Question
        var Q_COPY = [...QUESTION_STORE]
        Q_COPY.forEach(Q => Q.RID === RID ? Q.ShowPatterns?.push(thePattern) : null)
        SET_QUESTION_STORE(Q_COPY)
        break;
      case "LNG":
        // Add Language  
        var theLang:string = generateId()
        var T_LN_STORE = [...LNG_STORE]
        T_LN_STORE.push({RID: theLang, langId: "am", text: ""})
        SET_LNG_STORE(T_LN_STORE)

        if (QUESTION_STORE.filter(Q => Q.RID === RID).length != 0) {
          // Add to the Question
          var Q_COPY = [...QUESTION_STORE]
          Q_COPY.forEach(Q => Q.RID === RID ? Q.QuestionText.push(theLang) : null)
          SET_QUESTION_STORE(Q_COPY)
        } 
        else {
          // Add in the Choice
          var C_COPY = [...CHOICE_STORE]
          C_COPY.forEach(C => C.RID === RID ? C.Choice.push(theLang) : null)
          SET_CHOICE_STORE(C_COPY)
        }
        break;
      case "CHS":
        var theLang:string = generateId()
        var theChoice:string = generateId()
        // Add Language
        var T_LN_STORE = [...LNG_STORE]
        T_LN_STORE.push({RID: theLang, langId: "en", text: ""})
        SET_LNG_STORE(T_LN_STORE)

        var T_CH_STORE = [...CHOICE_STORE]
        T_CH_STORE.push({RID: theChoice, Choice: [theLang]})
        SET_CHOICE_STORE(T_CH_STORE)

        // Add to the Question
        var Q_COPY = [...QUESTION_STORE]
        Q_COPY.forEach(Q => Q.RID === RID ? Q.Choices?.push(theChoice) : null)
        SET_QUESTION_STORE(Q_COPY)
        break;
      default:
        break;
    }
  }

  /* 
  `handleDelEvents`
  ---------------
  Gets the <Sb_Question_V2/> event parameters from the `handleOnAction` function and Deletes Objects
  based on thier types from their respective arrays like LNG_STORE, SHPTRN_STORE...
  E.g " ACTION:`DEL` RID:`6416fa6fe0f7c3135e1a3cf7` OBJECT:`CHS` TARGET:`WHL` " will be handled by this function as 
  "DELETE a Choice Object with an RID of 6416fa6fe0f7c3135e1a3cf7"
  Returns void
  */
  function handleDelEvents (RID: string, OBJECT: "SPT" | "CHS" | "QTN" | "LNG", 
  TARGET: "IFANS" | "IFQUES" | "REQ" | "HASSP" | "INPTY" | "EXMN" | "EXMX" | "LNID" | "LNTX" | "WHL", VALUE?: any) {
    switch (OBJECT) {
      // Delete Question
      case "QTN":
        // Delete Question
        var THE_Q = QUESTION_STORE.filter(Q => Q.RID == RID)[0]
        
        var Q_CP = [...QUESTION_STORE]
        .filter(Q => Q.RID !== RID)
        SET_QUESTION_STORE(Q_CP)
      

        // Delete Choices
        var CH_CP = [...CHOICE_STORE]
        .filter(CH => !THE_Q.Choices?.includes(CH.RID))
        SET_CHOICE_STORE(CH_CP)

        // Delete Question and Choice Langs
        var L_CP = [...LNG_STORE]
        .filter(L => !THE_Q.QuestionText.includes(L.RID) && !THE_Q.Choices?.includes(L.RID))
        SET_LNG_STORE(L_CP)     

        // Delete ShowPatterns
        var SH_CP = [...SHPTRN_STORE]
        .filter(SH => !THE_Q.ShowPatterns?.includes(SH.RID))
        SET_SHPTRN_STORE(SH_CP)

        break;
      // Delete ShowPattern 
      case "SPT":
        // Delete from Parent
        var Q_CP = [...QUESTION_STORE]

        // Remove from Parent Question
        Q_CP.forEach(Q => {
          if (Q.ShowPatterns?.includes(RID)) {
            Q.ShowPatterns = Q.ShowPatterns?.filter(SPT => SPT != RID)
          }
        })
        SET_QUESTION_STORE(Q_CP)

        // Delete ShowPatterns
        var SH_CP = [...SHPTRN_STORE]
        .filter(SH => SH.RID !== RID)
        SET_SHPTRN_STORE(SH_CP)
        break;
      // Delete Choice
      case "CHS":
        var THE_CH = CHOICE_STORE.filter(CH => CH.RID === RID)[0]
        // Delete Choices
        var CH_CP = [...CHOICE_STORE]
        .filter(CH => CH.RID !== RID)
        SET_CHOICE_STORE(CH_CP)

        // Delete Choice Langs
        var L_CP = [...LNG_STORE]
        .filter(L => !THE_CH.Choice.includes(L.RID))
        SET_LNG_STORE(L_CP)   
        break;
      // Delete Lang
      case "LNG":
        // Delete from Parent
        var Q_CP = [...QUESTION_STORE]
        var CH_CP = [...CHOICE_STORE]

        // Remove from Parent Question
        Q_CP.forEach(Q => {
          if (Q.QuestionText.includes(RID)) {
            Q.QuestionText = Q.QuestionText.filter(QT => QT != RID)
          }
        })
        SET_QUESTION_STORE(Q_CP)

        // Remove from Parent Choice
        CH_CP.forEach(CH => {
          if (CH.Choice.includes(RID)) {
            CH.Choice = CH.Choice.filter(CHC => CHC != RID)
          }
        })
        SET_CHOICE_STORE(CH_CP)

        // Delete Language
        var L_CP = [...LNG_STORE]
        .filter(L => L.RID !== RID)
        SET_LNG_STORE(L_CP)
        break;
    
      default:
        break;
    }
  }

  /* 
  `handleModifEvents`
  ---------------
  Gets the <Sb_Question_V2/> event parameters from the `handleOnAction` function and Modifies Objects
  based on thier type.
  E.g " ACTION:`MODIF` RID:`6416fa6fe0f7c3135e1a3cf7` OBJECT:`LNG` TARGET:`LNTX` VALUE:`hey` " will be handled by this function as 
  "MODIFY a Language Object with an RID of 6416fa6fe0f7c3135e1a3cf7 by setting the text to `hey`"
  Returns void
  */
  function handleModifEvents (RID: string, OBJECT: "SPT" | "CHS" | "QTN" | "LNG", 
  TARGET: "IFANS" | "IFQUES" | "REQ" | "HASSP" | "INPTY" | "EXMN" | "EXMX" | "LNID" | "LNTX" | "WHL", VALUE?: any) {
    var QN_CP = [...QUESTION_STORE]
    var CH_CP = [...CHOICE_STORE]
    var SHPT = [...SHPTRN_STORE]
    var LNG_CP = [...LNG_STORE]

    switch (TARGET) {
      case "IFANS":
        SHPT.forEach(S => {
          if (S.RID == RID)
            S.IfAns = VALUE as string
        })
        SET_SHPTRN_STORE(SHPT)
        break;
      case "IFQUES":
        SHPT.forEach(S => {
          if (S.RID == RID)
            S.IfQues = VALUE as string
        })
        SET_SHPTRN_STORE(SHPT)
        break;
      case "REQ":
        // Set showpattern off, if the question is required
        if (VALUE as boolean) {
          QN_CP.forEach(Q => {
            if (Q.RID == RID)
              Q.hasShowPattern = false
          })
          SET_QUESTION_STORE(QN_CP)
        }
        QN_CP.forEach(Q => {
          if (Q.RID == RID)
            Q.required = VALUE as boolean
        })
        SET_QUESTION_STORE(QN_CP)
        break;
      case "HASSP":
        if (VALUE as boolean) {
          // Turn Required Off, if there is a Showpattern
          var Q_COPY = [...QUESTION_STORE]
          Q_COPY.forEach(Q => Q.RID === RID ? Q.required = false : null)
          SET_QUESTION_STORE(Q_COPY)
        }
        // Add an Empty Show Pattern if the question doesn't have any
        if (VALUE as boolean && QN_CP.filter(Q => Q.RID == RID)[0].ShowPatterns?.length == 0) {          
          // Add Empty Show Pattern
          var thePattern = generateId()
          var T_SH_STORE = [...SHPTRN_STORE]
          T_SH_STORE.push({RID: thePattern, IfQues: "", IfAns: ""})
          SET_SHPTRN_STORE(T_SH_STORE)

          // Add to the Question
          var Q_COPY = [...QUESTION_STORE]
          Q_COPY.forEach(Q => Q.RID === RID ? Q.ShowPatterns?.push(thePattern) : null)
          SET_QUESTION_STORE(Q_COPY)
        }

        QN_CP.forEach(Q => {
          if (Q.RID == RID)
            Q.hasShowPattern = VALUE as boolean
        })
        SET_QUESTION_STORE(QN_CP)
        break;
      case "INPTY":
        // Remove Choices if the input type changes
        if (VALUE as string != "CHOICE" && VALUE as string != "MULTI-SELECT") {
          var THE_Q = QN_CP.filter(Q => Q.RID == RID)[0]
          var DEAD_CHS = CH_CP.filter(CHS => THE_Q.Choices?.includes(CHS.RID))

          for (let index = 0; index < DEAD_CHS.length; index++) {
            const DCHS = DEAD_CHS[index];
            LNG_CP = LNG_CP.filter(L => !DCHS.Choice.includes(L.RID))
          }

          CH_CP = CH_CP.filter(CHS => !THE_Q.Choices?.includes(CHS.RID))

          QN_CP.forEach(Q => {
            if (Q.RID == RID)
              Q.Choices = []
          })

          SET_QUESTION_STORE(QN_CP)
          SET_CHOICE_STORE(CH_CP)
          SET_LNG_STORE(LNG_CP)
        }

        // If the input type is set to choice or multi select
        if ((VALUE as string == "CHOICE" || VALUE as string == "MULTI-SELECT") && QUESTION_STORE.filter(Q => Q.RID == RID)[0].Choices?.length == 0) {
          console.log(QUESTION_STORE.filter(Q => Q.RID == RID)[0])
          var theLang:string = generateId()
          var theChoice:string = generateId()
          // Add Language
          var T_LN_STORE = [...LNG_STORE]
          T_LN_STORE.push({RID: theLang, langId: "en", text: ""})
          SET_LNG_STORE(T_LN_STORE)

          var T_CH_STORE = [...CHOICE_STORE]
          T_CH_STORE.push({RID: theChoice, Choice: [theLang]})
          SET_CHOICE_STORE(T_CH_STORE)

          // Add to the Question
          var Q_COPY = [...QUESTION_STORE]
          Q_COPY.forEach(Q => Q.RID === RID ? Q.Choices?.push(theChoice) : null)
          SET_QUESTION_STORE(Q_COPY)
        }

        QN_CP.forEach(Q => {
          if (Q.RID == RID)
            Q.inputType = VALUE as string
        })
        SET_QUESTION_STORE(QN_CP)
        break;
      case "EXMN":
        QN_CP.forEach(Q => {
          if (Q.RID == RID)
            Q.expectedMin = VALUE as number
        })
        SET_QUESTION_STORE(QN_CP)
        break;
      case "EXMX":
        QN_CP.forEach(Q => {
          if (Q.RID == RID)
            Q.expectedMax = VALUE as number
        })
        SET_QUESTION_STORE(QN_CP)
        break;
      case "LNID":
        LNG_CP.forEach(L => {
          if (L.RID == RID)
            L.langId = VALUE as "en" | "am" | "or" | "tg"
        })
        SET_LNG_STORE(LNG_CP)
        break;
      case "LNTX":
        LNG_CP.forEach(L => {
          if (L.RID == RID)
            L.text = VALUE as string
        })
        SET_LNG_STORE(LNG_CP)
        break;
      default:
        break;
    }
  }

  /* 
  `handleNewQuestions`
  ---------------
  Generates an empty Question Storage object and adds it to the QUESTION_STORE array
  Returns void
  */
  function handleNewQuestions () {
    var theEnLang = generateId();
    var theChoiceEnLang = generateId();
    var theChoice = generateId();
    
    // Add Languages
    var T_LN_STORE = [...LNG_STORE]
    T_LN_STORE.push({RID: theChoiceEnLang, langId: "en", text: ""})
    T_LN_STORE.push({RID: theEnLang, langId: "en", text: ""})
    SET_LNG_STORE(T_LN_STORE)

    // Add Choice
    var T_CH_STORE = [...CHOICE_STORE]
    T_CH_STORE.push({RID: theChoice, Choice: [theChoiceEnLang]})
    SET_CHOICE_STORE(T_CH_STORE)

    // Add question
    var T_QN_STORE = [...QUESTION_STORE]
    T_QN_STORE.push({RID: generateId(), required: false, hasShowPattern: false, inputType: "CHOICE", QuestionText: [theEnLang], Choices: [theChoice], ShowPatterns: [], expectedMin: 0, expectedMax: 10000})
    SET_QUESTION_STORE(T_QN_STORE)

    setTimeout(() => handleScroll(), 50);
  }

  /* 
  `QuestionComposer`
  ---------------
  This is the main component that takes the different array of Objects (QUESTION_STORE, LNG_STORE, SHPTRN_STORE..)
  and generates a single Question Object.
  Returns QuestionObject
  */
  function QuestionComposer (RID: string): QuestionObject {
    var QSO:QuestionStorage = QUESTION_STORE.filter(Q => Q.RID === RID)[0]

    var QST:LooseObject = {
      RID: QSO.RID,
      required: QSO.required,
      hasShowPattern: QSO.hasShowPattern,
      inputType: QSO.inputType,
      expectedMin: QSO.expectedMin,
      expectedMax: QSO.expectedMax,
    }

    // Get question lang objects
    var QS_QLN:LangVariantI[] = []
    QSO.QuestionText.forEach(QL => {
      QS_QLN.push(getLNG(QL))
    })
    
    // Get choice objects
    var QS_CHS:ChoiceI[] = []
    QSO.Choices?.forEach(CHS => {
      getCHS(CHS) === undefined ? null : QS_CHS.push(getCHS(CHS) as ChoiceI)
    })

    // Get showpattern objects
    var QS_SH:ShowPatternI[] = []
    QSO.ShowPatterns?.forEach(SH => {
      QS_SH.push(getSHPT(SH))
    })

    QST.QuestionText = QS_QLN
    QST.Choices = QS_CHS
    QST.ShowPatterns = QS_SH

    return QST as QuestionObject
  }

  /* 
  `MultiQuestionComposer`
  ---------------
  Uses `QuestionComposer` under the hood and generates Question Objects for all the Question Storage Objects 
  inside QUESTION_STORE
  returns QuestionObject []
  */
  function MultiQuestionComposer (): QuestionObject [] {
    var MultiQ:QuestionObject[] = []

    QUESTION_STORE.forEach((QS, index) => {
      var Q_temp = QuestionComposer(QS.RID);
      Q_temp.number = index+1;
      MultiQ.push(Q_temp)
    })

    return MultiQ
  }

  /* 
  `getLNG`
  ---------------
  Takes the RID of a Language and Returns the Langauge Object
  Returns LangVariantI
  */
  function getLNG (RID: string):LangVariantI {
    return LNG_STORE.filter(L => L.RID === RID)[0]
  }

  /* 
  `getCHS`
  ---------------
  Takes the RID of a Choice and Returns the Choice Object
  Returns ChoiceI
  */
  function getCHS (RID: string):ChoiceI | undefined {
    if (CHOICE_STORE.filter(C => C.RID === RID).length == 0) return undefined
    var LN_IDS = CHOICE_STORE.filter(C => C.RID === RID)[0].Choice
    var CHS:ChoiceI = {RID: "", ChoiceText: []};

    LN_IDS.forEach(L => {
      CHS.ChoiceText.push(getLNG(L))
    })
    CHS.RID = RID
    
    return CHS
  }

  /* 
  `getSHPT`
  ---------------
  Takes the RID of a Showpattern and Returns the Showpattern Object
  Returns ShowPatternI
  */
  function getSHPT (RID: string):ShowPatternI {
    return SHPTRN_STORE.filter(S => S.RID === RID)[0]
  }
  
  /* 
  `handleOnDragEnd`
  ---------------
  Handles what happens when a question is dragged/rearrange. Updates the position/order of a question
  Returns void
  */
  function handleOnDragEnd(result:any) {
    if (!result.destination) return;

    const items = Array.from(QUESTION_STORE);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    SET_QUESTION_STORE(items)
  }

  /* 
  `handleScroll`
  ---------------
  Scrolls the page down when triggered
  Returns void
  */
  function handleScroll () {
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

   /* 
  `generatePayload`
  ---------------
  Transforms the QuestionObject[] state to API compatible
  format. Returns the final payload to be sent
  */
  function generatePayload ():CreateOnlineSurveyPayload {
    var questions:QuestionObject[] = MultiQuestionComposer();
    var payloadQuestion:OnlineQuestionPayload[] = [];

    questions.forEach((question:QuestionObject, index:number) => {
      var Q_Text:LangPayload[] = []
      var Ops:{_id: string, text: string}[] = []
      var Ops_lang:LangPayload[] = []
      var Shps:ShowPatternPayload[] = []

      question.QuestionText.forEach(QT => Q_Text.push({langId: QT.langId, text: QT.text}))
      question.ShowPatterns?.forEach(SHPT => Shps.push({questionId: SHPT.IfQues, answerId: SHPT.IfAns}))
      question.Choices?.forEach(CH => {
        Ops_lang = []
        CH.ChoiceText.forEach(CH_LANG => Ops_lang.push({langId: CH_LANG.langId, text: CH_LANG.text}))
        Ops.push({_id: CH.RID, text: Ops_lang[0].text as string})
      })
      console.log(question.ShowPatterns)
      payloadQuestion.push({
        _id: question.RID,
        showPattern: {
          hasShow: question.hasShowPattern,
          showIfQues: (question.ShowPatterns?.length ?? 0 > 1) ? question.ShowPatterns?.[0].IfQues ?? "" : "",
          ansIs: (question.ShowPatterns?.length ?? 0 > 1) ? question.ShowPatterns?.[0].IfAns ?? "" : ""
        },
        options: Ops,
        questionText: Q_Text[0].text,
        inputType: question.inputType,
        mandatory: question.required,
        number: index + 1,
      })
    })

    return {
      surveyName: surveyName,
      description: surveyDesc,
      filePath: "",
      questions: payloadQuestion
    }
  }

  /* 
  `validatePayload`
  ---------------
  Validating if the question list is correct
  Returns boolean
  */
  function validatePayload ():boolean {
    if (surveyName == "") return false;
    if (QUESTION_STORE.length > 0)
      if (QuestionComposer(QUESTION_STORE[0].RID).QuestionText[0].text == "") return false;
    return true
  }

  /*
    `checkAndUploadFileType`
    ------------------------
    This method will upload the file selected by the user
    It returns 1 if there is no issues, else returns 0.
  */
    const checkAndUploadFileType = async (shortSurveyId: string) => {
      if (fileObj && validateFileType(fileObj)){
        // Check file type
        var nameOfFile = (fileObj as any).name as string
        var ext = nameOfFile.split(".")[nameOfFile.split(".").length - 1] // Get extention
        var formData = new FormData();
        formData.append("file", fileObj); // Append the selected JS file object
        var tm = new Date().getTime();
        try {
          // Send to file server
          var resp = await axios({
            method: 'post',
            headers: {
              secKey: encrypt(tm+'')
            },
            url: process.env.REACT_APP_FILE_SERVER_URL+"/file/upload-pic",
            params: {
              ext: ext,
              project: state.state.name ?? '',
              survey: shortSurveyId,
              account: decodeJWT(token as string).shortOrgId ?? ''
            },
            data: formData,
          })
  
          if (resp.status === 200)
            return resp.data;
          else {
            console.log(resp);
            return 0
          }
        } catch (error) {
          console.log(error);
          return 0
        }
      }
      return 0
    }
  
  /*
    `validateFileType`
    ------------------------
    This method will validate if the file selected is fit for upload
    It returns true if there is no issues, else returns false.
  */
  const validateFileType = (FileObject: any) => {
    if (
      ![
        "image/jpeg",
        "image/png",
      ].includes(FileObject.type) || FileObject.size > 2000000)
        return false
    else return true
  }
  /* 
  `editSurveyHandler`
  ---------------
  Sends the Question Objects to the API
  */
  async function editSurveyHandler (surveyId: string) {
    setBtnLoading(true);

    try {
      var res = await EditOnlineSurvey(surveyId, generatePayload());
      if (res.code == 200) {
        setCriticalpage('');
        var upload_res = await checkAndUploadFileType(res.data.shortSurveyId);
        if (upload_res) await SetSurveyPicture(res.data.shortSurveyId, {pic: decodeJWT(token as string).shortOrgId+"/"+state.state.name.toUpperCase()+"/"+res.data.shortSurveyId+"/"+upload_res.fn})
        else console.log(upload_res)
        console.log(res.data)
        navigate('/dashboard/projects/view-survey/'+surveyId, {state: {name: surveyName, projectName: state.state.name}});
      } else {
        console.log(res.data);
        setBtnLoading(false);
        Notif?.setNotification({code:res.code, type: "ERROR", message: res.data, id:1})
      }
    } catch (error) {
      console.log(error)
      Notif?.setNotification({code:500, type: "ERROR", message: "Server Erro", id:1})
      setBtnLoading(false);
    }
  }

  return (
    <Col>
      <Sb_Alert>To edit a survey modify the survey name, description and even the thumbnail pictures. The modify anything you need including rearranging the question. 
        Click <b>Preview Survey</b> to see what your survey looks like and <b>New Question</b> to add new question. When you finish modifying your questions you can click on <b>Save Changes</b> to create the survey.
        </Sb_Alert>
      <Row>
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided:any) => (
                <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {QUESTION_STORE.map((QST, index) => {
                    console.log(QST)
                    return (
                      <Draggable key={QST.RID} draggableId={QST.RID} index={index}>
                        {(provided:any) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Sb_Question_V2
                            online
                            key={index}
                            number={index+1}
                            question={QuestionComposer(QST.RID)} 
                            otherQuestions={MultiQuestionComposer()} 
                            onAction={(RID: string, ACTION: "ADD" | "DEL" | "MODIF", 
                            OBJECT: "SPT" | "CHS" | "QTN" | "LNG",
                            TARGET: "IFANS" | "IFQUES" | "REQ" | "HASSP" | "INPTY" | "EXMN" | "EXMX" | "LNID" | "LNTX" | "WHL",
                            VALUE?: any) => handleOnAction(RID, ACTION, OBJECT, TARGET, VALUE)}/>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        <Row>
        <Col>          
          <Collapse in={collapse}>
            <Row className="form g-0 mb-4 p-4">
              {
                MultiQuestionComposer().map((question:QuestionObject, index:number) => (
                  <Col md="6" className="pe-4 mb-4" key={index}>
                    <Row className="question-form mb-2 pe-4">
                      <Col>
                        {(index + 1)+". "} <b style={{'color':'var(--primary)'}}>{(question.hasShowPattern ? "[Depends on a previous response]" : "")}</b> {question.QuestionText[0].text} 
                        <b style={{'color':'var(--secondary)'}}>{(question.required ? " [Required]" : "")}</b>
                      </Col>
                    </Row>

                    <Row className="answer-form g-0">
                      {
                        question.inputType == "CHOICE" || question.inputType == "MULTI-SELECT" ?
                        question.Choices?.map((option:ChoiceI, letter:number) => (
                          <Col className="an-answer mb-1" key={letter}>
                            { String.fromCharCode(letter + 65)+". "+option.ChoiceText[0].text}
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
          <Button size="sm" variant="secondary" className="mt-3 float-start" onClick={() => handleNewQuestions()}>
            <Sb_Text font={12} color="--lightGrey">New Question</Sb_Text>
          </Button>
          <Button size="sm" variant="secondary" className="mt-3 float-start ms-4" onClick={() => setCollapse(!collapse)}>
            <Sb_Text font={12} color="--lightGrey">{collapse ? "Hide Preview" : "Preview Survey"}</Sb_Text>
          </Button>
          <Button variant="primary" className="mt-3 float-end" onClick={() => validatePayload() ? editSurveyHandler(params.sid as string) : null} disabled={btnLoading || !validatePayload()}>
            {
              btnLoading ? <Sb_Loader/> : <Sb_Text font={16} color="--lightGrey">Save Changes</Sb_Text>
            }
          </Button>
        </Col>
      </Row>
    </Col>
  )
}