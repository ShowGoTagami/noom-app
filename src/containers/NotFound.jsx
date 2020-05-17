import React from 'react';
import { NotFoundImage } from "../images";
import { Box, Typography } from '@material-ui/core';

export const NotFound = ({
  classes,
}) => (
  <Box p={4}>
    <Box mb={2}>
      <Typography variant="h6">このページは見つかりません...</Typography>
    </Box>
    <img src={NotFoundImage} className={classes.fitWidth} alt="not-found" />
  </Box>
)
