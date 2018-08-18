import React from 'react';
import { Container } from 'react-materialize';
import { Switch, Route } from 'react-router-dom';

import Station from './pages/station';
import NotFound from './pages/not_found';
import About from './pages/about';
import Home from './pages/home';

const Router = () => (
  <div>
    <Container>
      <Switch>
        <Route exec path="/" component={Home} />
        <Route path="/:country/:state/:city/:name" component={Station} />
        <Route exact path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </div>
);

export default Router;
