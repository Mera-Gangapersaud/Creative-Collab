import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import routes from '../routes';

const App = () => (
  <Router>
    <Switch>
      {Object.values(routes).map((e) => (
        <Route key={e.path} {...e}/>
      ))}
      <Redirect to={routes.home.path} />
    </Switch>
  </Router>
);

export default App;
