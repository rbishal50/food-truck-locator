import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { ThemeContext } from 'context/themeContext';
import Home from 'containers/Home';
import getTheme from 'utils/theme';
import './App.css';

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <Switch>
        <Route to='/' exact component={Home}></Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
