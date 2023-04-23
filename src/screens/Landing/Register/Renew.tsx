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
import { GetOrgStatus, SendRequest } from "../../../utils/api";
import { translateIds } from "../../../utils/helpers";
import { getPrice } from "./Register";

export default function Register() {
  const [name, setName] = useState("");
  const [Fname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orgId, setOrgId] = useState("");
  const [pkg, setPackage] = useState("");
  const [subType, setSubType] = useState<string>("ONE_MONTH");
  const [fetchedName, setFetchedName] = useState("");
  const [fetchedId, setFetchedId] = useState("");
  const [fetchedDay, setFetchedDay] = useState("");
  const [fetchedPkg, setFetchedPkg] = useState("");
  const [bank, setBank] = useState<"DASHEN" | "CBE" | null>();
  const [tranNo, setTranNo] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [errconfirm, setErrConfirm] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [fetching, setFetching] = useState(false);

  const {t} = useTranslation();

  function clearForm() {
    setEmail("");
    setFName("");
    setName("");
    setOrgId("");
    setPackage("");
    setPhone("");
    setFetchedName("");
    setFetchedDay("");
    setFetchedPkg("");
  }

  function isInfoGood() {
    if ( name !== "" && Fname !== "" && email !== "" && phone !== "" && pkg !== "" ) {
      return true
    } else return false
  }

  async function renewRequest() {
    setBtnLoading(true);
    if (isInfoGood()) {
      console.log(subType)
      // Send request
      SendRequest("RENEWAL", 
      {firstname: name, lastname: Fname, email: email, phone: phone, orgname: fetchedName, longOrgId: fetchedId, pkg: pkg, bank: bank, transno: tranNo, orgId: orgId, subType: subType})
      .then(result => {
        if (result.code == 200){
          clearForm();
          setBtnLoading(false);
          setConfirm(true);
        } else console.info(result)
      }).catch((err) => console.log(err))
    } else setBtnLoading(false)
  }
  
  function calcDate (endDate:any) {
    const startDate = new Date();
    const differenceInTime = endDate.getTime() - startDate.getTime();
    return Math.round(differenceInTime / (1000 * 3600 * 24))
  }

  function onblurHandler () {
    setFetching(true);
    // Get OrgInfo
    GetOrgStatus(orgId).then(result => {
      if (result.code == 200) {
        setName(result.data.owner[0].firstName)
        setFName(result.data.owner[0].lastName)
        setEmail(result.data.owner[0].email)
        setPhone(result.data.owner[0].phone)
        setFetchedName(result.data.name)
        setFetchedId(result.data._id)
        setFetchedDay(calcDate(new Date(result.data.expires)) + " Days")
        console.log(translateIds("ID", result.data.packageId))
        setFetchedPkg(translateIds("ID", result.data.packageId) as string)
        setFetching(false)
        setErrConfirm(false)
      } else {console.log(result.data); setBtnLoading(false); setFetching(false); setErrConfirm(true)}
    })
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
                onBlur={() => onblurHandler()}
                />
              </Form.Group>
              <Form.Group className="mb-2 form-item" controlId="LoginEmail">
                <Form.Label><Sb_Text font={12}>Organization Name</Sb_Text></Form.Label>
                {
                  fetching ? <Sb_Loader/> : 
                  <Form.Control size="sm"
                  value={fetchedName}
                  type="text"
                  disabled
                  />
                }
              </Form.Group>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Form.Group className="mb-2 form-item" controlId="LoginEmail">
                <Form.Label><Sb_Text font={12}>Package</Sb_Text></Form.Label>
                {
                  fetching ? <Sb_Loader/> : 
                  <Form.Control size="sm"
                  value={fetchedPkg}
                  type="text"
                  disabled
                  />
                }
              </Form.Group>
              <Form.Group className="mb-2 form-item" controlId="LoginEmail">
                <Form.Label><Sb_Text font={12}>Remaining Days</Sb_Text></Form.Label>
                <Form.Control size="sm"
                value={fetchedDay}
                type="text"
                disabled
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-2 form-item">
              <Form.Label><Sb_Text font={12}>Renew Package to</Sb_Text></Form.Label>
              <Form.Select size="sm"
              value={pkg}
              name="package"
              id="pk"
              onChange={(e) => setPackage(e.target.value)}
              required>
                <option value="">{t('register.package_type')}</option>
                <option value="PREMIUM">
                  Premium
                </option>
              </Form.Select>
            </Form.Group>
            {
              pkg == 'FREE TRIAL' || pkg != 'FREE TRAIL' ? '' :
              <>
              <div key={`inline-radio`} className="mb-2 mt-3 radio_price">
                <div style={{'display':'flex','alignItems':'center'}}>
                <Form.Check
                  inline
                  label="One Month"
                  value={"ONE_MONTH"}
                  onChange={e => setSubType(e.currentTarget.value)}
                  checked={subType == 'ONE_MONTH'}
                  name="group1"
                  type="radio"
                  id={`inline-radio-1`}
                />
                <Form.Check
                  inline
                  label="One Year"
                  value={"ONE_YEAR"}
                  onChange={e => setSubType(e.currentTarget.value)}
                  checked={subType == 'ONE_YEAR'}
                  name="group1"
                  type="radio"
                  id={`inline-radio-2`}
                />
                </div>
                <div className="reg_price">
                  <p>Br {getPrice(pkg, subType)}</p>
                </div>
              </div>
              <div>
                <Row>
                  <Col><Sb_Text>Choose Bank</Sb_Text></Col>
                  <Col className="me-2" style={{'textAlign':'end'}}>
                    <div className="d-flex" style={{'justifyContent':'flex-end', 'cursor':'pointer','color':'var(--primary)'}}onClick={() => setModalState(true)}>
                      <Sb_Text font={12}>Payment Info </Sb_Text>
                    </div>
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
            <button  onClick={() => renewRequest()} disabled={btnLoading || !isInfoGood()}>
              {btnLoading ? <Sb_Loader /> : t('renew.renew')}
            </button>
          </div>
          <div
            className="confirm"
            style={{display: confirm ? 'block' : 'none'}}
            onClick={() => setConfirm(false)}
          >
            <b>Thank you for renewing</b><br></br> We will contact you shortly
          </div>
          <div
            className="error-confirm"
            style={{display: errconfirm ? 'block' : 'none'}}
            onClick={() => setConfirm(false)}
          >
            Can't find Organization ID, Please check input
          </div>
        </form>
      </section>
      {/* ---------------------------------The Modal------------------------------------------------------ */}
      <Sb_Modal show={modalState} onHide={() => setModalState(false)} 
      width={30}>
          <>        
              <p><Sb_Text>Pay with your preferred bank to the below accounts and input the Transaction Reference Number</Sb_Text></p>
              <p><Sb_Text>CBE: </Sb_Text><Sb_Text weight={900}>1000196349468</Sb_Text> <Sb_Text> Or Dashen:</Sb_Text><Sb_Text weight={900}>5444310705011</Sb_Text></p>
              <p></p>
              <p><Sb_Text>If you are facing any issues contact us at support@sebsib.com or +251920642556</Sb_Text></p>
          </>
        </Sb_Modal>
    </div>
  );
}
