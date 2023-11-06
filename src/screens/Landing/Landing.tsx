import "./Landing.css";
import ILU1 from "../../assets/ill1.svg";
import LandingData from "./landing_content";
import COIN from "../../assets/COIN.svg";
import EASY from "../../assets/EASY.svg";
import LOCAL from "../../assets/LOCAL.svg";
import SHEILD from "../../assets/SHEILD.svg";
import TIME from "../../assets/TIME.svg";
import LogoW from "../../assets/logo_3.png";
import Nav from "./Nav/Nav";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAndroid, faFacebook, faGooglePlay, faInstagram, faLinkedin, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faClipboardList, faIdBadge, faLayerGroup, faLongArrowAltRight, faShareAlt, faTable, faUsers } from "@fortawesome/free-solid-svg-icons";
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
          <p id="p_1">Collect Your Data</p>
          <p id="p_2">without limits</p>
        </div>
        
      
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
          Sebsib provides efficient offline and online data collection tools
            to help organizations overcome the challenges of gathering insights
            in disconnected environments. Our offline mobile app allows field
            teams to capture responses even without internet. Data is seamlessly
            synced when connectivity returns. Meanwhile the online forms tool
            streamlines administration. As experts in remote data collection, we
            understand the unique needs of clients working in diverse settings.
            Sebsib's suite of innovative solutions delivers reliable results and
            easier workflows.
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
            <p className="desc">Go to the register page and sign up for a Starter offer, or if you need more feature contact us so we can create an account or install the system for you.
            After you've signed up with the level of offering you desire. Log In and have a look around of what is possible.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faUsers} className="ficon"/>
            <p className="sub_title">PROJECTS · MEMBERS</p>
            <p className="desc">Now that you are in, you can now start creating projects, forms, and members. These forms are going then be sent out to enumerators or to respondents as public links to be filled. 
            Your members can be enumrators, Project Mangers, or Viewers.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faClipboardList} className="ficon"/>
            <p className="sub_title">DESIGN · DEPLOY</p>
            <p className="desc">Once you create your Projects and Members, you design your survey questions/forms on your liking. The platform supports various level of complexity when dealing with forms. When you are done with form you send it out as a link or to enumrators</p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faLayerGroup} className="ficon"/>
            <p className="sub_title">COLLECT</p>
            <p className="desc">Finally the fun begins, Download the app and enter your sebsib credentials. After your in, download the 
            survey and gather responses as much as you like and send it to the website
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faTable} className="ficon"/>
            <p className="sub_title">VIEW · SHARE</p>
            <p className="desc">Now that your data is gathered you can view it on the website or download it in an 
            excel format to do additional analysis
            </p>
          </div>
        </div>
      </section>
      <section id="third-and-half">
        <div className="offer" id="offer-text">
          <p>Offers</p>
        </div>
        <div className="offer">
          <p className="offer-title">1 · Simple</p>
          <p className="offer-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Placeat aut rerum quidem maiores exercitationem quam possimus hic sed repellat, 
            voluptatem distinctio repellendus debitis maxime eaque. Autem commodi iure debitis. Nobis.</p>
        </div>
        <div className="offer">
          <p className="offer-title">2 · Manged</p>
          <p className="offer-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Placeat aut rerum quidem maiores exercitationem quam possimus hic sed repellat, 
            voluptatem distinctio repellendus debitis maxime eaque. Autem commodi iure debitis. Nobis.</p>
        </div>
        <div className="offer">
          <p className="offer-title">3 · Enterprise</p>
          <p className="offer-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Placeat aut rerum quidem maiores exercitationem quam possimus hic sed repellat, 
            voluptatem distinctio repellendus debitis maxime eaque. Autem commodi iure debitis. Nobis.</p>
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
            <p className="sub_title">CHEAP</p>
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
          <Link to="/register" style={{'color':'var(--secondary)'}}><FontAwesomeIcon icon={faLongArrowAltRight}/></Link>
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
