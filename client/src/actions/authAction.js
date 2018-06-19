import actionTypes from '../constants/actionTypes';
import createHistory from "history/createBrowserHistory";
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router'
const history = createHistory();
function userLoggedIn(email){
	return {
		type: actionTypes.USER_LOGGEDIN,
		email: email
	}
}

function userRegistered(email){
	return {
		type: actionTypes.USER_REGISTERED,
		email: email
	}
}

function UserFailure(error){
	return{
		type:actionTypes.USER_FAILURE,
		error:error,
	};
}

function logout(){
	return {
		type: actionTypes.USER_LOGOUT
	}
}

export function submitLogin(data){
	return dispatch => {
		return fetch(`http://localhost:3001/login`, { 
				method: 'POST', 
 				headers: {
    				'Accept': 'application/json',
    				'Content-Type': 'application/json'
  				},
				body: JSON.stringify(data), 
				mode: 'cors'})
			.then( (response) => {
		        if (!response.ok) {
					//console.log(response.message);
					//console.log(response.errors);
		            return response.json();
		        }
			})
			.then((data) => {
				//browserHistory.push('/About')
				//history.push('/About')
				localStorage.setItem('email', data.user.email);
				dispatch(userLoggedIn(data.user.email));
			})		
			.catch( (e) => console.log(e) );
	}	
}

export function submitRegister(data){
	return dispatch => {
		return fetch('http://localhost:3001/registration', { 
			method: 'POST', 
 			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
			body: JSON.stringify(data), 
			mode: 'cors'})
			.then((response) => {
				//debugger;
		        if (!response.ok) {
		        	debugger;
		        	console.log(response);
		        	dispatch(UserFailure(response));
		        }
        		//return response.json();
			})
			.then( (data) => {
				//console.log('Data...',data);
				localStorage.setItem('email', data.user.email);
				localStorage.setItem('token', data.token);
				dispatch(userRegistered(data.user.email));
				this.props.history.push("/About")
			})

			.catch( (e) => console.log(e) );
	}	
}

export function submitAgent(data){
	console.log(data);
	return dispatch => {
		return fetch('http://localhost:3001/addAgent', { 
			method: 'POST', 
 			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
			body: JSON.stringify(data), 
			mode: 'cors'})
			.then( (response) => {
		        if (!response.ok) {
		            throw Error(response.statusText);
		        }
        		return response.json();
			})
			.then( (data) => {

				localStorage.setItem('email', data.data.email);
				//localStorage.setItem('token', data.data.tokenID);

				dispatch(userRegistered(data.data.email));
			})		
			.catch( (e) => console.log(e) );
	}	
}

export function logoutUser() {
	return dispatch => {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		dispatch(logout());
	}
}