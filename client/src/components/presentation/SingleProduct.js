import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchSingleProduct, addToCart } from '../../actions/productAction';
import { connect } from 'react-redux';

class SingleProduct extends Component{
		constructor(props){
			super(props);
			this.handleClick = this.handleClick.bind(this);
		}
		componentDidMount()
		{
			const iid = this.props.match.params.id;
		    this.props.fetchSingleProduct(iid);
		}

		handleClick(e) {
		const getData = this.props.singleproduct;
            const cartItem = {
                id:   getData._id,
                name: getData.productName,
                image: getData.images,
                price: getData.prices,
                quantity:1
            };
            this.props.addToCart(cartItem);
            this.props.history.push('/Checkout');
    	}


	render(){
		const getSingleData = this.props.singleproduct;
		//console.log(getSingleData);
		return(
				<div class="banner">
		<div class="w3l_banner_nav_right">
			<div class="w3l_banner_nav_right_banner3">
				<h3>Best Deals For New Products<span class="blink_me"></span></h3>
			</div>
			<div class="agileinfo_single">
				<h5>{getSingleData.productName}</h5>
				<div class="col-md-4 agileinfo_single_left">
					<img id="example" src={"http://localhost:3001/uploads/"+getSingleData.images} alt=" " class="img-responsive" />
				</div>
				<div class="col-md-8 agileinfo_single_right">
					<div class="rating1">
						<span class="starRating">
							<input id="rating5" type="radio" name="rating" value="5" />
							<label for="rating5">5</label>
							<input id="rating4" type="radio" name="rating" value="4" />
							<label for="rating4">4</label>
							<input id="rating3" type="radio" name="rating" value="3" checked />
							<label for="rating3">3</label>
							<input id="rating2" type="radio" name="rating" value="2" />
							<label for="rating2">2</label>
							<input id="rating1" type="radio" name="rating" value="1" />
							<label for="rating1">1</label>
						</span>
					</div>
					<div class="w3agile_description">
						<h4>Description :</h4>
						<p>{getSingleData.description}</p>
					</div>
					<div class="snipcart-item block">
						<div class="snipcart-thumb agileinfo_single_right_snipcart">
							<h4>$ {getSingleData.prices} </h4>
						</div>
						<div class="snipcart-details agileinfo_single_right_details">
							<form action="#" onSubmit={ this.handleClick } id={getSingleData._id} method="post">
								<fieldset>
									<input type="hidden" name="cmd" value="_cart" />
									<input type="submit" name="submit" value="Add to cart" class="button" />
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
		<div className="clearfix"></div>
	</div>
			);
	}
}

const mapStateToProps = (state, props) => {
	return{
  singleproduct: state.products.singleItem
}
};

const mapDispatchToProps = {
	fetchSingleProduct,
	addToCart
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleProduct);