import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component{
	render(){
		return(
				<div>
				<div className="agileits_header">
		<div className="w3l_offers">
			<a href="#">Today special Offers</a>
		</div>
		<div className="w3l_search">
			<form action="#" method="post">
				<input type="text" name="Product" value="Search a product..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Search a product...';}" required="" />
				<input type="submit" value=" " />
			</form>
		</div>
		<div className="product_list_header">  
			<form action="#" method="post" className="last">
                <fieldset>
                    <input type="hidden" name="cmd" value="_cart" />
                    <input type="hidden" name="display" value="1" />
                    <input type="submit" name="submit" value="View your cart" class="button" />
                </fieldset>
            </form>
		</div>
		<div className="w3l_header_right">
			<ul>
				<li className="dropdown profile_details_drop">
					<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user" aria-hidden="true"></i><span className="caret"></span></a>
					<div className="mega-dropdown-menu">
						<div className="w3ls_vegetables">
							<ul className="dropdown-menu drp-mnu">
								<li><a href="login.html">Login</a></li> 
								<li><a href="login.html">Sign Up</a></li>
							</ul>
						</div>                  
					</div>	
				</li>
			</ul>
		</div>
		<div className="w3l_header_right1">
			<h2><a href="mail.html">Contact Us</a></h2>
		</div>
		<div className="clearfix"> </div>
	</div>

	<div className="logo_products">
		<div className="container">
			<div className="w3ls_logo_products_left">
				<h1><a href="index.html"><span>Grocery</span> Store</a></h1>
			</div>
			<div className="w3ls_logo_products_left1">
				<ul className="special_items">
					<li><a href="events">Events</a><i>/</i></li>
					<li><Link to={'/About'}>About Us</Link><i>/</i></li>
					<li><a href="#">Best Deals</a><i>/</i></li>
					<li><Link to={'/Products'}>Products</Link><i>/</i></li>
					<li><Link to={'/SignUp'}>SignUp</Link></li>
				</ul>
			</div>
		</div>
	</div>
	<div className="products-breadcrumb">
		<div className="container">
			<ul>
				<li><i className="fa fa-home" aria-hidden="true">
				</i><a href="index.html">Home</a><span>|</span></li>
				<li>Sign In & Sign Up</li>
			</ul>
		</div>
	</div>
				</div>
			);
	}
}

export default HeaderComponent;