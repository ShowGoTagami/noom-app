import React from 'react';
import { Button } from './';

// style
import { useStyles } from '../../styles';

export const ConversionButton = ({
  buttonColor,
  buttonText,
  endIcon,
  onClickButtonHandler,
}) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color={buttonColor}
      fullWidth
      className={`${classes.conversionButton} ${classes.noneLowerCase}`}
      endIcon={ endIcon ? endIcon : '' }
      onClick={() => onClickButtonHandler()}
    >
      {buttonText}
    </Button>
  )
}
