import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { submitLogin } from '../../actions/authAction';
import { connect } from 'react-redux';

class Login extends Component {

	constructor(){
		super();

		this.state = {
			details:{}
		};
	}

	updateDetails(event){
		let updateDetails = Object.assign({}, this.state.details);

		updateDetails[event.target.name] = event.target.value;
		this.setState({
			details: updateDetails   
		});
	}

	login(){
		this.props.dispatch(submitLogin(this.state.details));	
		this.props.history.push('/Products');
	}

	render(){
		return (
			<div>
				<div className="banner">
		<div className="w3l_banner_nav_right">
		<div className="w3_login">
			<h3>Sign In</h3>
			<h2>{this.props.message}</h2>
			<div className="w3_login_module">
				<div className="module form-module">
				  <div className="toggle">
				  </div>
				  <div className="form">
					  <input onChange={this.updateDetails.bind(this)} type="email" name="email" placeholder="Email Address" required=" " />
					  <input onChange={this.updateDetails.bind(this)} type="password" name="password" placeholder="Password" required=" " />
					  <input type="submit" value="Login" onClick={this.login.bind(this)} />					
				  </div>
				  <div className="cta">
				  <Link to={'/SignUp'}>Create Account</Link>
				  </div>
				</div>
			</div>
		</div>
		</div>
		<div className="clearfix"></div>
	</div>
	</div>
		)
	}
}

const mapStateToProps = state => {
	return {
	}
}

export default connect(mapStateToProps)(Login);
