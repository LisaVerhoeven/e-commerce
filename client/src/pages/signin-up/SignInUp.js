import React from 'react';

import { SignInAndSignUpContainer } from './signin-upstyles';

import SignIn from '../../components/signin/SignIn';
import SignUp from '../../components/signup/SignUp';



const SignInUp = () => {
 return(
 <SignInAndSignUpContainer>
 <SignIn/>
 <SignUp/>
 </SignInAndSignUpContainer>


 )

}





export default SignInUp;