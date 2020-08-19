import React from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './style';

const InputBox = ({ handleChange, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        {...props}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={({ target }) => handleChange(target.name, target.value)}
      />
    </div>
  );
};

InputBox.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default InputBox;
