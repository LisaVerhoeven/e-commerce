import React from 'react';

import CollectionItem from '../collectionitem/CollectionItem';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collectionpreviewstyles';

const CollectionPreview = ({ title, items }) => (
  <CollectionPreviewContainer>
    <TitleContainer>{title.toUpperCase()}</TitleContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map((item ) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default CollectionPreview;