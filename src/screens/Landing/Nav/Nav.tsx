import { Link } from "react-router-dom";
import { useAuth } from "../../../states/AuthContext";
import { decodeJWT } from "../../../utils/helpers";
import Logo from '../../../assets/logo.png';

export default function Nav() {
	const { token, setAuthToken } = useAuth();
	function toWhere() {
		if (token == "")
			return "/login";
		else if (decodeJWT(token as string).exp < new Date().getTime() / 1000) {
			setAuthToken(""); return "/login";
		}
		else {
			return "/dashboard";
		}
	}
	function scrollTo(to: string) {
		const section = document.querySelector(to);
		section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	return (
		<nav>
			<div className="logo_land">
				<Link to={'/'} onClick={() => scrollTo('#start')}><img src={Logo} alt="" /></Link>
			</div>
			<div className="list_cont">
				<Link to={'/'}><div className="list_item">ስለ እኛ</div></Link>
				<div className="list_item netela">፣</div>
				<Link to={'/pricing'}><div className="list_item">ዋጋችን</div></Link>
				<div className="list_item netela">፣</div>
				<Link to={'/'} onClick={() => scrollTo('#contact-us')}><div className="list_item">አግኙን</div></Link>
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
	)
}