import React from 'react';
import { Container } from 'react-materialize';
import { Switch, Route } from 'react-router-dom';

import Station from './pages/station';
import NotFound from './pages/not_found';


const Router = () => (
  <div>
    <Container>
      <Switch>
        <Route path="/:country/:state/:city/:name" component={Station} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </div>
);

export default Router;
