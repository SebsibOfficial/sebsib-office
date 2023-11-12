import "./Landing.css";
import ILU1 from "../../assets/ill1.svg";
import LandingData from "./landing_content";
import COIN from "../../assets/COIN.svg";
import EASY from "../../assets/EASY.svg";
import LOCAL from "../../assets/LOCAL.svg";
import SHEILD from "../../assets/SHEILD.svg";
import TIME from "../../assets/TIME.svg";
import LogoW from "../../assets/logo_3.png";
import ManagedOfferPic from "../../assets/managed.svg";
import StarterOfferPic from "../../assets/starter.svg";
import EnterOfferPic from "../../assets/enterprise.svg";
import Nav from "./Nav/Nav";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAndroid, faFacebook, faGooglePlay, faInstagram, faLinkedin, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faClipboardList, faIdBadge, faLayerGroup, faLongArrowAltDown, faLongArrowAltRight, faShareAlt, faTable, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

export default function Landing() {
  let location = useLocation();

  function scrollTo(to: string) {
    const section = document.querySelector(to);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const { t } = useTranslation();

  useEffect(() => {
    if (location.state) scrollTo("#contact-us");
  }, []);
  return (
    <div style={{'overflowX': 'hidden'}}>
      <Nav />
      <section id="first">
        <div className="headline">
          <p id="p_1">Collect Data</p>
          <p id="p_2">without limits</p>
        </div>
        
        <FontAwesomeIcon id="download_app" icon={faLongArrowAltDown}/>
      
      </section>
      <section id="second">
        <div className="main">
          <div id="head_logo">
            <img src={LogoW} alt=""/>
          </div>
          <div id="title">
            <p>WHO ARE WE?</p>
          </div>
          <div id="intro">
          Sebsib is your all-in-one solution for efficient and versatile data collection. 
          Whether you're an organization, researcher, or fieldworker, our platform empowers you with a wide range of features to make data collection a breeze. 
          And the best part? It's available for sale or via subscription, giving you the flexibility you need. 
          As experts in remote data collection, we understand the unique needs of clients working in diverse settings. 
          Sebsib's suite of innovative solutions delivers reliable results and easier workflows.
          </div>
        </div>
      </section>
      <section id="third">
        <div id="title">
          <p>HOW SEBSIB WORKS</p>
        </div>
        <div className="steps">
          <div className="step">
            <FontAwesomeIcon icon={faIdBadge} className="ficon"/>
            <p className="sub_title">GET SEBSIB</p>
            <p className="desc">Go to the register page and sign up, Or Contact Us for using managed or enterprise services. After that, Log In and have a look around of what is possible.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faUsers} className="ficon"/>
            <p className="sub_title">PROJECTS · MEMBERS</p>
            <p className="desc">Now that you are in, you can now start creating projects, forms, and members. You will also be able to view and follow up on submissions.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faClipboardList} className="ficon"/>
            <p className="sub_title">DESIGN · DEPLOY</p>
            <p className="desc">Once you create your Projects and Members, you design your survey questions/forms on your liking. The platform supports various level of complexity when dealing with forms.</p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faLayerGroup} className="ficon"/>
            <p className="sub_title">COLLECT</p>
            <p className="desc">Download the sebsib app if you are using a the Starter offer or download ODK collect if you choose Managed or Enterprise. Then enter the server details to connect and collect.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faTable} className="ficon"/>
            <p className="sub_title">VIEW · SHARE</p>
            <p className="desc">Now that your data is gathered you can view it on the website or download it in an 
            excel format. Even more so you can plug the data directly into PowerBI/Excel to do additional analysis.
            </p>
          </div>
        </div>
      </section>
      <section id="third-and-half">
        <div className="offer-text" id="offer-text-main">
          <p>OFFERS</p>
        </div>
        <div className="offer-text">
          <p></p>
          {/* Place holder for CSS reasons */}
        </div>
        <div className="offer-container">
          <div className="offer">
            <p className="offer-title">· STARTER</p>
            <div className="offer-content">
              <p className="offer-content-text">The Starter offer uses the Sebsib Office<sup>TM</sup> to allow 
              users to get up-to-speed quickly and collect data with the greatest of ease. Sebsib Office<sup>TM</sup>, 
              in addition to its offline capabilities with the mobile app Sebsib Collect<sup>TM</sup>,  
              it supports online questionnaires that can be sent through links with Sebsib Forms<sup>TM</sup>, our web platform. Best for
              <ul className="my-2">
                <li>To easily create, manage and view projects</li>
                <li>To quickly run surveys and get results immediately</li>
                <li>Simple Mobile App configuration</li>
                <li>Not dealing with unnecessary jargon</li>
              </ul>
              </p>
              <img src={StarterOfferPic}/>
            </div>
          </div>
          <div className="offer">
            <p className="offer-title">· Managed</p>
            <div className="offer-content">
              <p className="offer-content-text">The Managed offer gives you a project on the Sebsib Data Kit platform.
              Sebsib Data Kit is an industrial grade data collection software that applies standards used by professional data collectors, analysts and managers. 
              Sebsib Data Kit is fully integrated with ODK collect for collection, Power BI/Excel for analysis and XLSForms standard for form designing. 
              Best for 
              <ul className="my-2">
                <li>Handling complex questionnaire design</li>
                <li>Controlling every data collection activity</li>
                <li>Conducting longer and bigger projects</li>
                <li>Complex analysis</li>
              </ul>
              </p>
              <img src={ManagedOfferPic}/>
            </div>            
          </div>
          <div className="offer">
            <p className="offer-title">· Enterprise</p>
            <div className="offer-content">
              <p className="offer-content-text">The Enterprise offer will give you the full power of Sebsib Data kit installed on the platform of your choice. 
              By getting the Enterprise offer you can have unlimited projects, users and forms. 
              This offer will let you own Sebsib Data Kit and the data collected will always be on your premises. Best for
                <ul className="my-2">
                  <li>Institution who conduct researches frequently</li>
                  <li>Firms who value data privacy and data ownership</li>
                  <li>Companies who need complete control</li>
                  <li>Individuals conduct surveys often</li>
                </ul>
              </p>
              <img src={EnterOfferPic}/>
            </div>
          </div>
        </div>
      </section>
      <section id="fourth">
      <div id="title">
          <p style={{'color':'var(--secondary)', 'textDecorationLine':'inherit'}}>WHY SEBSIB?</p>
        </div>
        <div className="reasons">
          <div className="reason">
            <div className="pic_cont">
              <img src={EASY}/>
            </div>
            <p className="sub_title">SIMPLE</p>
            <p className="desc">Simplify your data collection with a brief training session and a straightforward approach
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={SHEILD} style={{'transform':'scale(1.5)'}}/>
            </div>
            <p className="sub_title">SECURE</p>
            <p className="desc">Through Sebsib, all information, data, and survey submissions are completely secure.
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={COIN}/>
            </div>
            <p className="sub_title">AFFORDABLE</p>
            <p className="desc">No more need for foriegn currency as Sebsib provides high quality service with unbelievable pricing plans using Ethiopian Birr.
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={LOCAL} style={{'transform':'scale(1.5)'}}/>
            </div>
            <p className="sub_title">LOCAL</p>
            <p className="desc">Tailored to perfection for Ethiopians, Sebsib comes with multiple dialects integrated into it, in addition to its ability to work without internet access.
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={TIME}/>
            </div>
            <p className="sub_title">AVAILABLE</p>
            <p className="desc">We are always available to provide training on how to use Sebsib and answer all of your inquiries.
            </p>
          </div>
        </div>
      </section>
      <section id="fifth">
        <p>LIKE IT SO FAR? THEN GET STARTED</p>
        <div className="arrow">
          <Link to="/register" style={{'color':'var(--secondary)'}}><FontAwesomeIcon icon={faLongArrowAltDown}/></Link>
        </div>
      </section>
      <footer id="contact-us">
        <div id="title" style={{'margin':'0', 'padding':'1em'}}>
          <p style={{'color':'white', 'textDecorationLine':'inherit'}}>CONTACT US</p>
        </div>
        <Row className="contact_info">
          <Col className="contact_logo" md="2">
            <img src={LogoW} alt="" style={{'width':'20%'}}/>
          </Col>
          <Col className="contact_address">
            <h6></h6>
            <h6>Addis Ababa</h6> 
            <h6>Ethiopia</h6>
          </Col>
          <Col className="contact_phones">
            <h6>+251920642556</h6>
            <h6>+251920747084</h6>
            <h6>+251919486919</h6>
          </Col>
          <Col className="contact_emails">
            <h6>info@sebsib.com</h6>
            <h6>nathan@sebsib.com</h6>
            <h6>yoseph@sebsib.com</h6>
            <h6>yohannes@sebsib.com</h6>
          </Col>
          <Col className="contact_socials" md="2">
            <div className="soc_platform">
              <a href="https://www.linkedin.com/company/sebsib-data/" style={{'color':'white', 'textDecoration':'none'}} target="_blank">
                <FontAwesomeIcon icon={faLinkedin as IconProp}/>
              </a>
            </div>
            <div className="soc_platform">
              <a href="https://t.me/sebsibofficial" style={{'color':'white', 'textDecoration':'none'}} target="_blank">
                <FontAwesomeIcon icon={faTelegram as IconProp}/>
              </a>
              
            </div>
            <div className="soc_platform">
              <a href="https://twitter.com/sebsibofficial" style={{'color':'white', 'textDecoration':'none'}} target="_blank">
              <FontAwesomeIcon icon={faTwitter as IconProp}/>
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    </div>
  );
}
