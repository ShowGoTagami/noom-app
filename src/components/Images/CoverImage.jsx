import React from 'react';
import { useStyles } from '../../styles';

export const CoverImage = ({
  imageUrl,
  altText,
}) => {
  const classes = useStyles();
  return (
    <img src={imageUrl} alt={altText} className={classes.fitWidth}/>
  );
};
