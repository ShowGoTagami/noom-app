import React from 'react';
import { AppBar, Toolbar } from '../AppBar';
import { useStyles } from '../../styles';

export const Header = ({
  children
}) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.whiteBackground}>
      <Toolbar>
        <div className={classes.headerContainer}>
          {children}
        </div>
      </Toolbar>
    </AppBar>
  )
}
