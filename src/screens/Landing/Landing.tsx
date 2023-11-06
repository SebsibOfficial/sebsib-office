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
import {
  faAndroid,
  faFacebook,
  faGooglePlay,
  faInstagram,
  faLinkedin,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowCircleLeft,
  faClipboardList,
  faIdBadge,
  faLayerGroup,
  faLongArrowAltRight,
  faShareAlt,
  faTable,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
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
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <section id="first">
        <div className="headline">
          <p id="p_1">Quality Data</p>
          <p id="p_2">For All</p>
        </div>

        <div id="download_app">
          Streamline your data collection with Sebsib, the all-in-one solution
          that efficiently captures comprehensive insights from any location
          through its intuitive website and mobile app.
        </div>
      </section>
      <section id="second">
        <div className="main">
          <div id="head_logo">
            <img src={LogoW} alt="" />
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
          <p>HOW SEBSIB COLLECT ™ WORKS</p>
        </div>
        <div className="steps">
          <div className="step">
            <FontAwesomeIcon icon={faIdBadge} className="ficon" />
            <p className="sub_title">REGISTER</p>
            <p className="desc">
              To get started with Sebsib, visit our registration page and
              provide your details, including your name, email address, and
              organizational name. You can select the package that best suits
              your needs based on the features and services offered.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faUsers} className="ficon" />
            <p className="sub_title">ADD MEMBERS</p>
            <p className="desc">
              Once you've registered, you can create enumerators and analysts in
              the members section who will help you collect and analyze the data
              respectively. This feature allows you to collaborate with others
              and divide the workload efficiently.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faClipboardList} className="ficon" />
            <p className="sub_title">DESIGN</p>
            <p className="desc">
              The next step is to design your survey questions according to your
              preferences. Sebsib offers various input types and complex
              skipping patterns for conditional questions, allowing you to
              create a custom survey that meets your specific requirements.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faLayerGroup} className="ficon" />
            <p className="sub_title">COLLECT</p>
            <p className="desc">
              Once you've designed your survey, you can download the Sebsib app,
              log in with your credentials, and download the survey. You can
              then begin collecting responses offline, even in areas without
              internet connectivity. Once you're done collecting data, you can
              send it back to the website.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faTable} className="ficon" />
            <p className="sub_title">VIEW</p>
            <p className="desc">
              With Sebsib, view your data online or download to Excel for easy
              analysis. Visualize results through graphs and charts for clearer
              understanding to inform strong decision-making based on reliable
              data.
            </p>
          </div>
        </div>
      </section>
      <section id="third-and-half">
        <div id="title">
          <p>HOW SEBSIB FORMS ™ WORK</p>
        </div>
        <div className="steps">
          <div className="step">
            <FontAwesomeIcon icon={faIdBadge} className="ficon" />
            <p className="sub_title">REGISTER</p>
            <p className="desc">
              To begin using Sebsib, go to our registration page and provide
              your details, including your name, email address, and
              organizational name (if applicable). You can select the package
              that best suits your needs based on the features and services
              offered.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faClipboardList} className="ficon" />
            <p className="sub_title">DESIGN</p>
            <p className="desc">
              Once you've registered, you can start designing your survey
              questions according to your preferences. Sebsib supports various
              input types and offers complex skipping patterns for conditional
              questions, allowing you to create a custom survey that meets your
              specific requirements.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faShareAlt} className="ficon" />
            <p className="sub_title">SHARE</p>
            <p className="desc">
              Once you've designed your survey, a unique link will be generated
              that you can share with your respondents. They can then fill out
              the survey online from anywhere, at any time. Sebsib's platform
              ensures the security and privacy of your data.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faTable} className="ficon" />
            <p className="sub_title">VIEW</p>
            <p className="desc">
              After you've gathered your responses, Sebsib allows you to easily
              view your data on the website or download it in Excel format for
              further analysis. You can also visualize the data using graphs and
              charts to get a better understanding of the results. Sebsib
              provides a seamless data collection experience, helping you make
              informed decisions based on accurate data.
            </p>
          </div>
        </div>
      </section>
      <section id="fifth">
        <h3>CHECK OUT OUR SDK</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <a href="#contact-us" id="sdk-contact-us">
          <div>Contact Us and Get A Quote</div>
        </a>
      </section>
      <section id="fourth">
        <div id="title">
          <p
            style={{ color: "var(--secondary)", textDecorationLine: "inherit" }}
          >
            WHY SEBSIB?
          </p>
        </div>
        <div className="reasons">
          <div className="reason">
            <div className="pic_cont">
              <img src={EASY} />
            </div>
            <p className="sub_title">SECURE</p>
            <p className="desc">
              Data security is critical at Sebsib. Through encryption and
              ongoing reviews, we secure your information on our servers.
              Collect and store data with complete peace of mind.
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={SHEILD} style={{ transform: "scale(1.5)" }} />
            </div>
            <p className="sub_title">AFFORDABLE</p>
            <p className="desc">
              Sebsib aims to provide excellent service affordably. Pricing in
              Ethiopian Birr allows easy budget-friendly access to our tools.
              Transparent packages cater to varying needs. Flexible payments
              further ensure seamless and convenient service for all.
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={COIN} />
            </div>
            <p className="sub_title">LOCALIZED</p>
            <p className="desc">
              Sebsib's local development accounts for Ethiopia's linguistic
              diversity. Surveys and collections are offered in multiple
              dialects for natural, tailored engagement according to region.
              Offline-first functionality further enables data gathering
              regardless of connectivity.
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={LOCAL} style={{ transform: "scale(1.5)" }} />
            </div>
            <p className="sub_title">AVAILABLE SUPPORT</p>
            <p className="desc">
              Support is key to success with Sebsib. A helpful team provides
              training, answers and guidance throughout to ensure effective use
              of our tools for data capture. By supplying the right platform
              alongside assistance, we aim to simplify collection workflows and
              empower clients' evidence-backed objectives and progress.
            </p>
          </div>
        </div>
      </section>

      <footer id="contact-us">
        <div id="title" style={{ margin: "0", padding: "1em" }}>
          <p style={{ color: "white", textDecorationLine: "inherit" }}>
            CONTACT US
          </p>
        </div>
        <Row className="contact_info">
          <Col className="contact_logo" md="2">
            <img src={LogoW} alt="" style={{ width: "20%" }} />
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
              <a
                href="https://www.linkedin.com/company/sebsib-data/"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin as IconProp} />
              </a>
            </div>
            <div className="soc_platform">
              <a
                href="https://t.me/sebsibofficial"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
              >
                <FontAwesomeIcon icon={faTelegram as IconProp} />
              </a>
            </div>
            <div className="soc_platform">
              <a
                href="https://twitter.com/sebsibofficial"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
              >
                <FontAwesomeIcon icon={faTwitter as IconProp} />
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    </div>
  );
}
