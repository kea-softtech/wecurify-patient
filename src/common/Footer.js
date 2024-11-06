import { Link } from "react-router-dom";
import appLogo from '../../src/img/fly4smile.png'
export default function Footer() {
	return (
		<footer>
			<div className="container margin_60_35">
				<div className="row">
					<div className="col-lg-4 col-md-12">
						<Link to={`https://fly4smiles.com`}>
							<img className='appLogo' src={appLogo} alt="Fly4smiles" />
						</Link>
					</div>
					<div className="col-lg-4 col-md-4">
						<h5>About</h5>
						<ul className="links">
							<li><Link to="https://fly4smiles.com/introduction/">About us</Link></li>
							<li><Link to="https://fly4smiles.com/all-services/">Services</Link></li>
						</ul>
					</div>
					<div className="col-lg-4 col-md-4">
						<h5>Contact with Us</h5>
						<ul className="contacts">
							<li><Link to="tel:+91 99233 87272"><i className="icon_mobile"></i> +91 99233 87272</Link></li>
							<li><Link to="mailto:support@fly4smiles.com"><i className="icon_mail_alt"></i>support@fly4smiles.com</Link></li>
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4" align="left">
						<div id="copy">Copyrights © 2024 All Rights Reserved by <Link to="https://fly4smiles.com/introduction/">fly4smiles.</Link></div>
					</div>
				</div>
			</div>
		</footer>
	);
}
