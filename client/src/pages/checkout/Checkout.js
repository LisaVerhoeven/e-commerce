import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import  CheckoutItem from '../../components/checkoutitem/CheckoutItem';
import StripeChekoutButton from '../../components/stripebutton/StripeButton';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cartselectors';

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer
} from './checkoutstyles';

const Checkout = ({cartItems, total}) => (
<CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
       {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <TotalContainer>TOTAL: ${total}</TotalContainer>
    <WarningContainer>
    *Please use the following test credit card for payments*
    <br/>
    4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
    </WarningContainer>
    <StripeChekoutButton price={total}/>
</CheckoutPageContainer>
);


const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal
});

export default connect(mapStateToProps)(Checkout);