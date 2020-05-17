import React, { Fragment, useState, useEffect } from 'react';
import { db } from '../Firebase';
import { v4 as uuidv4 } from 'uuid';

// components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  PostMessageDialog,
} from '../components/Dialog';
import { Typography } from '../components/Typography';
import { ConversionButton } from '../components/Buttons';
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

// constants
import { MESSAGE_TYPE, MAX_MESSAGE_BODY_COUNT } from '../constants';

export const Owner = ({
  match,
  classes,
  members,
  setMember,
  updateGlobalLoaderModalState,
}) => {
  const initialNewMessageState = {
    type: MESSAGE_TYPE.QUESTION,
    body: '',
    isAnyError: false,
  }
  const [isShowChooseMessageDialog, setIsShowChooseMessageDialog] = useState(false);
  const [isShowPostMessageDialog, setIsShowPostMessageDialog] = useState(false);
  const [messages, setMessages] = useState([]);
  const [displayMessage, setDisplayMessage] = useState();
  const [chosenUser, setChosenUser] = useState();
  const [newMessage, setNewMessage] = useState(initialNewMessageState)
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  useEffect(() => {
    const setExistingMessages = async () => {
      let existingMessages = [];
      await db.collection("rooms").doc(match.params.uuidHash).collection('messages').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            existingMessages.push({
              uuidHash: doc.id,
              messageType: doc.data().messageType,
              body: doc.data().body,
            })
          })
        }).then(() => {
          setMessages(existingMessages)
        })
    }
    setExistingMessages();
  }, []);

  useEffect(() => {
    if (members.length > 0) { return; }
    const setExistingMembers = async () => {
      let existingMembers = [];
      await db.collection("rooms").doc(match.params.uuidHash).collection('members').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            existingMembers.push({
              uuidHash: doc.id,
              name: doc.data().name,
            })
          })
        }).then(() => {
          setMember(existingMembers)
        })
    }
    setExistingMembers();
  }, []);

  const chooseRandomMessage = () => {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  const randomUserName = () => {
    return members[Math.floor(Math.random() * members.length)].name;
  }

  const clickRandomChooseButton = () => {
    setDisplayMessage(chooseRandomMessage())
    setIsShowChooseMessageDialog(true)
  };

  const clickMessage = (message) => {
    setDisplayMessage(message)
    setIsShowChooseMessageDialog(true)
  }

  const messageButtonText = () => {
    if (!!chosenUser) {
      return `to ${chosenUser}`;
    }
    return `質問相手をランダムに選ぶ`
  }

  const clickMessageButton = () => {
    setChosenUser(randomUserName());
  }

  const closeMessageDialog = () => {
    deleteMessage(displayMessage.uuidHash);
    setIsShowChooseMessageDialog(false);
    setChosenUser('');
    openSnackBar();
  };

  const deleteMessage = (targetMessageUuid) => {
    db.collection("rooms").doc(match.params.uuidHash).collection('messages')
      .doc(targetMessageUuid).delete().then(() => {
        setMessages(messages.filter((message) => message.uuidHash !== targetMessageUuid))
      })
  };

  const openSnackBar = () => {
    setIsOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setIsOpenSnackbar(false);
  };

  const changeNewMessageType = (event) => {
    setNewMessage({ ...newMessage, type: event.target.value });
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
        setIsShowPostMessageDialog(false);
      }).then(() => {
        setMessages((currentMessages) => [...currentMessages, newMessageObj])
      }).then(() => {
        updateGlobalLoaderModalState(false);
      }).catch(() => {

      })
  };

  const inputNewMessage = (event) => {
    const newBody = event.target.value;
    if (!newBody || newBody.length > MAX_MESSAGE_BODY_COUNT) {
      setNewMessage({ ...newMessage, body: newBody, isAnyError: true });
      return;
    }
    setNewMessage({ ...newMessage, body: newBody, isAnyError: false });
  };

  return (
    <Box pb={2}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key="top, center"
        open={isOpenSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={1000}
      >
        <MuiAlert onClose={handleCloseSnackbar} elevation={6} variant="filled" severity="error">
          削除しました
        </MuiAlert>
      </Snackbar>
      {
        displayMessage &&
        <Dialog
          open={isShowChooseMessageDialog && displayMessage}
          fullWidth
          onClose={() => setIsShowChooseMessageDialog(false)}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="center">
              {
                displayMessage.messageType === MESSAGE_TYPE.QUESTION ?
                  <Fragment>
                    <ContactSupportIcon />
                    <Box ml={1}>
                      <Typography className={classes.fontWeightBold}>誰かに質問しよう！</Typography>
                    </Box>
                  </Fragment>
                  :
                  <Fragment>
                    <ForumIcon />
                    <Box ml={1}>
                      <Typography className={classes.fontWeightBold}>みんなに共有しよう！</Typography>
                    </Box>
                  </Fragment>
              }
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box textAlign="center">
              <Typography className={classes.fontWeightBold}>
                {displayMessage.body}
              </Typography>
              <Box mt={3}>
                {
                  displayMessage.messageType === MESSAGE_TYPE.QUESTION &&
                  <Fragment>
                    {
                      members.length > 0 &&
                        <ConversionButton
                          buttonColor="primary"
                          endIcon={chosenUser && <CachedIcon />}
                          buttonText={messageButtonText()}
                          onClickButtonHandler={() => clickMessageButton()}
                        />
                    }
                  </Fragment>
                }
                <Box mt={1} mb={1}>
                  <Typography
                    color="secondary"
                    variant="caption"
                    className={classes.textUnderline}
                    onClick={() => closeMessageDialog()}
                  >
                    この投稿を削除する
                </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      }
      <PostMessageDialog
        isOpen={isShowPostMessageDialog}
        onCloseDialog={() => setIsShowPostMessageDialog(false)}
        messageType={newMessage.type}
        messageBody={newMessage.body}
        onChangeMessageType={changeNewMessageType}
        onChangeMessageBody={inputNewMessage}
        onSubmitMessage={() => submitNewMessage()}
        isAnyError={newMessage.isAnyError}
      />
      <Typography className={classes.postExampleTitle}>投稿一覧</Typography>
      <Box className={classes.scrollableWrapper} id="scrollable-wrapper">
        {
          messages.length > 0 &&
            <List className={classes.whiteBackground}>
              {
                messages.map((message) => (
                  <ListItem
                    key={message.uuidHash}
                    button
                    onClick={() => clickMessage(message)}
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
                    <ListItemSecondaryAction>
                      <ChevronRightIcon />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
        }
      </Box>
      <ConversionWrapper
        contents={
          <Fragment>
            <ConversionButton
              buttonColor="primary"
              buttonText="ランダムに選ぶ"
              onClickButtonHandler={() => clickRandomChooseButton()}
            />
          </Fragment>
        }
        subContents={
          <Typography
            color="secondary"
            className={classes.textUnderline}
            onClick={() => setIsShowPostMessageDialog(true)}
          >
            自分も投稿する
          </Typography>
        }
      />
    </Box>
  )
}
