import { Link } from "react-router-dom";
import appLogo from '../../src/img/small_wecurify.png'
export default function Footer() {
	return (
		<footer>
			<div className="container margin_60_35">
				<div className="row">
					<div className="col-lg-3 col-md-12">
						<Link to={`/`}>
							<img className='appLogo' src={appLogo} alt="Something Went Wrong" />
						</Link>
					</div>
					<div className="col-lg-3 col-md-4">
						<h5>About</h5>
						<ul className="links">
							<li><Link to="http://keasofttech.com/">About us</Link></li>
							<li><Link to="http://keasofttech.com/">Services</Link></li>
							{/* <li><Link to="http://keasofttech.com/">FAQ</Link></li>
							<li><Link to="login.html">Login</Link></li>
							<li><Link to="register.html">Register</Link></li> */}
						</ul>
					</div>
					<div className="col-lg-3 col-md-4">
						<h5>Contact with Us</h5>
						<ul className="contacts">
							<li><Link to="#"><i className="icon_mobile"></i> + 91 9021783274</Link></li>
							<li><Link to="mailto:info@wecurify.com"><i className="icon_mail_alt"></i> info@wecurify.com</Link></li>
						</ul>
					</div>
					<div className="col-lg-3 col-md-4">
						<div className="follow_us">
							<h5>Follow us</h5>
							<ul>
								<li><Link to="https://www.facebook.com/profile.php?id=100080058115293"><i className="social_facebook"></i></Link></li>
								{/* <li><Link to="#0"><i className="social_twitter"></i></Link></li> */}
								<li><Link to="https://www.linkedin.com/company/keasofttech/"><i className="social_linkedin"></i></Link></li>
								<li><Link to="mailto:info@wecurify.com"><i className="icon-gmail"></i></Link></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8">
						{/* <ul id="additional_links">
							<li><Link to="#0">Terms and conditions</Link></li>
							<li><Link to="#0">Privacy</Link></li>
						</ul> */}
					</div>
					<div className="col-md-4">
						<div id="copy">©2019 wecurify</div>
					</div>
				</div>
			</div>
		</footer>
	);
}