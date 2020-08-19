import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import store from './configureStore';
import { ThemeContext } from 'context/themeContext';
import Home from 'containers/Home';
import getTheme from 'utils/theme';
import './App.css';

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <Provider store={store}>
      <ThemeProvider theme={getTheme(darkMode)}>
        <Switch>
          <Route to='/' exact component={Home}></Route>
        </Switch>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
