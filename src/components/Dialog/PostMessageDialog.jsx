import React from 'react';
// components
import { Dialog } from '../Dialog';
import { TextField } from '../../components/Input';
import { ConversionButton } from '../../components/Buttons';
import { Box } from '../../components/Layouts';
import { Select, MenuItem } from '../../components/Select';

// constants
import { MESSAGE_TYPE, MAX_MESSAGE_BODY_COUNT } from '../../constants';

export const PostMessageDialog = ({
  isOpen,
  onCloseDialog,
  messageType,
  messageBody,
  onChangeMessageType,
  onChangeMessageBody,
  onSubmitMessage,
  isAnyError,
}) => {
  return (
    <Dialog open={isOpen} onClose={() => onCloseDialog()}>
      <Box p={1} width="250px">
        <Select
          fullWidth
          color="secondary"
          variant="outlined"
          value={messageType}
          onChange={onChangeMessageType}
        >
          <MenuItem value={MESSAGE_TYPE.QUESTION}>誰かに質問する</MenuItem>
          <MenuItem value={MESSAGE_TYPE.TALK}>相手を決めずに話すだけ</MenuItem>
        </Select>
        <Box mt={2}>
          <TextField
            fullWidth
            color={isAnyError ? "error" : "secondary"}
            placeholder="誰かと話したいコト"
            multiline
            rows={12}
            variant="outlined"
            error={isAnyError}
            onChange={onChangeMessageBody}
            helperText={`${messageBody.length}/${MAX_MESSAGE_BODY_COUNT}文字`}
          />
        </Box>
      </Box>
      <Box p={1}>
        <ConversionButton
          buttonColor="primary"
          buttonText="これで決定！"
          onClickButtonHandler={() => onSubmitMessage()}
        />
      </Box>
    </Dialog>
  )
}
