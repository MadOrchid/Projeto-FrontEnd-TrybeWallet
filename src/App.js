import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App({ connected }) {
  return (
    <Switch>
      <Route path="/carteira">
        <Wallet />
      </Route>
      <Route path="/">
        { connected ? <Redirect to="/carteira" /> : <Login /> }
      </Route>
    </Switch>
  );
}

App.propTypes = {
  connected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.user.connected,
});

export default connect(mapStateToProps)(App);
