import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cartactions';
import { selectCartItemsCount } from '../../redux/cart/cartselectors';

import {
  CartContainer,
  ShoppingIcon,
  ItemCountContainer
} from './carticonstyles';

const CartIcon = ({toggleCartHidden, itemCount}) => (
	<CartContainer onClick={toggleCartHidden}>
		<ShoppingIcon/>
		<ItemCountContainer>{itemCount}</ItemCountContainer>
	</CartContainer>
);

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);