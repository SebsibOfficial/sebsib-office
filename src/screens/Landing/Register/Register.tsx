import '../Landing.css';
import Logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import { decodeJWT } from '../../../utils/helpers';
import { useAuth } from '../../../states/AuthContext';
import { useState } from 'react';
import Sb_Loader from '../../../components/Sb_Loader';

export default function Register () {
    const {token, setAuthToken} = useAuth();
    const [name, setName] = useState('');
    const [Fname, setFName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [org, setOrg] = useState('');
    const [pkg, setPackage] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);

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

    async function registerRequest () {
      if (name !== '' && Fname !== '' && email !== '' && phone !== '' && org !== '' && pkg !== ''){
        setBtnLoading(true)
        var data = {
          service_id: 'service_znrj7yk',
          template_id: 'template_jy47etj',
          user_id: 'z9PEqQcu_jo7Z_YVo',
          template_params: {
              'from_name': name,
              'name': name,
              'father_name': Fname,
              'email': email,
              'phone': phone,
              'package': pkg
            }
        };
        console.log(pkg);
        setBtnLoading(false);
        var resp = await fetch('https://api.emailjs.com/api/v1.0/email/send', 
          {method:'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(data)});
          if (resp.status == 200){
            setBtnLoading(false);
            setConfirm(true)
          }
          else
            console.log(resp.json());
    }
    }
    return (
        <div>
            <nav>
                <div className="logo_land">
                    <img src={Logo} alt=""/>
                </div>
                <div className="list_cont">
                    <Link to={'/'}><div className="list_item">ስለ እኛ</div></Link>
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
            <section className='reg_sec'>
              <div className="overlay"></div>
              <form className="reg_form" onSubmit={(e) => e.preventDefault()}>
                <div className="reg_header_text">
                  ይመዝገቡ
                </div>
                <div className="fill_form">
                  <div style={{'display': 'flex','justifyContent':'space-between','width':'100%'}}>
                    <div className="input_form" id='nm'>
                      <label htmlFor="name">ስም</label>
                      <input type="text" name="name" onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="input_form" id='fn'>
                      <label htmlFor="father_name">የአባት ስም</label>
                      <input type="text" name="father_name" onChange={(e) => setFName(e.target.value)} required/>
                    </div>
                  </div>
                  <div className="input_form">
                    <label htmlFor="email">ኢሜል አድራሻ</label>
                    <input type="text" name="email" id="em" onChange={(e) => setEmail(e.target.value)} required/>
                  </div>
                  <div className="input_form">
                    <label htmlFor="phone">ስልክ ቁጥር</label>
                    <input type="tel" name="phone" id="em" onChange={(e) => setPhone(e.target.value)} required/>
                  </div>
                  <div className="input_form">
                    <label htmlFor="organization">የድርጅት ስም</label>
                    <input type="text" name="organization" id="org_n" onChange={(e) => setOrg(e.target.value)} required/>
                  </div>
                  <div className="input_form">
                    <label htmlFor="package">የጥቅል ዓይነት</label>
                    <select name="package" id="pk" onChange={(e) => setPackage(e.target.value)} required>
                      <option value="">Choose Package</option>
                      <option value="free-trail">Free Trail</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                </div>
                <div style={{'textAlign':'center','padding':'1.5em'}}>
                  <button onClick={() => registerRequest()} disabled={btnLoading}>
                    {btnLoading ? <Sb_Loader /> :  "ተመዝገቡ"}
                  </button>
                </div>
                <div className='confirm' style={{'display': confirm ? 'block' : 'none' }}>
                  ተልኳል
                </div>
              </form>
            </section>
        </div>
    )
}