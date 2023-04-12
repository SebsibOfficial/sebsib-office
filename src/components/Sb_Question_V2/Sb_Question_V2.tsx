import { faBars, faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactChild, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { LangVariantI, QuestionComponent, QuestionObject } from '../../utils/interfaces'
import Sb_Checkbox from '../Sb_Checkbox/Sb_Checkbox'
import Sb_Checkbox_V2 from '../Sb_Checkbox_V2/Sb_Checkbox_V2'
import Sb_Text from '../Sb_Text/Sb_Text'
import './Sb_Question_V2.css'

export default function Sb_Question_V2 (props: QuestionComponent) {
  const online = props.online ? props.online : false;
  // Check if the language has been added for a question or choice
  function isThisLangOk (langs: LangVariantI[], checkFor: string):boolean {
    for (let index = 0; index < langs.length; index++) {
      const element = langs[index];
      if (element.langId == checkFor)
        return false
    }
    return true
  }

  return (
    <div className='dragged'>
      <Row className='question-header my-3'>
        <Col className='header-col'>
          <Sb_Text font={24} weight={900}>#{props.number}</Sb_Text>
        </Col>
        <Col className='header-col justify-content-center'>
          <FontAwesomeIcon icon={faBars} style={{'transform':'scaleX(1.5)', 'cursor':'grab'}}/>
        </Col>
        <Col className='header-col justify-content-end'>
          <FontAwesomeIcon icon={faTrash} style={{'color':'var(--DangerRed)', 'cursor':'pointer', 'fontSize':'1.2em', 'display': props.otherQuestions.length > 1 ? '' : 'none'}}
          onClick={() => props.otherQuestions.length > 1 ? props.onAction(props.question.RID, "DEL", "QTN", "WHL") : null}/>
        </Col>
      </Row>
      
      {/* ------------------------------------------------------------------------------------ */}
      
      <Row className='main-question-body'>
        <Col className='q-col question-col'>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label><Sb_Text font={12}>Question in English</Sb_Text></Form.Label>
                <textarea className='question-text-area' name="question" id="" cols={40} rows={5}
                onChange={(e) => props.onAction(props.question.QuestionText.filter((Q) => Q.langId === "en")[0].RID, "MODIF", "LNG", "LNTX", e.target.value)} 
                value={props.question.QuestionText.filter((Q) => Q.langId == "en")[0].text}
                ></textarea>
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
            {/* Iteratable for Langs */}
            {
              props.question.QuestionText
              .filter((Q) => Q.langId !== "en")
              .map((Q, index) => (
                <Row className='lang-container g-0' key={index}>
                  <Col md="4" className='me-2'>
                    <Form.Group>
                      <Form.Label><Sb_Text font={12}>Language</Sb_Text></Form.Label>
                      <Form.Select size='sm' value={Q.langId} onChange={(e) => props.onAction(Q.RID, "MODIF", "LNG", "LNID", e.target.value)}>
                        <option value="am" disabled={!isThisLangOk(props.question.QuestionText, "am")}>አማርኛ</option>
                        <option value="or" disabled={!isThisLangOk(props.question.QuestionText, "or")}>Af.Oromo</option>
                        <option value="tg" disabled={!isThisLangOk(props.question.QuestionText, "tg")}>ትግረኛ</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label><Sb_Text font={12}>Lang text</Sb_Text></Form.Label>
                      <textarea name="question-lang" className='question-text-area' id="" cols={10} rows={2} 
                      onChange={(e) => props.onAction(Q.RID, "MODIF", "LNG", "LNTX", e.target.value)}
                      value={Q.text}></textarea>
                    </Form.Group>
                  </Col>
                  <FontAwesomeIcon icon={faMinusCircle} onClick={() => props.onAction(Q.RID, "DEL", "LNG", "WHL")}/>
                </Row>
              ))
            }
            </Col>
          </Row>
          {
            !online && 
            <Row>
              <Col className='justify-content-center mb-3' style={{'cursor':'pointer', 'transform':'scale(0.9)', 'display': props.question.QuestionText.length == 4 ? 'none' : 'flex'}} 
              onClick={() => props.question.QuestionText.length < 4 ? props.onAction(props.question.RID, "ADD", "LNG", "WHL") : null}>
                <FontAwesomeIcon icon={faPlusCircle} style={{'marginRight':'0.5rem', 'color':'var(--primary)'}}/>
                <Sb_Text>Add Question Language</Sb_Text>
              </Col>
            </Row>
          }
        </Col>
        
        
        
        {/* -------------- */}
        
        
        
        <Col className='q-col input-col'>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label><Sb_Text font={12}>Input Type</Sb_Text></Form.Label>
                <Form.Select size='sm' value={props.question.inputType} onChange={(e) => props.onAction(props.question.RID, "MODIF", "QTN", "INPTY", e.target.value)}>
                    <option value={"CHOICE"}>Choice</option>
                    <option value={"TEXT"}>Text</option>
                    <option value={"MULTI-SELECT"}>Multi Select</option>
                    <option value={"NUMBER"}>Number</option>
                    <option value={"DATE"}>Date</option>
                    <option value={"FILE"}>File Upload</option>
                    {
                      !online && 
                      <>
                        <option value={"GEO-POINT"}>Geo Point</option>
                        <option value={"TIME"}>Time</option>                   
                        <option value={"PHOTO"}>Photo Capture</option>
                        <option value={"MULTI-NUMBER"}>Multiple Number Input</option>
                        <option value={"MULTI-GEO-POINT"}>Multiple Geo Point Input</option>
                        <option value={"MULTI-DATE"}>Multiple Date Input</option>
                        <option value={"MULTI-TIME"}>Multiple Time Input</option>
                        <option value={"MULTI-FILE"}>Multiple File Upload</option>
                        <option value={"MULTI-PHOTO"}>Multiple Photo Captures</option>
                        <option value={"MULTI-TEXT"}>Multiple Text Input</option>
                      </>
                    }
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className='d-flex align-items-center justify-content-end'>
              <Sb_Checkbox_V2 checked={props.question.required} onCheckAction={(state: boolean) => props.onAction(props.question.RID, "MODIF", "QTN", "REQ", state)}/>
              <Sb_Text font={16}>Required</Sb_Text>
            </Col>
          </Row>
          <hr />
          
            {/* Choice Iteratable */}
            { (props.question.inputType === "CHOICE" || props.question.inputType === "MULTI-SELECT") &&
              <>
              {
              props.question.Choices?.map((C, index) => (

              <Row key={index}>
                <Col>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" style={{'position':'relative'}} controlId="exampleForm.ControlInput1">
                            <Form.Label>
                              <Sb_Text font={12}>Choice #{index+1} In English</Sb_Text>
                            </Form.Label>
                            <FontAwesomeIcon className='remove-btn' icon={faMinusCircle} style={{'display': (props.question.Choices?.length ?? 0) > 1 ? '' : 'none'}}
                            onClick={() => (props.question.Choices?.length ?? 0) > 1 ? props.onAction(C.RID, "DEL", "CHS", "WHL") : null}/>
                            <Form.Control type="text" placeholder="Choice" size='sm' 
                            onChange={(e) => props.onAction(C.ChoiceText.filter(CL => CL.langId === "en")[0].RID, "MODIF", "LNG", "LNTX", e.target.value)}
                            value={C.ChoiceText.filter(CL => CL.langId === "en")[0].text}/>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {/* Iteratable */}
                          {
                            C.ChoiceText
                            .filter(CL => CL.langId !== "en")
                            .map((CL, index) => (
                              <Row className='lang-container g-0' key={index}>
                                <Col md="4" className='me-2'>
                                  <Form.Group>
                                    <Form.Label><Sb_Text font={12}>Language</Sb_Text></Form.Label>
                                    <Form.Select size='sm' value={CL.langId} onChange={(e) => props.onAction(CL.RID, "MODIF", "LNG", "LNID", e.target.value)}>
                                      <option value="am" disabled={!isThisLangOk(C.ChoiceText, "am")}>አማርኛ</option>
                                      <option value="or" disabled={!isThisLangOk(C.ChoiceText, "or")}>Af.Oromo</option>
                                      <option value="tg" disabled={!isThisLangOk(C.ChoiceText, "tg")}>ትግረኛ</option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group>
                                    <Form.Label><Sb_Text font={12}>Lang text</Sb_Text></Form.Label>
                                    <Form.Control type="text" placeholder="Choice" size='sm' value={CL.text} onChange={(e) => props.onAction(CL.RID, "MODIF", "LNG", "LNTX", e.target.value)}/>
                                  </Form.Group>
                                </Col>
                                <FontAwesomeIcon icon={faMinusCircle} onClick={() => props.onAction(CL.RID, "DEL", "LNG", "WHL")}/>
                              </Row>
                            ))
                          }
                        </Col>
                      </Row>
                      {
                        !online &&
                        <Row>
                          <Col className='justify-content-center mb-3'  style={{'cursor':'pointer', 'transform':'scale(0.9)', 'display': C.ChoiceText.length == 4 ? 'none' : 'flex'}} 
                          onClick={() => C.ChoiceText.length < 4 ? props.onAction(C.RID, "ADD", "LNG", "WHL") : null}>
                            <FontAwesomeIcon icon={faPlusCircle} style={{'marginRight':'0.5rem', 'color':'var(--primary)'}}/>
                            <Sb_Text>Add Choice Language</Sb_Text>
                          </Col>
                        </Row>
                      }
              
                    </Col>
                  </Row>
                </Col>
              </Row>
              ))
              }
               <Row>
                  <Col className='d-flex justify-content-start mb-3 align-items-center'  style={{'cursor':'pointer'}} onClick={() => props.onAction(props.question.RID, "ADD", "CHS", "WHL")}>
                    <FontAwesomeIcon icon={faPlusCircle} style={{'marginRight':'0.5rem', 'color':'var(--primary)'}}/>
                    <Sb_Text font={16}>Add Choice</Sb_Text>
                  </Col>
                </Row>
              </>
            }
            {
              props.question.inputType === "NUMBER" && !online &&
              <>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label><Sb_Text font={12}>Expected Minimum</Sb_Text></Form.Label>
                    <Form.Control type="number" placeholder="Min" size='sm' value={props.question.expectedMin ?? 0} onChange={(e) => props.onAction(props.question.RID, "MODIF", "QTN", "EXMN", e.target.value)}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label><Sb_Text font={12}>Expected Maximum</Sb_Text></Form.Label>
                    <Form.Control type="number" placeholder="Max" size='sm' value={props.question.expectedMax ?? 10000} onChange={(e) => props.onAction(props.question.RID, "MODIF", "QTN", "EXMX", e.target.value)}/>
                  </Form.Group>
                </Col>
              </Row>
              </>
            }
          </Col>
        
        
        
        
        {/* -------------- */}
        
        
        
        
        <Col className='q-col show-ptrn-col'>
          <Row>
            <Col className='d-flex align-items-center'>
              <Sb_Checkbox_V2 checked={props.question.hasShowPattern} 
                disabled={props.question.RID == props.otherQuestions[0].RID}
                onCheckAction={(state: boolean) => props.question.RID != props.otherQuestions[0].RID ? props.onAction(props.question.RID, "MODIF", "SPT", "HASSP", state) : null}
              />
              <Sb_Text font={16}>Show Pattern</Sb_Text>
            </Col>
          </Row>
          <hr />
          <Row className='m-0'>
            {
              props.question.hasShowPattern && 
              <>
                <Col>
                  
                    {/* Iteratable */}
                    {
                      props.question.ShowPatterns?.map((SHP, index) => (
                      <Row key={index}>
                        <Col className='showptrn-cont mb-3' style={{'position':'relative'}}>
                          <FontAwesomeIcon className='remove-btn' icon={faMinusCircle} style={{'marginRight':'1em'}} onClick={() => props.onAction(SHP.RID, "DEL", "SPT", "WHL")}/>
                          <Form.Group>
                            <Form.Label><Sb_Text font={12}>If Question</Sb_Text></Form.Label>
                            <Form.Select size='sm' value={SHP.IfQues} onChange={(e) => props.onAction(SHP.RID, "MODIF", "SPT", "IFQUES", e.target.value)}>
                              <option value="">Choose..</option>
                              {
                                props.otherQuestions
                                .filter(OQ => (OQ.inputType === "CHOICE" || OQ.inputType === "MULTI-SELECT") && OQ.RID !== props.question.RID)
                                .map((OQ, index) => (
                                  <option key={index} value={OQ.RID}>Question #{OQ.number}</option>
                                ))
                              }
                            </Form.Select>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label><Sb_Text font={12}>Answer Is</Sb_Text></Form.Label>
                            <Form.Select size='sm' value={SHP.IfAns} onChange={(e) => props.onAction(SHP.RID, "MODIF", "SPT", "IFANS", e.target.value)}>
                              <option value="">Choose..</option>
                              {
                              
                              props.otherQuestions.filter((OQ) => (OQ.inputType === "CHOICE" || OQ.inputType === "MULTI-SELECT") && SHP.IfQues == OQ.RID).length != 0 &&                              
                              <>
                                {                                                          
                                  props.otherQuestions.filter((OQ) => (OQ.inputType === "CHOICE" || OQ.inputType === "MULTI-SELECT") && SHP.IfQues == OQ.RID)[0].Choices
                                  ?.map((OQC, index) => (
                                    <option key={index} value={OQC.RID}>Choice #{index+1}</option>
                                  ))
                                }
                              </>
                              }
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      ))
                    }
                    {
                      !online &&
                      <Row>
                        <Col className='d-flex justify-content-center m-3'  style={{'cursor':'pointer'}} onClick={() => props.onAction(props.question.RID, "ADD", "SPT", "WHL")}>
                          <FontAwesomeIcon icon={faPlusCircle} style={{'marginRight':'0.5rem', 'color':'var(--primary)'}}/>
                          <Sb_Text>Add Show Pattern</Sb_Text>
                        </Col>
                      </Row>
                    }
                </Col>
              </>
            }
          </Row>
        </Col>
      </Row>
    </div>
  )
}