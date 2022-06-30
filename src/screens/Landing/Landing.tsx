import './Landing.css';
import Logo from '../../assets/logo.png';
import ILU1 from '../../assets/ill1.svg';
import LandingData from './landing_content';
import { Link } from 'react-router-dom';
import { decodeJWT } from '../../utils/helpers';
import { useAuth } from '../../states/AuthContext';
import Nav from './Nav/Nav';

export default function Landing () {
    const {token, setAuthToken} = useAuth();
    function toWhere () {
        if (token == "")
          return "/login";
        else if (decodeJWT(token as string).exp < new Date().getTime() / 1000) {
          setAuthToken(""); return "/login";
        }
        else {
          return "/dashboard";
        }
      }
      function scrollTo (to:string) {
        const section = document.querySelector(to);
        section?.scrollIntoView( { behavior: 'smooth', block: 'start' } );
      };
    return (
        <div>
            <Nav/>
            <section id='start'>
                <div className='content'>
                    <div className='headline' id='first_page_headline'>
                        <div className="header-text" id='first_page_header_text'>
                        ጥራት ያለው መርጃ ለ ሁሉም
                        </div>
                    </div>
                    <div className='subtext' id='first_page_subtext'>
                    ጥራት ያለው እና አስተማማኝ መረጃ ለመሰብሰብ የሚጠቅሙ አገልግሎቶች።
                    </div>
                </div>
                <div className='illust' id='first_page_illust'>
                    <img src={ILU1} />
                </div>
            </section>
            {
                LandingData.map(data => (
                    <section>
                        <div className='content'>
                            <div className='headline' id='first_page_headline'>
                                <div className="header-text" id='first_page_header_text'>
                                    {data.headline}
                                </div>
                            </div>
                            <div className='subtext' id='first_page_subtext'>
                                {data.subtext}
                            </div>
                        </div>
                        <div className='illust'>
                            <img src={data.illustration} />
                        </div>
                    </section>
                ))
            }
            <footer id='contact-us'>
                <div className="contact_foot">
                    <h1>አግኙን</h1>
                    <h6>+251920642556</h6>
                    <h6>info@sebib.com</h6>
                    <h6>yoseph@sebib.com</h6>
                    <h6>yohaness@sebib.com</h6>
                </div>
            </footer>
        </div>
    )
}