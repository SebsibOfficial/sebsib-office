import "../Landing.css";
import "./Register.css";
import { useState } from "react";
import Sb_Loader from "../../../components/Sb_Loader";
import Nav from "../Nav/Nav";
import { useTranslation } from "react-i18next";

export default function Register() {
  const [name, setName] = useState("");
  const [Fname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [pkg, setPackage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const {t} = useTranslation();

  function clearForm() {
    setEmail("");
    setFName("");
    setName("");
    setOrg("");
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
      org !== "" &&
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
          org: org,
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
        <div className="side_text">
          GET THE MOST FROM YOUR DATA
        </div>
        <form className="reg_form" onSubmit={(e) => e.preventDefault()}>
          <div id="title" style={{'color':'var(--secondary)','textAlign':'center'}}>
            <p>{t('nav_items.register')}</p>
          </div>
          <div className="fill_form">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className="input_form" id="nm">
                <label htmlFor="name">{t('register.name')}</label>
                <input
                  value={name}
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input_form" id="fn">
                <label htmlFor="father_name">{t('register.father\'s_name')}</label>
                <input
                  value={Fname}
                  type="text"
                  name="father_name"
                  onChange={(e) => setFName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input_form">
              <label htmlFor="email">{t('register.email')}</label>
              <input
                value={email}
                type="text"
                name="email"
                id="em"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input_form">
              <label htmlFor="phone">{t('register.phone')}</label>
              <input
                value={phone}
                type="tel"
                name="phone"
                id="em"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="input_form">
              <label htmlFor="organization">{t('register.org')}</label>
              <input
                value={org}
                type="text"
                name="organization"
                id="org_n"
                onChange={(e) => setOrg(e.target.value)}
                required
              />
            </div>
            <div className="input_form">
              <label htmlFor="package">{t('register.package_type')}</label>
              <select
                value={pkg}
                name="package"
                id="pk"
                onChange={(e) => setPackage(e.target.value)}
                required
              >
                <option value="">{t('register.package_type')}</option>
                <option value="free-trail">Free Trial</option>
                <option value="standard" disabled>
                  Standard
                </option>
                <option value="premium" disabled>
                  Premium
                </option>
                <option value="enterprise" disabled>
                  Enterprise
                </option>
              </select>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "1.5em" }}>
            <button onClick={() => registerRequest()} disabled={btnLoading}>
              {btnLoading ? <Sb_Loader /> : t('register.regis')}
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
    </div>
  );
}
