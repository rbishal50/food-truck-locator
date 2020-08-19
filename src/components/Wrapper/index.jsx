import React from 'react';
import { Paper } from '@material-ui/core';
import useStyles from './style';

export const Wrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={0}
      square
      classes={{
        root: classes.root,
      }}
      style={{
        flex: 1,
      }}
    >
      {children}
    </Paper>
  );
};

export default Wrapper;
