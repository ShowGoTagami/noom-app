import React from 'react';
import { Box } from '.';
import { useStyles } from '../../styles';

export const BaseContainer = ({
  contents
}) => {
  const classes = useStyles();
  return (
    <Box
      pt={3}
      className={`${classes.container} ${classes.mainContensHeight}`}
    >
      {contents}
    </Box>
  )
};
