import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, getCart, syncQuantity,updateCart } from '../../actions/productAction';

class Checkout extends Component{
	constructor(props){
		super(props);
	
	this.state =  {
      currentQuantity: 1
    }
}

	componentDidMount() {
    const  itemsInStore  = JSON.parse(localStorage.getItem('cart'));
    //debugger;
    const currentItem = itemsInStore.find(p => p.id.toString());

    //Checks if there are any items present and assigns respective quantity value, else defaults to 0
    // this.setState({
    //   currentQuantity: currentItem ? currentItem.quantity : 0 
    // });
  
  }

  	_updateQuantity = (change,iid) => {

  	const  itemsInStore  = JSON.parse(localStorage.getItem('cart'));

  	const  currentItem  = itemsInStore.find(p => p.id.toString() === iid.toString());

    
    let { quantity } = currentItem;
    debugger;
    switch(change) {
      case "increment": {
        quantity = quantity + 1;
        break;
      }
      case "decrement": {
        quantity = quantity - 1;
        if(quantity === 0 || quantity === undefined) this.props.dispatch(removeFromCart(iid));
      }
    }

    this.setState({
      currentQuantity: quantity
    })

    const updatedItemDetails = Object.assign(currentItem, {quantity: quantity});

    const syncCatalog = {
      //item: item,
      quantity: quantity
    }
    debugger;
    this.props.updateCart(updatedItemDetails);
    this.props.syncQuantity(syncCatalog);
  }

	handleClick(id)
	{
		this.props.removeFromCart(id);
		this.props.history.push('/Checkout');
	}
	incrementClick(id,quantity){
		const  findqty  = JSON.parse(localStorage.getItem('cart')).find(p => p.id.toString() === id.toString());
		//const currentQTY = findqty[0].quantity;
		//debugger;
		const cartItem = {
                id:   findqty.id,
                name: findqty.name,
                image: findqty.image,
                price: findqty.price,
                quantity:findqty.quantity + 1
            };
		localStorage.setItem('cart', JSON.stringify([cartItem]));		
		this.props.history.push('/Checkout');
	}

	decrementClick(quantity){

	}


	render(){
		//debugger;
		const view_cart = JSON.parse(localStorage.getItem('cart'));
		const { currentQuantity } = this.state;
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
								<div className="entry value-minus" onClick={() => { this._updateQuantity('decrement',carts.id) }}>&nbsp;</div>
								<div className="entry value"><span>{currentQuantity}</span></div>
								<div className="entry value-plus active" onClick={() => { this._updateQuantity('increment',carts.id) }}>&nbsp;</div>
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
	<strong>{this.props.getCart.items ? 'Rs ' + this.props.getCart.total : '0 in cart'}</strong>
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