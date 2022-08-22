import { faMinusSquare, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { generateId } from "../../utils/helpers";
import Sb_Checkbox from "../Sb_Checkbox/Sb_Checkbox";
import Sb_Container from "../Sb_Container/Sb_Container";
import Sb_Text from "../Sb_Text/Sb_Text";
import './Sb_Question.css';

export type ActionType = "ADD" | "EDIT";
export type InputType = "CHOICE" | "TEXT" | "MULTI-SELECT";
export interface Choice {
  _id: string,
  text: string
}

export interface ShowPattern {
  hasShow: boolean,
  showIfQues: string,
  ansIs: string
}

interface Props {
  id: string,
  number: number,
  state: ActionType,
  otherQuestions: Payload[],
  isLast?: boolean,
  onRemove: (id: string) => void,
  onAddEdit: (id: string, type: ActionType, payload:any) => void
}

export class Payload {
  constructor(id: string, n: number, q: string, c: Choice[], i: InputType, s: ShowPattern) {
    this.id = id;
    this.number = n;
    this.question = q;
    this.choices = c;
    this.inputType = i;
    this.showPattern = s;
  }
  id: string;
  number: number;
  question: string;
  choices: Choice[];
  inputType: InputType;
  showPattern: ShowPattern;
}

export default function Sb_Question (props:Props) {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState<Choice[]>([{_id:generateId(), text:""}]);
  const [inputType, setInputType] = useState<InputType>("CHOICE");
  const [showPattern, setShowPattern] = useState<ShowPattern>({hasShow: false, showIfQues: "", ansIs: ""})
  const [lastExport, setLastExport] = useState<Payload | null>()

  var {isLast = false} = props;

  function addChoiceHandler() {
    var arr = [...choices];
    arr.push({_id:generateId(), text:""});
    setChoices(arr); 
  }

  function choiceChangeHandler(id:string, value: string) {
    var arr = [...choices];
    arr.forEach((choice) => {
      if (choice._id == id)
        choice.text = value;
    })
    setChoices(arr);
  }

  function choiceRemoveHandler(id: string) {
    if (choices.length > 1) {
      var arr = [...choices];
      setChoices(arr.filter((choice) => choice._id != id));
    }
  }

  function selectChangeHandler(value: string) {
    setInputType(value as InputType)
  }

  function showPatternChangeHandler(target:string, payload?:any) {
    switch (target) {
      case "STATUS":
        var temp = {...showPattern}
        temp.hasShow = !payload;
        setShowPattern(temp)
        break;
      case "QUES":
        var temp = {...showPattern}
        temp.showIfQues = payload;
        setShowPattern(temp)
        break;
      case "ANS":
        var temp = {...showPattern}
        temp.ansIs = payload;
        setShowPattern(temp) 
        break;
    
      default:
        break;
    }
  }

  function addButtonClickHandler() {
    var payload = new Payload(props.id, props.number, question, choices, inputType, showPattern);
    inputType === 'TEXT' ? payload.choices = [] : null
    props.onAddEdit(props.id, props.state, payload);
    setLastExport(payload);
  }

  function hasDifference() {
    if (inputType === 'TEXT') {
      if (lastExport?.question !== question || lastExport.inputType !== inputType || lastExport.showPattern !== showPattern)
        return true
    }
    else {
      if (lastExport?.choices !== choices || lastExport.question !== question || 
        lastExport.inputType !== inputType || lastExport.showPattern !== showPattern)
        return true
      else
        return false
    }
  }
  
  function hasChoices() {
    if (inputType === 'CHOICE' || inputType === 'MULTI-SELECT')
      return choices[0].text != "" ? true : false 
    else
      return true
  }

  function getQuestion(id: string) {
    if (props.otherQuestions.length < 1)
      return {id: id, question: question, choices: choices, inputType: inputType, showPattern: showPattern}
    return props.otherQuestions.filter((question) => question.id === id)[0] ?? {id: id, question: question, choices: choices, inputType: inputType, showPattern: showPattern};
  }

  return (
    <Col className="mb-4">
      <Row>
        <Col className="d-flex align-items-center">
          <Sb_Text font={32} weight={900} color="--primary">#{props.number}</Sb_Text>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <FontAwesomeIcon icon={faMinusSquare} className="question-trash-icon" onClick={() => props.onRemove(props.id)}/>
        </Col>  
      </Row>
      <Row>
        <Col>
          <Sb_Container className="p-3 d-block">
            <Row className="">
              <Col>
                <Form.Group>
                  <Form.Label><Sb_Text font={12}>Question</Sb_Text></Form.Label>
                  <textarea name="question" id="" cols={40} rows={5} className="question-text-area" style={{'fontSize':'12px', 'padding':'1em'}}
                  onChange={(e) => setQuestion(e.target.value)} value={getQuestion(props.id).question}></textarea>
                </Form.Group>
                <div className={`mt-2 ${getQuestion(props.id).inputType === 'TEXT' ? 'd-none' : ''}`}>
                  {
                    getQuestion(props.id).choices.map((choice:Choice, index:number) => (
                      <Form.Group className="mb-3" controlId="ChoiceOption" key={index}>
                        <div className="d-flex justify-content-between align-items-center">
                          <Form.Label>                          
                            <Sb_Text font={12}>Choice Option #{index + 1}</Sb_Text>                  
                          </Form.Label>
                          <FontAwesomeIcon icon={faMinusSquare} className="question-trash-icon" 
                          style={{'fontSize':'16px'}} onClick={() => choiceRemoveHandler(choice._id)}/>        
                        </div>
                        <Form.Control size="sm" type="text" placeholder="Choice" 
                        value={choice.text} onChange={(e) => choiceChangeHandler(choice._id, e.target.value)}/>
                      </Form.Group>
                    ))
                  }   
                  <FontAwesomeIcon icon={faPlusCircle} className="question-plus-icon" onClick={() => addChoiceHandler()}/>               
                </div>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="Select"><Sb_Text font={12}>Input Type</Sb_Text></Form.Label>
                  <Form.Select size="sm" id="Select" onChange={(e) => selectChangeHandler(e.target.value)}>
                    <option value={"CHOICE"}>Choice</option>
                    <option value={"TEXT"}>Text</option>
                    <option value={"MULTI-SELECT"}>Multi Select</option>
                  </Form.Select>
                </Form.Group>
                <div className="show-pattern">
                  
                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-between">
                      <Sb_Text font={12}>Show Pattern</Sb_Text>
                      <Sb_Checkbox disabled={isLast} default={`${getQuestion(props.id).showPattern.hasShow ? 'SELECTED' : 'UNSELECTED'}`}
                      onChange={(state:boolean) => {showPatternChangeHandler("STATUS", state)}}/>
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="QuesSelect"><Sb_Text font={12}>Show If Question...</Sb_Text></Form.Label>
                    <Form.Select size="sm" id={"QuesSelect"+props.id} disabled = {!getQuestion(props.id).showPattern.hasShow}
                    onChange={(e) => showPatternChangeHandler("QUES", e.target.value)}>
                      <option>Choose...</option>
                      {
                        props.otherQuestions.filter((question) => question.inputType !== 'TEXT')
                        .map((question, index) => (
                          <option key={index} value={question.id}>Question #{index + 1}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="AnsSelect"><Sb_Text font={12}>Answer Is...</Sb_Text></Form.Label>
                    <Form.Select size="sm" id={"AnsSelect"+props.id} disabled = {!getQuestion(props.id).showPattern.hasShow}
                    onChange={(e) => showPatternChangeHandler("ANS", e.target.value)}>
                      <option>Choose...</option>
                      {
                        getQuestion(getQuestion(props.id).showPattern.showIfQues)?.choices.map((choice, index) => (
                          <option key={index} value={choice._id}>Choice #{index + 1}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                </div>
                <div>
                  <Button size="sm" className="mt-3 float-end" onClick={() => addButtonClickHandler()} 
                  disabled = { !hasDifference() || (props.state == 'ADD' ? !hasChoices() : false) }>
                    <Sb_Text font={12} color="--lightGrey">{props.state === 'ADD' ? 'Add' : 'Update'}</Sb_Text>
                  </Button>
                </div>
              </Col>
            </Row>
          </Sb_Container>
        </Col>
      </Row>
    </Col>
  )
}

