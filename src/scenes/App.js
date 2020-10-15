import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';
import Home from './Home/Home';
class App extends React.Component {
  render() {
    return (
      <Router >
        <Switch>
          {/* <Route path="/404" exact render={props => <Page404 {...props} />} /> */}
          <Route path="/" render={props => <Home {...props} />} />
          {/* <Redirect to="/404" /> */}
        </Switch>
      </Router>

    );
  }
}
export default App;
