import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, addToCart,isInCart } from '../../actions/productAction';
import { connect } from 'react-redux';

class Products extends Component{

	constructor(props){
		super(props);
		this.state = {
			details:{}
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){
		this.props.fetchProducts();
		//console.log(this.props);
		//this.props.dispatch(fetchProducts(this.state.details));	
	}

	handleClick(e) {

		if (this.props.isInCart) {
            
        }
        //debugger;
		const getData = this.props.products.filter(p => p._id.toString() === e.currentTarget.id.toString());
		//debugger;
            const cartItem = {
                id:   getData[0]._id,
                name: getData[0].productName,
                image: getData[0].images,
                price: getData[0].prices,
                quantity:1
            };
            this.props.addToCart(cartItem);
            this.props.history.push('/Checkout');
    	}

	render(){
		const data = this.props.products;
		return(
			<div>
				<div className="banner">
		<div className="w3l_banner_nav_right">
			<div className="w3l_banner_nav_right_banner3">
				<h3>Best Deals For New Products<span className="blink_me"></span></h3>
			</div>
			<div className="w3l_banner_nav_right_banner3_btm">
				<div className="col-md-4 w3l_banner_nav_right_banner3_btml">
					<div className="view view-tenth">
						<img src="images/13.jpg" alt=" " className="img-responsive" />
						<div className="mask">
							<h4>Grocery Store</h4>
							<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
						</div>
					</div>
					<h4>Utensils</h4>
					<ol>
						<li>sunt in culpa qui officia</li>
						<li>commodo consequat</li>
						<li>sed do eiusmod tempor incididunt</li>
					</ol>
				</div>
				<div className="col-md-4 w3l_banner_nav_right_banner3_btml">
					<div className="view view-tenth">
						<img src="images/14.jpg" alt=" " className="img-responsive" />
						<div className="mask">
							<h4>Grocery Store</h4>
							<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
						</div>
					</div>
					<h4>Hair Care</h4>
					<ol>
						<li>enim ipsam voluptatem officia</li>
						<li>tempora incidunt ut labore et</li>
						<li>vel eum iure reprehenderit</li>
					</ol>
				</div>
				<div className="col-md-4 w3l_banner_nav_right_banner3_btml">
					<div className="view view-tenth">
						<img src="images/15.jpg" alt=" " className="img-responsive" />
						<div className="mask">
							<h4>Grocery Store</h4>
							<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
						</div>
					</div>
					<h4>Cookies</h4>
					<ol>
						<li>dolorem eum fugiat voluptas</li>
						<li>ut aliquid ex ea commodi</li>
						<li>magnam aliquam quaerat</li>
					</ol>
				</div>
				<div className="clearfix"> </div>
			</div>
			<div className="w3ls_w3l_banner_nav_right_grid">
				<h3>Popular Brands</h3>
				<div className="w3ls_w3l_banner_nav_right_grid1">
					<h6>food</h6>
					{data.map((item,i) => (
					<div className="col-md-3 w3ls_w3l_banner_left">
						<div className="hover14 column">
						<div className="agile_top_brand_left_grid w3l_agile_top_brand_left_grid">
							<div className="agile_top_brand_left_grid_pos">
								<img src="images/offer.png" alt=" " className="img-responsive" />
							</div>
							<div className="agile_top_brand_left_grid1">
								<figure>
									<div className="snipcart-item block">
										<div className="snipcart-thumb">
											<a href="single.html">
											<img src={"http://localhost:3001/uploads/"+item.images} alt=" " className="img-responsive" /></a>
											<p>{item.productName} (100 gm)</p>
											<h4>$ {item.prices} </h4>
										</div>
										<div className="snipcart-details">
											<form action="#" onSubmit={this.handleClick} id={item._id} method="post">
												<fieldset>
													<input type="hidden" name="cmd" value="_cart" />													
													<input type="submit" name="submit" value="Add to cart" className="button" />
												</fieldset>
											</form>
										</div>
									</div>
								</figure>
							</div>
						</div>
						</div>
					</div>
					))}
					
					<div className="clearfix"> </div>
				</div>
			</div>
		</div>
		<div className="clearfix"></div>
	</div>
			</div>
			);
	}
}

const mapStateToProps = (state, props) => {
	//debugger;
	return{
  products: state.products.items,
  isInCart: isInCart(state, props)
}
};

const mapDispatchToProps = {
	fetchProducts,
	addToCart
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);
