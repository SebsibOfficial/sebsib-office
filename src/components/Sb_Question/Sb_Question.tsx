import { faMinusSquare, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import Sb_Checkbox from "../Sb_Checkbox/Sb_Checkbox";
import Sb_Container from "../Sb_Container/Sb_Container";
import Sb_Text from "../Sb_Text/Sb_Text";
import './Sb_Question.css';

type ActionType = "ADD" | "EDIT";

interface Choice {
  id: string,
  choice: string
}

interface ShowPattern {
  hasShow: boolean,
  showIfQues: string | null,
  ansIs: string | null
}

interface Props {
  id: string,
  number: number,
  onRemove: (id: string) => void,
  onAddEdit: (id: string, type: ActionType, payload:any) => void
}

export default function Sb_Question (props:Props) {
  const [compState, setCompState] = useState<ActionType>("ADD");
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState<Choice[]>([{id:"ch12", choice:"Choice One"}, {id:"ch34", choice:"Choice Two"}]);
  const [inputType, setInputType] = useState("CHOICE");
  const [showPattern, setShowPattern] = useState<ShowPattern>({hasShow: false, showIfQues: null, ansIs: null})

  function addChoiceHandler() {}
  function choiceChangeHandler(index:number) {}
  function choiceRemoveHandler(index:number) {}
  function questionChangeHandler() {}
  function selectChangeHandler() {}
  function showPatternChangeHandler(target:string, state?:boolean) {}
  function addButtonClickHandler() {}
  
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
                  onChange={() => questionChangeHandler()}>{question}</textarea>
                </Form.Group>
                <div>
                  {
                    choices.map((choice:Choice, index:number) => (
                      <Form.Group className="mb-3" controlId="ChoiceOption">
                        <div className="d-flex justify-content-between align-items-center">
                          <Form.Label>                          
                            <Sb_Text font={12}>Choice Option #{index + 1}</Sb_Text>                  
                          </Form.Label>
                          <FontAwesomeIcon icon={faMinusSquare} className="question-trash-icon" 
                          style={{'fontSize':'16px'}} onClick={() => choiceRemoveHandler(index)}/>        
                        </div>
                        <Form.Control size="sm" type="text" placeholder="Choice" 
                        value={choice.choice} onChange={() => choiceChangeHandler(index)}/>
                      </Form.Group>
                    ))
                  }                  
                </div>
                <FontAwesomeIcon icon={faPlusCircle} className="question-plus-icon" onClick={() => addChoiceHandler()}/>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="Select"><Sb_Text font={12}>Input Type</Sb_Text></Form.Label>
                  <Form.Select size="sm" id="Select" onChange={() => selectChangeHandler()}>
                    <option>Choice</option>
                  </Form.Select>
                </Form.Group>
                <div className="show-pattern">
                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-between">
                      <Sb_Text font={12}>Show Pattern</Sb_Text>
                      <Sb_Checkbox default="SELECTED" onChange={(state:boolean) => showPatternChangeHandler("STATUS", !state)}/>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="QuesSelect"><Sb_Text font={12}>Show If Question...</Sb_Text></Form.Label>
                    <Form.Select size="sm" id="QuesSelect" onChange={() => showPatternChangeHandler("QUES")}>
                      <option>Choose...</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="AnsSelect"><Sb_Text font={12}>Answer Is...</Sb_Text></Form.Label>
                    <Form.Select size="sm" id="AnsSelect" onChange={() => showPatternChangeHandler("ANS")}>
                      <option>Choose...</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div>
                  <Button size="sm" className="mt-3 float-end" onClick={() => addButtonClickHandler()}>
                    <Sb_Text font={12} color="--lightGrey">Add</Sb_Text>
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

