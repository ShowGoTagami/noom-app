import React from 'react';

// components
import { Box } from '../Layouts';

// style
import { useStyles } from '../../styles';

export const ConversionWrapper = ({
  contents,
  subContents,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.conversionWrapper}>
      {contents}
      {
        subContents &&
        <Box mt={1}>
          {subContents}
        </Box>
      }
    </Box>
  )
}
