import React, { Fragment, useState, useEffect } from 'react';
import { db } from '../Firebase';
import { v4 as uuidv4 } from 'uuid';

// components
// components
import { PostMessageDialog } from '../components/Dialog';
import { ConversionButton } from '../components/Buttons';
import { Typography } from '../components/Typography';
import {
  ContactSupportIcon,
  ChevronRightIcon,
  ForumIcon,
  CachedIcon,
} from '../components/Icons';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
} from '../components/List';
import { Snackbar, MuiAlert } from '../components/Snackbar';
import { ConversionWrapper } from '../components/shared';
import { Box } from '../components/Layouts';
import { Select, MenuItem } from '../components/Select';

// constants
import { MESSAGE_TYPE, MAX_MESSAGE_BODY_COUNT } from '../constants';

export const Member = ({
  match,
  classes,
  updateGlobalLoaderModalState,
}) => {
  const initialState = {
    isOpenSubmitMessageDialog: false,
  }
  const initialNewMessageState = {
    type: MESSAGE_TYPE.QUESTION,
    body: '',
    isAnyError: false,
  }
  const [state, setState] = useState(initialState);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(initialNewMessageState)

  const changeNewMessageType = (event) => {
    setNewMessage({ ...newMessage, type: event.target.value });
  };

  const inputNewMessage = (event) => {
    const newBody = event.target.value;
    if (!newBody || newBody.length > MAX_MESSAGE_BODY_COUNT) {
      setNewMessage({ ...newMessage, body: newBody, isAnyError: true });
      return;
    }
    setNewMessage({ ...newMessage, body: newBody, isAnyError: false });
  };

  const submitNewMessage = () => {
    updateGlobalLoaderModalState(true);
    const newMessageUuidHash = uuidv4();
    const date = new Date();
    const currentTime = date.getTime();
    const newMessageObj = {
      createdAt: currentTime,
      messageType: newMessage.type,
      body: newMessage.body,
    }
    db.collection("rooms").doc(match.params.uuidHash).collection('messages').doc(newMessageUuidHash)
      .set(newMessageObj)
      .then(() => {
        setState({ ...state, isOpenSubmitMessageDialog: false});
      }).then(() => {
        setMessages((currentMessages) => [...currentMessages, newMessageObj])
      }).then(() => {
        updateGlobalLoaderModalState(false);
      }).catch(() => {
        // TODO
      })
  };

  return (
    <Fragment>
      <PostMessageDialog
        isOpen={state.isOpenSubmitMessageDialog}
        onCloseDialog={() => setState({ ...state, isOpenSubmitMessageDialog: false})}
        messageType={newMessage.type}
        messageBody={newMessage.body}
        onChangeMessageType={changeNewMessageType}
        onChangeMessageBody={inputNewMessage}
        onSubmitMessage={() => submitNewMessage()}
        isAnyError={newMessage.isAnyError}
      />
      <Typography className={classes.postExampleTitle}>投稿一覧</Typography>
      {
        messages.length > 0 &&
          <List className={classes.whiteBackground}>
            {
              messages.map((message) => (
                <ListItem
                  key={message.uuidHash}
                >
                  <ListItemIcon>
                    {
                      message.messageType === MESSAGE_TYPE.QUESTION ?
                        <ContactSupportIcon />
                        :
                        <ForumIcon />
                    }
                  </ListItemIcon>
                  <ListItemText primary={message.body} />
                </ListItem>
              ))
            }
          </List>
      }
      <ConversionWrapper
        contents={
          <Fragment>
            <ConversionButton
              buttonColor="primary"
              buttonText="投稿する"
              onClickButtonHandler={() => setState({...state, isOpenSubmitMessageDialog: true})}
            />
          </Fragment>
        }
      />
    </Fragment>
  )
}
