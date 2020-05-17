import React, { Fragment } from 'react';
import { TextField, InputAdornment } from './';
import { LinkIcon } from '../../components/Icons';
import { IconButton } from '../../components/Buttons';

export const CopiableTextArea = ({
  labelText,
  displayText,
  onClickCopyButton,
}) => {
  const copyToClipboard = () => {
    onClickCopyButton()
    navigator.clipboard.writeText(displayText)
  }
  return (
    <Fragment>
      <TextField
        label={labelText}
        defaultValue={displayText}
        variant="outlined"
        color="secondary"
        InputProps={{
          endAdornment: <InputAdornment>
            <IconButton onClick={() => copyToClipboard()}>
              <LinkIcon />
            </IconButton>
          </InputAdornment>
        }}
        fullWidth
      />
    </Fragment>
  )
}
