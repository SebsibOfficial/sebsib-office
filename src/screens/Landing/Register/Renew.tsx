import "../Landing.css";
import "./Register.css";
import { useState } from "react";
import Sb_Loader from "../../../components/Sb_Loader";
import Nav from "../Nav/Nav";
import { useTranslation } from "react-i18next";
import { Col, Form, Row } from "react-bootstrap";
import Sb_Text from "../../../components/Sb_Text/Sb_Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import dashen from "../../../assets/dashen.jpg";
import cbe from "../../../assets/cbe.png";
import Sb_Modal from "../../../components/Sb_Modal/Sb_Modal";

export default function Register() {
  const [name, setName] = useState("");
  const [Fname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orgId, setOrgId] = useState("");
  const [pkg, setPackage] = useState("");
  const [bank, setBank] = useState<"DASHEN" | "CBE" | null>();
  const [tranNo, setTranNo] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [modalState, setModalState] = useState(false);

  const {t} = useTranslation();

  function clearForm() {
    setEmail("");
    setFName("");
    setName("");
    setOrgId("");
    setPackage("");
    setPhone("");
  }
  async function registerRequest() {
    setBtnLoading(true);
    if (
      name !== "" &&
      Fname !== "" &&
      email !== "" &&
      phone !== "" &&
      pkg !== ""
    ) {
      var data = {
        service_id: process.env.REACT_APP_SERVICE_ID,
        template_id: "template_jy47etj",
        user_id: process.env.REACT_APP_USER_ID,
        template_params: {
          from_name: name,
          name: name,
          father_name: Fname,
          email: email,
          phone: phone,
          package: pkg,
        },
      };
      var resp = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (resp.status == 200) {
        setBtnLoading(false);
        clearForm();
        setConfirm(true);
      } else console.log(resp.json());
    }
  }
  return (
    <div style={{'overflowX':'hidden'}}>
      <Nav />
      <section className="reg_sec">
        <div className="side_text" style={{'fontSize':'8em'}}>
          CONTINUE YOUR DATA JOURNEY
        </div>
        <form className="reg_form" style={{'margin':0}} onSubmit={(e) => e.preventDefault()}>
          <div id="title" style={{'color':'var(--secondary)','textAlign':'center', 'marginBottom':'0em'}}>
            <p>{t('renew.renewal')}</p>
          </div>
          <div className="fill_form">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Form.Group className="mb-2 form-item" controlId="LoginEmail">
                <Form.Label><Sb_Text font={12}>Organization ID</Sb_Text></Form.Label>
                <Form.Control size="sm" value={orgId}
                type="text"
                name="name"
                onChange={(e) => setOrgId(e.target.value)}
                required placeholder="Organization Id" 
                autoComplete='new-password'
                />
              </Form.Group>
              <Form.Group className="mb-2 form-item" controlId="LoginEmail">
                <Form.Label><Sb_Text font={12}>Organization | Status</Sb_Text></Form.Label>
                <Form.Control size="sm"
                type="text"
                disabled
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-2 form-item">
              <Form.Label><Sb_Text font={12}>{t('register.package_type')}</Sb_Text></Form.Label>
              <Form.Select size="sm"
              value={pkg}
              name="package"
              id="pk"
              onChange={(e) => setPackage(e.target.value)}
              required>
                <option value="">{t('register.package_type')}</option>
                <option value="free-trail">Free Trial</option>
                <option value="standard">
                  Standard
                </option>
                <option value="premium" disabled>
                  Premium
                </option>
                <option value="enterprise" disabled>
                  Enterprise
                </option>
              </Form.Select>
            </Form.Group>
            {
              pkg == 'free-trail' || pkg == '' ? '' :
              <>
              <div>
                <Row>
                  <Col>Choose Bank</Col>
                  <Col className="me-2" style={{'textAlign':'end'}}>
                    <FontAwesomeIcon icon={faQuestionCircle} style={{'cursor':'pointer'}} onClick={() => setModalState(true)}/>
                  </Col>
                </Row>
                <Row className="g-0 align-items-center">
                  <Col className="me-3">
                    <div className={`bank_choice ${bank == 'CBE' ? 'bank_selected cbe' : ''}`} onClick={() => setBank("CBE")}>
                      <img src={cbe} alt="CBE" />
                    </div>
                  </Col>
                  <Col className="me-3">
                    <div className={`bank_choice ${bank == 'DASHEN' ? 'bank_selected dashen' : ''}`} onClick={() => setBank("DASHEN")}>
                      <img src={dashen} alt="DASHEN" />
                    </div>
                  </Col>
                  <Col md="8" className="pe-2">
                    <Form.Group className="mb-2 form-item" controlId="LoginEmail">
                      <Form.Label><Sb_Text font={12}>{t('register.transaction_ref')}</Sb_Text></Form.Label>
                      <Form.Control size="sm" 
                      value={tranNo}
                      type="text"
                      name="tran_no"
                      id="tran_no"
                      onChange={(e) => setTranNo(e.target.value)}
                      required
                      placeholder="Transaction Reference"
                      />
                  </Form.Group>
                  </Col>
                </Row>
              </div>
              </>
            }
            
          </div>
          <div style={{ textAlign: "center", padding: "1.5em" }}>
            <button onClick={() => registerRequest()} disabled={btnLoading}>
              {btnLoading ? <Sb_Loader /> : t('renew.renew')}
            </button>
          </div>
          <div
            className="confirm"
            style={{ display: confirm ? "block" : "none" }}
          >
            {t('register.thankyou_msg')}
            <span onClick={() => setConfirm(false)}>X</span>
          </div>
        </form>
      </section>
      {/* ---------------------------------The Modal------------------------------------------------------ */}
      <Sb_Modal show={modalState} onHide={() => setModalState(false)} 
      width={30}>
          <>        
              <p><Sb_Text>Pay with your preferred bank to the below accounts and input the Transaction Reference Number</Sb_Text></p>
              <p><Sb_Text>CBE: </Sb_Text><Sb_Text weight={900}>1000546715467890</Sb_Text> <Sb_Text> Or Dashen:</Sb_Text><Sb_Text weight={900}>55467854678910</Sb_Text></p>
              <p></p>
              <p><Sb_Text>If you are facing any issues contact us at support@sebsib.com or +251912345678</Sb_Text></p>
          </>
        </Sb_Modal>
    </div>
  );
}