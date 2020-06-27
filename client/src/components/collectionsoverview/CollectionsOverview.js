import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForOverview } from '../../redux/shop/shopselectors';

import CollectionPreview from '../collectionpreview/CollectionPreview';

import { CollectionsOverviewContainer } from './collectionsoverviewstyles'

const CollectionsOverview = ({collections}) => (
	<CollectionsOverviewContainer>
	{collections.map(({ id, ...otherCollectionProps }) => (
         <CollectionPreview key={id} {...otherCollectionProps} />
    ))
	}
	</CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionsForOverview
});

export default connect(mapStateToProps)(CollectionsOverview);