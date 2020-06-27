import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cartitem/CartItem';
import { selectCartItems } from '../../redux/cart/cartselectors';
import { toggleCartHidden } from '../../redux/cart/cartactions';

import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer
} from './cartdropdownstyles';

const CartDropdown = ({cartItems, history, dispatch}) => (
  <CartDropdownContainer>
    <CartItemsContainer>
    {
    	cartItems.length ?
    	(cartItems.map(item => (<CartItem key={item.id} item={item}/>)))
    	: <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
    }
    </CartItemsContainer>
    <CartDropdownButton onClick={ () => {history.push('/checkout'); dispatch(toggleCartHidden())}}>GO TO CHECKOUT</CartDropdownButton>
  </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems
});
 
export default withRouter(connect(mapStateToProps)(CartDropdown));