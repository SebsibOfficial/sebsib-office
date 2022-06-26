import './Landing.css';
import Logo from '../../assets/logo.png';
import ILU1 from '../../assets/ill1.svg';
import LandingData from './landing_content';
import { Link } from 'react-router-dom';
import { decodeJWT } from '../../utils/helpers';
import { useAuth } from '../../states/AuthContext';

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
    return (
        <div>
            <nav>
                <div className="logo_land">
                    <img src={Logo} alt=""/>
                </div>
                <div className="list_cont">
                    <div className="list_item">ስለ እኛ</div>
                    <div className="list_item netela">፣</div>
                    <Link to={'/pricing'}><div className="list_item">ዋጋችን</div></Link>
                    <div className="list_item netela">፣</div>
                    <div className="list_item">አግኙን</div>
                    <div className="list_item netela">፣</div>
                    <Link to={toWhere()} state={true}><div className="list_item">ይግቡ</div></Link>
                    <div className="list_item netela">፣</div>
                    <Link to={'/register'}><div className="list_item" id='reg_but'>ይመዝገቡ</div></Link>
                </div>
                <div className="lang">
                    <span id='amh'>አም</span>
                    <span id='eng'>EN</span>
                </div>
            </nav>
            <section>
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
            <footer>
                
            </footer>
        </div>
    )
}