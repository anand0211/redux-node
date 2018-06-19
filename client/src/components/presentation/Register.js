import React, { Component , PropTypes} from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Sidebar from '../layouts/Sidebar';
import { submitRegister } from '../../actions/authAction';
import { connect } from 'react-redux';

class Register extends Component {

	
	constructor(){
		super();
		this.state = {
			details:{
			}
		};
	}
	
	updateDetails(event){
		let updateDetails = Object.assign({}, this.state.details);
		updateDetails[event.target.name] = event.target.value;
		this.setState({
			details: updateDetails   
		});
	}

	register(){
		this.props.dispatch(submitRegister(this.state.details));	
		//this.props.history.push('/SignIn');
	}

	render(){
		return (
			<div>

				<div className="banner">
		<div className="w3l_banner_nav_right">
		<div className="w3_login">
			<h3>Sign Up</h3>
			<div className="w3_login_module">
				<div className="module form-module">
				  <div className="toggle">
				  </div>
				  <div className="form">
					<h2>Create an account</h2>
					  <input onChange={this.updateDetails.bind(this)} type="text" name="firstName" placeholder="First Name" required="required" />
					  <input onChange={this.updateDetails.bind(this)} type="text" name="lastName" placeholder="Last Name" required="required" />
					  <input onChange={this.updateDetails.bind(this)} type="email" name="email" placeholder="Email Address" required="required" />
					  <input onChange={this.updateDetails.bind(this)} type="password" name="password" placeholder="Password" required="required" />
					  <input type="submit" value="Register" onClick={this.register.bind(this)} />					
				  </div>
				  <div className="cta">
				  <Link to={'/SignIn'}>SignIn</Link>
				  
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

export default connect(mapStateToProps)(Register);
