import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collectionitem/CollectionItem';

import { selectCollections } from '../../redux/shop/shopselectors';

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './collectionstyles';

const Collection = ({collection}) => {

const {title, items} = collection;
return(
	<CollectionPageContainer>
		<CollectionTitle> {title} </CollectionTitle>
		<CollectionItemsContainer>
			{items.map(item => (
				<CollectionItem key={item.id} item={item}/>
			))}
		</CollectionItemsContainer>
		</CollectionPageContainer>	
)};

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollections(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(Collection);