import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Sidebar from '../layouts/Sidebar';
import Authentication from '../containers/Authentication';

class Layout extends Component {
	render() {
	return (
		<div>
				<Header />
				<Sidebar />						
			<div>
				{ this.props.children }
			</div>
			<Footer />
		</div>
		);
	}
}

export default Layout;