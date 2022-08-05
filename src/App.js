import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/game-trivia" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
