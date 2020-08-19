import React from 'react';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import useStyles from './style';

const EmptyState = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LocationOffIcon style={{ fontSize: 250 }} />
      <h3>NO DATA AVAILABLE!!!</h3>
    </div>
  );
};

export default EmptyState;
