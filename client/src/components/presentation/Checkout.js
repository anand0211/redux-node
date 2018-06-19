import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, getCart, syncQuantity,updateCart } from '../../actions/productAction';

class Checkout extends Component{
	constructor(props){
		super(props);
	
	this.state =  {
      currentTotal: 0
    }
}

	componentDidMount() {
    const  itemsInStore  = JSON.parse(localStorage.getItem('cart'));
    const currentItem = itemsInStore.find(p => p.id.toString());  
  }
	handleClick(id)
	{
		this.props.removeFromCart(id);
		this.props.history.push('/Checkout');
	}
	incrementClick(id,quantity)
	{
		const  itemsInStore = JSON.parse(localStorage.getItem('cart'));
		const  currentItem  = itemsInStore.find(p => p.id.toString() === id.toString());
       	Object.assign(currentItem, {quantity:currentItem.quantity + 1});
		this.props.updateCart(itemsInStore);
		this.props.history.push('/Checkout');
	}

	decrementClick(id,quantity)
	{
		alert(quantity);
		if(quantity === 0 || quantity === undefined){
			this.props.removeFromCart(id);
			this.props.history.push('/Checkout');
		} 
			
		const  itemsInStore = JSON.parse(localStorage.getItem('cart'));
		//debugger;
		const  currentItem  = itemsInStore.find(p => p.id.toString() === id.toString());
       	Object.assign(currentItem, {quantity:currentItem.quantity - 1});
		
		debugger;
		this.props.updateCart(itemsInStore);
		this.props.history.push('/Checkout');
	}


	render(){
		const view_cart = JSON.parse(localStorage.getItem('cart'));
		const { currentQuantity } = this.state;
		let subTotals = [];
		view_cart.map((item) => {
      		subTotals.push(item.quantity * item.price);
    		});
		return(
				<div>
					<div className="banner">
		<div className="w3l_banner_nav_right">
		<div className="privacy about">
			<h3>Ca<span>rt</span></h3>
	      <div className="checkout-right">
				<table className="timetable_sub">
					<thead>
						<tr>
							<th>SL No.</th>	
							<th>Product</th>
							<th>Quality</th>
							<th>Product Name</th>
							<th>Price</th>
							<th>Remove</th>
						</tr>
					</thead>

					{ view_cart.map((carts,i) => (
					<tbody>
					<tr>
				<td>{i+1}</td>
				<td className="invert-image">
					<a href="single.html">
						<img src={'http://localhost:3001/uploads/'+carts.image} alt=" " className="img-responsive" />
					</a>
				</td>
				<td className="invert">
					<div className="quantity"> 
						<div className="quantity-select">                           
								<div className="entry value-minus" onClick={() => { this.decrementClick(carts.id,carts.quantity) }}>&nbsp;</div>
								<div className="entry value"><span>{carts.quantity}</span></div>
								<div className="entry value-plus active" onClick={() => { this.incrementClick(carts.id,carts.quantity) }}>&nbsp;</div>
								</div>
							</div>
				</td>
				<td>{carts.name}</td>
				<td>$ {carts.quantity * carts.price}</td>
				<td className="invert">
					<div className="rem">
						<div className="close1" onClick={() => this.handleClick(carts.id)}> </div>
					</div>
				</td>
					</tr>
				</tbody>
				))}
				</table>
				<h5 className="">{this.props.getCart.items ? this.props.getCart.items + ' item selected' : ''}</h5>
				<strong>$ {subTotals.reduce((accumulator, currentValue) => accumulator + currentValue)}</strong>
			</div>

		</div>
		</div>
		<div className="clearfix">
		</div>
	</div>
				</div>
			)
	}
}


const mapStateToProps = (state, props) => {
    return {
        getCart: getCart(state.cart, props)     
    }
}

const mapDispatchToProps = {
	updateCart,
	syncQuantity,
	removeFromCart
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);