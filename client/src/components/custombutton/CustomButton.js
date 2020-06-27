import React from 'react';

import {CustomButtonContainer} from './custombuttonstyles'; 

const CustomButton = ({ children, ...otherProps }) => (
  <CustomButtonContainer  {...otherProps}>
    {children}
  </CustomButtonContainer>
);

export default CustomButton;