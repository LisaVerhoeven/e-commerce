import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './globalstyles'

import Header from './components/header/Header';
import Spinner from './components/spinner/Spinner';
import ErrorBoundary from './components/errorboundary/ErrorBoundary';

import { selectCurrentUser } from './redux/user/userselectors';
import { checkUserSession } from './redux/user/useractions';

const HomePage = lazy(() => import('./pages/homepage/Homepage'));
const Shop = lazy(() => import('./pages/shop/Shop'));
const Checkout = lazy(() => import('./pages/checkout/Checkout'));
const SignInUp = lazy(() => import('./pages/signin-up/SignInUp'));

const App = ({checkUserSession, currentUser}) =>  {
  
useEffect(() => {
  checkUserSession()
}, [checkUserSession]);


  return (
    <div>
    <GlobalStyle/>
      <Header/>
      <Switch>
      <ErrorBoundary>
      <Suspense fallback={<Spinner/>}>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={Shop} />
        <Route exact path='/checkout' component={Checkout} />
        <Route 
          exact 
          path='/signin' 
          render={() => 
            currentUser ? (
              <Redirect to='/'/>
          ) : (
            <SignInUp/>
          )
        }
      />
      </Suspense>
      </ErrorBoundary>
      </Switch>
    </div>
  );
}
  

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);